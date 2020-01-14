const express = require("express");

const fileController = require("../controllers/file");
const fileInfoController = require("../controllers/fileInfo");

const router = express.Router();

router.get("/files/download", fileController.download);
router.post("/files/upload", fileController.upload);
router.put("/files/update", fileController.update);
router.delete("/files/delete", fileController.delete);

router.get("/info/:eventId", fileInfoController.getFileInfoByEvent);


module.exports = router;
