import { LitElement } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { colecciones } from "../helpers/colecciones.js"

export class ComponenteBase extends LitElement {
    createRenderRoot() {
        return this
    }

    static get properties() {
        return {
            formas: { type: Array },
            habilidades: { type: Array },
            personajes: { type: Array },
            tipos: { type: Array },
        }
    }

    constructor() {
        super()
        this.formas = []
        this.habilidades = []
        this.personajes = []
        this.tipos = []
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
        this.habilidades = colecciones.habilidades
        this.personajes = colecciones.personajes
        this.tipos = colecciones.tipos
    }

    mayus(texto) {
        if (typeof texto !== "string" || texto === "") {
            return
        }

        return texto[0].toUpperCase() + texto.slice(1)
    }

    normalizar(texto) {
        if (typeof texto !== "string" || texto === "") {
            return
        }

        return texto.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
    }

    sanar(texto) {
        return encodeURIComponent(texto.replace("’", "'"))
    }
}
