import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "./componente-base.js";
import "./caja-informativa.js";

class SeccionGenericaAptitudesSaber extends ComponenteBase {
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
      <p class="title ${colorTitulo} is-7 is-uppercase mb-4">Saber</p>

      <div class="columns is-multiline is-desktop mb-5">
        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Fabricar"
            valor=${this.ficha.fabricar}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Conocimiento"
            valor=${this.ficha.conocimiento}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Medicina"
            valor=${this.ficha.medicina}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Ciencia"
            valor=${this.ficha.ciencia}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Minería"
            valor=${this.ficha.mineria}
          ></caja-informativa>
        </div>
      </div>
    `;
  }
}
customElements.define(
  "seccion-generica-aptitudes-saber",
  SeccionGenericaAptitudesSaber,
);
