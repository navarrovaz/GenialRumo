# 002 — Design system como fonte única de estilo

**Status:** Aceita (21/10/2026, dono do produto: "assumir este documento como guia UX design system do projeto Genial")

## Contexto

O Genial atual mistura azuis, cinzas, duas bibliotecas de ícones e estilos de painel. As telas novas precisam ser consistentes entre si e com as futuras.

## Decisão

- `docs/design-system/` é a fonte única: `tokens.json` (valores), `tokens.css` (gerado), `components/bundle.css` (componentes `gn-*`), READMEs de uso.
- O Azul Genial #008FD2 (`--genial-500`) é imutável. Ações e links usam `--genial-600` por contraste.
- Sem modo escuro.
- A versão navegável é o artifact "Genial Design System" no Claude. Mudanças são feitas lá ou aqui e sincronizadas nos dois lugares.
- Componente novo só entra após proposta e aprovação (skill `genial-ui`).

## Consequências

Nenhum protótipo usa valores literais de cor, fonte, raio, sombra ou espaçamento.
