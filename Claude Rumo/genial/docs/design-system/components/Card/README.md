# Card

O Card agrupa um conjunto de informações relacionadas sobre o fundo `bg-page`.

**O consumidor fornece:** título (`gn-card__title`, h2), subtítulo opcional, o conteúdo do corpo e, se houver, ações no cabeçalho ou no rodapé.

- Web: `gn-card` = `bg-surface`, borda `border-default`, `radius-lg`, `shadow-xs`. App: acrescente `gn-card--app` (`radius-xl`, `shadow-sm`).
- Cabeçalho com título à esquerda e no máximo uma ação fantasma à direita. Ações que confirmam algo vão no rodapé, alinhadas à direita.
- Não aninhe cards. Dentro de um card, separe blocos com `border-subtle` ou espaço (`space-5`).
- Substitui os painéis "Dados Lançamentos" / "Lançamentos" com barra azul inferior do template atual.
