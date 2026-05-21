/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // update field
  collection.fields.addAt(14, new Field({
    "help": "",
    "hidden": false,
    "id": "select1976209255",
    "maxSelect": 0,
    "name": "ritmo_experiencia",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "rápido",
      "medio",
      "lento"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // update field
  collection.fields.addAt(14, new Field({
    "help": "",
    "hidden": false,
    "id": "select1976209255",
    "maxSelect": 0,
    "name": "ritmo_evolucion",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "rápido",
      "medio",
      "lento"
    ]
  }))

  return app.save(collection)
})
