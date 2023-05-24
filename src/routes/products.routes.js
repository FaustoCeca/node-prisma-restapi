import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get('/products', async (req, res) => {
    const products = await prisma.product.findMany();
    
    res.json(products);
});

router.post('/products', async (req, res) => {
    const newProduct = await prisma.product.create({
        data: req.body
    });

    res.json(newProduct);
});

router.get('/products/:id', async (req, res) => {
    const id = req.params.id;

    const product = await prisma.product.findFirst({
        where: {
            id: parseInt(id)
        },
        include: {
            category: true
        }
    });

    if(!product) {
        return res.status(404).json({
            error: `No product found with id: ${id}`
        });
    }

    res.json(product);
});

router.delete('/products/:id', async (req, res) => {
    const id = req.params.id;

    const deletedProduct = await prisma.product.delete({
        where: {
            id: parseInt(id)
        },
    });

    if(!deletedProduct) {
        return res.status(404).json({
            error: `No product found with id: ${id}`
        });
    }

    res.json(deletedProduct);
});

router.put('/products/:id', async (req, res) => {
    const id = req.params.id;

    const updatedProduct = await prisma.product.update({
        where: {
            id: parseInt(id) 
        },
        data: req.body
    });

    if(!updatedProduct) {
        return res.status(404).json({
            error: `No product found with id: ${id}`
        });
    }

    res.json(updatedProduct);
});

export default router;