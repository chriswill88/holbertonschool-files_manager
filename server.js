import express from 'express';
import {
  statusRoute, statsRoute, userRoute, authRoute,
} from './routes/index';

const app = express();
app.use(express.json());

app.use('/', statusRoute);
app.use('/', statsRoute);
app.use('/', userRoute);
app.use('/', authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

export default app;
