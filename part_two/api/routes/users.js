const express = require('express');
const { postNewUser, retrieveAllUsers, findUser } = require('../controllers/userController');

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const allUsers = await retrieveAllUsers();
    return res.status(200).send(allUsers);
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});
router.get('/:username', async (req,res) => {
  try {
    const { username } = req.params
    let parsedUser = await findUser(username)
    return res.status(200).send({user: parsedUser})
  } catch (error) {
    return res.status(404).send({error: error.message})
  }
})

router.post('/new_user', async (req, res) => {
  try {
    const user = { ...req.body }
    const newUser = await postNewUser(user);
    return res.status(200).send(newUser);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});


module.exports = router;
