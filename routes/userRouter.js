

const express = require("express");
const db = require("../queries");

const router = express.Router();

router.post("/create-user-table",db.create_userTable)
router.post("/", db.create_user);
router.get("/get-users", db.get_users);
router.put("/update-blog:id", db.updateBlog);
router.get("/get-user:id",db.get_user);
router.delete("/del-user:id",db.del_user);


module.exports = router;