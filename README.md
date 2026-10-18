# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Bus Timer PWA

The production build includes a web app manifest, 192px and 512px icons, and a service worker for the timetable and About pages. The worker precaches both pages, their built JavaScript and CSS, the manifest, app icons, logo, and background image. The timetable and saved preferences remain available offline after the app has been opened once; the timetable is a published schedule, not live vehicle tracking. An offline notice appears when the browser reports that the device is offline.

Run and test the production PWA locally:

```sh
npm run build
npm run preview
```

Open the preview URL printed by Vite. Service worker registration is enabled for production builds; the development server does not register it. `localhost` is treated as a secure context for local testing.

For Vercel, connect the existing GitHub repository and deploy the project with the Vite defaults: build command `npm run build` and output directory `dist`. Vercel serves the site over HTTPS, which is required for service workers outside localhost. Each deployment serves the updated worker; an already-open installed app may finish using its current worker before the browser activates the new one.

On Android Chrome or supported desktop browsers, use the in-page **Install App** button when it appears, or use the browser's install option. The button is shown only when the browser provides its native installation prompt. Safari on iPhone/iPad does not expose that prompt event; use Share → Add to Home Screen instead.
