const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const sign = (payload)=>jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'7d'});

exports.registerVendor = mkRegister('vendor');
exports.loginVendor = mkLogin('vendor','receiver_id');
exports.registerSupplier = mkRegister('supplier');
exports.loginSupplier = mkLogin('supplier','id');

function mkRegister(table){
  return async (req,res)=>{
    try {
      const {name = req.body.SupplierName, email, password, phone, address} = req.body;
      if(!name||!email||!password) return res.status(400).json({message:'Required fields'});
      
      const [dup] = await pool.query(`SELECT 1 FROM ${table} WHERE email=?`,[email]);
      if(dup.length) return res.status(400).json({message:`${table} exists`});
      
      const hash = await bcrypt.hash(password,10);
      const cols = table==='supplier' ? '(name,email,password,phone_no,address)' 
                                      : '(name,email,password)';
      const vals = table==='supplier' ? [name,email,hash,phone||null,address||null]
                                      : [name,email,hash];
      
      const queryStr = table==='supplier' 
        ? `INSERT INTO ${table} ${cols} VALUES (?,?,?,?,?)`
        : `INSERT INTO ${table} ${cols} VALUES (?,?,?)`;
        
      const [r]=await pool.query(queryStr, vals);
      res.status(201).json({message:`${table} registered`,id:r.insertId});
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({message:'Registration failed'});
    }
  };
}

function mkLogin(table,idCol){
  return async (req,res)=>{
    try {
      const {email,password}=req.body;
      const [[user]]=await pool.query(`SELECT * FROM ${table} WHERE email=?`,[email]);
      
      if(!user||!await bcrypt.compare(password,user.password))
        return res.status(401).json({message:'Invalid credentials'});
        
      const token=sign({id:user[idCol],type:table});
      res.json({token,[table]:user});
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({message:'Login failed'});
    }
  };
}
