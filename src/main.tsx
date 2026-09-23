import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

/*
  Im Produktionsbau steht der Inhalt bereits im HTML (scripts/prerender.mjs).
  Dann wird hydratisiert statt neu gerendert – sonst würde React das
  vorgerenderte Markup verwerfen und der Besucher sähe kurz eine leere Seite.
  Im Entwicklungsserver ist der Knoten leer, dort greift createRoot.
*/
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
