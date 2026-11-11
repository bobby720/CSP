# AgriRent (frontend-only prototype)
Agricultural equipment rental marketplace demo. React + Vite + Tailwind + React Router + Lucide. No backend, no API keys.

## Run
```
npm install
npm run dev      # http://localhost:5173
npm run build
```
## Notes
- All listings, owners, distances and bookings are illustrative sample data (src/data.js). Distances are fixed sample values relative to Gudivada / Vijayawada / Machilipatnam, not computed from real coordinates.
- "Use My Location" uses the browser Geolocation API only to pick the nearest sample area; failures are shown and manual selection always works.
- State persists in localStorage. Use "Reset demo data" in the footer to restore it.
- Listings have no photos by default (icon placeholders); owners can upload an image or paste a URL.
- Includes saved equipment, list/map toggle (illustrative SVG map), availability calendar with conflict blocking, owner earnings, mark-completed and CSV export.
- Also: compare up to 3 listings, similar-equipment suggestions, listing view counts, recent searches, editable renter profile.
- Not included: real Leaflet map, real auth, payments.
