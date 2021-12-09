const { User, mongoose } = require('../data-access/db.js');

const userManager = {
  postUser: async (userData) => {
    try {
      const user = await User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        email: userData.email,
        password: userData.password,
      });
      console.log(user);
      return user;
      mongoose.connection.close();
    } catch (err) {
      console.log(err.message);
    }
  },
  getUser: async (userId) => {
    const user = await userStore.read(userId);
    if (!user) {
      throw new Error(`Could not find user with id ${userId}!`);
    }
    return user;
  },
  getAllUsers: async () => {
    const usersAll = await userStore.all();
    console.log(`GETALLuserS: ${usersAll}`);
    if (!usersAll) {
      throw new Error(`Could not find any users!`);
    }
    return usersAll;
  },
  putUser: async (user) => {
    return userStore.update(user.id, user);
  },
  deleteUser: async (userId) => {
    await userStore.remove(userId);
    return true;
  },
};

module.exports = userManager;
