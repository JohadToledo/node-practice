const http = require('http');
const fs = require('fs');
const path = require('path');
const colors = require('colors');


  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://johadtledo:pI8JZHJv78tE5uZs@cluster0.vif9moa.mongodb.net/?retryWrites=true&w=majority";
  
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  


const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Serve the HTML page
    const indexPath = path.join(__dirname, 'index.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
} else if (req.url === '/about') {
  // Handle the /about route
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('About Us Page');}
  else {
    // Handle other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;
const IP = '127.0.0.1';


server.listen(PORT, IP, () => {
  console.log(`Server running at`.green, `http://${IP}:${PORT}/`.cyan);
});
