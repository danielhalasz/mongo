const userManager = require('../business-logic/users');

module.exports = userController = {
  get: async (req, res) => {
    try {
      const messages = await messageManager.getAllMessages();
      console.log(messages);
      res.status(200).send(JSON.stringify(messages));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getMessagesForChannel: async (req, res) => {
    try {
      const channelId = req.params.channelId;
      const messages = await messageManager.getMessagesForChannel(channelId);
      res.status(200).send(JSON.stringify(messages));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  put: async (req, res) => {
    try {
      const messageId = req.params.messageId;
      const newData = req.body;
      const messages = await messageManager.getAllMessages();
      const savedUserMessage = messages.find(
        (message) => message['user'] === req.user
      );
      if (savedUserMessage === undefined || newData.id !== messageId) {
        throw Error('Cannot change message!');
      }
      await messageManager.updateMessage(newData);
      res.status(200).send(JSON.stringify(newData));
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  post: async (req, res) => {
    try {
      const user = req.user;
      const content = req.body.text;
      const channelId = req.params.channelId;
      const message = await messageManager.createMessage(
        user,
        content,
        channelId
      );
      res.status(200).send(JSON.stringify(message));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  delete: async (req, res) => {
    try {
      const messageId = req.params.messageId;
      const messages = await messageManager.getAllMessages();
      const savedUserMessage = messages.find(
        (message) => message['user'] === req.user
      );
      if (savedUserMessage === undefined) {
        throw Error('Cannot delete message!');
      }
      await messageManager.removeMessage(messageId);
      res.status(200).send(
        JSON.stringify({
          message: `Message ${messageId} was successfully deleted!`,
        })
      );
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = userController;
