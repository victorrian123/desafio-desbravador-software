# GitHub Explorer

Aplicação web que consome a API do GitHub para exibir informações de usuários e seus repositórios mais populares. Desenvolvida como desafio técnico para a vaga de Front-End na **Desbravador Software**.

## Demo

> Deploy disponível em: *(adicionar link após publicar)*

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 + Vite | SPA e build |
| React Router v7 | Roteamento client-side |
| Axios | Consumo da API do GitHub |
| Bootstrap 5 | Estilização responsiva |
| Bootstrap Icons | Ícones |

---

## Funcionalidades

- **Busca de usuários** — pesquise qualquer usuário do GitHub pela home ou pela navbar
- **Perfil do usuário** — avatar, bio, empresa, localização, e-mail, seguidores/seguindo
- **Lista de repositórios** — ordenação por estrelas (padrão), nome, data de atualização ou forks; filtro por texto
- **Detalhes do repositório** — descrição, linguagens (com barra proporcional), estrelas, forks, issues, licença, tópicos e link direto para o GitHub

---

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Página de busca |
| `/user/:username` | Perfil + repositórios do usuário |
| `/user/:username/repo/:reponame` | Detalhes de um repositório |

---

## Como executar localmente

### Pré-requisitos

- Node.js 18+ e npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/github-explorer.git
cd github-explorer

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build para produção

```bash
npm run build
# Os arquivos ficam na pasta dist/
```

---

## Deploy

A aplicação é uma SPA estática e pode ser publicada em qualquer CDN/serviço de hospedagem estática:

- **Netlify / Vercel**: conecte o repositório e configure `npm run build` + diretório `dist`
- **GitHub Pages**: use `gh-pages` para publicar a pasta `dist`

> **Atenção para rotas no deploy:** em servidores que não suportam SPA nativamente, configure o rewrite de todas as rotas para `index.html`.

---

## Estrutura do projeto

```
src/
├── components/
│   ├── ErrorAlert.jsx   # Mensagem de erro com voltar
│   ├── Navbar.jsx       # Barra de navegação com busca
│   ├── RepoCard.jsx     # Card de repositório na listagem
│   └── UserCard.jsx     # Card lateral do perfil do usuário
├── pages/
│   ├── SearchPage.jsx   # Página inicial de busca
│   ├── UserPage.jsx     # Perfil + lista de repositórios
│   ├── RepoPage.jsx     # Detalhes do repositório
│   └── NotFoundPage.jsx # Página 404
├── services/
│   └── github.js        # Abstração das chamadas à API do GitHub
├── App.jsx              # Definição das rotas
├── main.jsx             # Ponto de entrada
└── index.css            # Estilos globais
```

---

## API do GitHub

A aplicação utiliza a [API pública do GitHub](https://docs.github.com/en/rest). Sem autenticação, o limite é de 60 requisições/hora por IP.

---

Desenvolvido por **Victor Rian** para o desafio técnico da Desbravador Software.
