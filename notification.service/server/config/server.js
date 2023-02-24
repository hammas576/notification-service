/* eslint-disable operator-linebreak */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    const app = new Express();
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '1000kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '1000kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '1000kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(path.join(__dirname, './public')));
    app.use(
      cors({
        origin: '*',
      })
    );

    app.get('/', (req, res) => {
      res.sendFile(`${__dirname}/public/index.html`);
    });

    this.app = app;
    this.httpServer = http.createServer(this.app);
  }

  getHttpServer() {
    return this.httpServer;
  }

  listen(port = process.env.PORT || 3000) {
    const welcome = p => () => {
      const msg = `up and running in ${process.env.NODE_ENV ||
        'development'} @: ${os.hostname()} on port: ${p}}`;
      // eslint-disable-next-line no-console
      console.info(msg);
      return msg;
    };

    this.app.use((req, res) => {
      res.status(404).json({ message: `${req.url} path not found` });
    });

    this.httpServer.listen(port, welcome(port));
  }
}
