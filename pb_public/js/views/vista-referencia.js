import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"
import "../components/alternador-espoilers.js"
import "../components/referencia-atributos.js"
import "../components/referencia-formas.js"
import "../components/referencia-habilidades.js"
import "../components/tarjeta-referencia-naturalezas.js"
import "../components/referencia-tipos.js"

class VistaReferencia extends ComponenteBase {
    static get properties() {
        return {
            espoilersEstanActivados: { type: Boolean },
        }
    }

    constructor() {
        super()
        this.espoilersEstanActivados = false
    }

    alternarEspoilers() {
        this.espoilersEstanActivados = ! this.espoilersEstanActivados
    }

    actualizarActivacionEspoilers(evento) {
        this.espoilersEstanActivados = evento.detail.valor
    }

    render() {
        return html`
            <p class="title">
                Referencia
            </p>

            <alternador-espoilers
                .estanActivados=${this.espoilersEstanActivados}
                @cambio=${this.actualizarActivacionEspoilers}
            ></alternador-espoilers>

            <div class="columns is-multiline is-tablet">
                <div class="column is-one-third-widescreen is-half-tablet">
                    <referencia-atributos></referencia-atributos>
                </div>

                ${
                    this.espoilersEstanActivados
                        ? html`
                            <div class="column is-one-third-widescreen is-half-tablet">
                                <referencia-formas
                                    .formas=${this.formas}
                                    .espoilersEstanActivados=${this.espoilersEstanActivados}
                                ></referencia-formas>
                            </div>
                            `
                        : ""
                }

                <div class="column is-one-third-widescreen is-half-tablet">
                    <referencia-habilidades
                        .espoilersEstanActivados=${this.espoilersEstanActivados}
                    ></referencia-habilidades>
                </div>

                <div class="column is-one-third-widescreen is-half-tablet">
                    <tarjeta-referencia-naturalezas
                        .espoilersEstanActivados=${this.espoilersEstanActivados}
                    ></tarjeta-referencia-naturalezas>
                </div>

                <div class="column is-one-third-widescreen is-half-tablet">
                    <referencia-tipos
                        .espoilersEstanActivados=${this.espoilersEstanActivados}
                    ></referencia-tipos>
                </div>
            </div>
        `
    }
}
customElements.define("vista-referencia", VistaReferencia)
