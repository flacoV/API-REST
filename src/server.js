const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

// Importar las rutas
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Usar las rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});