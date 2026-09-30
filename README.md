# Librarian Agents Project Page

Static project page for **Librarian Agents: Anticipatory Filesystem Construction via Reinforcement Learning**.

## Local preview

From this directory, run `python3 -m http.server 8000` and open `http://localhost:8000`.
Use another port if 8000 is already in use. No build step is required.

## Paper and figures

- `static/pdfs/librarian-agents.pdf` is the supplied compiled arXiv manuscript.
- The author list, abstract, results, and training description match that manuscript.
- Figures come from the current LaTeX project's `figures/` directory. PDF figures are rendered as PNGs;
  original full-size images are kept in `static/images/`.
- BRIGHT tables distinguish mean per-response accuracy (pass@1) from success across four sampled answers (pass@4).
- Reuse plots show raw token costs alongside tokens per expected correct answer.

Only the supplied paper download is linked; add public arXiv and research-code URLs when available.

## Animated figures

The overview, builder, provenance recovery, and RL/base comparison have looping GIFs in
`static/animations/`. Soft reveals and small motion cues follow the original diagrams, with
20 fps during transitions and longer holds for reading. The complete figure remains visible
at the end of each loop before a gentle reset.

GIFs load as their figures enter the viewport. Each figure has a **Pause / Play** button and a small
download icon at the top right, revealed on hover or keyboard focus (always visible on touchscreens).
Pausing shows the complete figure. Playback also returns to the original artwork when the figure
leaves the viewport or the tab is hidden. Reduced-motion users start with the original artwork and
can explicitly choose to play. Without JavaScript and when printing, the original artwork is shown.

Figure sources and controls are in `index.html`, styles in `static/css/figure-animations.css`, and
viewport/reduced-motion behavior in `static/js/figure-animations.js`. No build step is required.
