import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "./componente-base.js";
import "./caja-informativa.js";

class SeccionGenericaAptitudesSupervivencia extends ComponenteBase {
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
      <p class="title ${colorTitulo} is-7 is-uppercase mb-4">
        Supervivencia
      </p>

      <div class="columns is-multiline is-desktop mb-3">
        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Alerta"
            valor=${this.ficha.alerta}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Atletismo"
            valor=${this.ficha.atletismo}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Forraje"
            valor=${this.ficha.forraje}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Sigilo"
            valor=${this.ficha.sigilo}
          ></caja-informativa>
        </div>
      </div>
    `;
  }
}
customElements.define(
  "seccion-generica-aptitudes-supervivencia",
  SeccionGenericaAptitudesSupervivencia,
);
