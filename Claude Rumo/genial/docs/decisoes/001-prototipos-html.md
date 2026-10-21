# 001 — Protótipos em HTML/CSS puro

**Status:** Proposta (validar com o time de desenvolvimento do Genial Web)

## Contexto

As telas novas serão validadas aqui e o código passado aos desenvolvedores, que implementam no Genial Web (ASP.NET MVC, views Razor, Bootstrap 3, jQuery). O protótipo precisa ser fácil de portar e não pode trazer dependências que o Genial não tem.

## Decisão

- HTML semântico + `docs/design-system/tokens.css` + `docs/design-system/components/bundle.css` + um `tela.css` opcional só com layout (usando tokens).
- JavaScript vanilla mínimo, apenas para simular estados e interações (abrir diálogo, trocar estado). Todo trecho que simula backend é marcado com `// SIMULAÇÃO`.
- Sem React, Vue, Tailwind, build ou npm.
- Ícones SVG inline (Lucide). Fonte Plus Jakarta Sans via Google Fonts.

## Alternativas consideradas

- **Framework (React/Next):** prototipação mais rápida, mas os devs teriam que reescrever tudo em Razor.
- **Bootstrap 3 puro:** portaria direto, mas não entrega o visual do design system.

## Consequências

- O porte para Razor é quase cópia da marcação, trocando dados de exemplo por variáveis do modelo.
- As classes `gn-*` não colidem com o Bootstrap; `tokens.css` e `bundle.css` devem ser carregados depois do Bootstrap nas páginas novas.
- A ser confirmado com os devs: carregar Google Fonts na rede da Rumo, suporte de navegadores a variáveis CSS (todos os navegadores atuais suportam).
