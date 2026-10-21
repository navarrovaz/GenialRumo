# MeterList

Lista de rótulos com valor e barra proporcional, como os pesos dos critérios de avaliação do Reconhecimento.

**O consumidor fornece:** para cada linha, o rótulo, o valor já formatado (`40%`) e a proporção da barra (0 a 100).

- Estrutura: `ul.gn-meters` > `li` com `gn-meter__row` (rótulo + `gn-meter__value`) e `gn-progress` (barra em `brand`, `aria-hidden="true"`, porque o valor já está em texto).
- O valor sempre aparece em texto; a barra só reforça a comparação.
- Ordene do maior para o menor, a menos que a ordem tenha significado próprio.
- Diga de onde vêm os números no subtítulo do card ("Pesos definidos pelo RH para outubro de 2026").
- Para pontuação por critério de uma entrega avaliada (1 a 5), a mesma estrutura serve, com o valor `4,6` e a barra em `valor / 5`.
