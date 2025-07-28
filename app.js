const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bundleRoutes = require('./routes/bundleRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');


// const swaggerUi = require('swagger-ui-express');
// const swaggerDoc = require('./swagger.json');

dotenv.config();

const app = express();
app.use(cors()); 

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/bundles', bundleRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = app;
