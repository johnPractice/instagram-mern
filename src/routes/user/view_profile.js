const router = require('express').Router();
const Auth = require('../../middelware/auth');
const User = require('../../model/user');
const Post = require('../../model/post');
router.get('/:userId', Auth, async(req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ 'err': "can not find this user" });
        const findUserId = user._id;
        const post = await Post.find({ postedBy: findUserId });
        return res.json({ user, post });
    } catch (e) {
        console.log(e);
        if (e.message) return res.status(400).json({ 'err': e.message });
        else return res.status(400).json({ 'err': 'something wrong' });
    }
});

module.exports = router;