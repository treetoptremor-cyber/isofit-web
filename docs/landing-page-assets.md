# Landing-page screenshot assets

The three user-supplied screenshots are preserved byte for byte:

- `public/screenshots/body-graph.png` — attachment `1.PNG`.
- `public/screenshots/history.png` — attachment `2.PNG`.
- `public/screenshots/atlas.png` — attachment `3.PNG`.

Each source screenshot is 1206 × 2622. The landing carousel these were first made for was removed in the September 2026 site rebuild; the screenshots are now shown statically in phone frames and as enlarged crops, still at their original aspect ratio. Next.js handles delivery-size optimization.

`public/mockups/iphone-frame.png` is a separate transparent device overlay generated with the built-in image-generation tool. It contains no app content. It is a custom mockup, not an official Apple product asset. The official Apple download was not used. The overlay's display proportions and screen coordinates in `globals.css` are calibrated to its transparent opening so the app screenshots retain their original proportions.

## Final generation prompt

Use case: product-mockup. Create one reusable empty upright iPhone-style device frame for a professional iOS app landing page. Portrait transparent PNG 1024 by 2304 pixels. Camera perfectly straight on, orthographic, no perspective or tilt. Dark graphite metal rim with subtle polished highlights and very slim black inner bezels, realistically rounded corners, subtle side buttons. A tiny black Dynamic Island capsule at the top center of the screen. Entire screen area must be genuinely alpha-transparent, as must all background outside the frame, not white or a checkerboard. Screen opening centered with aspect ratio exactly 1206:2622 (width:height); its bounds as close as possible to x=55 to969, y=159 to2145 on the1024x2304 canvas. Outer frame close to x=30 to994,y=134 to2170. Small margin only. This is a compositing bezel overlay: it must contain NO screenshot, NO UI, NO wallpaper, NO words, NO numbers, NO watermark, NO logo, NO floor or background. Preserve smooth true alpha edges. No screen reflections because actual app screenshots will be placed below the transparent opening using HTML.

The generated PNG is 836 × 1881. The displayed frame is calibrated around its actual opening rather than the requested generation coordinates.
