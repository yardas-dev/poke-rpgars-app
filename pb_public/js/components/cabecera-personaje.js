import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"

class CabeceraPersonaje extends ComponenteBase {
    static get properties() {
        return {
            registro: { type: Object },
        }
    }

    constructor() {
        super()
        this.registro = {}
    }

    connectedCallback() {
        super.connectedCallback()
    }

    alternarContenido() {
        this.dispatchEvent(
            new CustomEvent("alternar", { bubbles: true, composed: true })
        )
    }

    render() {
        let claseColor = `has-background-${this.registro.color}-soft`

        return html`
            <header
                class="card-header ${claseColor} is-pointer"
                @click=${this.alternarContenido}
            >
                <figure class="image is-96x96 m-4">
                    <img
                        src=${this.registro.icono}
                        alt="Imagen no disponible"
                    />
                </figure>

                <p class="my-auto">
                    <strong class="is-size-4">
                        ${this.registro.nombre}
                    </strong>
                    <br />
                    <small>
                        ${this._normalizarMayus(this.registro.ocupacion)}
                    </small>
                    <br />
                    <small>
                        ${this._normalizarMayus(this.registro.concepto)}
                    </small>
                    <br />
                    <small class="has-text-${this.registro.color}-soft-invert">
                        ${this.registro.edad} años,
                        naturaleza ${this.registro.naturaleza.nombre}
                    </small>
                </p>
            </header>
        `
    }
}
customElements.define("cabecera-personaje", CabeceraPersonaje)
