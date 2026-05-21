import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"

class VistaPokedex extends ComponenteBase {
    render() {
        return html`<p class="title">Pokédex</p>`
    }
}
customElements.define("vista-pokedex", VistaPokedex)
