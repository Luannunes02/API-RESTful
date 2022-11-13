const { update } = require('../models/Person')
const Person = require('../models/Person')

const router = require('express').Router() // aqui estou dizendo que quero apenas o router do express
// O Router é um recurso do express que me permite criar um arquivo de rotas e exporta-lo e importar na aplicação


// Create - criação de dados
router.post('/', async (req,res)=>{ // com o post estaremos enviandod dados, vamos fazer uma rota para enviar dados(criação de pessoas, cada entidade(model) vai ter um padrão de rotas)/foi feito uma async function para garantir que o tempo de resposta seja respeitdado

    // req.body(dados que vem do body, temos que trata-lo antes de tudo, req(requisição) e body(dados))
    const { name, salary, approved } = req.body // vou extrar o name, salary e approved do body(estamos fazendo uma desestruração, estamos criando 3 variaveis apartir do req.body, desestruturando do req.body e criando as variaveis)

    //aqui vamos fazer uma validação para saber se todos os dados foram preenchidos antes de coloca-los no servidor
    if(!name) {
        res.status(422).json({error: "O nome é obrigatório!"}) //422 recurso não processado com sucesso
        return
    }
  

    // {name: "Matheus", salary: "5000", approved: false}, vem nesse formato com a restruturação

    const person = { // para facilitar, criamos um objeto person com os atributos acima, em seguida basta passar o objeto para ser inserido no banco de dados 
        name,
        salary,
        approved
    }

    // agora basta criar uma entidade no banco de dados pois já temos como tratar os dados que vem do front-end ou do postman...

    // create(o create do mongoose faz isso, criar dados no sistema), esse create pode falhar por isso temos que fazer um try catch para pegar caso der erro

    try { // aqui vamos resgatar os erros que podem ocorrer durante a requisição
        
        // criando dados com create, vamos passar person como parametro que vai o objeto vai ser criado no servidor
        await Person.create(person)  //aqui vamos alterar o banco de dados, vamos esperar até dar certo e alterar
        // quando aqui finaliza com sucesso temos que dar uma resposta que houve sucesso
        res.status(201).json({message: "Pessoa inserida no sistema com sucesso"}) // enviando status de 201 pro postman ou front-end, avisando dado criado com sucesso
        // essa segunda parte é a mensagem que estamos enviando confirmando após o sucesso, o front pode exibi-la caso queria com por exemplo exibindo o message da API(eu acho que é assim kkk)
    } catch (error) {
        res.status(500).json({error: error}); // resposta como de erro 500 como se fosse erro do servidor, a segunda parte estamos enviando o json que a aplicação vai receber para saber que deu erro 500. primeira parte falou qual foi o erro e a segunda enviou o erro, esse erro generico vai ser enviado para a API
    }

})//vamos pegar os dados e transformar em algo, após isso enviar uma respsota final

// Read - leitura de dados

router.get('/', async (req,res)=>{
    try {
        
        const people = await Person.find() // esse metodo vai garantir que todos os dados da collection sejam retornados

        res.status(200).json(people)

    }   catch (error) {
        res.status(500).json({ error: error })
    }
});

router.get('/:id', async (req,res) => {

    // extrair o dado da requisição, pela url =  req.params

    const id = req.params.id

    try {
        
        const person = await Person.findOne({_id: id}) // esse metodo serve para pegar só 1 resultado, no caso 1 objeto que foi gravado no banco de dados, no mongoDB o id se chama _id, ai no paramatro colocou o _id: recebendo o id para filtrar(quero encontrar o _id que tenha o usuario id da minha requisição)

        if(!person) {
            res.status(422).json({message: 'O usuario não foi encontrado'})
            return
        }

        res.status(200).json(person)

    }   catch (error) {
        res.status(500).json({ error: error })
    }

})

// Update - atualização de dados(put, patch) // o put espera que a gente mande um objeto completo para atualizar no sistema, caso queira alterar apenas um campo é mais interesasnte usar o patch

router.patch('/:id', async(req,res) => {

    const id = req.params.id;

    const { name, salary, approved } = req.body // como vamos precisar resgatar os dados do usuario para alterar vamos pegar as requisições do body novamente

    const person = {
        name,
        salary,
        approved
    }

    try { // vamos ter um dado atualizado, a gente vai atualizar o dado e após isso salva-lo em uma variavel e retorna o dado atualizado para o banco

        const updatePerson = await Person.updateOne({_id: id},person) // metodo do mongodb para fazer update
        // são dois argumentos. o id que vai ser alturado e o que vai ser substituido no lugar(no caso o person atualizado)

        if(updatePerson.matchedCount === 0) { // validação, se fazer alguma modificação o matchedCount vai ser 1 e se não encontrar o usuario pelo id vai ser 0, é uma validação se o usuario existe ou nao
            res.status(422).json({message: 'O usuario não foi encontrado'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }

}) //vamos usar id pois o dado que vamos alterar tem que vir de forma dinamica


// Delete - deletar dados

router.delete('/:id', async(req,res)=>{

    const id = req.params.id

    if (!person) {
        res.status(422).json({message: 'o usuario não foi encontrado'})
    }

    try {
        
        await Person.deleteOne({_id: id}) // metodo que exclue o usuario

        res.status(200).json({message: 'usuario removido com sucesso'})

    }   catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router