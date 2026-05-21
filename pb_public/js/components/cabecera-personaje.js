import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"

class CabeceraPersonaje extends ComponenteBase {
    static get properties() {
        return {
            personaje: { type: Object },
        }
    }

    constructor() {
        super()
        this.personaje = {}
    }

    alternarContenido() {
        this.dispatchEvent(
            new CustomEvent("alternar", { bubbles: true, composed: true })
        )
    }

    render() {
        let claseColor = `has-background-${this.personaje.color}-soft`

        return html`
            <header
                class="card-header ${claseColor} is-clickable is-unselectable"
                @click=${this.alternarContenido}
            >
                <figure class="image is-96x96 m-4">
                    <img
                        src=${this.personaje.icono}
                        alt="Imagen no disponible"
                    />
                </figure>

                <p class="my-auto">
                    <strong class="is-size-4">
                        ${this.personaje.nombre}
                    </strong>
                    <br />
                    <small>
                        ${this.mayus(this.personaje.ocupacion)}
                    </small>
                    <br />
                    <small>
                        ${this.mayus(this.personaje.concepto)}
                    </small>
                    <br />
                    <small class="has-text-${this.personaje.color}-soft-invert">
                        ${this.personaje.edad} años,
                        naturaleza ${this.personaje.naturaleza.nombre}
                    </small>
                </p>
            </header>
        `
    }
}
customElements.define("cabecera-personaje", CabeceraPersonaje)
