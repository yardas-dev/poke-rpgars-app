import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"

class ModalVerHabilidad extends ComponenteBase {
    static get properties() {
        return {
            habilidadElegida: { type: Object },
            estaActiva: { type: Boolean },
            espoilersEstanActivados: { type: Boolean },
        }
    }

    constructor() {
        super()
        this.habilidadElegida = {}
        this.estaActiva = false
        this.espoilersEstanActivados = false
    }

    cerrar() {
        this.dispatchEvent(
            new CustomEvent("cierre", { bubbles: true, composed: true })
        )
    }

    renderizarForma(forma) {
        return html`
            <div class="column">
                <figure class="image is-32x32 mb-5">
                    <img src=${forma.icono} alt="Imagen no disponible" />
                    <figcaption>
                        <small>${this.mayus(forma.nombre)}</small>
                    </figcaption>
                </figure>
            </div>
        `
    }

    renderizarFormas(tipo) {
        let titulo = undefined

        switch (tipo) {
            case "unitaria":
                titulo = "Tienen la habilidad"
                break
            
            case "doble":
                titulo = "Pueden tener la habilidad"
                break

            case "oculta":
                titulo = "La habilidad está oculta"
                break

            default:
                return
        }

        return html`
            <div class="box mb-5">
                <p class="title is-5">
                    ${titulo}
                </p>

                <div class="columns is-multiline is-mobile">
                    ${
                        this.habilidadElegida["formas_" + tipo].map(
                            forma => this.renderizarForma(forma)
                        )
                    }
                </div>
            </div>
        `
    }

    renderizarTitulo() {
        return html`
            <p class="subtitle mb-3">
                Formas
            </p>
        `
    }

    renderizarSeccionFormas() {
        let hayFormasUnitaria,
            hayFormasDoble,
            hayFormasOculta,
            hayFormas = false

        if (Object.keys(this.habilidadElegida).length > 0) {
            hayFormasUnitaria = this.habilidadElegida.formas_unitaria.length > 0
            hayFormasDoble = this.habilidadElegida.formas_doble.length > 0
            hayFormasOculta = this.habilidadElegida.formas_oculta.length > 0
            hayFormas = hayFormasUnitaria || hayFormasDoble || hayFormasOculta
        }

        return html`
            ${hayFormas ? this.renderizarTitulo() : ""}
            ${hayFormasUnitaria ? this.renderizarFormas("unitaria") : ""}
            ${hayFormasDoble ? this.renderizarFormas("doble") : ""}
            ${hayFormasOculta ? this.renderizarFormas("oculta") : ""}
        `
    }

    render() {
        let clasesAdicionales = this.estaActiva ? "is-active" : ""

        return html`
            <div class="modal ${clasesAdicionales}">
                <div
                    class="modal-background"
                    @click=${this.cerrar}
                ></div>

                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">
                            <span>
                                ${this.mayus(this.habilidadElegida.nombre)}
                            </span>
                            <br />
                            <small class="is-size-6 has-text-grey">
                                Habilidad
                            </small>
                        </p>
                        <button
                            class="delete is-danger"
                            @click=${this.cerrar}
                        ></button>
                    </header>

                    <section class="modal-card-body has-background-light-soft">
                        <div class="mb-5">
                            <caja-informativa
                                tipo="texto-largo"
                                titulo="Efecto"
                                valor=${this.habilidadElegida.efecto}
                            ></caja-informativa>
                        </div>

                        <div class="mb-5">
                            <caja-informativa
                                tipo="texto-largo"
                                titulo="Descripción narrativa"
                                valor=${
                                    this.habilidadElegida.descripcion_narrativa
                                }
                            ></caja-informativa>
                        </div>

                        <p class="subtitle mt-5 mb-3">
                            Traducciones
                        </p>

                        <div class="columns is-multiline is-tablet">
                            <div class="column is-half">
                                <caja-informativa
                                    tipo="texto"
                                    titulo="Inglés"
                                    valor=${
                                        this.mayus(
                                            this.habilidadElegida.traducciones?.en
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
                                            this.habilidadElegida.traducciones?.ja
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
                                            this.habilidadElegida.traducciones?.ja_transliterado
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
                                            this.habilidadElegida.traducciones?.ja_traducido
                                        )
                                    }
                                ></caja-informativa>
                            </div>
                        </div>

                        <p class="subtitle mb-3">
                            Corebook
                        </p>

                        <div class="mb-5">
                            <caja-informativa
                                tipo="texto-largo"
                                titulo="Effect"
                                valor=${
                                    this.habilidadElegida.efecto_corebook
                                }
                            ></caja-informativa>
                        </div>

                        <div class="mb-5">
                            <caja-informativa
                                tipo="texto-largo"
                                titulo="Description"
                                valor=${
                                    this.habilidadElegida.descripcion_narrativa_corebook
                                }
                            ></caja-informativa>
                        </div>

                        ${
                            this.espoilersEstanActivados
                                ? this.renderizarSeccionFormas()
                                : ""
                        }
                    </section>

                    <footer class="modal-card-foot"></footer>
                </div>
            </div>
        `
    }
}
customElements.define("modal-ver-habilidad", ModalVerHabilidad)
