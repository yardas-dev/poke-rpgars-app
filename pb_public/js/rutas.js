import { html } from "https://cdn.jsdelivr.net/npm/lit@3.3.3/+esm"

import "./views/vista-personajes.js"
import "./views/vista-equipos.js"
import "./views/vista-combates.js"
import "./views/vista-pokedex.js"
import "./views/vista-referencia.js"
import "./views/vista-utilidades.js"

const rutas = [
    {
        nombre: "/",
        titulo: "Personajes",
        vista: html`<vista-personajes></vista-personajes>`,
        esVisible: true,
    },
    {
        nombre: "/equipos",
        titulo: "Equipos",
        vista: html`<vista-equipos></vista-equipos>`,
        esVisible: true,
    },
    {
        nombre: "/combates",
        titulo: "Combates",
        vista: html`<vista-combates></vista-combates>`,
        esVisible: true,
    },
    {
        nombre: "/pokedex",
        titulo: "Pokédex",
        vista: html`<vista-pokedex></vista-pokedex>`,
        esVisible: true,
    },
    {
        nombre: "/referencia",
        titulo: "Referencia",
        vista: html`<vista-referencia></vista-referencia>`,
        esVisible: true,
    },
    {
        nombre: "/utilidades",
        titulo: "Utilidades",
        vista: html`<vista-utilidades></vista-utilidades>`,
        esVisible: false,
    },
]

export default rutas
