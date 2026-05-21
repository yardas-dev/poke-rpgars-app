import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { colecciones } from "../helpers/colecciones.js"
import { ComponenteBase } from "../components/componente-base.js"

class ReferenciaAtributos extends ComponenteBase {
    static get properties() {
        return {
            atributos: { type: Array },
            estaExpandida: { type: Boolean },
        }
    }

    constructor() {
        super()
        this.atributos = []
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
        this.atributos = colecciones.atributos
    }

    alternar() {
        this.estaExpandida = ! this.estaExpandida
    }

    renderizarAtributo(atributo) {
        return html`
            <tr class="is-${atributo.color_bulma}-soft">
                <th>
                    ${this.mayus(atributo.concepto.nombre)}
                </th>
                <td>
                    ${this.mayus(atributo.cualidad.nombre)}
                </td>
                <td>
                    ${this.mayus(atributo.caracteristica.nombre)}
                </td>
                <td>
                    ${this.mayus(atributo.sabor.nombre)}
                </td>
            </tr>
        `
    }

    renderizarContenido() {
        return html`
            <div class="card-content">
                <div class="table-container">
                    <table class="table is-narrow is-fullwidth is-rounded">
                        <thead>
                            <tr>
                                <th>Atributo</th>
                                <th>Atributo social</th>
                                <th>Característica</th>
                                <th>Sabor</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${
                                this.atributos.map(
                                    atributo => this.renderizarAtributo(
                                        atributo
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
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
                        Atributos
                    </p>
                </header>

                ${
                    this.estaExpandida
                        ? this.renderizarContenido()
                        : ""
                }
            </div>
        `
    }
}
customElements.define("referencia-atributos", ReferenciaAtributos)
