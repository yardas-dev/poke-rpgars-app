import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";

import rutas from "./rutas.js";
import { colecciones } from "./helpers/colecciones.js";

import { ComponenteBase } from "./components/componente-base.js";
import "./components/barra-navegacion.js";

class PokeApp extends ComponenteBase {
  connectedCallback() {
    super.connectedCallback();
    colecciones.descargar();
  }

  render() {
    const rutaActual = rutas.find(
      (ruta) => ruta.nombre === window.location.pathname,
    );

    return html`
      <barra-navegacion></barra-navegacion>
      <main class="section mb-6">${rutaActual.vista}</main>
    `;
  }
}
customElements.define("poke-app", PokeApp);
