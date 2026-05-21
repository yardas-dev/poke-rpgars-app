import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "./componente-base.js";
import "./caja-informativa.js";

class SeccionGenericaAptitudesSocial extends ComponenteBase {
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
      <p class="title ${colorTitulo} is-7 is-uppercase mb-4">Social</p>

      <div class="columns is-multiline is-desktop mb-3">
        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Atractivo"
            valor=${this.ficha.atractivo}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Etiqueta"
            valor=${this.ficha.etiqueta}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Empatía"
            valor=${this.ficha.empatia}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Intimidar"
            valor=${this.ficha.intimidar}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Actuar"
            valor=${this.ficha.actuar}
          ></caja-informativa>
        </div>
      </div>
    `;
  }
}
customElements.define(
  "seccion-generica-aptitudes-social",
  SeccionGenericaAptitudesSocial,
);
