const router = require('express').Router();
const Auth = require('../../middelware/auth');
const Post = require('../../model/post');

router.put('/like', Auth, async(req, res) => {
    try {
        const { postId } = req.body;
        const { user } = req;
        if (!postId) return res.status(400).json({ 'err': "fill the all required field" });
        const post = await Post.findById(postId)
            .populate('postedBy', 'name')
            .populate('comments.commentBy', 'name');

        if (!post) return res.status(400).json({ 'err': "can not found this post" });
        if (!post.likes.includes(user._id.toString())) {
            post.likes = post.likes.concat(user._id);
            await post.save();
            return res.json({ post });
        } else {
            post.likes = post.likes.filter(id => id != user._id.toString());
            await post.save();
            return res.json({ post });
        }
    } catch (e) {
        console.log(e);
        if (e.message) return res.status(400).json({ 'err': e.message });
        else return res.status(400).json({ 'err': 'something wrong' });

    }
});
router.put('/unlike', Auth, async(req, res) => {
    try {
        const { postId } = req.body;
        const { user } = req;
        if (!postId) return res.status(400).json({ 'err': "fill the all required field" });
        const post = await Post.findById(postId);
        if (!post) return res.status(400).json({ 'err': "can not found this post" });
        post.likes = post.likes.filter(id => id != user._id.toString());
        await post.save();
        return res.json({ post });
    } catch (e) {
        console.log(e);
        if (e.message) return res.status(400).json({ 'err': e.message });
        else return res.status(400).json({ 'err': 'something wrong' });
    }
});

module.exports = router;