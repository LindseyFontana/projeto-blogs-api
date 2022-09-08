# Descrição
Este projeto consiste em uma aplicação Node que cria uma API e um banco de dados via ORM (Sequelize). A API simula um Blog, expõe endpoints para fazer CRUD de posts e usuários.
<br />

Projeto Node.js desenvolvido por [Lindsey Oliva Fontana](https://www.linkedin.com/in/lindsey-fontana-schmitz/) durante o módulo de Back-End do curso de desenvolvimento web da escola Trybe 🚀

<br />

## 🛠 Ferramentas
* JavaScript ES6+
* Node.js
* Express
* Express async errors - Captura erros;
* Express-http-context - Altera o escopo da `request`;
* Sequelize
* Joi - Realiza validações na `request`;
* MySQL2 - Conecta a aplicação ao banco de dados MySQL;
* Dotenv - Acessa variáveis de ambiente;
* Json Web Token - Cria token;
* Crypto DB - Cryptograda senha;
<br />

## ⚠️ Orientações
<details>
<summary><strong>Configurar ambiente</strong></summary>

 Instale o MySQL,

 Instale o Insomnia: [link](https://insomnia.rest/download)
 <br />
 
- Baixe [esta collection](/Insomnia/Insomnia_2022-09-08.json) **e importe no seu Insomnia**. [Como importar?](https://docs.insomnia.rest/insomnia/import-export-data).
- Selecione a collection `local`.
![Imagem da tela de seleção da collection no Insomnia!](/Insomnia/configurar-insomnia.png) 

- Entre em `Manage Environments` e edite o environment `local`. Será necessário criar um usuário fictício, para isso insira os seguintes valores: 

  * user_name (mínimo 8 caracteres)
  * user_email (user@mail.com)
  * user_password (mínimo 6 caracteres)
  * user_image (url da imagem)
  * search_tem (termo usado para pesquisar posts através do title e content)

![Imagem da tela de configuração do ambiente da collection no Insomnia!](/Insomnia/configurar-insomnia2.png) 
 
- Agora é só executar as requisições de exemplo! Inicie pela criação do seu usuário(`\user`), após execute o login (`\login`). O token gerado será inserido automaticamente no header das demais requisições!
 
<br />
</details>

<details>
<summary><strong>Instalar dependências</strong></summary>

* `npm install`
 
<br />
</details>

<details>
<summary><strong>Criar e popular o Banco de dados </strong></summary>
 <br /> 

  * `npx sequelize-cli db:create`
  * `npx sequelize-cli sequelize-cli db:migrate`
  * `npx sequelize-cli db:seed:all`

<br />
</details>

<details>
 <br />
 <summary><strong> Executar</strong></summary>

  * `npm start`

</details>
