import PocketBase from "https://cdn.jsdelivr.net/npm/pocketbase@0.26.8/dist/pocketbase.es.mjs";

const SALUD_BASE_HUMANO = 4;
const VOLUNTAD_BASE = 2;

class GestorColecciones extends EventTarget {
  constructor() {
    super();
    this.atributos = [];
    this.formas = [];
    this.habilidades = [];
    this.naturalezas = [];
    this.personajes = [];
    this.tipos = [];
    this.traducciones = [];
  }

  async descargar() {
    const conexion = new PocketBase();
    const [
      atributos,
      conceptos,
      formas,
      habilidades,
      medallas,
      naturalezas,
      personajes,
      rangos,
      tipos,
      traducciones,
    ] = await Promise.all([
      conexion.collection("atributos").getFullList(),
      conexion.collection("conceptos").getFullList(),
      conexion.collection("formas").getFullList({
        filter: "tipo_contenido != 'censurado'",
        sort: "no, tipo_forma, nombre",
      }),
      conexion.collection("habilidades").getFullList({ sort: "nombre" }),
      conexion.collection("medallas").getFullList(),
      conexion.collection("naturalezas").getFullList(),
      conexion.collection("personajes").getFullList(),
      conexion.collection("rangos").getFullList(),
      conexion.collection("tipos").getFullList({ sort: "nombre" }),
      conexion.collection("traducciones").getFullList(),
    ]);

    this._sustituirIconos([formas, medallas, personajes, rangos, tipos]);

    this._sustituirTraducciones(traducciones, [
      formas,
      habilidades,
      personajes,
      rangos,
      tipos,
    ]);

    this._sustituirRelaciones(atributos, "concepto", conceptos);
    this._sustituirRelaciones(atributos, "cualidad", conceptos);
    this._sustituirRelaciones(atributos, "caracteristica", conceptos);
    this._sustituirRelaciones(atributos, "sabor", conceptos);
    this._sustituirRelaciones(naturalezas, "atributo_potenciado", atributos);
    this._sustituirRelaciones(naturalezas, "atributo_mermado", atributos);
    this._sustituirRelaciones(personajes, "naturaleza", naturalezas);
    this._sustituirRelaciones(personajes, "rango", rangos);

    habilidades.forEach((habilidad) => {
      habilidad.formas_unitaria = formas.filter(
        (forma) =>
          forma.habilidad_1 === habilidad.id && forma.habilidad_2 === "",
      );
      habilidad.formas_doble = formas.filter(
        (forma) =>
          forma.habilidad_2 !== "" &&
          (forma.habilidad_1 === habilidad.id ||
            forma.habilidad_2 === habilidad.id),
      );
      habilidad.formas_oculta = formas.filter(
        (forma) => forma.habilidad_oculta === habilidad.id,
      );
    });

    personajes.forEach((personaje) => {
      personaje.color = personaje.sexo === "mujer" ? "danger" : "info";

      personaje.saludMax = SALUD_BASE_HUMANO + personaje.vitalidad;
      personaje.confianzaMax = personaje.naturaleza?.confianza_max;
      personaje.voluntadMax = VOLUNTAD_BASE + personaje.intuicion;

      const listaCompletaMedallas = [];

      medallas.forEach((medalla) => {
        listaCompletaMedallas.push({
          icono: medalla.icono,
          nombre: medalla.nombre,
          laTiene: personaje.medallas.includes(medalla.id),
        });
      });

      personaje.medallas = listaCompletaMedallas;
    });

    this.atributos = atributos;
    this.formas = formas;
    this.habilidades = habilidades;
    this.naturalezas = naturalezas;
    this.personajes = personajes;
    this.tipos = tipos;
    this.traducciones = traducciones;
    this.dispatchEvent(new Event("descargadas"));
  }

  _sustituirIconos(colecciones) {
    colecciones.forEach((coleccion) => {
      this._sustituirRutas(coleccion, "icono");
    });
  }

  _sustituirRelaciones(coleccion, campo, coleccionRelacionada) {
    coleccion.forEach((registro) => {
      registro[campo] = coleccionRelacionada.find(
        (registroColeccionRelacionada) =>
          registroColeccionRelacionada.id === registro[campo],
      );
    });
  }

  _sustituirTraducciones(traducciones, colecciones) {
    colecciones.forEach((coleccion) => {
      coleccion.forEach((registro) => {
        registro.traducciones = traducciones.find(
          (traduccion) => traduccion.id === registro.traducciones,
        );
      });
    });
  }

  _sustituirRutas(coleccion, campo) {
    coleccion.forEach((registro) => {
      if (registro.icono !== "") {
        registro[campo] =
          "/api/files/" +
          `${registro.collectionId}/` +
          `${registro.id}/` +
          registro[campo];
      }
    });
  }
}

export const colecciones = new GestorColecciones();
