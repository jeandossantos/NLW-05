import  { http } from './http';
import './socket/client';
import './socket/admin';

http.listen(3001, () => console.log('Executando back-end na porta 3001...')); 