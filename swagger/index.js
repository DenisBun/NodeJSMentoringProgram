import swagger from 'swagger-node-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  info: {
    title: 'NodeJS mentoring program',
    version: '1.0.0',
    description: 'API docs for NodeJS mentoring program',
  },
  protocol: 'http',
  host: 'localhost:8080',
  basePath: '/api',
  securityDefinitions: {
    APIKeyHeader: {
      type: 'apiKey',
      in: 'header',
      name: 'token',
    },
  },
};

const apis = [
  './routes/**/*.js',
  './swagger/definitions.yaml',
  './swagger/parameters.yaml',
  './swagger/responses.yaml',
];

const options = { swaggerDefinition, apis };

const swaggerSpec = swaggerJSDoc(options);

export default function (app) {
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  swagger.setAppHandler(app);
}
