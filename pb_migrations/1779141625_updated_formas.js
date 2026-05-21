/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // add field
  collection.fields.addAt(4, new Field({
    "help": "",
    "hidden": false,
    "id": "select852067889",
    "maxSelect": 0,
    "name": "tipo_contenido",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "lícito",
      "delicado",
      "censurado"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // remove field
  collection.fields.removeById("select852067889")

  return app.save(collection)
})
