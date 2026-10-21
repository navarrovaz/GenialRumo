# 003 — E-mails usam os valores dos tokens escritos por extenso

**Status:** Proposta (21/10/2026, validar com os devs do Genial Web)

## Contexto

O módulo de Reconhecimento envia e-mails ao validador (esp. 6). Programas de e-mail (Outlook para Windows, Gmail) ignoram variáveis CSS (`var(--token)`), folhas de estilo externas e boa parte do CSS moderno. A regra da decisão 002 ("nenhum valor literal") não funciona dentro de um e-mail.

## Decisão

- Modelos de e-mail são uma exceção à 002: usam HTML em tabelas, estilos inline e os **valores** dos tokens escritos por extenso (ex.: `#0676AE` no lugar de `var(--action)`).
- Todo valor literal vem de `docs/design-system/tokens.json`, com o nome do token em comentário no topo do modelo. Nenhuma cor nova.
- Fonte: `'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif`. Onde a fonte da web não carrega (Outlook), o e-mail usa Segoe UI ou Arial.
- Largura de 600px, botões em tabela ("bulletproof"), imagens só para o logo, com `alt`.
- Cada e-mail tem versão em texto puro.

## Alternativas consideradas

- **Gerar o CSS inline a partir do `tokens.css` no build:** ideal, mas o Genial Web não tem pipeline de front-end hoje.
- **E-mail só em texto:** funciona em todo lugar, mas perde os botões de decisão pedidos na esp. 6.

## Consequências

- Se um token de cor mudar, os modelos de e-mail precisam ser revisados à mão (a lista de tokens usados fica no topo de cada modelo).
- As telas continuam proibidas de usar valores literais.
