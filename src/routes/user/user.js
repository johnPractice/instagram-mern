const Router = require('express').Router();
const User = require('../../model/user');
const Auth = require('../../middelware/auth');
Router.post('/signup', async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !password || !email)
      return res.status(400).json({ err: 'required filed must be posted' });
    const check = await User.checUserByEmail(email);
    if (check == true) {
      const newUser = new User({ password, email, name });
      await newUser.save();
      return res.json({ saved: true });
    }
  } catch (e) {
    console.log(e);
    // res.status(400).json({ "error": e });
    res.status(400).json({ err: e.message });
  }
});

Router.post('/login', async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email)
      return res.status(400).json({ err: 'required filed not inserted' });
    const user = await User.loginByEmail({ email, password });
    const token = await user.genAuth();
    res.json({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
    // res.status(400).json("error");
  }
});

Router.put('/', Auth, async (req, res) => {
  const { user } = req;
  // const canUpdate = ['avatar', 'password', 'email', 'name'];
  const { avatar } = req.files;
  console.log(avatar);
  if (!avatar)
    return res.status(400).json({ err: 'required filed not inserted' });
  await avatar.mv(`./public/avatar/${avatar.name}`, async function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: 'Error occured' });
    }
    user.avatar = `avatar/${avatar.name}`;
    await user.save();
    return res.json({ user });
  });
});

module.exports = Router;
