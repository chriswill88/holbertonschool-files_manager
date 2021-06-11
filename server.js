import express from 'express';
import { status, stats } from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use('/status', status);
app.use('/stats', stats);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
