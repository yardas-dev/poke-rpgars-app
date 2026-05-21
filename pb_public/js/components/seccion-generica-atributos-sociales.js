import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "./componente-base.js";
import "./caja-informativa.js";

class SeccionGenericaAtributosSociales extends ComponenteBase {
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
      <p class="subtitle ${colorTitulo} mb-4">Atributos sociales</p>

      <div class="columns is-multiline is-desktop mb-5">
        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Carisma"
            valor=${this.ficha.carisma}
            color="orange"
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Dureza"
            valor=${this.ficha.dureza}
            color="warning"
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Dulzura"
            valor=${this.ficha.dulzura}
            color="danger"
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Belleza"
            valor=${this.ficha.belleza}
            color="info"
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Ingenio"
            valor=${this.ficha.ingenio}
            color="success"
          ></caja-informativa>
        </div>
      </div>
    `;
  }
}
customElements.define(
  "seccion-generica-atributos-sociales",
  SeccionGenericaAtributosSociales,
);
