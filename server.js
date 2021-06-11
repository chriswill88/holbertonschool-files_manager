import express from 'express';
import { statusRoute, statsRoute } from './routes/index';

const app = express();
app.use('/', statusRoute);
app.use('/', statsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

export default app;
