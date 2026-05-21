import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"

class VistaCombates extends ComponenteBase {
    render() {
        return html`<p class="title">Combates</p>`
    }
}
customElements.define("vista-combates", VistaCombates)
