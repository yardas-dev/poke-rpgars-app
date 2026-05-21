import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "./componente-base.js";
import "./caja-informativa.js";

class SeccionLogrosPersonaje extends ComponenteBase {
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
      <p class="subtitle ${colorTitulo} mb-4">Logros</p>

      <caja-informativa
        tipo="logro"
        titulo="Logro 1"
        valor=${this.personaje.logro_1}
        .estaHecho=${this.personaje.logro_1_esta_hecho}
        margenInferior="5"
      ></caja-informativa>

      <caja-informativa
        tipo="logro"
        titulo="Logro 2"
        valor=${this.personaje.logro_2}
        .estaHecho=${this.personaje.logro_2_esta_hecho}
        margenInferior="5"
      ></caja-informativa>

      <caja-informativa
        tipo="logro"
        titulo="Logro 3"
        valor=${this.personaje.logro_3}
        .estaHecho=${this.personaje.logro_3_esta_hecho}
        margenInferior="6"
      ></caja-informativa>
    `;
  }
}
customElements.define("seccion-logros-personaje", SeccionLogrosPersonaje);
