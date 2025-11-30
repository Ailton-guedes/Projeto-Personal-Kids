import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.BACK_PORT || 6011;

app.use('/', routes);

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Backend is up on http://localhost:${PORT}`);
})