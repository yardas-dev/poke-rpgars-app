/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // update field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2009963058",
    "help": "",
    "hidden": false,
    "id": "relation2815701126",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "forma_previa",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(13, new Field({
    "help": "",
    "hidden": false,
    "id": "select3202742145",
    "maxSelect": 0,
    "name": "metodo_obtencion",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "aumento de atributo",
      "nivel de experiencia",
      "exposición a objeto",
      "megaevolución",
      "otro"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // update field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2009963058",
    "help": "",
    "hidden": false,
    "id": "relation2815701126",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "preevolucion",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(13, new Field({
    "help": "",
    "hidden": false,
    "id": "select3202742145",
    "maxSelect": 0,
    "name": "metodo_obtencion",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "cambio de forma",
      "evolución por experiencia",
      "evolución por objeto",
      "megaevolución",
      "otro"
    ]
  }))

  return app.save(collection)
})
