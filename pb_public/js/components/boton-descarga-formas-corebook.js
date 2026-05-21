import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import PocketBase from "https://cdn.jsdelivr.net/npm/pocketbase@0.26.8/dist/pocketbase.es.mjs"
import { colecciones } from "../helpers/colecciones.js"
import { ComponenteBase } from "./componente-base.js"

class BotonDescargaFormasCorebook extends ComponenteBase {
    static get properties() {
        return {
            formas: { type: Array },
            estaDescargando: { type: Boolean },
            mensaje: { type: String },
        }
    }

    constructor() {
        super()
        this.formas = []
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
        this.formas = colecciones.formas
        this.mensaje = ""
    }

    traducirNombreCorebook(nombreCorebook, lang = "en") {
        const textoMega = " (Mega Form)"
        const textoMegaX = " (Mega X Form)"
        const textoMegaY = " (Mega Y Form)"
        const textoAlola = " (Alolan Form)"
        const textoGalar = " (Galarian Form)"
        const textoHisui = " (Hisuian Form)"
        const textoPaldea = " (Paldean Form)"

        if (nombreCorebook.includes(textoMega)) {
            let nombre = `Mega-${nombreCorebook.replace(textoMega, "")}`

            if (lang === "es") {
                nombre = nombre.toLowerCase()
            }

            return nombre
        } else if (nombreCorebook.includes(textoMegaX)) {
            let nombre = `Mega-${nombreCorebook.replace(textoMegaX, "")}`

            if (lang === "es") {
                nombre = nombre.toLowerCase()
            }

            return `${nombre} X`
        } else if (nombreCorebook.includes(textoMegaY)) {
            let nombre = `Mega-${nombreCorebook.replace(textoMegaY, "")}`

            if (lang === "es") {
                nombre = nombre.toLowerCase()
            }

            return `${nombre} Y`
        } else if (nombreCorebook.includes(textoAlola) && lang === "en") {
            return `Alolan ${nombreCorebook.replace(textoAlola, "")}`
        } else if (nombreCorebook.includes(textoAlola) && lang === "es") {
            return `${nombreCorebook.replace(textoAlola, "").toLowerCase()} de Alola`
        } else if (nombreCorebook.includes(textoGalar) && lang === "en") {
            return `Galarian ${nombreCorebook.replace(textoGalar, "")}`
        } else if (nombreCorebook.includes(textoGalar) && lang === "es") {
            return `${nombreCorebook.replace(textoGalar, "").toLowerCase()} de Galar`
        } else if (nombreCorebook.includes(textoHisui) && lang === "en") {
            return `Hisuian ${nombreCorebook.replace(textoHisui, "")}`
        } else if (nombreCorebook.includes(textoHisui) && lang === "es") {
            return `${nombreCorebook.replace(textoHisui, "").toLowerCase()} de Hisui`
        } else if (nombreCorebook.includes(textoPaldea) && lang === "en") {
            return `Paldean ${nombreCorebook.replace(textoPaldea, "")}`
        } else if (nombreCorebook.includes(textoPaldea) && lang === "es") {
            return `${nombreCorebook.replace(textoPaldea, "").toLowerCase()} de Paldea`
        } else if (lang === "es") {
            return nombreCorebook.toLowerCase()
        } else {
            return nombreCorebook
        }
    }

    obtenerTraduccion(coleccion, nombreEn) {
        const registro = colecciones[coleccion]?.find(
            registro => registro.traducciones.en === nombreEn
        )

        return registro === undefined ? "" : registro.id
    }

    sustituirRango(v3) {
        /**
         * 1. Starter ✓
         * 2. Rookie → Beginner
         * 3. Standard → Beginner
         * 4. Advanced → Amateur
         * 5. Expert → Ace
         * 6. Ace → Pro
         * 7. Master ✓
         * 8. Champion ✓
         */
        let v2 = ""

        switch (v3) {
            case "Rookie":
                v2 = "Beginner"

            case "Standard":
                v2 = "Beginner"
                break

            case "Advanced":
                v2 = "Amateur"
                break

            case "Expert":
                v2 = "Ace"
                break

            case "Ace":
                v2 = "Pro"
                break

            default:
                v2 = v3
                break
        }

        return v2
    }

