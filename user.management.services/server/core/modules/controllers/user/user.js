/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
import UserService from '../../services/user/user';

export default {
  testNotification: async (req, res) => {
    try {
      const { body } = req;
      const response = await UserService.testNotification(body);
      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
