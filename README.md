# GitHub Explorer

Aplicação web que consome a API do GitHub para exibir informações de usuários e seus repositórios mais populares. Desenvolvida como desafio técnico para a vaga de Front-End na **Desbravador Software**.

## 🔗 Demo

> **[github-explorer-victor.netlify.app](https://github-explorer-victor.netlify.app)** ← atualizar após o deploy

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Interface |
| Vite | 8 | Build e dev server |
| React Router | 7 | Roteamento client-side |
| Axios | 1.x | Consumo da API do GitHub |
| Bootstrap | 5 | Estilização responsiva |
| Bootstrap Icons | 1.x | Ícones |

---

## Funcionalidades

- **Busca de usuários** — pesquise qualquer usuário do GitHub pela home ou pela navbar
- **Perfil do usuário** — avatar, bio, empresa, localização, e-mail, seguidores e seguindo
- **Lista de repositórios** — ordenados por estrelas por padrão, com 6 opções de ordenação e filtro por texto
- **Detalhes do repositório** — descrição, linguagens com barra proporcional, estrelas, forks, issues, licença, tópicos e link para o GitHub

---

## Pré-requisitos

- Node.js 18 ou superior
- npm

---

## Instalação e execução

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/desafio-desbravador-software.git
cd desafio-desbravador-software

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

### Build para produção

```bash
npm run build
# Arquivos gerados em dist/
```

Para visualizar o build localmente:

```bash
npm run preview
```

---

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Página de busca |
| `/user/:username` | Perfil e repositórios do usuário |
| `/user/:username/repo/:reponame` | Detalhes de um repositório |

---

## Estrutura do projeto

```
src/
├── components/
│   ├── ErrorAlert.jsx   # Exibe mensagem de erro com link para voltar
│   ├── Navbar.jsx       # Barra de navegação com campo de busca
│   ├── RepoCard.jsx     # Card resumido de um repositório
│   └── UserCard.jsx     # Perfil lateral do usuário
├── pages/
│   ├── SearchPage.jsx   # Tela inicial de busca
│   ├── UserPage.jsx     # Perfil + lista de repositórios
│   ├── RepoPage.jsx     # Detalhes de um repositório
│   └── NotFoundPage.jsx # Página 404
├── services/
│   └── github.js        # Chamadas à API do GitHub via Axios
├── App.jsx              # Configuração das rotas
├── main.jsx             # Ponto de entrada da aplicação
└── index.css            # Estilos globais
```

---

## API do GitHub

Endpoints utilizados:

| Endpoint | Uso |
|---|---|
| `GET /users/{username}` | Dados do usuário |
| `GET /users/{username}/repos` | Lista de repositórios (paginado) |
| `GET /repos/{username}/{repo}` | Detalhes de um repositório |
| `GET /repos/{username}/{repo}/languages` | Linguagens do repositório |

> Sem autenticação, o limite é de **60 requisições/hora** por IP. Para aumentar esse limite, configure um [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) do GitHub.

---

## Deploy

O projeto inclui `netlify.toml` com a configuração de redirect para SPA. Para publicar no Netlify:

1. Faça push do repositório para o GitHub
2. Acesse [netlify.com](https://netlify.com) e conecte o repositório
3. As configurações de build são detectadas automaticamente

---

Desenvolvido por **Victor Rian** — Desafio Front-End Desbravador Software.
