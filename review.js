const cors = (req,res) => {
  const origin=req.headers.origin;
  const allowed=(process.env.ALLOWED_ORIGINS||'').split(',').map(x=>x.trim()).filter(Boolean);
  if(origin && allowed.includes(origin)) res.setHeader('Access-Control-Allow-Origin',origin);
  res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
};
module.exports=async function handler(req,res){
  cors(req,res);
  if(req.method==='OPTIONS')return res.status(204).end();
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI provider is not configured'});
  try{
    const body=req.body||{};
    if(typeof body.text!=='string'||!body.text.trim())return res.status(400).json({error:'Document text is required'});
    if(body.text.length>120000)return res.status(413).json({error:'Document text exceeds the review limit'});
    const model=process.env.OPENAI_MODEL||'gpt-4o-mini';
    const response=await fetch(process.env.OPENAI_BASE_URL||'https://api.openai.com/v1/chat/completions',{
      method:'POST',headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},
      body:JSON.stringify({model,temperature:0.1,response_format:{type:'json_object'},messages:[
        {role:'system',content:'You are a careful document review assistant for a Zambia business-services preparation app. Review only the provided text. Return JSON with summary (string), findings (array of concise strings), and suggestions (array of objects with original_text, proposed_text, reason). Identify missing labels/fields, internal contradictions, unclear entries and possible mismatches. Do not assert legal requirements unless explicitly present in the document. Do not infer identity. Never suggest changes to signatures, declarations or legal statements. Never invent missing facts; use placeholders for missing data. State uncertainty.'},
        {role:'user',content:`Filename: ${String(body.filename||'uploaded document').slice(0,160)}\nTask: ${String(body.task||'Review this document').slice(0,1000)}\nDocument text:\n${body.text}`}
      ]})
    });
    if(!response.ok)return res.status(502).json({error:'AI provider request failed'});
    const data=await response.json();const raw=data.choices?.[0]?.message?.content;
    if(!raw)return res.status(502).json({error:'AI provider returned no review'});
    let result;try{result=JSON.parse(raw)}catch{return res.status(502).json({error:'AI provider returned an unreadable review'})}
    return res.status(200).json({summary:String(result.summary||''),findings:Array.isArray(result.findings)?result.findings.map(x=>String(x).slice(0,1000)).slice(0,40):[],suggestions:Array.isArray(result.suggestions)?result.suggestions.filter(x=>x&&typeof x.original_text==='string'&&typeof x.proposed_text==='string').map(x=>({original_text:x.original_text.slice(0,1000),proposed_text:x.proposed_text.slice(0,1000),reason:String(x.reason||'').slice(0,500)})).slice(0,20):[]});
  }catch(e){return res.status(500).json({error:'Document review failed'});}
};