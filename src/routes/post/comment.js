const router = require('express').Router();
const Auth = require('../../middelware/auth');
const Post = require('../../model/post');
router.put('/comment', Auth, async(req, res) => {
    try {
        const { user } = req;
        const { comment, postId } = req.body;
        if (!comment) return res.status(400).json({ 'err': "can not found this post" });
        const commentObject = {
            text: comment,
            commentBy: user._id
        };
        const post = await Post.findById(postId)
            .populate('comments.commentBy', 'name')
            .populate('postedBy', 'name');
        if (!post) return res.status(400).json({ 'err': "can not found this post" });
        post.comments = post.comments.concat(commentObject);
        await post.save();
        res.json({ post, posted: true });

    } catch (e) {
        console.log(e);
        if (e.message) return res.status(400).json({ 'err': e.message });
        else return res.status(400).json({ 'err': 'something wrong' });
    }
});

module.exports = router;
module.exports = router;