const r=require('express').Router();
const c=require('../controllers/authController');
r.post('/vendor/register',   c.registerVendor);
r.post('/vendor/login',      c.loginVendor);
r.post('/supplier/register', c.registerSupplier);
r.post('/supplier/login',    c.loginSupplier);
module.exports=r;
