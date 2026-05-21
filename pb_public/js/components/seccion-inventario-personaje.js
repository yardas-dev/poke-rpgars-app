import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "./componente-base.js";

class SeccionInventarioPersonaje extends ComponenteBase {
  static get properties() {
    return {
      personaje: { type: Object },
    };
  }

  constructor() {
    super();
    this.personaje = {};
  }

  render() {
    let colorTitulo = `has-text-${this.personaje.color}-soft-invert`;

    return html`
      <p class="subtitle ${colorTitulo} mt-6 mb-4">Inventario</p>

      <div class="box mb-6">En desarrollo...</div>
    `;
  }
}
customElements.define(
  "seccion-inventario-personaje",
  SeccionInventarioPersonaje,
);
