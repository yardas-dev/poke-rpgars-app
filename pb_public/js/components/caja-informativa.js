import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "./componente-base.js"

class CajaInformativa extends ComponenteBase {
    static get properties() {
        return {
            tipo: { type: String },
            titulo: { type: String },
            valor: { type: String },
            actual: { type: Number },
            max: { type: Number },
            estaHecho: { type: Boolean },
            color: { type: String },
            margenY: { type: Number },
        }
    }

    constructor() {
        super()
        this.tipo, this.titulo, this.valor, this.color = ""
        this.estaHecho = false
    }

    renderizarTexto() {
        return html`
            <p class="subtitle is-6">
                ${this.valor}
            </p>
        `
    }

    renderizarProgreso() {
        return html`
            <p class="subtitle is-6 mb-2">
                ${this.actual} / ${this.max}
            </p>
            <progress class="progress" value=${this.actual} max=${this.max}>
                15%
            </progress>
        `
    }

    renderizarValorVacio() {
        return html`
            <p class="subtitle is-6 has-text-dark-soft">
                —
            </p>
        `
    }

    renderizarPuntos() {
        let veces = Number(this.valor)
        let serieVacia = Array(veces).fill(null)
        let circulo = html`
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                <circle
                    style="fill: var(--bulma-subtitle-color)"
                    r="50%"
                    cx="50%"
                    cy="50%"
                />
            </svg>
        `

        return html`
            <p class="subtitle is-6">
                ${serieVacia.map(() => circulo)}
            </p>
        `
    }

    renderizarLogro() {
        let clasesAdicionales = this.estaHecho ? "" : "has-text-dark-soft"
        
        return html`
            <p class="subtitle is-6 ${clasesAdicionales}">
                ${this.valor} ${this.estaHecho ? "✅" : ""}
            </p>
        `
    }

    render() {
        let tituloEstaApagado = false
        let parrafoValor

        switch (this.tipo) {
            case "texto":
                parrafoValor = this.renderizarTexto()
                break
            
            case "progreso":
                parrafoValor = this.renderizarProgreso()
                break

            case "puntos":
                let tieneCeroPuntos = Number(this.valor) === 0
                tituloEstaApagado = tieneCeroPuntos
                parrafoValor = tieneCeroPuntos
                    ? this.renderizarValorVacio()
                    : this.renderizarPuntos()
                break

            case "logro":
                tituloEstaApagado = ! this.estaHecho
                parrafoValor = this.renderizarLogro()
                break

            case "html":
                parrafoValor = html`<div><slot></slot></div>`

            default:
                break
        }

        let clasesAdicionales = `has-background-${this.color}-soft ` +
            (this.margenY === undefined ? "" : `my-${this.margenY}`)
        let clasesTituloAdicionales = tituloEstaApagado
            ? "has-text-dark-soft"
            : ""

        return html`
            <div class="box ${clasesAdicionales}">
                <p class="title is-5 ${clasesTituloAdicionales}">
                    ${this.titulo}
                </p>

                ${parrafoValor}
            </div>
        `
    }
}
customElements.define("caja-informativa", CajaInformativa)
