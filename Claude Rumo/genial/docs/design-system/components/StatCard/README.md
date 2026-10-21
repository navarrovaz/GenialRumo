# StatCard

Indicador numérico do período, no topo das telas de ponto, como os cards de resumo das referências.

**O consumidor fornece:** rótulo, valor já formatado (HH:MM, com sinal `−` quando negativo), ícone Lucide e uma linha de contexto (comparação, meta ou explicação).

- Valor em `num-kpi` com algarismos tabulares. Negativo: `gn-stat__value--neg` + sinal `−`; positivo de saldo: `gn-stat__value--pos` + `+`. Totais neutros (horas lançadas) ficam em `text-strong`.
- A linha `gn-stat__meta` explica o número: "de 168:00 esperadas", "Inclui meses anteriores". Um número sem contexto não ajuda a decidir nada.
- Use `gn-progress` quando houver meta (horas lançadas × esperadas); a barra usa `brand`.
- Grade: `gn-grid-stats` (4 colunas na web, 2 abaixo de 900px). No app, dois cards lado a lado (Saldo do dia / Banco de horas).
- Substitui a faixa de campos "Total de Horas Esperadas / Lançadas / Atestado / Saldo / Extra a Receber" no rodapé da grade.
