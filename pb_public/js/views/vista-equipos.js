import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"

class VistaEquipos extends ComponenteBase {
    render() {
        return html`<p class="title">Equipos</p>`
    }
}
customElements.define("vista-equipos", VistaEquipos)
