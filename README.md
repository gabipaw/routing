# Katalog projektów (routing) — Gabriel Pawłowski

Wielostronicowa aplikacja z routingiem po stronie klienta, zbudowana w ramach zadania stażowego (StażystApp).

## Widoki
- **Lista** projektów (`#/`)
- **Szczegóły** projektu po ID w adresie URL (`#/items/3`)
- **404** dla nieistniejącej trasy lub nieistniejącego ID

## Funkcje
- **React Router** (`HashRouter`) — działa na GitHub Pages z deep-linkami
- Szczegóły powiązane przez **ID w URL**
- Działające przyciski **wstecz / naprzód** przeglądarki
- Wspólny układ (nagłówek + nawigacja) na każdej stronie

## Stack
React 18 + React Router 6 ładowane z CDN (esm.sh) przez import map — **bez build-stepa**. Wdrożone na **GitHub Pages**.

## Testy e2e (Playwright)
Pokrywają: render listy, nawigację do szczegółów (ID w URL), deep-link po ID, przyciski wstecz/naprzód oraz 404 (zła trasa i nieistniejące ID).

> Uwaga: aplikacja ładuje biblioteki z CDN, więc testy wymagają dostępu do sieci.

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

## Uruchomienie lokalnie
`npm run serve` → http://127.0.0.1:4173 (otwarcie pliku bezpośrednio `file://` nie zadziała z import map — użyj serwera).
