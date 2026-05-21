import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "./componente-base.js"

class AlternadorEspoilers extends ComponenteBase {
    static get properties() {
        return {
            estanActivados: { type: Boolean },
        }
    }

    constructor() {
        super()
        this.estanActivados = false
    }

    alternar() {
        this.estanActivados = ! this.estanActivados
        this.dispatchEvent(
            new CustomEvent("cambio", {
                bubbles: true,
                composed: true,
                detail: {
                    valor: this.estanActivados
                }
            })
        )
    }

    renderizarBoton() {
        return html`
            <button class="button mb-6" @click=${this.alternar}>
                Activar espóilers
            </button>
        `
    }

    renderizarMensaje() {
        return html`
            <div class="columns is-tablet">
                <div class="column is-one-third-widescreen is-half-tablet">
                    <article class="message is-warning mb-6">
                        <div class="message-header">
                            <p>
                                ¡Alerta, espóilers!
                            </p>
                        </div>

                        <div class="message-body">
                            <p class="mb-3">
                                La info se basa mayormente en el
                                <em>corebook</em>, pero también en datos de los
                                videojuegos. Recuerda que tu personaje ve el
                                mundo desde sus propios ojos, y no debería saber
                                más de lo que pueda ver reflejado en su pokédex
                                o haya aprendido a lo largo de su aventura.
                            </p>

                            <button class="button" @click=${this.alternar}>
                                Desactivar espóilers
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        `
    }

    render() {
        return this.estanActivados
            ? this.renderizarMensaje()
            : this.renderizarBoton()
    }
}
customElements.define("alternador-espoilers", AlternadorEspoilers)
