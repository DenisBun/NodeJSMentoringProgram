import app from './app';
import Sequelize from 'sequelize';

import productRouter from './routes/products';
import userRouter from './routes/users';
import authRouter from './routes/auth';

// export const sequelize = new Sequelize('Mentoring', 'postgres', 'root', {
//   host: 'localhost',
//   dialect: 'postgres'}
// );

// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });

const port = 8000;

app.use('/', productRouter);
app.use('/', userRouter);
app.use('/', authRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));