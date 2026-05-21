import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"
import "../components/caja-informativa.js"

class ReferenciaNaturalezas extends ComponenteBase {
    static get properties() {
        return {
            coincidencia: { type: String },
            naturalezas: { type: Array },
            naturalezaElegida: { type: Object },
            hayNaturalezaAnterior: { type: Boolean },
            hayNaturalezaSiguiente: { type: Boolean },
            modalEstaActiva: { type: Boolean },
            espoilersEstanActivados: { type: Boolean },
        }
    }

    constructor() {
        super()
        this.coincidencia = ""
        this.naturalezas = []
        this.naturalezaElegida = {}
        this.hayNaturalezaAnterior = false
        this.hayNaturalezaSiguiente = false
        this.modalEstaActiva = false
        this.espoilersEstanActivados = false
    }

    filtrarNaturalezas() {
        return this.coincidencia === ""
            ? this.naturalezas
            : this.naturalezas.filter(
                    naturaleza => {
                        let coincidencia = this.normalizar(this.coincidencia)
                        let nombre = this.normalizar(naturaleza.nombre)
                        let nombre_en = this.normalizar(naturaleza.traducciones.en)

                        return nombre.includes(coincidencia) ||
                            nombre_en.includes(coincidencia)
                    }
                )
    }

    actualizarCoincidencia(evento) {
        this.coincidencia = evento.target.value
    }

    abrirModal(evento) {
        let indiceElegido = undefined
        this.naturalezaElegida = this.naturalezas.find(
            (naturaleza, indice) => {
                indiceElegido = indice
                return naturaleza.id === evento.target.getAttribute("data-id")
            }
        )
        this.hayNaturalezaAnterior = indiceElegido > 0
        this.hayNaturalezaSiguiente = indiceElegido < this.naturalezas.length - 1
        this.modalEstaActiva = true
    }

    cerrarModal() {
        this.naturalezaElegida = {}
        this.modalEstaActiva = false
    }

    elegirNaturaleza(evento) {
        console.log("eligiendo naturaleza", evento.target.getAttribute("data-tipo"))
        let indiceActual = this.naturalezas.indexOf(this.naturalezaElegida)
        let nuevoIndice = undefined

        switch (evento.target.getAttribute("data-tipo")) {
            case "anterior":
                nuevoIndice = indiceActual - 1
                break

            case "siguiente":
                nuevoIndice = indiceActual + 1
                break

            default:
                return
        }

        this.hayNaturalezaAnterior = nuevoIndice > 0
        this.hayNaturalezaSiguiente = nuevoIndice < this.naturalezas.length - 1
        this.naturalezaElegida = this.naturalezas[nuevoIndice]
    }

    renderizarEfectosAtributos() {
        return html`
            <div class="columns is-tablet">
                <div class="column">
                    <caja-informativa
                        tipo="texto"
                        titulo="Potencia"
                        valor=${
                            this.mayus(
                                this.naturalezaElegida?.atributo_potenciado?.concepto.nombre
                            )
                        }
                        color=${
                            this.naturalezaElegida?.atributo_potenciado?.color_bulma
                        }
                    ></caja-informativa>
                </div>

                <div class="column">
                    <caja-informativa
                        tipo="texto"
                        titulo="Merma"
                        valor=${
                            this.mayus(
                                this.naturalezaElegida?.atributo_mermado?.concepto.nombre
                            )
                        }
                        color=${
                            this.naturalezaElegida?.atributo_mermado?.color_bulma
                        }
                    ></caja-informativa>
                </div>
            </div>
        `
    }

    renderizarBotonAnterior() {
        return html`
            <button
                class="button"
                @click=${this.elegirNaturaleza}
                data-tipo="anterior"
            >
                ← Anterior
            </button>
        `
    }

    renderizarBotonSiguiente() {
        return html`
            <button
                class="button ml-auto"
                @click=${this.elegirNaturaleza}
                data-tipo="siguiente"
            >
                → Siguiente
            </button>
        `
    }

