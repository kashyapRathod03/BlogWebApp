const mongoose = require("mongoose")
const Comment = require("./comment")
const slugify = require("slugify")

const StorySchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    slug: String,
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true,
        minlength: [4, "Please provide a title least 4 characters "],
    },
    content: {
        type: String,
        required: [true, "Please a provide a content "],
        minlength: [10, "Please provide a content least 10 characters "],
    },
    category: {
        type: String,
        default: "Engineering Insights"
    },
    excerpt: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "default.jpg"
    },
    readtime: {
        type: Number,
        default: 3
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    comments: [{
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
    }],
    commentCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["published", "draft"],
        default: "published"
    },
    labels: {
        type: [String],
        default: []
    },
    searchDescription: {
        type: String,
        default: ""
    },
    customSlug: {
        type: String,
        default: ""
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

StorySchema.index({ slug: 1 });
StorySchema.index({ author: 1, createdAt: -1 });
StorySchema.index({ category: 1, createdAt: -1 });
StorySchema.index({ status: 1, createdAt: -1 });
StorySchema.index({ labels: 1 });

StorySchema.pre("save",  function (next) {

    if (!this.isModified("title") && !this.isModified("customSlug") && this.slug) {
        return next();
    }

    if (this.customSlug && this.customSlug.trim() !== "") {
        this.slug = slugify(this.customSlug, {
            replacement: '-',
            remove: /[*+~.()'"!:@/?]/g,
            lower: true,
            strict: false,
            locale: 'tr',
            trim: true
        });
    } else {
        this.slug = this.makeSlug();
    }

    next()

})

StorySchema.pre("remove", async function (next) {

    const story= await Story.findById(this._id)

    await Comment.deleteMany({
        story : story 
    })

})

StorySchema.methods.makeSlug = function () {
    return slugify(this.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@/?]/g,
        lower: true,
        strict: false,
        locale: 'tr',
        trim: true
    })

}

const Story = mongoose.model("Story", StorySchema)

module.exports = Story;
