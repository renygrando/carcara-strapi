# Carcará Strapi CMS

Backend headless CMS para o blog da Landing Page Carcará.

## 🚀 Deploy no Easypanel

### 1. Criar PostgreSQL Database no Easypanel

1. No Easypanel, vá em **Databases** → **Create Database**
2. Escolha **PostgreSQL**
3. Configure:
   - Name: `carcara-strapi-db`
   - Username: `strapi`
   - Password: (gere uma senha segura)
   - Database: `strapi`
4. Deploy e anote as credenciais

### 2. Criar App Strapi

1. No Easypanel, vá em **Apps** → **Create App**
2. Escolha **"From GitHub"**
3. Configure:
   - Repository: `renygrando/carcara-strapi`
   - Branch: `main`
   - Build Method: **Docker**
   - Port: `1337`

### 3. Configurar Environment Variables

Adicione estas variáveis no Easypanel:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=carcara-strapi-db  # Nome do serviço do PostgreSQL
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=sua_senha_segura
DATABASE_SSL=false

HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Gere secrets únicos usando:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=seu_salt
ADMIN_JWT_SECRET=seu_secret
TRANSFER_TOKEN_SALT=seu_salt
JWT_SECRET=seu_secret
```

### 4. Deploy

1. Clique em **Deploy**
2. Aguarde o build (5-10 minutos)
3. Acesse a URL do Strapi

## 📝 Configuração Inicial

### Criar Admin User

1. Acesse `https://seu-strapi.com/admin`
2. Crie sua conta de administrador

### Criar Content Type "Blog Post"

1. **Content-Type Builder** → **Create new collection type**
2. Nome: `blog-post`
3. Adicione os campos:

| Campo | Tipo | Config |
|-------|------|--------|
| title | Text (short) | Required |
| slug | UID (attached to title) | Required, Unique |
| excerpt | Text (short) | - |
| content | Rich Text | Required |
| coverImage | Media (Single) | - |
| author | Text (short) | - |

4. Save e aguarde reiniciar

### Configurar Permissões

1. **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Em Blog-post, marque:
   - ✅ find
   - ✅ findOne
3. Save

### Gerar API Token

1. **Settings** → **API Tokens** → **Create new API Token**
2. Configure:
   - Name: `Frontend Token`
   - Token type: **Read-only**
   - Duration: **Unlimited**
3. Save e copie o token

## 🔧 Desenvolvimento Local

```bash
# Com Docker Compose
docker-compose up -d

# Ou localmente
npm install
npm run develop
```

Acesse: http://localhost:1337/admin

## 📦 Estrutura do Projeto

```
carcara-strapi/
├── Dockerfile              # Build para produção
├── docker-compose.yml      # Setup local com PostgreSQL
├── .env.example           # Template de variáveis
├── config/                # Configurações do Strapi
├── src/
│   ├── api/              # APIs customizadas
│   └── admin/            # Customizações do admin
└── public/               # Assets públicos
```

## 🔗 Links

- Documentação Strapi: https://docs.strapi.io
- API Endpoint: `/api/blog-posts`
- Admin Panel: `/admin`

## 🔧 Configurações Automáticas

Este projeto já vem com:

✅ **Blog Post Content Type** configurado
✅ **Permissões públicas** para blog posts (configuradas automaticamente no bootstrap)
✅ **CORS** configurado para carcara.ai
✅ **PostgreSQL** como banco de dados
✅ **Uploads** de imagens funcionando

## 📌 Após o Deploy

1. Acesse `/admin` e crie seu usuário administrador
2. Gere um API Token em **Settings** → **API Tokens**:
   - Name: `Frontend Token`
   - Type: **Read-only**
   - Duration: **Unlimited**
3. Adicione o token nas variáveis de ambiente da Landing Page

## 🎯 API Endpoints

- **GET** `/api/blog-posts` - Lista todos os posts
- **GET** `/api/blog-posts/:id` - Post específico por ID
- **GET** `/api/blog-posts?filters[slug][$eq]=seu-slug` - Post por slug

Exemplo de resposta:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Meu Post",
        "slug": "meu-post",
        "excerpt": "Resumo do post",
        "content": "Conteúdo completo...",
        "coverImage": {...},
        "author": "Equipe Carcará",
        "publishedAt": "2025-11-24T10:00:00.000Z"
      }
    }
  ]
}
```

## 🚀 Deploy Checklist

- [x] Dockerfile configurado
- [x] PostgreSQL como database
- [x] Variáveis de ambiente configuradas
- [x] Content Types criados
- [x] Permissões públicas configuradas automaticamente
- [x] CORS habilitado
