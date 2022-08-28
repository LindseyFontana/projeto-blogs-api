# Descrição
Este projeto consiste em uma aplicação Node que cria uma API e um banco de dados via ORM (Sequelize). Simula um Blog, a API expõe endpoints que fazem CRUD de posts e usuários.
<br />

Projeto Node.js desenvolvido por Lindsey Oliva Fontana durante o módulo de Back-End do curso de desenvolvimento web da escola Trybe 🚀

<br />

## 🛠 Ferramentas
* JavaScript ES6+
* Node
* Express
* Express async errors
* Sequelize
* Joi - Realiza validações
* Mysql2 - Conecta a aplicação ao banco de dados MySQL
* Dotenv - Acessa variáveis de ambiente;
* Json Web Token - Cria token;
<br />

## ⚠️ Orientações
<details>
<summary><strong>Instalar dependências</strong></summary>

* npm install
 
<br />
</details>

<details>
<summary><strong> Banco de dados </strong></summary>
 <br />
<strong>Executar os comandos no terminal: </strong>
<br />
  
Para criar banco de dados
  * npx sequelize-cli db:create
  * npx sequelize-cli sequelize-cli db:migrate

Para popular banco de dados
 * npx sequelize-cli db:seed:all
<br />
</details>

<details>
 <br />
 <summary><strong> Executar a aplicação </strong></summary>

  * npm start

</details>
