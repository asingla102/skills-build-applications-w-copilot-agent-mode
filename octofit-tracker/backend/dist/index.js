import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/database.js';
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
async function start() {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`OctoFit API ready at ${baseUrl}`);
    });
}
start().catch((error) => {
    console.error('Failed to start backend:', error);
    process.exit(1);
});
