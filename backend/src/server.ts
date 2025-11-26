import express from 'express';
import routes from './route';

const app = express();
const PORT = process.env.BACK_PORT || 6011;





app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Backend is up on http://localhost:${PORT}`);  
});