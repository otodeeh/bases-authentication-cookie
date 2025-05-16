# 🛡️ Projeto Base - Autenticação com Cookies e Refresh Token (Fastify + PostgreSQL)

Este projeto é uma API backend modular desenvolvida em **TypeScript** utilizando **Fastify** e **Prisma**, implementando um sistema seguro de autenticação via **cookies HTTP-only** e **refresh tokens**. Ele segue os princípios da **Clean Architecture**, oferecendo uma base sólida para projetos escaláveis.

---

## 📁 Estrutura do Projeto

src/
├── application/ # Casos de uso (Use Cases)
│ └── use-cases/
├── domain/ # Entidades e contratos de repositórios
├── infrastructure/ # Banco de dados, validações, plugins
├── main/ # Server e configs principais
├── presentation/ # Controllers
├── protocols/ # Protocolos e interfaces
├── routes/ # Rotas por domínio
└── schemas/ # Schemas de validação

yaml
Copy
Edit

---

## ⚙️ Tecnologias e Ferramentas

- **Node.js + TypeScript**
- **[Fastify](https://www.fastify.io/)**
- **[Prisma ORM](https://www.prisma.io/)**
- **PostgreSQL** (via Docker)
- **Zod** (validações)
- **JWT**
- **Arquitetura Limpa**

---

## 🐳 Subindo o PostgreSQL com Docker


```bash
# Com docker instalado utilize o comando
docker-compose up
```

```bash
Após isso, atualize seu arquivo .env com as informações de conexão.

📦 Instalação e Execução
bash
Copy
Edit
# Instale as dependências
npm install

# Gere os arquivos do Prisma
npx prisma generate

# Rode as migrations (cria tabelas no banco)
npx prisma migrate dev

# Inicie a aplicação em modo de desenvolvimento
npm run dev

🔐 Funcionalidades
Autenticação com JWT (access + refresh)

Cookies HTTP-only para refresh tokens

Logout e invalidação do token

Validação com Zod

Estrutura modular e escalável com Clean Architecture

🔀 Endpoints Principais
Método	Rota	Descrição
POST	/auth/login	Autentica e retorna tokens
POST	/auth/refresh	Gera novo access token
POST	/auth/logout	Remove sessão e cookies
POST	/auth/logout-all	Remove todas sessão e cookies
GET	/generics/health-check	Retorna dados do usuário

📄 .env exemplo
env
Copy
Edit
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bases"
JWT_SECRET="sua_chave_secreta"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="7d"

🧪 Scripts disponíveis
npm run dev         # Inicia o servidor em modo desenvolvimento
npm run build       # Compila o projeto para produção
npm start       # Inicia o servidor em modo produção
📝 Licença
Este projeto está sob a licença MIT.
