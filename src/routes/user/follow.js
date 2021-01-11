const router = require('express').Router();
const Auth = require('../../middelware/auth');
const User = require('../../model/user');
router.put('/follow', Auth, async (req, res) => {
  try {
    const { followId } = req.body;
    const { user } = req;
    const userFollowed = await User.findById(followId);
    if (!userFollowed)
      return res.status(400).json({ err: 'can not access this user' });
    userFollowed.followers = userFollowed.followers.concat(user._id);
    user.following = user.following.concat(userFollowed._id);
    await user.save();
    await userFollowed.save();
    return res.json({ user, userFollowed });
  } catch (e) {
    console.log(e);
    if (e.message) return res.status(400).json({ err: e.message });
    else return res.status(400).json({ err: 'something wrong' });
  }
});

router.put('/unfollow', Auth, async (req, res) => {
  try {
    const { followId } = req.body;
    const { user } = req;
    const userFollowed = await User.findById(followId);
    if (!userFollowed)
      return res.status(400).json({ err: 'can not access this user' });
    if (!userFollowed.followers.includes(user._id.toString()))
      return res
        .status(400)
        .json({ err: 'can not unfollow when your not following' });
    userFollowed.followers = userFollowed.followers.filter(
      (id) => id.toString() != user._id.toString()
    );
    user.following = user.following.filter(
      (id) => id.toString() != userFollowed._id.toString()
    );
    await user.save();
    await userFollowed.save();
    return res.json({ user, userFollowed });
  } catch (e) {
    console.log(e);
    if (e.message) return res.status(400).json({ err: e.message });
    else return res.status(400).json({ err: 'something wrong' });
  }
});
module.exports = router;
