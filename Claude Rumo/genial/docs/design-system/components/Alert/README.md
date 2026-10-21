# Alert

Alertas avisam sobre algo que afeta a tela inteira ou o período, com o que fazer em seguida.

**O consumidor fornece:** variante, título curto (o fato), texto (a consequência e o próximo passo) e, se houver, uma ação.

- Variantes: `gn-alert--info` (`info`), `gn-alert--attention` (`triangle-alert`), `gn-alert--negative` (`circle-alert`), `gn-alert--positive` (`circle-check`). O ícone é obrigatório.
- Use `role="alert"` só para erros que interrompem; os demais usam `role="status"`.
- Título diz o fato com número ("2 dias com marcação sem par"); texto diz onde e como resolver. Não peça desculpas e não use "Atenção!" como título.
- Posição: no topo do conteúdo, abaixo do título da página, antes dos cards de resumo.
- Alerta não substitui validação de campo: o erro de um horário fica no próprio campo (Field).
