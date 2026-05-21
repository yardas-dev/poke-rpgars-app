import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "./componente-base.js";

class SeccionMedallasPersonaje extends ComponenteBase {
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
      <p class="subtitle ${colorTitulo} mb-4">Estuche de medallas</p>

      <div class="box mb-6">
        ${this.personaje.medallas.map(
          (medalla) => html`
            <img
              width="64"
              class=${medalla.laTiene ? "" : "is-dimmed"}
              src=${medalla.icono}
              title=${medalla.nombre}
            />
          `,
        )}
      </div>
    `;
  }
}
customElements.define("seccion-medallas-personaje", SeccionMedallasPersonaje);
