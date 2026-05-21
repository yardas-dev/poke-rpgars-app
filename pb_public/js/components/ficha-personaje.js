import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm";
import { ComponenteBase } from "../components/componente-base.js";
import "./cabecera-personaje.js";
import "./caja-informativa.js";
import "./modal-editar-personaje.js";
import "./seccion-estado-personaje.js";
import "./seccion-generica-atributos.js";
import "./seccion-generica-atributos-sociales.js";
import "./seccion-generica-aptitudes-lucha.js";
import "./seccion-generica-aptitudes-supervivencia.js";
import "./seccion-generica-aptitudes-social.js";
import "./seccion-generica-aptitudes-saber.js";
import "./seccion-logros-personaje.js";
import "./seccion-medallas-personaje.js";
import "./seccion-inventario-personaje.js";

class FichaPersonaje extends ComponenteBase {
  static get properties() {
    return {
      personaje: { type: Object },
      contenidoEstaContraido: { type: Boolean },
      modalEditarEstaActiva: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.personaje = {};
    this.contenidoEstaContraido = false;
    this.modalEditarEstaActiva = false;
  }

  abrirModal() {
    this.modalEditarEstaActiva = true;
  }

  cerrarModal() {
    this.modalEditarEstaActiva = false;
  }

  alternarContenido() {
    this.contenidoEstaContraido = !this.contenidoEstaContraido;
  }

  renderizarContenido() {
    return html`
      <div class="card-content">
        <button class="button mb-5" @click=${this.abrirModal}>Editar</button>

        <seccion-estado-personaje
          .personaje=${this.personaje}
        ></seccion-estado-personaje>

        <seccion-generica-atributos
          .ficha=${this.personaje}
        ></seccion-generica-atributos>
        <seccion-generica-atributos-sociales
          .ficha=${this.personaje}
        ></seccion-generica-atributos-sociales>

        <seccion-generica-aptitudes-lucha
          .ficha=${this.personaje}
        ></seccion-generica-aptitudes-lucha>
        <seccion-generica-aptitudes-supervivencia
          .ficha=${this.personaje}
        ></seccion-generica-aptitudes-supervivencia>
        <seccion-generica-aptitudes-social
          .ficha=${this.personaje}
        ></seccion-generica-aptitudes-social>
        <seccion-generica-aptitudes-saber
          .ficha=${this.personaje}
        ></seccion-generica-aptitudes-saber>

        <seccion-logros-personaje
          .personaje=${this.personaje}
        ></seccion-logros-personaje>
        <seccion-medallas-personaje
          .personaje=${this.personaje}
        ></seccion-medallas-personaje>

        <seccion-inventario-personaje
          .personaje=${this.personaje}
        ></seccion-inventario-personaje>
      </div>
    `;
  }

  render() {
    return html`
      <div class="card has-background-dark-soft">
        <cabecera-personaje
          .personaje=${this.personaje}
          @alternar=${this.alternarContenido}
        ></cabecera-personaje>

        ${this.contenidoEstaContraido ? "" : this.renderizarContenido()}
      </div>

      <modal-editar-personaje
        .registro=${this.personaje}
        .estaActiva=${this.modalEditarEstaActiva}
        @cerrar=${this.cerrarModal}
      ></modal-editar-personaje>
    `;
  }
}
customElements.define("ficha-personaje", FichaPersonaje);
