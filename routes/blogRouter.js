
const express = require("express");
const db = require("../queries");

const router = express.Router();

router.post("/create-table", db.createtable);
router.post("/create", db.createblog);
router.get("/get-blog",db.get)
router.get("/get-blogs", db.getAll);
router.get("/get/:id", db.get);
router.put("/update/:id", db.updateBlog);
router.delete("/del/:id", db.del);
router.get("/user-blogs:id",db.get_user_blogs);

module.exports = router;
