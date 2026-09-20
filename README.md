# Christopher Mokolare — Angular Portfolio

A complete portfolio for Christopher Obakeng Mokolare, built as a modern standalone **Angular + TypeScript** application. The repository is intended to represent Christopher Mokolare's personal developer brand. into a modern standalone **Angular + TypeScript** application.

## Stack

- Angular 20
- TypeScript
- SCSS
- Reactive Forms
- Responsive CSS
- GitHub Pages deployment
- Existing portfolio assets preserved under `assets/`

## Sections

- Hero / introduction
- About
- Technical skills
- Selected projects
- Services
- Contact form
- Dark / light theme
- Responsive mobile navigation
- GitHub Pages CI/CD

## Run locally

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

## Production build

```bash
npm run build
```

For GitHub Pages:

```bash
npm run build -- --base-href=/dev-folio/
```

The workflow in `.github/workflows/deploy.yml` deploys the production build when `main` changes.

## Notes

The contact form intentionally opens the visitor's email client rather than exposing a private mail API key in the browser. Replace the mail destination in `src/app/app.component.ts` if a different business inbox should receive enquiries.
