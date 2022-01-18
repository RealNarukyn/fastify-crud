import Fastify from 'fastify';

import config from './config';
import * as fastify from './types/fastify.type';

import mainApp from './app';

const app: fastify.FastifyApp = Fastify({
  logger: config.APP.logger,
  pluginTimeout: 10000,
  disableRequestLogging: false
});

app.register(mainApp);

app.listen(config.APP.port, '0.0.0.0', (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
