# Portfólio · Vitor Bazilio

Portfólio pessoal de **Vitor Bazilio**, desenvolvedor web full-stack (JavaScript, C#/.NET, SQL).

🔗 **Acesse:** https://vitorbazilio.github.io/Portfolio/

## Sobre o projeto

Site estático e responsivo, sem frameworks, com o objetivo de apresentar minha experiência, projetos e
formas de contato de um jeito rápido e acessível.

### Destaques técnicos

- **JavaScript moderno em módulos (ES Modules)**: cada funcionalidade fica isolada em `js/modules/`.
- **Integração com a API do GitHub**: lista os repositórios mais recentes com `fetch`/`async-await`,
  cache em `sessionStorage` e fallback caso a API falhe.
- **IntersectionObserver** para as animações de entrada e para destacar a seção ativa no menu, sem
  recalcular posições a cada scroll.
- **Tema claro/escuro** que segue a preferência do sistema e lembra a escolha do visitante.
- **Filtro de projetos** por tecnologia.
- **Acessibilidade**: HTML semântico, navegação por teclado, link "pular para o conteúdo", `aria-*` no
  menu mobile e respeito a `prefers-reduced-motion`.
- **SEO**: meta tags Open Graph para a prévia no LinkedIn e WhatsApp, e dados estruturados (JSON-LD).
- **CSS com design tokens** (custom properties), Grid/Flexbox e layout *mobile-first* responsivo.

## Tecnologias

`HTML5` · `CSS3` · `JavaScript (ES2020+)` · `GitHub REST API`

## Estrutura

```
├── index.html
├── css/styles.css
├── js/
│   ├── script.js            # ponto de entrada
│   └── modules/
│       ├── theme.js         # tema claro/escuro
│       ├── nav.js           # menu mobile + seção ativa
│       ├── reveal.js        # animações ao rolar
│       ├── typing.js        # efeito de digitação
│       ├── project-filter.js
│       ├── github-repos.js  # consumo da API do GitHub
│       └── copy.js          # copiar e-mail
└── assets/
```

## Rodando localmente

Como o projeto usa ES Modules, abra com um servidor local (não pelo `file://`):

```bash
npx serve .
# ou
python -m http.server
```

## Contato

[LinkedIn](https://www.linkedin.com/in/bazilio-vitor/) · [GitHub](https://github.com/VitorBazilio) ·
sir.vitor.bazilio@gmail.com
