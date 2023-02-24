import RabbitConnection from '../../../../config/rabbit-mq.config';

async function testNotification(body) {
  RabbitConnection.sendMessage(body, process.env.EMAIL_QUEUE);
  RabbitConnection.generateNotification(body, process.env.NOTIFICATION_QUEUE);

  return {
    statusCode: 200,
    success: true,
    message: 'Message sent',
  };
}

export default {
  testNotification,
};
