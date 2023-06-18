const router = require("express").Router(),
  ctrl = require("../conrtollers/NewsCtrl");

router.post("/", ctrl.createEntity);

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.put("/:id", ctrl.updateEntity);

router.delete("/:id", ctrl.deleteById);

module.exports = router;
