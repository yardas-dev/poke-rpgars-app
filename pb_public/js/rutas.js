import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"

import "./views/vista-personajes.js"
import "./views/vista-equipos.js"
import "./views/vista-combates.js"
import "./views/vista-encuentros.js"
import "./views/vista-pokedex.js"

const rutas = [
    {
        nombre: "/",
        vista: html`<vista-personajes></vista-personajes>`
    },
    {
        nombre: "/equipos",
        vista: html`<vista-equipos></vista-equipos>`
    },
    {
        nombre: "/combates",
        vista: html`<vista-combates></vista-combates>`
    },
    {
        nombre: "/encuentros",
        vista: html`<vista-encuentros></vista-encuentros>`
    },
    {
        nombre: "/pokedex",
        vista: html`<vista-pokedex></vista-pokedex>`
    },
]

export default rutas
