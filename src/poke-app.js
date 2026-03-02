import { LitElement, html } from "lit"

class PokeApp extends LitElement {
    render() {
        return html`<main>Aventura en la región de Sinnoh</main>`
    }
}
customElements.define("poke-app", PokeApp)
