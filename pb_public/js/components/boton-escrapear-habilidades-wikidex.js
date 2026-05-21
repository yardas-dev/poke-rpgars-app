import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import PocketBase from "https://cdn.jsdelivr.net/npm/pocketbase@0.26.8/dist/pocketbase.es.mjs"
import translate from "https://cdn.jsdelivr.net/npm/translate@3.0.1/index.min.js"
import { colecciones } from "../helpers/colecciones.js"
import { ComponenteBase } from "./componente-base.js"

class BotonEscrapearHabilidadesWikidex extends ComponenteBase {
    static get properties() {
        return {
            habilidades: { type: Array },
            estaEscrapeando: { type: Boolean },
            mensaje: { type: String },
        }
    }

    constructor() {
        super()
        this.habilidades = []
        this.estaEscrapeando = false
        this.mensaje = "Esperando…"
    }

    connectedCallback() {
        super.connectedCallback()
        colecciones.addEventListener("descargadas", this.llamarTrasDescargar)

        // setInterval(() => {
        //     if (! this.estaEscrapeando && this.habilidades.length > 0) {
        //         this.escrapear()
        //     }
        // }, 10000)
    }

    disconnectedCallback() {
        colecciones.removeEventListener("descargadas", this.llamarTrasDescargar)
        super.disconnectedCallback()
    }

    llamarTrasDescargar = () => {
        this.habilidades = colecciones.habilidades
        this.mensaje = "" // "Esta página escrapea automáticamente cada 10 segundos"
    }

    async escrapear() {
        this.mensaje = "Escrapeando…"
        this.estaEscrapeando = true

        const conexion = new PocketBase()
        let totalEscrapeadas = 0

        for (let i = 0; i < this.habilidades.length; i++) {
            const habilidad = this.habilidades[i]
            let traducciones = {}    
            let nombre, nombreEsHa = ""
            let nombreJa, nombreJaTransliterado, nombreJaTraducido = ""

            if (
                habilidad.nombre === "" && habilidad.traducciones !== undefined
            ) {
                let respuesta = undefined

                if (habilidad.traducciones.es_es === "") {
                    try {
                        respuesta = await fetch(
                                "https://api.allorigins.win/raw?url=" +
                                "https://www.wikidex.net/wiki/" +
                                this.sanar(habilidad.traducciones.en)
                            )
                    } catch {
                        console.error(
                            "Se ha detenido el escrapeo por un error al conectar " +
                            "con el sitio"
                        )
                        break
                    }

                    const documento = new DOMParser().parseFromString(
                        await respuesta.text(),
                        "text/html"
                    )
                    console.log("documento", documento)

                    try {
                        const titulo = documento.querySelector(
                                "#firstHeading"
                            ).textContent
                            .toLowerCase()
    
                        if (titulo.includes("/")) {
                            [nombreEsHa, nombre] = titulo.split("/")
                        } else {
                            nombre = titulo
                            nombreEsHa = titulo
                        }
                    } catch {
                        console.error(
                            "Se ha detenido el escrapeo por un error al buscar " +
                            "el nombre"
                        )
                        break
                    }

                    try {
                        const elemento = documento.querySelector(
                                "#mw-content-text [lang=ja]"
                            )
                        nombreJa = elemento.textContent
                        nombreJaTransliterado = elemento.getAttribute("title")
    
                        const contenidoCompleto = documento.querySelector(
                                "#mw-content-text"
                            ).textContent
                        nombreJaTraducido = contenidoCompleto.substring(
                                contenidoCompleto.indexOf(nombreJa) + nombreJa.length,
                                contenidoCompleto.indexOf("en japonés")
                            ).trim()
                            .toLowerCase()
                    } catch {
                        console.error(
                            "Se ha detenido el escrapeo por un error al buscar " +
                            "el nombre japonés"
                        )
                        break
                    }
    
                    const cuerpo = {
                        es_es: nombre,
                        es_ha: nombreEsHa,
                        ja: nombreJa,
                        ja_transliterado: nombreJaTransliterado,
                        ja_traducido: nombreJaTraducido,
                    }
                    console.log("id", habilidad.traducciones.id)
                    console.log("cuerpo", cuerpo)
    
                    traducciones = await conexion.collection(
                            "traducciones"
                        ).update(
                            habilidad.traducciones.id,
                            cuerpo
                        )
                    habilidad.traducciones = traducciones
                } else {
                    nombre = habilidad.traducciones.es_es
                }

                if (habilidad.traducciones.id !== undefined) {
                    const cuerpo = {
                        nombre,
                        efecto: await translate(
                                habilidad.efecto_corebook,
                                "es"
                            ),
                        descripcion_narrativa: await translate(
                                habilidad.descripcion_narrativa_corebook,
                                "es"
                            ),
                    }
                    console.log("id", habilidad.id)
                    console.log("cuerpo", cuerpo)

                    this.habilidades[i] = await conexion.collection(
                            "habilidades"
                        ).update(
                            habilidad.id,
                            cuerpo
                        )
                }

                totalEscrapeadas++
            }
        }

        this.mensaje = totalEscrapeadas === 0
            ? "No se ha actualizado ninguna habilidad"
            : `${totalEscrapeadas} habilidades actualizadas`
        this.estaEscrapeando = false
    }

    render() {
        return html`
            <button
                class="button"
                .disabled=${
                    this.habilidades.length === 0 || this.estaEscrapeando
                }
                @click=${this.escrapear}
            >
                Escrapear habilidades de Wikidex
            </button>

            <p class="has-text-grey">
                <small>${this.mensaje}</small>
            </p>
        `
    }
}
customElements.define("boton-escrapear-habilidades-wikidex", BotonEscrapearHabilidadesWikidex)
