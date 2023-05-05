# App para enviar e registrar emails enviados 💻🌐

<br>

**Api construida para gerenciar usuários e emails utilizando query builder, schema builder, autenticação, criptografia, tipagens, validação de dados, banco de dados postgreSQL e servidor de envio de emails**
<br>

## Como executar o projeto

Para executar o projeto, siga os passos abaixo:

1. Certifique-se de que o [Node.js](https://nodejs.org/) esteja instalado em sua máquina.
1. Clone este repositório em sua máquina local.
1. Navegue até o diretório raiz do projeto.
1. Abra o terminal e execute o seguinte comando para instalar as dependências do projeto:

```javascript
npm install
```

ou

```javascript
yarn add
```

<br>
5. Depois que as dependências forem instaladas, execute o seguinte comando para iniciar o servidor de desenvolvimento:
   
```javascript
npm run dev
```
ou
```javascript
yarn dev
```

<br>

## Endpoints

Aqui estão os endpoints disponíveis na API:

- `GET /`: Retorna um texto comum que confirma se a api está funcionando.
- `POST /user`: Cadastra um usuário no banco de dados com base nos dados fornecidos no corpo da solicitação.
- `POST /login`: Faz a autenticação do usuário no banco de dados com base nos dados fornecidos no corpo da solicitação.
- `POST /user/send-email`: Envia um email para um destinatário fornecido no corpo da solicitação e cadastra o email enviado.
- `GET /user/sent-emails`: Lista todos os emails que foram enviados pelo usuário autenticado


<br>

## Exemplo de requisição para cadastrar um usuário

``` javascript
{
  "name": "Foo Ba",
  "email": "foo@bae.com",
  "password": "1234"
}
```

<br>
<br>

## Exemplo de resposta para pegar emails enviados:

``` javascript
[
  {
    "id": 1,
    "body": "lorem ipsum silum domor",
    "from": "email@email.com",
    "subject" : "lorem",
    "date" : "2011-10-21 08:00AM"
  }
]
```
<br>
## Exemplo de requisição para enviar um email:

``` javascript
{
  "body": "lorem ipsum silum domor",
  "subject" : "lorem",
  "to": "email@hotmail.com"
}
```


<br>


# Configuração
Para configurar o aplicativo, você precisará definir as seguintes variáveis de ambiente no arquivo .env:
PORT - A porta que você quer usar no seu servidor local
DB_USER - O usuário do banco de dados
DB_HOST - O endereço do servidor do banco de dados
DB_PASSWORD - A senha do banco de dados
DB_DATABASE - O nome do banco de dados
MAIL_HOST - O endereço do servidor SMTP para enviar emails
MAIL_PORT - A porta do servidor SMTP
MAIL_USER - O nome de usuário do servidor SMTP
MAIL_PASS - A senha do servidor SMTP
SECRET_KEY - A assinatura da autenticação do usuário criado

---
## Contato

Se você tiver alguma dúvida ou sugestão sobre este projeto, sinta-se à vontade para entrar em contato comigo através do meu perfil no [GitHub](https://github.com/09brsv) ou no [Linkedin](https://www.linkedin.com/in/bruno-batista09brsv/)