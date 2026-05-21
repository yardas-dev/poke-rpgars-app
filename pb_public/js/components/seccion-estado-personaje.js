import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "./componente-base.js";
import "./caja-informativa-rango.js";

class SeccionEstadoPersonaje extends ComponenteBase {
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
    return html`
      <div class="columns is-multiline is-desktop mb-5">
        <div class="column is-half-desktop">
          <caja-informativa-rango
            .rango=${this.personaje.rango}
          ></caja-informativa-rango>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="progreso"
            titulo="Salud"
            actual=${this.personaje.saludActual}
            max=${this.personaje.saludMax}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="progreso"
            titulo="Confianza"
            actual=${this.personaje.confianzaActual}
            max=${this.personaje.confianzaMax}
          ></caja-informativa>
        </div>

        <div class="column is-half-desktop">
          <caja-informativa
            tipo="progreso"
            titulo="Voluntad"
            actual=${this.personaje.voluntadActual}
            max=${this.personaje.voluntadMax}
          ></caja-informativa>
        </div>
      </div>
    `;
  }
}
customElements.define("seccion-estado-personaje", SeccionEstadoPersonaje);
