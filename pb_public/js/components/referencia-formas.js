import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "./componente-base.js"

class ReferenciaFormas extends ComponenteBase {
    static get properties() {
        return {
            estaExpandida: { type: Boolean },
            espoilersEstanActivados: { type: Boolean },
            filtro: { type: String },
        }
    }

    constructor() {
        super()
        this.estaExpandida = false
        this.espoilersEstanActivados = false
        this.filtro = ""
    }

    alternar() {
        this.estaExpandida = ! this.estaExpandida
    }

    actualizarFiltro(evento) {
        this.filtro = evento.target.value
    }

    filtrar(forma) {
        let sePuedeMostrar = this.espoilersEstanActivados || ! forma.es_espoiler

        if (this.filtro === "") {
            return sePuedeMostrar
        } else {
            let coincidencia = this.normalizar(this.filtro)
            let nombre = this.normalizar(forma.nombre)

            return sePuedeMostrar && nombre.includes(coincidencia)
        }
    }

    renderizarForma(forma) {
        let clasesAdicionales = forma.tipo_contenido === "delicado"
            ? "is-warning"
            : ""

        return html`
            <button class="button ${clasesAdicionales}">
                <figure class="image is-24x24 mr-2">
                    <img
                        class="is-rounded-soft"
                        src=${forma.icono}
                        alt="Imagen no disponible"
                    />
                </figure>
                <span>${this.mayus(forma.nombre)}</span>
            </button>
        `
    }

    renderizarContenido() {
        return html`
            <div class="card-content">
                <div class="field">
                    <input
                        class="input"
                        placeholder="Filtrar por coincidencia"
                        .value=${this.filtro}
                        @input=${this.actualizarFiltro}
                    />
                </div>

                <div class="buttons">
                    ${
                        this.formas.filter(
                                forma => this.filtrar(forma)
                            ).map(
                                forma => this.renderizarForma(forma)
                            )
                    }
                </div>

                <!-- <modal-ver-tipo
                    .tipoElegido=${this.tipoElegido}
                    .estaActiva=${this.modalEstaActiva}
                    .espoilersEstanActivados=${this.espoilersEstanActivados}
                    @cierre=${this.cerrarModal}
                ></modal-ver-habilidad> -->
            </div>
        `
    }

    render() {
        return html`
            <div class="card has-background-light-soft">
                <header
                    class="card-header has-background-white-soft is-clickable is-unselectable"
                    @click=${this.alternar}
                >
                    <p class="card-header-title">
                        Formas
                    </p>
                </header>

                ${this.estaExpandida ? this.renderizarContenido() : ""}
            </div>
        `
    }
}
customElements.define("referencia-formas", ReferenciaFormas)
