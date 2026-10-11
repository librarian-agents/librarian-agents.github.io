# Librarian Agents Project Page

Static project page for **Librarian Agents: Training LLMs to Curate Workspaces that Anticipate Future Queries**.

## Local preview

From this directory, run `python3 -m http.server 8000` and open `http://localhost:8000`.
Use another port if 8000 is already in use. No build step is required.

## Paper and figures

- `static/pdfs/librarian-agents.pdf` is an unchanged copy of the supplied `Librarian_Agents__Arxiv_.pdf`, used as the paper download for now.
- `static/pdfs/librarian-agents-slides.pdf` is an unchanged copy of the supplied `Talk_Librarian_Agents.pdf`, linked from the Slides button.
- The title, author list, abstract, results, and training description match the current LaTeX project.
- Figures come from the current LaTeX project's `figures/` directory. PDF figures are rendered as PNGs;
  original full-size images are kept in `static/images/`.
- The dense reward signal animation is the unchanged GIF embedded in slide 10 of the supplied talk. Its complete final view supplies the paused and printed still image.
- BRIGHT tables report pass@1 and unbiased pass@3 estimated from four sampled answers, with the manuscript's reported uncertainties.
- The appendix's nine additional BRIGHT domains, filesystem-structure ablation, and workspace statistics are included.
- Reuse plots show raw token costs alongside tokens per expected correct answer.
- The observed reuse evaluation has 443 questions across 50 corpora with 7–10 questions per corpus; the 20-query cost is a projection.

The paper download and research-code URL supplied in the LaTeX project are linked. Add a public arXiv URL when available.

## Page flow

The full abstract is visible directly below the paper header. The body follows the talk's progression:
repeated search, anticipatory curation, learned edits, BrowseComp+ accuracy, construction and reuse,
zero-shot BRIGHT transfer, then organization and source-recovery examples. Short takeaways accompany
the figures; expandable sections retain full numerical results, evaluation protocols, and training settings.
The minimal typography and spacing take inspiration from the Meta-Harness project page.
Headings, method descriptions, and captions use the manuscript's terminology and academic register.

## Animated figures

The overview, builder, dense reward signal, recovery through reference links, and RL/base comparison have looping GIFs in
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