    render() {
        let claseModalActiva = this.modalEstaActiva ? "is-active" : ""

        return html`
            <div class="card-content">
                <div class="field">
                    <input
                        class="input"
                        placeholder="Filtrar por coincidencia"
                        .value=${this.coincidencia}
                        @input=${this.actualizarCoincidencia}
                    />
                </div>

                <p class="buttons">
                    ${
                        this.filtrarNaturalezas().map(
                            naturaleza => html`
                                <button
                                    class="
                                        button ${
                                            this.espoilersEstanActivados
                                                ? `is-${naturaleza.atributo_potenciado.color_bulma}-soft`
                                                : ''
                                        }
                                    "
                                    @click=${this.abrirModal}
                                    data-id=${naturaleza.id}
                                >
                                    ${this.mayus(naturaleza.nombre)}
                                </button>
                            `
                        )
                    }
                </p>

                <div class="modal ${claseModalActiva}">
                    <div
                        class="modal-background"
                        @click=${this.cerrarModal}
                    ></div>

                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">
                                <span>
                                    ${this.mayus(this.naturalezaElegida?.nombre)}
                                </span>
                                <br />
                                <small class="is-size-6 has-text-grey">
                                    Naturaleza
                                </small>
                            </p>
                            <button
                                class="delete is-danger"
                                @click=${this.cerrarModal}
                            ></button>
                        </header>

                        <section
                            class="modal-card-body has-background-light-soft"
                        >
                            <div class="mb-5">
                                <caja-informativa
                                    tipo="texto"
                                    titulo="Confianza"
                                    valor=${
                                        this.naturalezaElegida?.confianza_max
                                    }
                                ></caja-informativa>
                            </div>

                            <div class="mb-5">
                                <caja-informativa
                                    tipo="texto-largo"
                                    titulo="Descripción"
                                    valor=${
                                        this.naturalezaElegida?.descripcion
                                    }
                                ></caja-informativa>
                            </div>

                            ${
                                this.espoilersEstanActivados
                                    ? this.renderizarEfectosAtributos()
                                    : ""
                            }

                            <p class="subtitle mt-5 mb-3">Traducciones</p>

                            <div class="columns is-multiline is-tablet">
                                <div class="column is-half">
                                    <caja-informativa
                                        tipo="texto"
                                        titulo="Inglés"
                                        valor=${
                                            this.mayus(
                                                this.naturalezaElegida?.traducciones?.en
                                            )
                                        }
                                    ></caja-informativa>
                                </div>

                                <div class="column is-half">
                                    <caja-informativa
                                        tipo="texto"
                                        titulo="Japonés"
                                        valor=${
                                            this.mayus(
                                                this.naturalezaElegida?.traducciones?.ja
                                            )
                                        }
                                    ></caja-informativa>
                                </div>

                                <div class="column is-half">
                                    <caja-informativa
                                        tipo="texto"
                                        titulo="Japonés transliterado"
                                        valor=${
                                            this.mayus(
                                                this.naturalezaElegida?.traducciones?.ja_transliterado
                                            )
                                        }
                                    ></caja-informativa>
                                </div>

                                <div class="column is-half">
                                    <caja-informativa
                                        tipo="texto"
                                        titulo="Japonés traducido"
                                        valor=${
                                            this.mayus(
                                                this.naturalezaElegida?.traducciones?.ja_traducido
                                            )
                                        }
                                    ></caja-informativa>
                                </div>
                            </div>
                        </section>

                        <footer class="modal-card-foot">
                            ${
                                this.hayNaturalezaAnterior
                                    ? this.renderizarBotonAnterior()
                                    : ""
                            }

                            ${
                                this.hayNaturalezaSiguiente
                                    ? this.renderizarBotonSiguiente()
                                    : ""
                            }
                        </footer>
                    </div>
                </div>
            </div>
        `
    }
}
customElements.define("referencia-naturalezas", ReferenciaNaturalezas)
