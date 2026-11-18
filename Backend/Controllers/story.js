const asyncErrorWrapper = require("express-async-handler")
const Story = require("../Models/story");
const deleteImageFile = require("../Helpers/Libraries/deleteImageFile");
const {searchHelper, paginateHelper} =require("../Helpers/query/queryHelpers")

const addStory = asyncErrorWrapper(async  (req,res,next)=> {

    const {title,content,category,excerpt,status,labels,searchDescription,customSlug,publishedAt} = req.body 

    var wordCount = content ? content.trim().split(/\s+/).length : 0 ; 
   
    let readtime = Math.max(1, Math.ceil(wordCount / 200)) ;

    // Parse labels
    let parsedLabels = [];
    if (Array.isArray(labels)) {
        parsedLabels = labels.map(l => String(l).trim()).filter(Boolean);
    } else if (typeof labels === "string" && labels.trim() !== "") {
        parsedLabels = labels.split(",").map(l => l.trim()).filter(Boolean);
    }

    const storyStatus = status === "draft" ? "draft" : "published";

    try {
        const newStory = await Story.create({
            title,
            content,
            category: category || "Engineering Insights",
            excerpt: excerpt || "",
            status: storyStatus,
            labels: parsedLabels,
            searchDescription: searchDescription || "",
            customSlug: customSlug || "",
            publishedAt: publishedAt || (storyStatus === "published" ? Date.now() : null),
            author :req.user._id ,
            image : req.savedStoryImage || "default.jpg",
            readtime
        })

        return res.status(200).json({
            success :true ,
            message : "add story successfully ",
            data: newStory
        })
    }

    catch(error) {

        deleteImageFile(req)

        return next(error)
        
    }
  
})

const getAllStories = asyncErrorWrapper( async (req,res,next) =>{

    const baseFilter = { status: { $ne: "draft" } };

    let query = Story.find(baseFilter).populate("author", "username photo");

    query =searchHelper("title",query,req)

    const paginationResult =await paginateHelper(Story , query ,req, baseFilter)

    query = paginationResult.query  ;

    query = query.sort("-likeCount -commentCount -createdAt")

    const stories = await query
    
    return res.status(200).json(
        {
            success:true,
            count : stories.length,
            total : paginationResult.total,
            data : stories ,
            page : paginationResult.page ,
            pages : paginationResult.pages
        })

})

const getMyStories = asyncErrorWrapper(async (req, res, next) => {
    const baseFilter = { author: req.user._id };

    if (req.query.status === "published") {
        baseFilter.status = { $ne: "draft" };
    } else if (req.query.status === "draft") {
        baseFilter.status = "draft";
    }

    if (req.query.label && req.query.label !== "All") {
        baseFilter.labels = req.query.label;
    }

    let query = Story.find(baseFilter).populate("author", "username photo");

    query = searchHelper("title", query, req);

    const paginationResult = await paginateHelper(Story, query, req, baseFilter);

    query = paginationResult.query;
    query = query.sort("-createdAt");

    const stories = await query;
    const userLabels = await Story.distinct("labels", { author: req.user._id });

    // Aggregate counts for tabs
    const totalAll = await Story.countDocuments({ author: req.user._id });
    const totalPublished = await Story.countDocuments({ author: req.user._id, status: { $ne: "draft" } });
    const totalDrafts = await Story.countDocuments({ author: req.user._id, status: "draft" });

    return res.status(200).json({
        success: true,
        count: stories.length,
        total: paginationResult.total,
        data: stories,
        userLabels: userLabels.filter(Boolean),
        counts: {
            all: totalAll,
            published: totalPublished,
            drafts: totalDrafts
        },
        page: paginationResult.page,
        pages: paginationResult.pages
    });
});

const detailStory =asyncErrorWrapper(async(req,res,next)=>{

    const {slug}=req.params ;
    const {activeUser} =req.body 

    // Increment views count atomically
    const story = await Story.findOneAndUpdate(
        { slug: slug },
        { $inc: { views: 1 } },
        { new: true }
    ).populate("author likes");

    if (!story) {
        return res.status(404).json({
            success: false,
            message: "Story not found"
        });
    }

    const storyLikeUserIds = (story.likes || []).map(json => json._id ? json._id.toString() : (json.id || json))
    const likeStatus = activeUser && activeUser._id ? storyLikeUserIds.includes(activeUser._id.toString()) : false


    return res.status(200).
        json({
            success:true,
            data : story,
            likeStatus:likeStatus
        })

})

