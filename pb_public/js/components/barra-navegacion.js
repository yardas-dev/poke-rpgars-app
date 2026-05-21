import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.2/+esm"
import rutas from "../rutas.js"
import { ComponenteBase } from "./componente-base.js"

class BarraNavegacion extends ComponenteBase {
    static properties = {
        menuEstaActivo: { type: Boolean },
    }

    alternarMenu() {
        this.menuEstaActivo = ! this.menuEstaActivo
    }

    renderizarRuta(ruta) {
        let esFormatoPestana = window.innerWidth >= 1024

        let clasesAdicionales = ruta.nombre === window.location.pathname
            ? (esFormatoPestana ? "is-tab" : "has-text-white") + " is-active"
            : ""

        return html`
            <a class="navbar-item ${clasesAdicionales}" href=${ruta.nombre}>
                ${ruta.titulo}
            </a>
        `
    }

    render() {
        let claseMenuActivo = this.menuEstaActivo ? "is-active" : ""

        return html`
            <nav class="navbar">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        <figure class="image is-48x48">
                            <img
                                src="/images/portada.jpeg"
                                alt="Imagen no disponible"
                            />
                        </figure>
                        <strong class="is-size-5">
                            Poké RPGARS
                        </strong>
                    </a>

                    <a
                        role="button"
                        class="navbar-burger ${claseMenuActivo}"
                        @click=${this.alternarMenu}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div class="navbar-menu ${claseMenuActivo}">
                    <div class="navbar-start">
                        ${
                            rutas.filter(
                                    ruta => ruta.esVisible
                                ).map(
                                    ruta => this.renderizarRuta(ruta)
                                )
                        }
                    </div>
                </div>
            </nav>
        `
    }
}
customElements.define("barra-navegacion", BarraNavegacion)
