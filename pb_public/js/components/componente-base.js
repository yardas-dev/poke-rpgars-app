import { LitElement } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"

export class ComponenteBase extends LitElement {
    createRenderRoot() {
        return this
    }

    _normalizarMayus(texto) {
        return texto[0].toUpperCase() + texto.slice(1)
    }
}
