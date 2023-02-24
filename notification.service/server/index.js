/* eslint-disable import/no-cycle */
/* eslint-disable no-new */
/* eslint-disable arrow-parens */

import CustomServer from './config/server';
import './config/env';
import RabbitConnection from './core/rabbit-mq';
import Socket from './core/socket-io';

const SLEEP_TIME = process.env.SLEEP_TIME || 30000;

const server = new CustomServer();
const httpServer = server.getHttpServer();
const socketServer = new Socket(httpServer);
server.listen(process.env.PORT);

setTimeout(() => {
  RabbitConnection.getInstance();
}, SLEEP_TIME);

export default socketServer;
