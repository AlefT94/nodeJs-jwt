const express = require('express')
const app = express();
const jwt = require('jsonwebtoken');
const SECRET = 'segreeeedo'; //usar variavel de ambiente
const {verifyJWT} = require('./middlewares/auth')

//Configurações
app.use(express.urlencoded({extended:false})); //habilita o body-parser
app.use(express.json()); //habilita receber requisições em json

app.get('/',(req,res)=>{
  res.json({message: 'tudo ok'})
})

app.post('/login',(req,res)=>{
  if(req.body.user ==='alef' && req.body.password === '123'){
    const token = jwt.sign({userId: 1},SECRET, {expiresIn: '7d'}); //expira em 7 dias
    return res.json({auth: true, token});
  }
  res.status(401).end();
})

app.post('/logout', (req,res)=>{
  res.end();
})


app.get('/clientes',verifyJWT, (req,res)=>{
  console.log(req.userId + ' fez essa chamada')
  res.json({id:1, nome:'Antonio'})
})
//Início do Server
app.listen(8080,()=>{
  console.log('Server em execução na porta 8080');
})