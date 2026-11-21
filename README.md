# AMAKA AI Zambia V1.2

Mobile-first, local-first government-services preparation and business-assistance app, upgraded from the supplied V1.1 project.

## What's included

- Existing AMAKA black/gold identity, chat, speech synthesis, browser speech recognition, and Capacitor configuration.
- Conversational PACRA preparation journey for private companies, companies limited by guarantee, and business names.
- ZRA preparation journey for individuals, sole traders/business names, and companies (including the post-2020 PACRA credential guidance).
- Business Starter Pack: seven editable documents (business plan, profile, startup budget, cash-flow estimate, pricing worksheet, quotation, invoice, launch checklist).
- IndexedDB document library with open/edit/save, status, duplicate, delete, PDF print/export, and DOCX export.
- PDF text extraction and in-app page preview; DOCX text extraction and readable text view; TXT extraction.
- Consent gate, 15 MB limit, scanned-PDF detection, unsupported file warnings.
- Local rule-based checks, explicitly labelled as not AI.
- Optional secure Vercel AI review endpoint using an OpenAI-compatible provider, with suggestions requiring user approval.
- GitHub Pages and Android APK GitHub Actions workflows.

## Important scope and transparency

This is a preparation assistant. It does not submit PACRA or ZRA applications, issue TPINs, verify identity, approve registration, or sign declarations.

PACRA's current official Forms & Fees page is dynamic. The verified current source for Companies Form 3 is:
https://pacra.org.zm/fees-and-forms
Open that catalogue and select **Companies Form 3 – Application for Incorporation** to download the current official PDF. This project deliberately does not guess a changing PDF asset URL or bundle an outdated copy.

PACRA's official Business Name Form III source guidance:
https://info.pacra.org.zm/what-is-a-business-name/
The guidance confirms that Business Name Form III is the application and directs users to the PACRA forms catalogue for the current form.

**Known limitations requiring future work before production filing use:**
- The app prepares an editable information draft; it does not overlay user data into the official PACRA PDF while preserving every original form field/layout. It does not detect or populate AcroForm fields. Users must transfer verified details to the official form and sign it themselves.
- Scanned PDFs are detected but OCR is not bundled. Upload a text-readable PDF or DOCX instead.
- PDF preview uses PDF.js and shows pages with page navigation. DOCX is extracted to a readable/editable text representation; complex DOCX layout, tables, headers, footers and pagination may not be preserved in the text editor.
- PDF export uses the browser print dialog. Choose **Save as PDF** on Android/desktop. DOCX export creates a basic editable Word document; advanced layout and table fidelity are not guaranteed.
- AI review suggestions are only available when the Vercel backend is configured. They are advisory, do not establish legal compliance, and are never applied automatically. The current review endpoint sends extracted document text to the configured model provider after the user selects the cloud review action.
- Local files remain on the current browser/device and are not automatically backed up or synchronized. Clearing browser site data can remove them.
- IndexedDB browser storage availability/quota depends on the device and browser. Export important documents regularly.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm test
npm run build
```

Serve the `www` directory using any static web server, for example:

```bash
npx http-server www
```

Open the displayed localhost URL. Do not open `index.html` as a `file://` URL because browser storage, service workers, and some document libraries require a web origin.

## GitHub upload and Pages deployment

1. Create or open your existing GitHub repository.
2. Extract this project ZIP and upload/commit the contents to the repository root (including `.github`, `api`, `www`, `package.json`, `capacitor.config.json`, and `vercel.json`).
3. Ensure the default branch is `main`.
4. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the build/deployment source.
5. Push to `main`. The workflow runs `npm test` and publishes the actual `www` directory.
6. Open the Pages URL shown in the Actions deployment.

The frontend uses relative asset paths so it can run from a GitHub Pages project subpath.

## Vercel backend deployment

1. Import the same GitHub repository into Vercel.
2. Keep the included `api/review.js` and `vercel.json`.
3. In Vercel project settings, add environment variables:

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | Secret provider key; never put this in frontend code |
| `OPENAI_MODEL` | Model name, e.g. `gpt-4o-mini` |
| `OPENAI_BASE_URL` | Optional OpenAI-compatible chat-completions endpoint; defaults to OpenAI |
| `ALLOWED_ORIGINS` | Comma-separated allowed browser origins; include the GitHub Pages origin and any trusted web origin |

4. Redeploy after setting variables.
5. In the deployed frontend, configure the API base URL before use. Easiest production configuration: set `window.AMAKA_API_BASE` to your Vercel deployment origin in a small `www/config.js` file and include `<script src="config.js"></script>` before `app.js` in `index.html`. Example:

```js
window.AMAKA_API_BASE = "https://YOUR-VERCEL-PROJECT.vercel.app";
```

Do not place provider keys in `config.js`; only the public backend origin belongs there. Add `config.js` to `.gitignore` if you maintain separate deployment-specific configuration, and inject it through your deployment pipeline. The app remains usable without this setting, but only local rule-based checks will be available.

The API limits extracted text to 120,000 characters, returns generic errors, and does not log document text. Configure provider retention/privacy controls appropriate to your users and jurisdiction before production use.

## Android APK

The included workflow builds a debug APK:

1. Push project to GitHub `main`.
2. Open **Actions → Build Android APK → Run workflow** (or let a push trigger it).
3. Wait for the job to finish.
4. Download the `amaka-ai-v1.2-debug-apk` artifact from the workflow run.
5. Install the APK on a test Android phone (allow installation from the browser/files app if Android asks).

The workflow creates the Capacitor Android platform in CI, syncs the `www` assets and runs `assembleDebug`. For a Play Store release, configure signing credentials and build a signed release bundle separately.

For local Android development:

```bash
npm install
npx cap add android
npx cap sync android
npx cap open android
```

Android Studio and Android SDK are required for local APK builds.

## Privacy and document handling

- Uploaded content is extracted locally in the browser first.
- A checkbox consent is required before processing a selected file.
- Local checks never send document content to the backend.
- Cloud review is a separate user action and transmits extracted text to the configured API/model provider.
- No identity verification, official submission, or government approval is performed.
- Delete documents from the library to remove the IndexedDB record. For sensitive files, also clear downloads and device/browser backups as appropriate.

## Official references checked 21 November 2026

- PACRA forms and fees: https://pacra.org.zm/fees-and-forms
- PACRA local company guidance: https://info.pacra.org.zm/what-is-a-local-company/
- PACRA business name guidance: https://info.pacra.org.zm/what-is-a-business-name/
- ZRA business registration requirements: https://www.zra.org.zm/business-registration-requirements/
- ZRA FAQ: https://www.zra.org.zm/faq/

ZRA's live business-registration page states that businesses registered through PACRA after 2020 receive TPIN generation after PACRA registration and should check their email credentials and complete tax-type registration in the ZRA account where required.
