/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

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
      "megaevolución"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // update field
  collection.fields.addAt(13, new Field({
    "help": "",
    "hidden": false,
    "id": "select3202742145",
    "maxSelect": 0,
    "name": "metodo_evolucion",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "experiencia"
    ]
  }))

  return app.save(collection)
})
