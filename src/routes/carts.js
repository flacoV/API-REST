const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const CARTS_FILE = './src/carts.json';

//helper para leer los JSON debido a unos errores que me surgieron 
const readJSONFile = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
};

//elper para leer los JSON debido a unos errores que me surgieron 
const writeJSONFile = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing file:", error);
    }
};

// Ruta POST crea un nuevo carrito
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

// Ruta GET para buscar un carrito segun su id
router.get('/:cid', (req, res) => {
    const carts = readJSONFile(CARTS_FILE);
    const cart = carts.find(c => c.id === req.params.cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).send({ error: 'Cart not found' });
    }
});

// Ruta POST para agregar un producto al carrito
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

// Ruta DELETE para eliminar un prodcuto en especifico de un carrito
router.delete('/:cid/product/:pid', (req, res) => {
    const carts = readJSONFile(CARTS_FILE);
    const cart = carts.find(c => c.id === req.params.cid);

    if (cart) {
        const productIndex = cart.products.findIndex(p => p.product === req.params.pid);

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            writeJSONFile(CARTS_FILE, carts);
            res.status(204).send(); 
        } else {
            res.status(404).send({ error: 'Product not found in cart' });
        }
    } else {
        res.status(404).send({ error: 'Cart not found' });
    }
});

module.exports = router;