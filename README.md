# AMAKA AI – Zambia Government Services Prototype V1

A voice-first, Android-friendly web prototype for PACRA and ZRA service guidance.

## Included
- Responsive mobile-first interface
- Browser speech recognition (best tested in Chrome on Android, served over HTTPS)
- Spoken responses using device text-to-speech
- PACRA company-registration preparation form
- ZRA TPIN preparation form
- ZRA tax-obligations discussion form
- Downloadable draft summaries
- PWA manifest and service worker
- GitHub Actions workflow to build a debug APK using Capacitor

## Important boundaries
This is a demonstration only. It is not PACRA, ZRA, or a government-authorised system. It does not submit applications, issue TPINs, verify identities, quote live statutory fees, or process payments. All "submit" actions are explicitly simulated. Do not enter sensitive identity or financial information into a public demo. Before production, obtain permission and use official APIs or approved integrations, secure authentication, privacy controls, audit logs, and human approval for declarations and payments.

## Test on your phone
1. Upload the contents of this ZIP to a new GitHub repository.
2. Enable GitHub Pages: Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
3. Open the published HTTPS URL in Chrome on Android.
4. Allow microphone permission. Tap "Tap to speak".
5. Use the top PACRA/ZRA cards or the suggested prompts.

Speech recognition depends on browser/device support and internet connectivity. Text input is included as a fallback. The voice feature is most reliable in Chrome on Android.

## Build an APK from GitHub on your phone
1. Upload all files including `.github/workflows/build-apk.yml`.
2. In GitHub, open Actions and run **Build Android APK** (or push to main).
3. Wait for the workflow to finish.
4. Open the completed workflow run and download the `amaka-ai-debug-apk` artifact.
5. Extract the artifact ZIP and install the APK on your Android phone. You may need to allow installation from your browser/files app.

The workflow creates a Capacitor Android wrapper and builds a debug APK. A debug APK is for testing/presentation, not Play Store release.

## Local web preview
Open `www/index.html` with a local web server. Microphone APIs may not work from a `file://` URL; use HTTPS hosting.

## Project structure
- `www/` – app UI, styles, logic, PWA assets
- `package.json` and `capacitor.config.json` – Android wrapper configuration
- `.github/workflows/build-apk.yml` – cloud APK build

## Researched service facts included in the demo
- PACRA local-company service guidance: https://info.pacra.org.zm/what-is-a-local-company/
- PACRA live forms and fees catalogue: https://pacra.org.zm/fees-and-forms
- ZRA business registration requirements: https://www.zra.org.zm/business-registration-requirements/
- ZRA FAQ: https://www.zra.org.zm/faq/

The app avoids hardcoding a PACRA fee because official information pages can differ and the live catalogue is the best place to confirm the current charge. The ZRA TPIN journey distinguishes companies registered through PACRA after 2020 from individuals and other taxpayer categories.
