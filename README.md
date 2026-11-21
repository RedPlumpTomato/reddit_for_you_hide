# Hide Reddit "For You"

A tiny browser extension for Brave (and other Chromium browsers such as Chrome and Edge) that:

- hides the **For You** tab on the Reddit home feed
- switches the home feed to **Following** automatically (once per visit to the home page, so you can still pick another feed afterwards)

## Install (Brave)

1. Clone or download this repo.
2. Open `brave://extensions`.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select this folder.
5. Reload reddit.com.

For Chrome use `chrome://extensions`, for Edge `edge://extensions`.

## Notes

- Following only shows posts from communities you've joined or users you follow. If it's empty, join some communities.
- Matching is based on the visible text "For You" / "Following", so it survives most Reddit markup changes. If Reddit renames those labels, update the `FOR_YOU` and `FOLLOWING` patterns at the top of `content.js`.
- After editing the code, click the reload icon on the extension card in `brave://extensions` and refresh the Reddit tab.
- The extension is English-only (it matches the English labels).

## Files

- `manifest.json` – Manifest V3 extension definition (runs on reddit.com).
- `content.js` – finds the tabs by text, hides "For You", clicks "Following".
