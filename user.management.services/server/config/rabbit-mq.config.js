/* eslint-disable comma-dangle */
/* eslint-disable prefer-const */
import amqp from 'amqplib';

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
      console.log('Connection to RabbitMQ established');
    } catch (error) {
      console.log(error);
    }
  }

  // send message to rabbitmq queue

  static async sendMessage(data, queueName) {
    try {
      let msg = await this.channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(data))
      );
      console.log('Message sent to RabbitMQ');
      return msg;
    } catch (error) {
      return error;
    }
  }

  static async generateNotification(data, queueName) {
    try {
      let msg = await this.channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(data))
      );
      console.log('Message sent to RabbitMQ');
      return msg;
    } catch (error) {
      return error;
    }
  }
}

export default RabbitConnection;
