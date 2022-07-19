const path = require("path");
const multer = require("multer");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), `uploads/${req.baseUrl}`));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.upload = multer({ storage });