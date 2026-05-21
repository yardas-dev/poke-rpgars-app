import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"
import { ComponenteBase } from "../components/componente-base.js"
import "../components/caja-informativa.js"
import { colecciones } from "../helpers/colecciones.js"

class TarjetaNaturaleza extends ComponenteBase {
    static get properties() {
        return {
            contenidoEstaExpandido: { type: Boolean },
            registro: { type: Object },
        }
    }

    constructor() {
        super()
        this.contenidoEstaExpandido = false
        this.registro = {}
    }
    
    alternarContenido() {
        this.contenidoEstaExpandido = ! this.contenidoEstaExpandido
    }
    
    renderizarContenido() {
        let esNeutro = this.registro.atributo_potenciado.concepto.id === this.registro.atributo_mermado.concepto.id

        let colorPotenciado = esNeutro
            ? "light"
            : this.registro.atributo_potenciado.color_bulma
        let colorMermado = esNeutro
            ? "light"
            : this.registro.atributo_mermado.color_bulma

        return html`
            <div class="card-content">
                <div class="mb-5">
                    <caja-informativa
                        tipo="texto"
                        titulo="Confianza"
                        valor="${this.registro.confianza_max}"
                    ></caja-informativa>
                </div>

                <div class="mb-5">
                    <caja-informativa
                        tipo="texto-largo"
                        titulo="Descripción"
                        valor="${this.registro.descripcion}"
                    ></caja-informativa>
                </div>

                <div class="box">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Potenciado</th>
                                <th>Mermado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Atributo</th>

                                <td class="is-${colorPotenciado}-soft">
                                    ${esNeutro ? "—" : this.registro.atributo_potenciado.concepto.nombre}
                                </td>

                                <td class="is-${colorMermado}-soft">
                                    ${esNeutro ? "—" : this.registro.atributo_mermado.concepto.nombre}
                                </td>
                            </tr>
                            <tr>
                                <th>Atributo social</th>

                                <td class="is-${colorPotenciado}-soft">
                                    ${esNeutro ? "—" : this.registro.atributo_potenciado.cualidad.nombre}
                                </td>

                                <td class="is-${colorMermado}-soft">
                                    ${esNeutro ? "—" : this.registro.atributo_mermado.cualidad.nombre}
                                </td>

                            </tr>
                            <tr>
                                <th>Sabor</th>

                                <td class="is-${colorPotenciado}-soft">
                                    ${esNeutro ? "—" : this.registro.atributo_potenciado.sabor.nombre}
                                </td>

                                <td class="is-${colorMermado}-soft">
                                    ${esNeutro ? "—" : this.registro.atributo_mermado.sabor.nombre}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- <div class="columns">
                    <div class="column">
                        <caja-informativa
                            tipo="texto"
                            titulo="España"
                            valor="${
                                this.mayus(this.registro.traducciones.es_es)
                            }"
                        ></caja-informativa>
                    </div>

                    <div class="column">
                        <caja-informativa
                            tipo="texto"
                            titulo="Hispanoamérica"
                            valor="${
                                this.mayus(this.registro.traducciones.es_ha)
                            }"
                        ></caja-informativa>
                    </div>
                </div>

                <div class="mb-5">
                    <caja-informativa
                        tipo="texto"
                        titulo="Inglés"
                        valor="${
                            this.mayus(this.registro.traducciones.en)
                        }"
                    ></caja-informativa>
                </div>

                <div class="columns">
                    <div class="column">
                        <caja-informativa
                            tipo="texto"
                            titulo="Japonés"
                            valor="${
                                this.mayus(this.registro.traducciones.ja)
                            }"
                        ></caja-informativa>
                    </div>

                    <div class="column">
                        <caja-informativa
                            tipo="texto"
                            titulo="Transliterado"
                            valor="${
                                this.mayus(this.registro.traducciones.ja_transliterado)
                            }"
                        ></caja-informativa>
                    </div>

                    <div class="column">
                        <caja-informativa
                            tipo="texto"
                            titulo="Traducido"
                            valor="${
                                this.mayus(this.registro.traducciones.ja_traducido)
                            }"
                        ></caja-informativa>
                    </div>
                </div>

                <div class="mb-5">
                    <caja-informativa
                        tipo="texto-largo"
                        titulo="Descripción (corebook)"
                        valor="${this.registro.descripcion_corebook}"
                    ></caja-informativa>
                </div>

                <caja-informativa
                    tipo="texto"
                    titulo="Pág."
                    valor="${this.registro.pag_corebook}"
                ></caja-informativa>
            </div> -->
        `
    }

    render() {
        return html`
            <div class="card has-background-light-soft">
                <header
                    class="card-header has-background-white-soft is-clickable is-unselectable"
                    @click=${this.alternarContenido}
                >
                    <p class="card-header-title is-size-4 p-4">
                        ${this.mayus(this.registro.nombre)}
                    </p>
                </header>

                ${this.contenidoEstaExpandido ? this.renderizarContenido() : ""}
            </div>
        `
    }
}
customElements.define("tarjeta-naturaleza", TarjetaNaturaleza)
