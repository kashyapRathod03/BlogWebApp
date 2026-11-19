const express = require("express");
const imageupload = require("../Helpers/Libraries/imageUpload");
const { cachePublic, cachePrivate } = require("../Middlewares/cache/cacheControl");
const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
const {
  addStory,
  getAllStories,
  getMyStories,
  detailStory,
  likeStory,
  editStory,
  updateStoryStatus,
  deleteStory,
  editStoryPage,
} = require("../Controllers/story");
const {
  checkStoryExist,
  checkUserAndStoryExist,
} = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router();

// 1. Static Public Read Routes (Cached for CDN & Edge delivery)
router.get("/getAllStories", cachePublic(60), getAllStories);
router.get("/public/articles", cachePublic(60), getAllStories);

// 2. Static Private Author & Management Routes (Zero Cache Protection)
router.post("/addstory", [getAccessToRoute, cachePrivate, imageupload.single("image")], addStory);
router.get("/myStories", [getAccessToRoute, cachePrivate], getMyStories);
router.get("/articles/my", [getAccessToRoute, cachePrivate], getMyStories);

// 3. Parameterized Sub-action Routes
router.get(
  "/editStory/:slug",
  [getAccessToRoute, cachePrivate, checkStoryExist, checkUserAndStoryExist],
  editStoryPage
);
router.post("/:slug/like", [getAccessToRoute, cachePrivate, checkStoryExist], likeStory);
router.put(
  "/:slug/edit",
  [getAccessToRoute, cachePrivate, checkStoryExist, checkUserAndStoryExist, imageupload.single("image")],
  editStory
);
router.put(
  "/:slug/status",
  [getAccessToRoute, cachePrivate, checkStoryExist, checkUserAndStoryExist],
  updateStoryStatus
);
router.delete(
  "/:slug/delete",
  [getAccessToRoute, cachePrivate, checkStoryExist, checkUserAndStoryExist],
  deleteStory
);

// 4. Parameterized Public Article Read Routes (MUST BE AT THE VERY BOTTOM to prevent shadowing static routes)
router.get("/public/articles/:slug", [checkStoryExist, cachePublic(60)], detailStory);
router.get("/:slug", [checkStoryExist, cachePublic(60)], detailStory);
router.post("/:slug", checkStoryExist, detailStory);

module.exports = router;
