const express = require("express");

const fileController = require("../controllers/file");
const fileInfoController = require("../controllers/fileInfo");

const router = express.Router();

router.get("/info/:eventId", fileInfoController.getFileInfoByEvent);
router.post("/check/:eventId", fileInfoController.checkFileName);
router.get("/download/:file", fileInfoController.downloadFile);
router.get("/download/contract/:artistId", fileInfoController.downloadContract);
router.get("/edit/:file", fileInfoController.getFileContent);
router.delete("/delete/:file", fileInfoController.deleteFileInfo);

//router.post("/upload/:eventId", fileController.upload.single('file'));


module.exports = router;
