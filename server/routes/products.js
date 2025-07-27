const r=require('express').Router();
const c=require('../controllers/productController');
r.get('/',                      c.getProducts);
r.post('/',                     c.addProduct);
r.get('/suppliers',             c.getSuppliers);
r.get('/supplier/:supplierId',  c.getSupplierProducts);
module.exports=r;
