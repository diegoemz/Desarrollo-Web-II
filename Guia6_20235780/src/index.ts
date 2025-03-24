import express from 'express';
import router from './routes';
import { connectDB } from './db';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/', router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch(error => {
    console.error('Error al conectar a la base de datos:', error);
});

export default app;
