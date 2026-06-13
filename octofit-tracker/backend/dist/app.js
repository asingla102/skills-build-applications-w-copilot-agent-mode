import cors from 'cors';
import express from 'express';
import { apiRouter } from './routes/api.js';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({
        ok: true,
        service: 'octofit-backend',
    });
});
app.use('/api', apiRouter);
export default app;
