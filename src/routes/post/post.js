const Router = require('express').Router();
const Post = require('../../model/post');
const Auth = require('../../middelware/auth');

Router.post('/', Auth, async (req, res) => {
  try {
    if (!req.files) {
      return res.status(500).json({ err: 'file is not found' });
    }
    const { title, body } = req.body;
    const { user } = req;
    if (!title || !body)
      return res.status(400).json({ err: 'required filed not inserted' });
    // accessing the file
    const myFile = req.files.post;
    //  mv() method places the file inside public directory
    await myFile.mv(`./public/${myFile.name}`, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ err: 'Error occured' });
      }
      // returing the response with file path and name
      const post = new Post({
        title,
        body,
        postedBy: user._id,
        photo: `/${myFile.name}`,
      });
      await post.save();
      return res.json({ post });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
});

Router.get('/', Auth, async (req, res) => {
  try {
    const { user } = req;
    const posts = await Post.find({ postedBy: user._id }).populate(
      'postedBy',
      'name'
    );
    res.json({ posts, avatar: user.avatar });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
});

Router.delete('/:postId', Auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { user } = req;
    if (!postId)
      return res.status(400).json({ err: 'fill the all required field' });
    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({ err: 'can not found this post' });
    if (post.postedBy.toString() != user._id.toString())
      return res
        .status(400)
        .json({ err: 'you cant not access with this post' });
    await post.remove();
    return res.json({ remove: true, post });
  } catch (e) {
    console.log(e);
    if (e.message) return res.status(400).json({ err: e.message });
    else return res.status(400).json({ err: 'something wrong' });
  }
});
Router.get('/all', Auth, async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('postedBy', 'name')
      .populate('comments.commentBy', 'name');
    res.json({ posts });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
});

module.exports = Router;
