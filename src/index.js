import express from 'express';
import productRoutes from './routes/products.routes.js';
import categoreiesRoutes from './routes/categories.routes.js';

const app = express();

app.use(express.json());

// Set up routes
app.use('/api', productRoutes);
app.use('/api', categoreiesRoutes);

app.listen(3001, () => {
    console.log('server started');
});