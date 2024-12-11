import express from 'express';
import conn from './config/conn.js';


//router
import produtorouter from './routes/produtoRoute.js';

//modules
import './models/produtoModel.js';

const app = express();
const port = 3333;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/produtos", produtorouter);


app.listen(port, () => {
  console.clear();
  console.log("Bem vindo à livraria API 2.1.0!");
  console.log(`Server on PORT: ${port} 🚀\n`);
});