import express from 'express'; 
import 'reflect-metadata';
import './database/connection';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3001, () => console.log('Executando back-end na porta 3001...')); 