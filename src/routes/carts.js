const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const CARTS_FILE = './src/carts.json';

// Helper function to read JSON file
const readJSONFile = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
};

// Helper function to write JSON file
const writeJSONFile = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing file:", error);
    }
};

// Ruta POST para crear un nuevo carrito
router.post('/', (req, res) => {
    const carts = readJSONFile(CARTS_FILE);
    const newCart = {
        id: uuidv4(),
        products: []
    };

    carts.push(newCart);
    writeJSONFile(CARTS_FILE, carts);
    res.status(201).json(newCart);
});

// Ruta GET para listar los productos de un carrito por ID
router.get('/:cid', (req, res) => {
    const carts = readJSONFile(CARTS_FILE);
    const cart = carts.find(c => c.id === req.params.cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).send({ error: 'Cart not found' });
    }
});

// Ruta POST para agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const carts = readJSONFile(CARTS_FILE);
    const cart = carts.find(c => c.id === req.params.cid);
    if (cart) {
        const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: req.params.pid, quantity: 1 });
        }
        writeJSONFile(CARTS_FILE, carts);
        res.status(201).json(cart);
    } else {
        res.status(404).send({ error: 'Cart not found' });
    }
});

// Ruta DELETE para eliminar un producto de un carrito
router.delete('/:cid/product/:pid', (req, res) => {
    const carts = readJSONFile(CARTS_FILE);
    const cart = carts.find(c => c.id === req.params.cid);

    if (cart) {
        const productIndex = cart.products.findIndex(p => p.product === req.params.pid);

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1); // Elimina el producto del array
            writeJSONFile(CARTS_FILE, carts);
            res.status(204).send(); // Respuesta exitosa sin contenido
        } else {
            res.status(404).send({ error: 'Product not found in cart' });
        }
    } else {
        res.status(404).send({ error: 'Cart not found' });
    }
});

module.exports = router;