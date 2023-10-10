import { Application } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import * as fs from 'fs';

export const setupSwagger = (app: Application) => {
  const swaggerFile = path.resolve(__dirname, 'swagger.json');
  const swaggerData = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerData));
};
