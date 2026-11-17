# QuantileGS project website

QuantileGS: Quantile-Based Conformal Bounds on RGB Rendering Errors for Novel View Synthesis with 3D Gaussian Splatting

- Website: https://quantilegs.github.io/
- Paper: https://arxiv.org/abs/2611.21253
- Research code: https://github.com/Lab-PANbin/QuantileGS

## Local preview

Run `python -m http.server 8765 --bind 127.0.0.1` in this directory,
then open http://127.0.0.1:8765/. No build or npm installation is required.

## Editing

- `index.html`: paper title, authors, abstract, results and BibTeX.
- `static/js/site-config.js`: paper and research-code links.
- `static/css/quantilegs.css`: responsive page styles.
- `static/images/`, `static/pdfs/`, `static/videos/`: displayed research figures and video.

## Deployment

GitHub Pages serves the root of the `main` branch in
`quantilegs/quantilegs.github.io`. The `.nojekyll` file enables static serving.
Local asset-generation scripts, provenance records and draft manuscript PDFs
are excluded from the website release.

## Acknowledgments

Adapted from the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template)
and [Nerfies](https://nerfies.github.io/). Attribution is retained in `NOTICE.md`.
