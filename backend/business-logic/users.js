// const messageStore = persistentDataAccess(
//   `message JOIN 'User' ON Message.userId=User.id`
// );

const userManager = {
  createMessage: async (user, messageContent, channelId) => {
    const message = {
      text: messageContent,
      user: user,
      channelId: channelId,
      date: new Date(),
    };
    await messageStore.create(message);
    return message;
  },
  updateMessage: async (message) => {
    return messageStore.update(message.id, message);
  },
  removeMessage: async (messageId) => {
    await messageStore.remove(messageId);
    return true;
  },
  getMessage: async (messageId) => {
    const message = await messageStore.read(messageId);
    if (!message) {
      throw new Error(`Could not find message with id ${messageId}!`);
    }
    return message;
  },
  getAllMessages: async () => {
    const messagesAll = await messageStore.all();
    console.log(`GETALLMESSAGES: ${messagesAll}`);
    if (!messagesAll) {
      throw new Error(`Could not find any messages!`);
    }
    return messagesAll;
  },
  getMessagesForChannel: async (channelId) => {
    const messagesResult = [];
    const allMessages = await messageStore.all();
    allMessages.forEach((message) => {
      if (message.channelId == channelId) {
        messagesResult.push(message);
      }
    });
    return messagesResult;
  },
};

module.exports = userManager;
