/* eslint-disable arrow-parens */

import Server from './config/server';
import './config/env';
import routes from './router';
import RabbitConnection from './config/rabbit-mq.config';

const SLEEP_TIME = process.env.SLEEP_TIME || 30000;

const main = async () => {
  const server = new Server().router(routes);
  server.listen(process.env.PORT);
  RabbitConnection.getInstance();
};

setTimeout(() => {
  main();
}, SLEEP_TIME);
