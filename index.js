// must have some server extention
const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require ('cors');
require('dotenv').config();
const objectId = require('mongodb').ObjectId;
const stripe = require("stripe")('sk_test_51KYs7CKJTqhSIZhtGL5EQUNlDzmkkm4fLNX9qRbTidEXIR7y7g3BM3HnXDewnLdUpvnkhvzycwmBxnAREIDJKJdB00o0nAbigy');
// --------these all are middleware-------
app.use(cors())
app.use(express.json());
const { query } = require('express');
const {  ObjectId } = require('bson');
// connect mongo
const uri = "mongodb+srv://groceryshop:yvI3rRykvDlRG8uK@cluster0.3tttp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
async function run(){
    try {

            await client.connect();
            const database = client.db('grocery');
            const FruitsVegCollection = database.collection('fruitsveg');
            const BakeryCollection = database.collection('bakery');
            const SpicesCollection = database.collection('spices');
            const CosmeticsCollection = database.collection('cosmetics');
            const KitchenMaterialsCollection = database.collection('kitchen');
            const ordersCollection = database.collection('orders');
            const usersCollection = database.collection('users');
            const feedbackCollection = database.collection('feebacks');  
            
// ----------------------------user part-----------------
                     // user 
              app.post('/users', async (req, res) => {
                const user = req.body;
                const result = await usersCollection.insertOne(user);
                res.json(result);
                console.log(result);
            });

            app.put('/users', async (req, res)=>{
              const user = req.body;
              const filter = {email: user.email};
              const option = {upsert:true};
              const updateDoc = {$set:user};
              const result = await usersCollection.updateOne(filter,updateDoc,option);
              res.json(result);
            })

            // admin
            app.put('/users/admin', async (req, res)=>{
              const user = req.body;
              const filter = {email: user.email};
              const updateDoc = {$set:{role:'admin'}};
              const result = await usersCollection.updateOne(filter,updateDoc);
              res.json(result);
            })


            app.get('/users/:email',async(req,res)=>{
              const email = req.params.email;
              const querry = {email: email};
              const user = await usersCollection.findOne(querry);
              let isAdmin = false ;
              if(user?.role === 'admin' ){
                    isAdmin = true;
              }
              res.json({admin: isAdmin});
              })        

      //   ----------------------------------user admin part end------------------
            
   // -------------------------------product entry start---------------

             // post API
             app.post('/fruitsveg',async(req,res)=>{
                const catagory1 = req.body;
                const result = await FruitsVegCollection.insertOne(catagory1);
                console.log(result);
               });

            //    get fruit
            app.get('/fruitsveg',async(req,res)=>{
                const cursor =  FruitsVegCollection.find({});
                const catagories1 = await cursor.toArray();
                res.send(catagories1);
                });

                 // ----------get single service fruit---------
                 app.get('/fruitsveg/:id',async(req,res)=>
                 {
                     const id = req.params.id;
                     console.log('getting product',id);
                     const querry = { _id: objectId(id) }; 
                     const product = await FruitsVegCollection.findOne(querry);
                     res.json(product);
                 });

                  // delete product
           app.delete('/fruitsveg/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await HomeFurnCollection.deleteOne(query);
            res.json(result);
        });


                  // -----------------End Of veg and Fruit Section---------------



          // ---------------Now start Bakery part---------
                   // post API
             app.post('/bakery',async(req,res)=>{
              const catagory2 = req.body;
              const result = await BakeryCollection.insertOne(catagory2);
              console.log(result);
             });

          //    get bakery
          app.get('/bakery',async(req,res)=>{
              const cursor =  BakeryCollection.find({});
              const catagories2 = await cursor.toArray();
              res.send(catagories2);
              });

                      //  ------get single service for bakery-------
                      app.get('/bakery/:id',async(req,res)=>
                 {
                     const id = req.params.id;
                     console.log('getting product',id);
                     const querry = { _id: objectId(id) }; 
                     const product = await BakeryCollection.findOne(querry);
                     res.json(product);
                 });
                             
                       // delete product
           app.delete('/bakery/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await HomeFurnCollection.deleteOne(query);
            res.json(result);
        });


              // --------End of Bakery Part-------


              // Start of Spices section

                // post API
             app.post('/spices',async(req,res)=>{
              const catagory3 = req.body;
              const result = await SpicesCollection.insertOne(catagory3);
              console.log(result);
             });

          //    -------------get spices----------
          app.get('/spices',async(req,res)=>{
              const cursor =  SpicesCollection.find({});
              const catagories3 = await cursor.toArray();
              res.send(catagories3);
              });
              

                  // -------------get single spices------
              app.get('/spices/:id',async(req,res)=>
              {
                  const id = req.params.id;
                  console.log('getting product',id);
                  const querry = { _id: objectId(id) }; 
                  const product = await  SpicesCollection.findOne(querry);
                  res.json(product);
              });
                          

                 // delete product
           app.delete('/spices/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await HomeFurnCollection.deleteOne(query);
            res.json(result);
        });




              //-----End of spices sectionn-----------
              
              
              // ----------start of Cosmetics-------

                     // post API
             app.post('/cosmetics',async(req,res)=>{
              const catagory4 = req.body;
              const result = await CosmeticsCollection.insertOne(catagory4);
              console.log(result);
             });

          //    get cosmetics
          app.get('/cosmetics',async(req,res)=>{
              const cursor =  CosmeticsCollection.find({});
              const catagories4 = await cursor.toArray();
              res.send(catagories4);
              });

                // ---------get single cosmetics-------
              app.get('/cosmetics/:id',async(req,res)=>
              {
                  const id = req.params.id;
                  console.log('getting product',id);
                  const querry = { _id: objectId(id) }; 
                  const product = await CosmeticsCollection.findOne(querry);
                  res.json(product);
              });
                          
                     // delete product
           app.delete('/cosmetics/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await HomeFurnCollection.deleteOne(query);
            res.json(result);
        });



              // ----------end of cosmetics-------




              // --------------------start of kitchen material-----------

                // post API
             app.post('/kitchen',async(req,res)=>{
              const catagory5 = req.body;
              const result = await KitchenMaterialsCollection.insertOne(catagory5);
              console.log(result);
             });

          //    get kitchen
          app.get('/kitchen',async(req,res)=>{
              const cursor =  KitchenMaterialsCollection.find({});
              const catagories5 = await cursor.toArray();
              res.send(catagories5);
              });



                  // -----get single service kitchen--------
              app.get('/kitchen/:id',async(req,res)=>
                 {
                     const id = req.params.id;
                     console.log('getting product',id);
                     const querry = { _id: objectId(id) }; 
                     const product = await KitchenMaterialsCollection.findOne(querry);
                     res.json(product);
                 });
                             

                      // delete product
           app.delete('/kitchen/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await HomeFurnCollection.deleteOne(query);
            res.json(result);
        });


              // ------------end of kitchen------

                  // -----------------order section-------------------

                         //add order api 
                         app.post('/orders', async (req, res) => {
                           const order = req.body;
                           order.createdAt = new Date();
                           const result = await ordersCollection.insertOne(order);
                           res.json(result);
                       });

                         app.get('/orders',async(req,res)=>{
                           let query = {};
                           const email = req.query.email;
                           if (email) {
                               query = {email:email};   
                           }
                           const cursor = ordersCollection.find(query);
                           const orders = await cursor.toArray();
                           res.send(orders);
                   });

                  // -----order part end-----------

                    // DELETE API
                    app.delete('/orders/:id', async (req, res) => {
                      const id = req.params.id;
                      const query = { _id: ObjectId(id) };
                      const result = await ordersCollection.deleteOne(query);
                      res.json(result);
                  });

                 

                  // feedback section

                     //     add feed back api
                     app.get('/feedbacks',async(req,res)=>{
                      const cursor = feedbackCollection.find({});
                      const feedbacks = await cursor.toArray();
                      res.send(feedbacks);
              });

                //     feedback post api
                   app.post('/feedbacks', async(req,res)=>{
                  const feedback = req.body;
                  // console.log('hitted',feedback);
                  const result = await feedbackCollection.insertOne(feedback);
                  console.log(result);
                  res.json(result);
          })
         
          
          // paymennt
          app.get('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.findOne(query);
            res.json(result);
        });

         // update
         app.put('/orders/:id', async (req, res) => {
          const id = req.params.id;
          const payment=req.body;
          const filter = { _id: ObjectId(id)};
          const updateDoc = {
            $set :{
              payment : payment
            }
          };
          const result = await ordersCollection.updateOne(filter,updateDoc);
          res.json(result);
      });

            // payment
        app.post('/create-payment-intent', async (req, res) => {
          const paymentInfo = req.body;
          const amount = paymentInfo.price * 100;
          const paymentIntent = await stripe.paymentIntents.create({
              currency: 'usd',
              amount: amount,
              payment_method_types: ['card']
          });
          res.json({ clientSecret: paymentIntent.client_secret })
      })


       



    } 
    finally{
         // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at 
  http://localhost:${port}`)
})