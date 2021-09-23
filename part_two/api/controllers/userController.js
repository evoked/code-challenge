const User = require('../models/User');

const postNewUser = async (user) => {
  try {
    const newUser = new User({ ...user });
    const doesExist = await User.exists({username: newUser.username})
    if(doesExist) {
      throw new Error('user exists')
    }
    const dbEntry = await newUser.save();
    return dbEntry;
  } catch (err) {
    throw new Error(err);
  }
};

const retrieveAllUsers = async () => {
  try {
    const allUsers = await User.find({});
    if(allUsers.length < 1) throw new Error('no users found')
    return allUsers;
  } catch (err) {
    throw new Error(err);
  }
};

const findUser = async (username) => {
  try {
    let user = await User.findOne({username: username}).populate('surveys')
    if(!user) throw new Error('user not found')
    return user
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { postNewUser, retrieveAllUsers, findUser };
