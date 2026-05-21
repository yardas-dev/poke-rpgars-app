import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "./componente-base.js"
import "./lista-habilidades.js"

class ReferenciaHabilidades extends ComponenteBase {
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

                <lista-habilidades
                    .habilidades=${this.habilidades}
                    .filtro=${this.filtro}
                    .espoilersEstanActivados=${this.espoilersEstanActivados}
                ></lista-habilidades>
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
                        Habilidades
                    </p>
                </header>

                ${this.estaExpandida ? this.renderizarContenido() : ""}
            </div>
        `
    }
}
customElements.define("referencia-habilidades", ReferenciaHabilidades)
