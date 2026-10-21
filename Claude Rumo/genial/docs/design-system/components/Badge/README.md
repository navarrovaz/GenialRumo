# Badge

Badges mostram o estado de um item; o Delta mostra um saldo de horas. Nenhum dos dois comunica só por cor.

**O consumidor fornece:** o texto do estado, a variante e o ícone correspondente.

| Estado do mês | Classe | Ícone |
| --- | --- | --- |
| Não enviado | `gn-badge--neutral` | `pencil` |
| Enviado ao RH | `gn-badge--info` | `send` |
| Aprovado | `gn-badge--positive` | `circle-check` |
| Pendência (marcação sem par, falta de justificativa) | `gn-badge--attention` | `triangle-alert` |
| Devolvido para ajuste | `gn-badge--negative` | `circle-alert` |

| Status da entrega (Reconhecimento) | Classe | Ícone |
| --- | --- | --- |
| Rascunho | `gn-badge--neutral` | `pencil` |
| Aguardando validação | `gn-badge--info` | `send` |
| Ajustes solicitados | `gn-badge--attention` | `message-square-warning` |
| Recusada | `gn-badge--negative` | `circle-alert` |
| Aguardando avaliação | `gn-badge--info` | `clock` |
| Avaliada | `gn-badge--positive` | `circle-check` |
| Homologada | `gn-badge--positive` | `shield-check` |
| Cancelada | `gn-badge--neutral` | `x` |

- Saldos usam `gn-delta`: positivo com `+` e `trending-up` (`positive`), negativo com o sinal de menos tipográfico `−` (U+2212) e `trending-down` (`negative`), zero em `text-muted` sem ícone. Isso substitui os quadradinhos verde/vermelho da coluna "Indicador(es)".
- `gn-badge--count` só para contadores (notificações, pendências no menu).
- Texto curto, sem ponto final, em caixa de frase: "Enviado ao RH", não "ENVIADO".
