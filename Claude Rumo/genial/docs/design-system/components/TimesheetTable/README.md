# TimesheetTable

Grade de lançamentos do mês: uma linha por dia, com marcações, total, saldo, situação e atividade.

**O consumidor fornece:** os dias do período com marcações, total, saldo já calculado, situação e atividade; a quantidade de pares de colunas (1 a 4); e a ação de edição por dia.

- Estrutura: `gn-table-wrap` > `table.gn-table`. Cabeçalho em `overline` sobre `bg-sunken`, fixo ao rolar. Linhas com `row-compact` (44px) e divisória `border-subtle`.
- Horários aparecem como **texto** (`is-time`, algarismos tabulares), não como caixas. A edição abre por linha (botão `pencil` ou clique na linha), com `gn-input--time` só no dia em edição. Isso resolve a dúvida "o que é editável" das caixas cinza e brancas atuais.
- Dia: `gn-day` com dia da semana abreviado (`Seg`) e data `05/10`.
- **Estados de dia sempre com rótulo, nunca só cor:**
  - Fim de semana: `tr.is-weekend` (`day-weekend-bg`) + "Fim de semana" ocupando as colunas de marcação.
  - Feriado: `tr.is-holiday` (`day-holiday-bg`) + badge "Feriado" + nome do feriado vindo do Calendário Colaborativo.
  - Hoje: `tr.is-today` (`day-today-bg`) + badge "Hoje".
  - Marcação sem par: badge `attention` "Sem par" e Total "—". O sistema nunca descarta uma marcação em silêncio.
  - Dentro da tolerância: badge neutro "Tolerância" com o motivo no `title`.
  - Justificado: badge `info` "Justificado" + texto da atividade.
- Saldo com `gn-delta` (sinal e ícone). A coluna "Indicador(es)" deixa de existir: a coluna Situação a substitui.
- Colunas numéricas alinhadas à direita (`is-num`). Rodapé `tfoot` com os totais do período.
- No app, a grade vira lista de dias (um card por dia) com as mesmas regras de estado.
