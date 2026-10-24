# 66MM design preview

This repository is the owner's designated destination for all future 66MM UI design steps and refinements (24 October 2026). Keep this visual prototype separate from the Telegram Bar Mini App backend implementation repository. Commit approved design updates here; business actions and role switching remain simulated.

## Photo gallery

Client Staff browsing and the Staff roster share a gallery of main profile photos. Opening a card shows the public profile, main photo and a horizontally scrolling four-photo reel. Each fictional adult has one main image and three alternative photos.

The lightbox supports left/right swipes, previous/next buttons, arrow keys, Escape, Telegram Back, a Close button and tapping outside the photo. It uses a native modal dialog for focus management and keeps margins around the enlarged photo. Selection for a Client booking remains a separate button; Staff roster browsing does not expose private Staff financial data.

All photos are AI-generated fictional adults for design testing, not actual Staff. The images and new gallery controls are available in English, Simplified Chinese, Bahasa Melayu and Vietnamese. Images are served locally from `assets/staff/` rather than a third-party image host.

## Hosting

GitHub Pages serves the static files from the root of `main`. Preserve `.nojekyll`, relative asset paths and the official Telegram SDK. No build, database or bot token is needed. Set the published HTTPS URL as the bot's Mini App URL through BotFather.

## Validation

Run `node --check app.js` and `node --check locales.js`. Browser QA should cover Client and Staff galleries, profile return paths, four locales, modal navigation/closure, narrow screens and actual Telegram Android/iOS swiping. Camera evidence remains a local preview and business operations remain simulated.
