# Changelog — AMAKA AI V1.2

## Upgraded from supplied V1.1 archive

### Added
- Dedicated Services, Document Library and Document Workspace navigation.
- IndexedDB persistence for local documents, statuses, creation/modified dates, duplicate and delete actions.
- Editable text document workspace with save, undo/redo, PDF print/export and basic DOCX export.
- PDF text extraction and PDF.js page-by-page original preview.
- DOCX extraction using Mammoth; TXT support; file size and extension validation; scanned PDF warning.
- Consent checkbox before document processing and explicit opt-in before cloud AI review.
- Rule-based review report with transparent non-AI labelling.
- Vercel serverless AI review endpoint using environment-configured OpenAI-compatible provider; suggestions are individually accepted/rejected and never automatically applied.
- PACRA company and Business Name Form III preparation journeys and official-source links.
- ZRA TPIN journeys for individuals, sole traders/business names, PACRA post-2020 companies and pre-2020 companies.
- Seven-document Business Starter Pack with editable documents and user-input-based financial estimates.
- GitHub Pages deployment workflow, Android APK workflow, environment example, Vercel configuration and deployment guide.

### Preserved
- AMAKA AI black/gold visual identity and original CSS foundation.
- Existing `www` frontend layout approach.
- Chat and quick-service prompt experience.
- Speech recognition input where browser support exists.
- Speech synthesis output where supported.
- Capacitor Android app identity and web asset directory.

### Accuracy and safety
- No PACRA/ZRA fee amounts are hardcoded in the new workflows.
- Current Companies Form 3 source is linked through PACRA's official dynamic Forms & Fees catalogue.
- Business Name Form III links to PACRA's official business-name guidance, which directs applicants to the current catalogue.
- No government submission, TPIN issuance, identity verification or approval is claimed.
- Local rule checks are not described as AI.
- Provider credentials remain backend-only.

### Known limitations
- No official PACRA PDF overlay/population or AcroForm filling; the workspace is an editable preparation draft.
- No OCR for scanned PDFs.
- Complex DOCX formatting and table fidelity are not retained by text extraction/export.
- PDF export uses browser print-to-PDF.
- AI document review requires deployment/configuration of Vercel backend and provider credentials.
- Local documents are device/browser-specific and not cloud-synchronized.

See README.md for setup, deployment and operational details.
