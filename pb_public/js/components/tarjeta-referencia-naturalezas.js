import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { colecciones } from "../helpers/colecciones.js"
import { ComponenteBase } from "./componente-base.js"
import "./referencia-naturalezas.js"

class TarjetaReferenciaNaturalezas extends ComponenteBase {
    static get properties() {
        return {
            naturalezas: { type: Array },
            estaExpandida: { type: Boolean },
        }
    }

    constructor() {
        super()
        this.naturalezas = []
        this.estaExpandida = false
    }

    connectedCallback() {
        super.connectedCallback()
        colecciones.addEventListener("descargadas", this.llamarTrasDescargar)
    }

    disconnectedCallback() {
        colecciones.removeEventListener("descargadas", this.llamarTrasDescargar)
        super.disconnectedCallback()
    }

    llamarTrasDescargar = () => {
        this.naturalezas = colecciones.naturalezas
    }

    alternar() {
        this.estaExpandida = ! this.estaExpandida
    }

    renderizar() {
        return html`
            <referencia-naturalezas
                .naturalezas=${this.naturalezas}
            ></referencia-naturalezas>
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
                        Naturalezas
                    </p>
                </header>

                ${
                    this.estaExpandida
                        ? this.renderizar()
                        : ""
                }
            </div>
        `
    }
}
customElements.define("tarjeta-referencia-naturalezas", TarjetaReferenciaNaturalezas)
