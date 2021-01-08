const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: null
    },
    likes: [{
        type: ObjectId,
        ref: 'User',
        default: []
    }],
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
}, {
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});

postSchema.methods.toJSON = function() {
    const postObject = this.toObject();
    // delete postObject._id;
    // delete postObject.id;
    delete postObject.createdAt;
    delete postObject.updatedAt;
    delete postObject.__v;
    return postObject;
};

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;