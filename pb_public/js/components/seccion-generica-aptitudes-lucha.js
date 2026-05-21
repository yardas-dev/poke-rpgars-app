import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "./componente-base.js";
import "./caja-informativa.js";

class SeccionGenericaAptitudesLucha extends ComponenteBase {
  static get properties() {
    return {
      ficha: { type: Object },
    };
  }

  constructor() {
    super();
    this.ficha = {};
  }

  render() {
    let colorFicha = this.ficha.color ?? "white";
    let colorTitulo = `has-text-${colorFicha}-soft-invert`;

    return html`
      <p class="subtitle ${colorTitulo} mb-4">Aptitudes</p>

      <p class="title ${colorTitulo} is-7 is-uppercase mb-4">Lucha</p>

      <div class="columns is-multiline is-desktop mb-3">
        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Pelea"
            valor=${this.ficha.pelea}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Lanzamiento"
            valor=${this.ficha.lanzamiento}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Evasión"
            valor=${this.ficha.evasion}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Armas"
            valor=${this.ficha.armas}
          ></caja-informativa>
        </div>
      </div>
    `;
  }
}
customElements.define(
  "seccion-generica-aptitudes-lucha",
  SeccionGenericaAptitudesLucha,
);
