import fastify from 'fastify';
import FastifyView from '@fastify/view';
import FastifyStatic from '@fastify/static';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoute from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = fastify();

// Servir arquivos estáticos
app.register(FastifyStatic, {
  root: path.join(__dirname, './static'),
  prefix: '/static/',
});

// Configurar views com EJS
app.register(FastifyView, {
  engine: { ejs },
  root: path.resolve('./views')
});

// Registrar rotas da aplicação
indexRoute(app);

// Rota para API que retorna os dados da tabela selecionada
app.get('/api/tables/:name', (req, reply) => {
  const { name } = req.params;

  let data;
  switch (name) {
    case 'produtos':
      data = [
        { id: 1, name: 'Produto A', job: 'Desenvolvedor', phone: '123-456', institution: 'Empresa A' },
        { id: 2, name: 'Produto B', job: 'Designer', phone: '789-101', institution: 'Empresa B' },
      ];
      break;
    case 'clientes':
      data = [
        { id: 1, name: 'Cliente X', job: 'Gerente', phone: '456-789', institution: 'Empresa X' },
        { id: 2, name: 'Cliente Y', job: 'Supervisor', phone: '123-101', institution: 'Empresa Y' },
      ];
      break;
    case 'produtores':
      data = [
        { id: 1, name: 'Produtor A', job: 'Produtor de vídeo', phone: '111-222', institution: 'Produtora A' },
        { id: 2, name: 'Produtor B', job: 'Produtor de áudio', phone: '333-444', institution: 'Produtora B' },
      ];
      break;
    default:
      data = [];
  }

  reply.send(data);
});

// Iniciar o servidor
app.listen({ port: 3030 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server is running on http://localhost:3030');
});
