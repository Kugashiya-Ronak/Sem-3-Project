const express = require('express');
const mongoose = require('mongoose');

const Product = require('./product.js');
const User = require('./user.js');
const CurrentUser = require ('./currentuser.js')
const Cart = require('./cart.js');

const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect("mongodb+srv://ronakK:ronak12K@lab.ysatp.mongodb.net/ReactProject",{useNewUrlParser : true}).then(()=>{
    const app = express();
    app.use(bodyParser.urlencoded({extended : false}))
    app.use(bodyParser.json())
    app.use(cors())


    //Product APIs
    app.get('/products' , async (req,res)=>{
        const ans = await Product.find();
        res.send(ans);
    })

    app.get('/products/:id' , async (req,res)=>{
        const ans = await Product.findOne({ProductID : req.params.id});
        res.send(ans);
    })
    
    app.post('/products' , async (req,res)=>{
        const newProduct = Product({...req.body});
        const ans = await newProduct.save();
        res.send(ans);
    })

    app.delete('/products/:id' , async (req,res)=>{
        const ans = await Product.deleteOne({ProductID : req.params.id});
        res.send(ans);
    })

    app.patch('/products/:id' , async (req,res)=>{
        const prod = await Product.findOne({ProductID : req.params.id});
        prod.ProductID = req.body.ProductID;
        prod.ProductName = req.body.ProductName;
        prod.Company = req.body.Company;
        prod.Cpu = req.params.Cpu;
        prod.Gpu = req.params.Gpu;
        prod.Ram = req.params.Ram;
        prod.Storage = req.params.Storage;
        prod.OS = req.body.OS;
        prod.Screen = req.body.Screen;
        prod.Battery = req.body.Battery;

        const ans = await prod.save();
        res.send(ans);
    })


    app.get('/products/search/:searchString', async (req, res) => {
        const searchString = req.params.searchString;
        const products = await Product.find({
        $or: [
            { ProductName: { $regex: searchString, $options: 'i' } },
            { Company: { $regex: searchString, $options: 'i' } },
        ],
        });
        res.json(products);
    });
  

    //user APIs
    app.get('/users' , async (req,res)=>{
        const ans = await User.find();
        res.send(ans);
    })

    app.get('/users/:uname' , async (req,res)=>{
        const ans = await User.findOne({UserName : req.params.uname});
        res.send(ans);
    })
    
    app.post('/users' , async (req,res)=>{
        try {
            console.log(req.body);
            const { UserName, Password , UserEmail } = req.body;
        
            // Check if the username already exists
            const existingUser = await User.findOne({ UserName });
            if (existingUser) {
              return res.status(400).json({ error: 'Username already exists.' });
            }

            const newUser = new User({ UserName, Password, UserEmail});
            await newUser.save();

            const newCart = new Cart({UserName});
            await newCart.save();
        
            res.status(201).json({ message: 'User registered successfully' });
          } 
          
          catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
       
    })

    app.delete('/users/:uname' , async (req,res)=>{
        const ans = await User.deleteOne({UserName : req.params.uname});
        res.send(ans);
    })

    app.patch('/users/:uname' , async (req,res)=>{
        const temp = await User.findOne({UserName : req.params.uname});
        temp.UserName = req.body.UserName;
        temp.Password = req.body.Password;
        temp.UserEmail = req.body.UserEmail;

        const ans = await temp.save();
        res.send(ans);
    })


    //Logged IN User APIs
    app.get('/currentusers' , async (req,res)=>{
        const ans = await CurrentUser.find();
        res.send(ans);
    })

    app.get('/currentusers/:id' , async (req,res)=>{
        const ans = await CurrentUser.findOne({__v : req.params.id});
        res.send(ans);
    })
    
    app.post('/currentusers' , async (req,res)=>{    
        try {
            console.log(req.body);
            const { UserName, Password , UserEmail } = req.body;
            const ans = await CurrentUser.findOne({__v : 0});
            
            if(ans){
                const del = await CurrentUser.deleteOne({__v : 0});
            }
            
            const newUser = new CurrentUser({ UserName, Password, UserEmail});
            await newUser.save();
    
          } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
       
    })
    
    app.delete('/currentusers/:uname' , async (req,res)=>{
        const ans = await CurrentUser.deleteOne({UserName : req.params.uname});
        res.send(ans);
    })
    
    app.patch('/currentusers/:id' , async (req,res)=>{
        const temp = await CurrentUser.findOne({__v : req.params.id});
        temp.UserName = req.body.UserName;
        temp.Password = req.body.Password;
        temp.UserEmail = req.body.UserEmail;
    
        const ans = await temp.save();
        res.send(ans);
    })


    //Cart APIs
    app.get('/cart/:uname' , async (req,res)=>{
        const ans = await Cart.findOne({UserName : req.params.uname});
        res.send(ans);
    })
    
    app.get('/history' , async (req,res)=>{
        const ans = await Cart.find();
        res.send(ans);
    })
    
    app.post('/cart/:uname/:pid', async (req,res)=>{
        const cart = await Cart.findOne({UserName : req.params.uname});
        const temp = cart.CartProducts.findIndex((p) => p.ProductID === req.params.pid);
        
        const pro = await Product.findOne({ProductID : req.params.pid});
        if(temp == -1){
            const result = await cart.CartProducts.push(pro);
            await cart.save();
            res.status(201).send("Product Added");
        }
        else{
            res.status(409).send("Product Already exists");
        }
    })
    
    app.post('/history/:uname', async (req, res) => {
        const uname = req.params.uname;
        const { date, products } = req.body;
      
        try {
          const cart = await Cart.findOne({ UserName: uname });
      
          products.forEach((product) => {
              cart.HistoryProducts.push({
                ...product,
                purchaseDate: date,
                quantityPurchased: product.quantityPurchased,
              });
          });
      
          cart.CartProducts = [];
      
          await cart.save();
          res.send({ message: 'Order Placed' });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'Error saving order history' });
        }
      });
      
    
    app.delete('/cart/:uname/:pid', async (req,res)=>{
        const cart = await Cart.findOne({UserName : req.params.uname});
        const temp = cart.CartProducts.findIndex((p) => p.ProductID === req.params.pid)
    
        const result = await cart.CartProducts.splice(temp,1);
        cart.save();
        res.status(201).send("Product Removed");
    })

    app.listen(3050,()=>{
        console.log("Server started at 3050");
    })
})