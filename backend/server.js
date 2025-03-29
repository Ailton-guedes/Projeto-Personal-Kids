//Importa as bibliotecas do express
import express from 'express';

//Cria uma constante "app" que utiliza o express. 
// Precisa do (), pois utilizamos ele como se fosse uma função
const app = express();

//Aqui nós estamos informando que a nossa constante "app", 
// através do express, irá receber ou enviar informações no formato json
app.use(express.json());



//Esta constante irá armazenar nossa informações, 
// tanto para que possemos lista-las, 
// quanto para que possamos envia-las. 
// Ela irão ficar armazenadas dentro dos []
const users = [];


//Aqui estamos informando que a nossa 
// constante "app" irá receber "post" postagen. 
//      '/' será o caminho na url que precisa 
//      ser utilizado para enviar uma postagem.
//          "req" (requisitar) e o "res" (responder) são
//           necessários para sinalizar que assim que postarmos algo,
//           essa informação será enviada para algum lugar
//           e que também nos dará uma resposta para sabermos
//           que esse envio realmente foi feito
app.post('/', (req, res) => {
    //Aqui vemos a nossa constante "users", 
    // que criamos para guardar as informações.
    //      O push, indica que assim como no git push,
    //      a nossa constante irá guardar as informações que foram enviadas.
    //          Em seguida estamos informando para a nossa constante a onde
    //          ela irá ver as informações que estamos enviando para que ela 
    //          possa verificar-las e guarda-las ("req.body" -> basicamente 
    //          dizendo: nossa requisição vira pelo body da pagina)
    users.push(req.body);

    //Aqui é estamos pedindo que após enviar a nossa requisição,
    //  nós queremos que essa postagem nos de uma confirmação de
    //  que realmente foi enviada a informação.
    res.send('tch: informations was sent!');
});


//Praticamente igual ao post,
//  mas ao invés de postar,
//  nós iremos "pegar" (tradução de "get")
//  as informações guardadas no banco. 
//      '/' assim como antes, aqui estamos definindo o 
//      caminho url que será utilizado para executar 
//      essa solicitação (sim, nós podemos utilizar 
//      a mesma url, pois as solicitação diferentes). 
//          Por fim, informamos que através dessa url, 
//          iremos realizar requisições e iremos solicitar 
//          respostas também
app.get('/', (req, res) => {
    //Nesta situação, como queremos apresentar
    //  todos os dados que constam guardados no banco,
    //  não precisamos de um "req", 
    //  a final estamos só pedindo para ele jogar
    //  tudo o que ele tem guardado para nós. 
    //      Caso quisessemos que ele puxasse apenas uma 
    //      parte das informações guardadas, 
    //      teriamos que definir algumas informações 
    //      precisando então de uma requisição.

    //Aqui estamos solicitando uma "res", 
    // uma resposta, e queremos receber 
    // essa resposta em json. E dentro da função 
    // indicamos o constante "users", 
    // pois é ela quem está armazenando os 
    // dados que queremos como resposta 
    res.json(users);
});


//O listen é para criar o server indicando qual
//  a porta do nosso computador será utilizada para isso
app.listen(3030, () => {
   //Aqui diz que no nosso terminal,
   //  quando o server começar a funcionar
   //  deve apresentar a mensagem a baixo 
   console.log('tch: server work at 3030 address');
});
