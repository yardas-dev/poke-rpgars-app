import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "./componente-base.js"
import "./caja-informativa.js"
import "./modal-ver-habilidad.js"

class ListaHabilidades extends ComponenteBase {
    static get properties() {
        return {
            filtro: { type: String },
            habilidades: { type: Array },
            habilidadElegida: { type: Object },
            modalEstaActiva: { type: Boolean },
            espoilersEstanActivados: { type: Boolean },
        }
    }

    constructor() {
        super()
        this.filtro = ""
        this.habilidades = []
        this.habilidadElegida = {}
        this.modalEstaActiva = false
        this.espoilersEstanActivados = false
    }

    filtrarHabilidades() {
        return this.filtro === ""
            ? this.habilidades
            : this.habilidades.filter(
                    habilidad => {
                        let coincidencia = this.normalizar(this.filtro)
                        let nombre = this.normalizar(habilidad.nombre)
                        let nombre_en = this.normalizar(habilidad.traducciones.en)

                        return nombre.includes(coincidencia) ||
                            nombre_en.includes(coincidencia)
                    }
                )
    }

    abrirModal(evento) {
        this.habilidadElegida = this.habilidades.find(
            habilidad => habilidad.id === evento.target.getAttribute("data-id")
        )
        this.modalEstaActiva = true
    }

    cerrarModal() {
        this.habilidadElegida = {}
        this.modalEstaActiva = false
    }

    renderizarHabilidad(habilidad) {
        return html`
            <button
                class="button"
                @click=${this.abrirModal}
                data-id=${habilidad.id}
            >
                ${this.mayus(habilidad.nombre)}
            </button>
        `
    }

    render() {
        return html`
            <p class="buttons">
                ${
                    this.filtrarHabilidades().map(
                        habilidad => this.renderizarHabilidad(habilidad)
                    )
                }
            </p>

            <modal-ver-habilidad
                .habilidadElegida=${this.habilidadElegida}
                .estaActiva=${this.modalEstaActiva}
                .espoilersEstanActivados=${this.espoilersEstanActivados}
                @cierre=${this.cerrarModal}
            ></modal-ver-habilidad>
        `
    }
}
customElements.define("lista-habilidades", ListaHabilidades)
