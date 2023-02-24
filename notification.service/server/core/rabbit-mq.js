/* eslint-disable import/no-cycle */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-const */
import amqp from 'amqplib';
import mail from '../utils/smpt';
import socketServer from '../index';

const RabbitSettings = {
  protocol: 'amqp',
  hostname: process.env.RABBIT_MQ_HOST,
  port: process.env.RABBIT_MQ_PORT,
  username: process.env.RABBIT_MQ_USER_NAME,
  password: process.env.RABBIT_MQ_PASSWORD,
  authMechanism: 'AMQPLAIN',
  vhost: '/',
};

class RabbitConnection {
  constructor() {
    RabbitConnection.createConnection();
    this.connection = null;
    this.channel = null;
  }

  static getInstance() {
    if (!RabbitConnection.instance) {
      RabbitConnection.instance = new RabbitConnection();
    }
    return RabbitConnection.instance;
  }

  // create connection to rabbitmq

  static async createConnection() {
    try {
      this.connection = await amqp.connect(
        `${RabbitSettings.protocol}://${RabbitSettings.username}:${RabbitSettings.password}@${RabbitSettings.hostname}:${RabbitSettings.port}${RabbitSettings.vhost}`
      );
      this.channel = await this.connection.createChannel();
      this.channel.assertQueue(process.env.NOTIFICATION_QUEUE);
      this.channel.assertQueue(process.env.EMAIL_QUEUE);

      // consumer functions

      this.channel
        .consume(process.env.EMAIL_QUEUE, data => {
          const recievedData = JSON.parse(data.content);
          const mailData = {
            subject: 'Enter desired subject here',
            html: `${recievedData.message}`,
          };
          mail(recievedData.email, mailData);
          this.channel.ack(data);
        })
        .catch(err => {
          console.log(err);
        });

      this.channel
        .consume(process.env.NOTIFICATION_QUEUE, data => {
          const recievedData = JSON.parse(data.content);
          socketServer.generateNotification(
            recievedData.userId,
            recievedData.message
          );

          this.channel.ack(data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default RabbitConnection;
