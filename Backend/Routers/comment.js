const express = require("express")
const { cachePublic, cachePrivate } = require("../Middlewares/cache/cacheControl");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const { addNewCommentToStory ,getAllCommentByStory,commentLike ,getCommentLikeStatus} = require("../Controllers/comment")

const { checkStoryExist } = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router() ;


router.post("/:slug/addComment",[getAccessToRoute, cachePrivate, checkStoryExist] ,addNewCommentToStory)

router.get("/:slug/getAllComment", cachePublic(60), getAllCommentByStory)

router.post("/:comment_id/like", [cachePrivate], commentLike)

router.post("/:comment_id/getCommentLikeStatus", [cachePrivate], getCommentLikeStatus)


module.exports = router