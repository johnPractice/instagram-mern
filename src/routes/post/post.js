const Router = require('express').Router();
const Post = require('../../model/post');
const Auth = require('../../middelware/auth');
Router.post('/', Auth, async(req, res) => {
    try {
        const { title, body } = req.body;
        const { user } = req;
        if (!title || !body) return res.status(400).json({ 'err': 'required filed not inserted' });
        const post = new Post({ title, body, postedBy: user._id });
        await post.save();
        res.json({ post });

    } catch (e) {
        console.log(e);
        res.status(400).json({ "error": e.message });

    }
});

Router.get('/my', Auth, async(req, res) => {
    try {
        const { user } = req;
        const posts = await Post.find({ postedBy: user._id })
            .populate('postedBy', 'name');
        res.json({ posts });
    } catch (e) {
        console.log(e);
        res.status(400).json({ "error": e.message });
    }
});

Router.get('/all', Auth, async(req, res) => {
    try {
        const posts = await Post.find({})
            .populate('postedBy', 'name');
        res.json({ posts });
    } catch (e) {
        console.log(e);
        res.status(400).json({ "error": e.message });
    }
});



module.exports = Router;