const likeStory =asyncErrorWrapper(async(req,res,next)=>{

    const {activeUser} =req.body 
    const {slug} = req.params ;

    const story = await Story.findOne({
        slug: slug 
    }).populate("author likes")
   
    const storyLikeUserIds = story.likes.map(json => json._id.toString())
   
    if (! storyLikeUserIds.includes(activeUser._id)){

        story.likes.push(activeUser)
        story.likeCount = story.likes.length
        await story.save() ; 
    }
    else {

        const index = storyLikeUserIds.indexOf(activeUser._id)
        story.likes.splice(index,1)
        story.likeCount = story.likes.length

        await story.save() ; 
    }
 
    return res.status(200).
    json({
        success:true,
        data : story
    })

})

const editStoryPage  =asyncErrorWrapper(async(req,res,next)=>{
    const {slug } = req.params ; 
   
    const story = await Story.findOne({
        slug: slug 
    }).populate("author likes")

    return res.status(200).
        json({
            success:true,
            data : story
    })

})


const editStory = asyncErrorWrapper(async(req,res,next)=>{
    const {slug } = req.params ; 
    const {title ,content ,image ,previousImage, category, excerpt, status, labels, searchDescription, customSlug, publishedAt } = req.body;

    const story = await Story.findOne({slug : slug });

    if (!story) {
        return res.status(404).json({
            success: false,
            message: "Story not found"
        });
    }

    // IDOR check: author or admin
    if (story.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Unauthorized to edit this story"
        });
    }

    if (title) story.title = title ;
    if (content) story.content = content ;
    if (category) story.category = category ;
    if (typeof excerpt === "string") story.excerpt = excerpt ;
    if (typeof searchDescription === "string") story.searchDescription = searchDescription ;
    if (typeof customSlug === "string") story.customSlug = customSlug ;
    if (status && ["published", "draft"].includes(status)) {
        story.status = status;
        if (status === "published" && !story.publishedAt) {
            story.publishedAt = Date.now();
        }
    }
    if (publishedAt) story.publishedAt = new Date(publishedAt);

    if (labels !== undefined) {
        if (Array.isArray(labels)) {
            story.labels = labels.map(l => String(l).trim()).filter(Boolean);
        } else if (typeof labels === "string") {
            story.labels = labels.split(",").map(l => l.trim()).filter(Boolean);
        }
    }

    const wordCount = content ? content.trim().split(/\s+/).length : 0 ;
    story.readtime = Math.max(1, Math.ceil(wordCount / 200)) ;

    if(req.savedStoryImage) {
        deleteImageFile(req, previousImage || story.image);
        story.image = req.savedStoryImage;
    } else if (image) {
        story.image = image;
    }

    await story.save()  ;

    return res.status(200).json({
        success:true,
        data :story
    });
});

const updateStoryStatus = asyncErrorWrapper(async(req, res, next) => {
    const { slug } = req.params;
    const { status } = req.body;

    if (!["published", "draft"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status value. Must be 'published' or 'draft'."
        });
    }

    const story = await Story.findOne({ slug });

    if (!story) {
        return res.status(404).json({
            success: false,
            message: "Story not found"
        });
    }

    // IDOR check: author or admin
    if (story.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Unauthorized to update this story's status"
        });
    }

    story.status = status;
    if (status === "published" && !story.publishedAt) {
        story.publishedAt = Date.now();
    }

    await story.save();

    return res.status(200).json({
        success: true,
        message: `Story status updated to ${status}`,
        data: story
    });
});

const deleteStory  =asyncErrorWrapper(async(req,res,next)=>{

    const {slug} = req.params  ;

    const story = await Story.findOne({slug : slug });

    if (!story) {
        return res.status(404).json({
            success: false,
            message: "Story not found"
        });
    }

    // IDOR check: author or admin
    if (story.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Unauthorized to delete this story"
        });
    }

    deleteImageFile(req, story.image);

    if (typeof story.deleteOne === "function") {
        await story.deleteOne();
    } else {
        await story.remove();
    }

    return res.status(200).
        json({
            success:true,
            message : "Story delete succesfully "
    })

})


module.exports ={
    addStory,
    getAllStories,
    getMyStories,
    detailStory,
    likeStory,
    editStoryPage,
    editStory ,
    updateStoryStatus,
    deleteStory
}
