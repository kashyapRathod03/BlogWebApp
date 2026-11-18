const express = require("express")
const imageupload = require("../Helpers/Libraries/imageUpload");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
const {addStory,getAllStories,getMyStories,detailStory,likeStory, editStory, updateStoryStatus, deleteStory, editStoryPage } = require("../Controllers/story")
const { checkStoryExist, checkUserAndStoryExist } = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router() ;

router.post("/addstory" ,[getAccessToRoute, imageupload.single("image")],addStory)
router.get("/myStories", getAccessToRoute, getMyStories)

router.post("/:slug", checkStoryExist, detailStory)

router.post("/:slug/like",[getAccessToRoute,checkStoryExist] ,likeStory)

router.get("/editStory/:slug",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist] , editStoryPage)

router.put("/:slug/edit",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist, imageupload.single("image")] ,editStory)
router.put("/:slug/status",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist] ,updateStoryStatus)

router.delete("/:slug/delete",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist] ,deleteStory)

router.get("/getAllStories",getAllStories)


module.exports = router
