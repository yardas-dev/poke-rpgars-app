import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import PocketBase from "https://cdn.jsdelivr.net/npm/pocketbase@0.26.8/dist/pocketbase.es.mjs"
import translate from "https://cdn.jsdelivr.net/npm/translate@3.0.1/index.min.js"
import { colecciones } from "../helpers/colecciones.js"
import { ComponenteBase } from "./componente-base.js"

class BotonEscrapearIconosWikidex extends ComponenteBase {
    static get properties() {
        return {
            estaEscrapeando: { type: Boolean },
            mensaje: { type: String },
        }
    }

    constructor() {
        super()
        this.estaEscrapeando = false
        this.mensaje = "Esperando…"
    }

    connectedCallback() {
        super.connectedCallback()
        colecciones.addEventListener(
            "descargadas",
            this.llamarEnHerederoTrasDescargar
        )

        setInterval(() => {
            if (! this.estaEscrapeando && this.formas.length > 0) {
                this.escrapear()
            }
        }, 60000)
    }

    disconnectedCallback() {
        colecciones.removeEventListener(
            "descargadas",
            this.llamarEnHerederoTrasDescargar
        )
        super.disconnectedCallback()
    }

    llamarEnHerederoTrasDescargar = () => {
        this.mensaje = "Esta página escrapea automáticamente una vez por minuto"
    }

    obtenerNombre(nombre) {
        const excepcionesGuion = ["jangmo-o", "hakamo-o", "kommo-o"]

        if (nombre.includes(" (") && nombre.includes(")")) {
            // Ejemplo: "giratina (origen)" o "zygarde (al 10 %)"
            return nombre.replace(/\(([^()]*)\)/, "$1").replace(" %", "%")
        } else if (nombre.includes(" ") && ! nombre.includes(" de ")) {
            // Ejemplo: "mime jr." o "código cero"
            let trozos = nombre.split(/ (.*)/s)
            return `${trozos[0]} ${this.mayus(trozos[1])}`
        } else if (nombre.includes("-") && ! excepcionesGuion.includes(nombre)) {
            // Ejemplo: "ho-oh", "chien-pao" o "mega-absol"
            let trozos = nombre.split(/-(.*)/s)
            return `${trozos[0]}-${this.mayus(trozos[1])}`
        } else if (nombre.includes(". ")) {
            // Ejemplo: "mr. mime de Galar"
            let trozos = nombre.split(/\. (.*)/s)
            return `${trozos[0]}. ${this.mayus(trozos[1])}`
        } else {
            // Ejemplo: "kyogre" o "wooper de Paldea"
            return nombre
        }
    }

    async escrapear() {
        this.mensaje = "Escrapeando…"
        this.estaEscrapeando = true

        const conexion = new PocketBase()
        let totalEscrapeados = 0

        for (let i = 0; i < this.formas.length; i++) {
            const forma = this.formas[i]

            if (forma.icono === "") {
                let respuesta = undefined

                console.log("Escrapeando icono de " + forma.nombre)
                try {
                    respuesta = await fetch(
                        "https://api.allorigins.win/raw?url=" +
                        "https://www.wikidex.net/wiki/" +
                        this.sanar("Archivo:") +
                        this.sanar(
                                this.obtenerNombre(forma.nombre).replace(
                                        " ",
                                        "_"
                                    )
                            ) +
                        "_icono_HOME.png"
                    )
                } catch (error) {
                    console.error("No se pudo conectar con el sitio", error)
                    break
                }

                const documento = new DOMParser().parseFromString(
                        await respuesta.text(),
                        "text/html"
                    )
                console.log("documento", documento)

                let imagen = undefined

                try {
                    const contenido = documento.getElementById(
                            "mw-content-text"
                        )?.textContent

                    if (
                        contenido?.includes(
                            "No existe ningún archivo con este nombre"
                        )
                    ) {
                        throw "El nombre del icono es incorrecto"
                    }

                    const url = new URL(
                            documento.querySelector("#file img").src
                        ).href

                    imagen = await (await fetch(url)).blob()
                } catch (error) {
                    console.error("No se pudo recuperar el icono", error)
                    break
                }

                try {
                    const archivo = new File(
                        [imagen],
                        `${forma.nombre}-icono.png`,
                        { type: imagen.type }
                    )
                    console.log("archivo", archivo)

                    const formaActualizada = await conexion.collection(
                            "formas"
                        ).update(
                            forma.id,
                            { icono: archivo }
                        )
                    console.log("formaActualizada", formaActualizada)

                    if (formaActualizada.id) {
                        this.formas[i] = formaActualizada
                        totalEscrapeados++
                    }
                } catch (error) {
                    console.error("No se pudo actualizar la forma", error)
                    break
                }
            }
        }

        this.mensaje = totalEscrapeados === 0
            ? "No se ha actualizado ningún icono"
            : `${totalEscrapeados} iconos actualizados`
        this.estaEscrapeando = false
    }

    render() {
        return html`
            <button
                class="button"
                .disabled=${
                    this.formas.length === 0 || this.estaEscrapeando
                }
                @click=${this.escrapear}
            >
                Escrapear iconos de Wikidex
            </button>

            <p class="has-text-grey">
                <small>${this.mensaje}</small>
            </p>
        `
    }
}
customElements.define("boton-escrapear-iconos-wikidex", BotonEscrapearIconosWikidex)
