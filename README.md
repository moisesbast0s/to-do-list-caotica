# 📝 To-Do List da Caótica

Aplicação de gerenciamento de tarefas, desenvolvida em Next.js 15 e Prisma ORM.

![Tela do Dashboard](/public/dashboard.png)

## 🚀 Tecnologias
- Next.js 15 
- Prisma ORM + MySQL

## ⚙️ Pré-requisitos
- Node.js 18+
- MySQL instalado
- npm ou yarn
- Prisma ORM

## 🔧 Configuração

### 1. Configurar Banco de Dados
Crie um arquivo `.env` na raiz do projeto com: 

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/NOME_DO_BANCO"
```

Substitua:

* USUARIO: Seu usuário MySQL

* SENHA: Sua senha MySQL

* NOME_DO_BANCO: Nome do banco de dados criado no Mysql da sua máquina (ex: todo_caotica)
### 2. Inicializar Prisma
`npm prisma generate`

`npm prisma db push`

## 3. Instalar Dependências
`npm install`   ou

`yarn dev`

## 4. Executar o projeto
`npm run dev` ou
`yarn dev`

## 5. Acesse no navegador
[http://localhost:3000/](http://localhost:3000/).
