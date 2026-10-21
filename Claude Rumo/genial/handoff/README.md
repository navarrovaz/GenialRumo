# Handoff para desenvolvimento

Pacotes de telas **validadas** para os desenvolvedores do Genial Web, gerados com `/handoff-dev <id>`.

Cada pacote fica em `AAAA-MM-DD-<id>/` e contém:
- `prototipo/`: HTML/CSS/JS que funcionam sozinhos (CSS e ícones copiados).
- `ESPECIFICACAO.md`: campos, estados, ações, textos, dados necessários e regras com status.
- `INTEGRACAO.md`: como encaixar no Genial Web (Bootstrap 3, Razor, fontes, ícones).
- `CHECKLIST.md`: conferência antes de publicar.

Regras marcadas como `HIPÓTESE` ou `A DEFINIR` no pacote precisam de decisão antes da implementação.

## Pacotes entregues

Reconhecimento Profissional, fases 1 e 2 (cadastro, acompanhamento, validação) e telas do colaborador ligadas ao ranking. Ordem sugerida de implementação: cadastrar → minhas entregas → detalhe → validação + e-mail → visão geral → ranking → histórico.

| Data | Pacote | Conteúdo |
| --- | --- | --- |
| 21/10/2026 | `2026-10-21-cadastrar-entrega/` | Cadastro, rascunho, edição e ajuste da entrega |
| 21/10/2026 | `2026-10-21-minhas-entregas/` | Saldos, pendências e lista de entregas por ciclo |
| 21/10/2026 | `2026-10-21-detalhe-entrega/` | Status, avaliação da IA, validação, histórico |
| 21/10/2026 | `2026-10-21-validar-entregas/` | Fila do gestor (`index.html`) e página do link seguro do cliente (`externo.html`) |
| 21/10/2026 | `2026-10-21-email-validacao/` | E-mail ao validador: gestor, cliente e texto puro (decisão 003 em aberto) |
| 21/10/2026 | `2026-10-21-visao-geral/` | Página inicial do Reconhecimento: ranking do mês com pódio, indicadores, evolução, escolha de avatar |
| 21/10/2026 | `2026-10-21-ranking-mensal/` | Pódio, participantes, ranking completo, sua posição, entregas públicas |
| 21/10/2026 | `2026-10-21-historico-reconhecimentos/` | Histórico próprio, dos colegas e galeria de Destaques do Mês |

**Atualização de 21/10/2026:** os pacotes de cadastrar, minhas entregas, detalhe e validação foram refeitos com os avatares ilustrados (cartela em `prototipo/design-system/assets/avatares/`, componente Avatar). Ver a seção "Avatares" no `INTEGRACAO.md` de cada um.

Pendências que afetam estes pacotes: Q-ciclo-entrega, Q-prazo-validacao, Q-notificacoes, Q-ia-falha, Q-ia-dados, quantidade máxima de evidências e gestor substituto (`docs/modulos/reconhecimento/questoes-abertas.md`); decisões 001 e 003 a validar com os devs.
