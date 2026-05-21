import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"

class ModalEditarPersonaje extends ComponenteBase {
    static get properties() {
        return {
            estaActiva: { type: Boolean },
        }
    }

    constructor() {
        super()
        this.estaActiva = false
    }

    cerrar() {
        this.dispatchEvent(
            new CustomEvent("cerrar", { bubbles: true, composed: true })
        )
    }

    render() {
        return html`
            <div class="modal ${this.estaActiva ? 'is-active' : ''}">
                <div class="modal-background" @click=${this.cerrar}></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">
                                Editar personaje
                            </p>
                            <button
                                class="delete is-danger"
                                @click=${this.cerrar}
                            ></button>
                        </header>

                        <section class="modal-card-body">
                            En desarrollo...
                        </section>

                        <footer class="modal-card-foot">
                            <div class="buttons">
                                <button
                                    class="button is-success"
                                    @click=${this.cerrar}
                                >
                                    Guardar cambios
                                </button>
                                <button class="button" @click=${this.cerrar}>
                                    Cancelar
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
        `
    }
}
customElements.define("modal-editar-personaje", ModalEditarPersonaje)
