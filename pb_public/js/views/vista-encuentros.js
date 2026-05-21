import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"

class VistaEncuentros extends ComponenteBase {
    render() {
        return html`<p class="title">Encuentros</p>`
    }
}
customElements.define("vista-encuentros", VistaEncuentros)
