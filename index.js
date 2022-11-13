// config inicial
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

const Person = require('./models/Person') // pegando o export do Person(modelo), agora tenho acesso ao model para fazer as interações no banco

// --- forma de ler json / middlewares
app.use( // quando uso o app.use() é pq to criando criar o middleware
    express.urlencoded({ //o urlencoded é um middleware do express 
        extended: true
    }),
)
// logo abaixo inicia a configuração da leitura do JSON

app.use(express.json()); // isso finaliza a configuração, essa função json é para ler o arquivo




// ROTAS DA API
const personRoutes = require('./routes/personRoutes'); //aqui estão as rotas

// agora vou inserir no express por meio de middleware

app.use('/person', personRoutes) // agora basta definir que rotas serão acessadas por meio do arquivo, no caso o que for do /person vai direcionado para o arquivo certo com seu passo a passo

// --- rota inicial / endpoint
app.use('/',(req,res)=>{  // isso é uma rota do tipo get
    //mostrar req

    res.json({message: 'Oi Express!'}) // isso quer dizer que a resposta para minha rota '/' vai ser um json


})  // get é um verbo http que eu quero disponibilizar a rota, o get é pra pegar
// a '/' é o endpoint, no caso a /(home) vai disponibilizar algo que eu vou escrever no segundo parametro
// o segundo parametro eu tenho que achar um jeito de lidar com a requisição e uma maneira de enviar as respostas
// quando coloco a req e res no parametro, quer dizer você deu uma possibilidae para o express ler a requisição, se o usuario enviar algum dado tanto pela url quanto pelo body(corpo da requisição, onde envia dados) eu vou consegui extrair isso e também tem a possiblidade de usar a resposta(me comunicar de volta com a pessoa que acessou a API, enviando algo para ela).



// entregar uma porta, para permitir que o express seja visto, vamos configurar uma porta
//--- Aqui estou falando que a aplicação ficara na porta 3000, no nodemon configuramos a porta 3000 tbm, no package json falou isso ai aqui no index estamos concretizando o que falamos lá

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluester.pvxnmnr.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(()=>{ // then(então), quando conectar faça isso
    console.log('Conectamos ao MongoDB!') // não precisa disso, só para ver que realmente conectou
    app.listen(3000) // quando der certo vai disponibilizar a api na porta 3000

})
.catch((error) => console.log(error))  // se der erro, o catch vai pegar o erro e exibir, o err é o erro, vai pegar ele e exibir
