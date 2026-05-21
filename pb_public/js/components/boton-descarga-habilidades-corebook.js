import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import PocketBase from "https://cdn.jsdelivr.net/npm/pocketbase@0.26.8/dist/pocketbase.es.mjs"
import { colecciones } from "../helpers/colecciones.js"
import { ComponenteBase } from "../components/componente-base.js"

class BotonDescargaHabilidadesCorebook extends ComponenteBase {
    static get properties() {
        return {
            habilidades: { type: Array },
            estaDescargando: { type: Boolean },
            mensaje: { type: String },
        }
    }

    constructor() {
        super()
        this.habilidades = []
        this.estaDescargando = false
        this.mensaje = "Esperando…"
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
        this.habilidades = colecciones.habilidades
        this.mensaje = ""
    }

    obtenerTraducciones(habilidadCorebook) {
        return {
            en: habilidadCorebook.Name,
        }
    }

    obtenerHabilidad(corebook, idTraducciones) {
        return {
            efecto_corebook: corebook.Effect,
            descripcion_narrativa_corebook: corebook.Description,
            traducciones: [idTraducciones]
        }
    }

    async descargar() {
        this.mensaje = "Descargando…"
        this.estaDescargando = true

        const conexion = new PocketBase()
        const archivos = await (await fetch("/data/Abilities.json")).json()
        let totalDescargadas = 0

        for (let i = 0; i < archivos.length; i++) {
            const archivo = archivos[i]
            const habilidadCorebook = await (
                    await fetch(`/data/Abilities/${this.sanar(archivo)}`)
                ).json()

            const filtroPorNombre = this.habilidades.filter(
                habilidad => habilidad.traducciones?.en === habilidadCorebook.Name
            )

            if (filtroPorNombre.length === 0) {
                const cuerpo = this.obtenerTraducciones(habilidadCorebook)
                const traducciones = await conexion.collection(
                        "traducciones"
                    ).create(
                        cuerpo
                    )

                if (traducciones.id !== undefined) {
                    const cuerpo = this.obtenerHabilidad(
                            habilidadCorebook,
                            traducciones.id
                        )
                    const habilidad = await conexion.collection(
                            "habilidades"
                        ).create(
                            cuerpo
                        )
                    totalDescargadas++
                }
            }
        }

        this.mensaje = totalDescargadas === 0
            ? "No se ha añadido ninguna habilidad"
            : `${totalDescargadas} habilidades nuevas descargadas`
        this.estaDescargando = false
    }

    render() {
        return html`
            <button
                class="button"
                .disabled=${
                    this.habilidades.length === 0 || this.estaDescargando
                }
                @click=${this.descargar}
            >
                Descargar habilidades del&nbsp;<em>corebook</em>
            </button>

            <p class="has-text-grey">
                <small>${this.mensaje}</small>
            </p>
        `
    }
}
customElements.define("boton-descarga-habilidades-corebook", BotonDescargaHabilidadesCorebook)
