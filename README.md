# Collection Gallery — v0.1.4

Standalone, dependency-free responsive three-image collection card gallery.

## Features
- 12 collection cards (4 × 3 on desktop, 2 columns on tablet, 1 on mobile)
- 12 local pastel landscape SVG illustrations in varied scenes (coast, dunes, mountains, forest, lake, valley)
- 17 English topic tags with independent left/right scroll buttons and native swipe support
- Scoped `section#s01`, no third-party libraries
- Native CSS Grid + Flexbox, image aspect ratio 10:7
- English titles and varied curator descriptions

## Files
```
index.html
assets/css/style.css
assets/js/main.js
assets/images/scene-01.svg ... scene-12.svg
```

Open `index.html` in Chrome or any modern browser. No network or build step required.

## Customization
Replace each local `scene-NN.svg` with your image asset and update its references in `index.html`. Keep a unique section ID for every instance placed on the same page; all CSS selectors start with `#s01`.

## Notes
The topic chips are a scrolling **navigation demonstration**; all currently point to the gallery section. The card link opens the corresponding local main image in a new tab. This demo does not provide filtering or image-detail pages.
