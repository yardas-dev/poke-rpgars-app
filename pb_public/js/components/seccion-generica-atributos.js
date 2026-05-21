import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "./componente-base.js";
import "./caja-informativa.js";

class SeccionGenericaAtributos extends ComponenteBase {
  static get properties() {
    return {
      ficha: { type: Object },
    };
  }

  constructor() {
    super();
    this.ficha = {};
  }

  renderizarEspecial() {
    return html`
      <div class="column is-half-desktop">
        <caja-informativa
          tipo="puntos"
          titulo="Especial"
          valor=${this.ficha.especial}
        ></caja-informativa>
      </div>
    `;
  }

  render() {
    let colorFicha = this.ficha.color ?? "white";
    let colorTitulo = `has-text-${colorFicha}-soft-invert`;

    return html`
      <p class="subtitle ${colorTitulo} mb-4">Atributos</p>

      <div class="columns is-multiline is-desktop mb-5">
        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Fuerza"
            valor=${this.ficha.fuerza}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Vitalidad"
            valor=${this.ficha.vitalidad}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Destreza"
            valor=${this.ficha.destreza}
          ></caja-informativa>
        </div>

        ${this.ficha.especial ? this.renderizarEspecial() : ""}

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="puntos"
            titulo="Intuición"
            valor=${this.ficha.intuicion}
          ></caja-informativa>
        </div>
      </div>
    `;
  }
}
customElements.define("seccion-generica-atributos", SeccionGenericaAtributos);
