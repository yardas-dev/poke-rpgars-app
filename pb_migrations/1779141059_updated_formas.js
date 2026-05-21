/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // update field
  collection.fields.addAt(13, new Field({
    "help": "",
    "hidden": false,
    "id": "select1274211008",
    "maxSelect": 0,
    "name": "tipo_forma",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "habitual",
      "factor gigamax",
      "megaevolución",
      "regional",
      "temporal",
      "variedad"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // update field
  collection.fields.addAt(13, new Field({
    "help": "",
    "hidden": false,
    "id": "select1274211008",
    "maxSelect": 0,
    "name": "clase",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "habitual",
      "factor gigamax",
      "megaevolución",
      "regional",
      "temporal",
      "variedad"
    ]
  }))

  return app.save(collection)
})
