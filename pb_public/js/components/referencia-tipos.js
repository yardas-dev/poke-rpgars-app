import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "./componente-base.js"

class ReferenciaTipos extends ComponenteBase {
    static get properties() {
        return {
            estaExpandida: { type: Boolean },
            espoilersEstanActivados: { type: Boolean },
        }
    }

    constructor() {
        super()
        this.estaExpandida = false
        this.espoilersEstanActivados = false
    }

    alternar() {
        this.estaExpandida = ! this.estaExpandida
    }

    renderizarTipo(tipo) {
        return html`
            <button class="button">
                <figure class="image is-24x24 mr-2">
                    <img
                        class="is-rounded-soft"
                        src=${tipo.icono}
                        alt="Imagen no disponible"
                    />
                </figure>
                <span>${this.mayus(tipo.nombre)}</span>
            </button>
        `
    }

    renderizarContenido() {
        return html`
            <div class="card-content">
                <div class="buttons">
                    ${
                        this.tipos.filter(
                                tipo => this.espoilersEstanActivados ||
                                    ! tipo.es_espoiler
                            ).map(
                                tipo => this.renderizarTipo(tipo)
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
                        Tipos
                    </p>
                </header>

                ${this.estaExpandida ? this.renderizarContenido() : ""}
            </div>
        `
    }
}
customElements.define("referencia-tipos", ReferenciaTipos)
