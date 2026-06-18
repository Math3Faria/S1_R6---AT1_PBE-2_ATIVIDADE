import 'dotenv/config';
import express from 'express';
import { initializeDatabase } from './database/connection.database';
import router from './routes/routes';


const app = express();


app.use(express.json());
app.use('/', router);


initializeDatabase().then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
    });
}).catch(err => {
    console.error("Erro ao inicializar o banco de dados:", err);
});



