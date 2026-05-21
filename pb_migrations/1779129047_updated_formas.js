/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // add field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "select1274211008",
    "maxSelect": 0,
    "name": "select",
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
      "variante"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2009963058")

  // remove field
  collection.fields.removeById("select1274211008")

  return app.save(collection)
})
