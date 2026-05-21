import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { colecciones } from "../helpers/colecciones.js"
import { ComponenteBase } from "../components/componente-base.js"
import "../components/ficha-personaje.js"

class VistaPersonajes extends ComponenteBase {
    render() {
        return html`
            <p class="title">
                Personajes
            </p>

            <div class="columns">
                ${
                    this.personajes.filter(
                            personaje => personaje.rol === "jugador"
                        ).map(
                            personaje => html`
                                <div class="column">
                                    <ficha-personaje
                                        .personaje=${personaje}
                                    ></ficha-personaje>
                                </div>
                            `
                        )
                }
            </div>
        `
    }
}
customElements.define("vista-personajes", VistaPersonajes)
