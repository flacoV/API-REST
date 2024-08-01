const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const PRODUCTS_FILE = './src/products.json';

//elper para leer los JSON debido a unos errores que me surgieron 
const readJSONFile = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
};

//helper para leer los JSON debido a unos errores que me surgieron 
const writeJSONFile = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing file:", error);
    }
};

// Ruta GET para mostrar todos los productos
router.get('/', (req, res) => {
    const products = readJSONFile(PRODUCTS_FILE);
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

// Ruta GET para buscar un producto por id
router.get('/:pid', (req, res) => {
    const products = readJSONFile(PRODUCTS_FILE);
    const product = products.find(p => p.id === req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send({ error: 'Product not found' });
    }
});

// Ruta POST para agregar nuevo producto
router.post('/', (req, res) => {
    const products = readJSONFile(PRODUCTS_FILE);
    const newProduct = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status ?? true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails || []
    };

    products.push(newProduct);
    writeJSONFile(PRODUCTS_FILE, products);
    res.status(201).json(newProduct);
});

// Ruta PUT para actualizar un producto segun su id
router.put('/:pid', (req, res) => {
    const products = readJSONFile(PRODUCTS_FILE);
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex !== -1) {
        const updatedProduct = { ...products[productIndex], ...req.body, id: products[productIndex].id };
        products[productIndex] = updatedProduct;
        writeJSONFile(PRODUCTS_FILE, products);
        res.json(updatedProduct);
    } else {
        res.status(404).send({ error: 'Product not found' });
    }
});

// Ruta DELETE para producto segun su id
router.delete('/:pid', (req, res) => {
    const products = readJSONFile(PRODUCTS_FILE);
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        writeJSONFile(PRODUCTS_FILE, products);
        res.status(204).send();
    } else {
        res.status(404).send({ error: 'Product not found' });
    }
});

module.exports = router;