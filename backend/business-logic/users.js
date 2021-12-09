// const userStore = persistentDataAccess(
//   `user JOIN 'User' ON user.userId=User.id`
// );

const userManager = {
  postUser: async (user, userContent, channelId) => {
    const user = {
      text: userContent,
      user: user,
      channelId: channelId,
      date: new Date(),
    };
    await userStore.create(user);
    return user;
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
