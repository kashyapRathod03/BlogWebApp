const express = require("express")
const { cachePrivate } = require("../Middlewares/cache/cacheControl");

const imageUpload = require("../Helpers/Libraries/imageUpload");

const {profile,editProfile,changePassword,addStoryToReadList,readListPage} = require("../Controllers/user");
const { getAccessToRoute } = require("../Middlewares/Authorization/auth");


const router = express.Router() ;

router.use(cachePrivate);

router.get("/profile",getAccessToRoute ,profile)

router.post("/editProfile",[getAccessToRoute ,imageUpload.single("photo")],editProfile)

router.put("/changePassword",getAccessToRoute,changePassword)

router.post("/:slug/addStoryToReadList",getAccessToRoute ,addStoryToReadList)

router.get("/readList",getAccessToRoute ,readListPage)



module.exports = router