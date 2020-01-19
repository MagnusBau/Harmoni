const express = require("express");

const fileController = require("../controllers/file");
const fileInfoController = require("../controllers/fileInfo");

const router = express.Router();

router.get("/download", fileController.download);
router.post("/upload/:eventId", fileController.upload);
router.put("/update", fileController.update);
router.delete("/delete", fileController.delete);

router.get("/info/:eventId", fileInfoController.getFileInfoByEvent);
router.post("/check/:eventId", fileInfoController.checkFileName);
router.get("/download/:file", fileInfoController.downloadFile);
router.get("/edit/:file", fileInfoController.getFileContent);
router.delete("/delete/:file", fileInfoController.deleteFileInfo);


module.exports = router;
