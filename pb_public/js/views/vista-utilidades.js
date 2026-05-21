import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import PocketBase from "https://cdn.jsdelivr.net/npm/pocketbase@0.26.8/dist/pocketbase.es.mjs"
import { ComponenteBase } from "../components/componente-base.js"
import "../components/boton-descarga-formas-corebook.js"
import "../components/boton-escrapear-iconos-wikidex.js"
import "../components/boton-descarga-habilidades-corebook.js"
import "../components/boton-escrapear-habilidades-wikidex.js"

class VistaUtilidades extends ComponenteBase {
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

    async cargarHabilidades() {
        const conexion = new PocketBase()
        const archivos = await (await fetch("/data/Abilities.json")).json()
        let contador = 0

        for (let i = 0; i < archivos.length; i++) {
            const archivo = archivos[i]
            const habilidadCorebook = await (
                    await fetch(`/data/Abilities/${archivo}`)
                ).json()
            
            const respuesta = await conexion.collection(
                    "traducciones"
                ).getList(
                    1,
                    1,
                    { filter: `en = '${habilidadCorebook.Name}'` }
                )
            const habilidadYaExiste = respuesta.items.length === 1

            if (habilidadYaExiste) {
            } else {
                const cuerpo = this.obtenerTraducciones(habilidadCorebook)
                const traducciones = await conexion.collection(
                        "traducciones"
                    ).create(
                        cuerpo
                    )
                console.log(traducciones)

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
                    console.log(habilidad)
                }
            }
        }
    }

    render() {
        return html`
            <p class="title">
                Utilidades
            </p>

            <p class="subtitle mt-5 mb-3">
                Formas
            </p>

            <div class="field is-grouped">
                <p class="control">
                    <boton-descarga-formas-corebook></boton-descarga-formas-corebook>
                </p>

                <p class="control">
                    <boton-escrapear-iconos-wikidex></boton-escrapear-iconos-wikidex>
                </p>
            </div>

            <p class="subtitle mt-5 mb-3">
                Habilidades
            </p>

            <div class="field is-grouped">
                <p class="control">
                    <boton-descarga-habilidades-corebook></boton-descarga-habilidades-corebook>
                </p>

                <p class="control">
                    <boton-escrapear-habilidades-wikidex></boton-escrapear-habilidades-wikidex>
                </p>
            </div>
        `
    }
}
customElements.define("vista-utilidades", VistaUtilidades)
