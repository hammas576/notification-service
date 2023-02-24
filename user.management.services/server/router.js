import UserRouter from './core/modules/routers/user/user';

export default function routes(app) {
  app.use('/api/user', UserRouter);
}
