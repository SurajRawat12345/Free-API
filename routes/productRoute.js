import express from "express";
const router = express.Router();
import { 
    addProduct, 
    getAllController, 
    deleteProductController,
    getProductByIdController,
    updateProductController,
    searchProductController,
} from '../controller/productController.js';

// To display all products
router.get('/' , getAllController);

// To add new product
router.post('/add-product' , addProduct);

// To display single product
router.get('/:id', getProductByIdController);

// To delete product
router.delete('/delete-product/:id', deleteProductController);

// To update product
router.put('/update/:id', updateProductController);

// To search product
router.get('/search/:keyword', searchProductController);

export default router;