    traducirMetodoObtencion(tipoEn) {
        switch (tipoEn) {
            case "Form":
                return "otro"

            case "Item":
                return "exposición a objeto"

            case "Mega":
                return "megaevolución"

            case "Level":
                return "nivel de experiencia"

            case "Special":
                return "otro"

            case "Stat":
                return "aumento de atributo"

            case "Stone":
                return "exposición a objeto"

            case "Trade":
                return "intercambio"

            default:
                return ""
        }
    }

    traducirRitmoExperiencia(ritmoEn) {
        switch (ritmoEn) {
            case "Slow":
                return "lento"

            case "Medium":
                return "medio"

            case "Fast":
                return "rápido"

            default:
                return ""
        }
    }

    obtenerForma(corebook, idTraducciones) {
        const formaPrevia = corebook.Evolutions.find(
            evolution => evolution.From !== undefined && evolution.From !== ""
        )

        return {
            no: corebook.Number,
            nombre: this.traducirNombreCorebook(corebook.Name, "es"),
            tipo_1: this.obtenerTraduccion("tipos", corebook.Type1),
            tipo_2: this.obtenerTraduccion("tipos", corebook.Type2),
            rango_habitual: this.obtenerTraduccion(
                    "rangos",
                    this.sustituirRango(corebook.RecommendedRank)
                ),
            habilidad_1: this.obtenerTraduccion(
                    "habilidades",
                    corebook.Ability1
                ),
            habilidad_2: this.obtenerTraduccion(
                    "habilidades",
                    corebook.Ability2
                ),
            habilidad_oculta: this.obtenerTraduccion(
                    "habilidades",
                    corebook.HiddenAbility
                ),
            forma_previa: this.obtenerTraduccion(
                    "formas",
                    formaPrevia
                ),
            metodo_obtencion: this.traducirMetodoObtencion(formaPrevia?.Kind),
            ritmo_experiencia: this.traducirRitmoExperiencia(formaPrevia?.Speed),
            salud_base: corebook.BaseHP,
            fuerza_base: corebook.Strength,
            fuerza_max: corebook.MaxStrength,
            vitalidad_base: corebook.Vitality,
            vitalidad_max: corebook.MaxVitality,
            destreza_base: corebook.Dexterity,
            destreza_max: corebook.MaxDexterity,
            especial_base: corebook.Special,
            especial_max: corebook.MaxSpecial,
            intuicion_base: corebook.Insight,
            intuicion_max: corebook.MaxInsight,
            altura: corebook.Height.Meters,
            peso: corebook.Weight.Kilograms,
            traducciones: [idTraducciones],
        }
    }

    async descargar() {
        this.mensaje = "Descargando…"
        this.estaDescargando = true

        const conexion = new PocketBase()
        const archivos = await (await fetch("/data/Pokedex.json")).json()
        let totalDescargadas = 0

        for (let i = 0; i < archivos.length; i++) {
            const archivo = archivos[i]
            const formaCorebook = await (
                    await fetch(`/data/Pokedex/${this.sanar(archivo)}`)
                ).json()
            console.log(formaCorebook)

            const filtroPorNombre = this.formas.filter(
                forma => forma.nombre === this.traducirNombreCorebook(
                        formaCorebook.Name,
                        "es"
                    )
            )

            if (filtroPorNombre.length === 0) {
                const cuerpo = {
                    en: this.traducirNombreCorebook(formaCorebook.Name),
                }
                const traducciones = await conexion.collection(
                        "traducciones"
                    ).create(
                        cuerpo
                    )

                if (traducciones.id !== undefined) {
                    const cuerpo = this.obtenerForma(
                            formaCorebook,
                            traducciones.id
                        )
                    const forma = await conexion.collection(
                            "formas"
                        ).create(
                            cuerpo
                        )
                    totalDescargadas++
                }
            }
        }

        this.mensaje = totalDescargadas === 0
            ? "No se ha añadido ninguna forma"
            : `${totalDescargadas} formas nuevas descargadas`
        this.estaDescargando = false
    }

    render() {
        return html`
            <button
                class="button"
                .disabled=${this.formas.length === 0 || this.estaDescargando}
                @click=${this.descargar}
            >
                Descargar formas del&nbsp;<em>corebook</em>
            </button>

            <p class="has-text-grey">
                <small>${this.mensaje}</small>
            </p>
        `
    }
}
customElements.define("boton-descarga-formas-corebook", BotonDescargaFormasCorebook)
