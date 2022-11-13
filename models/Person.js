const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    name: String, // estamos definindo os tipo de cada propriedade, estou definindo como vou passar essas entidades para API e ela vai inserir no banco
    salary: Number,
    approved: Boolean,
}); //será nosso model, isso vai criar uma tabela Person no banco de dados, o segundo parametro será os campos, o cara falou que sempre lera person no plural

// Person é o model que iremos trabalhar, agora basta exporta-lo e importa-lo em algum lugar

module.exports = Person