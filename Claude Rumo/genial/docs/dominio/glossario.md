# Glossário e padrão de textos

Regras gerais: português do Brasil, "você", caixa de frase, sem abreviações, sem emoji, sem exclamação. Detalhes em `docs/design-system/README.md` → "Voz e textos".

## Ponto

| Use | Em vez de |
| --- | --- |
| Registrar ponto | Lançamento de Ponto, Lanc. Manual, Meu Ponto, Registro Ponto |
| Marcação | E/S, batida |
| Entrada · Intervalo · Retorno · Saída | Entrada 1 · Saída 1 · Entrada 2 · Saída 2 (no app) |
| Pares de marcação | Qtd Ent/Sai |
| Horas lançadas | Total de Horas Lançadas |
| Saldo do dia · Saldo do mês · Banco de horas | Saldo, Saldo Banco de Horas |
| Não enviado · Enviado ao RH · Aprovado · Devolvido para ajuste | Situação do Lanç. Mês |
| Marcação sem par | (não existia) |
| Contracheque | Contra - Cheque |
| Afastamentos e atestados | Cadastrar Afastamento |
| Falar com o suporte · Falar com o RH | Contate o Suporte, Tire Dúvidas Com o RH |
| Liberação de IP | Liberacao de IP |

## Reconhecimento Profissional

Termos vindos da `docs/modulos/reconhecimento/especificacao.md` estão marcados como CONFIRMADA; os demais são PROPOSTA. Na interface, sempre em caixa de frase, mesmo quando a especificação usa maiúsculas ("Cadastrar Entrega" vira "Cadastrar entrega").

| Termo | Significado | Evitar | Status |
| --- | --- | --- | --- |
| Reconhecimento / Reconhecimento profissional | Nome da seção no menu | Gamificação, Premiação | CONFIRMADA (nome curto ou longo: Q-termos) |
| Entrega | Resultado de destaque registrado pelo colaborador | Tarefa, atividade (já usado no ponto), ticket | CONFIRMADA |
| Cadastrar entrega | Ação e item de menu para criar uma entrega | Lançar | CONFIRMADA (a proposta anterior era "Registrar entrega": Q-termos) |
| Evidência | Material que comprova a entrega (arquivo, documento, print, link) | Anexo (quando for comprovação) | CONFIRMADA |
| Validação | Processo em que o validador confirma a entrega | — | CONFIRMADA |
| Validador | Gestor interno ou representante do cliente que decide sobre a entrega | Aprovador | CONFIRMADA |
| Aprovar · Solicitar ajustes · Recusar | As três decisões do validador | Validar, devolver, rejeitar | CONFIRMADA (21/10/2026) |
| Rascunho · Aguardando validação · Ajustes solicitados · Recusada · Aguardando avaliação · Avaliada · Homologada · Cancelada | Status de uma entrega | Rejeitada, Devolvida para ajuste, Validada, Em avaliação, Pontuada | CONFIRMADA |
| Avaliação da IA | Análise automática da entrega pelos critérios, com justificativa | Nota do robô, IA decidiu | PROPOSTA |
| Justificativa | Texto curto da IA ou do RH explicando a pontuação | Comentário (reservado ao validador) | PROPOSTA |
| Critério | Dimensão avaliada (ex.: impacto) | Quesito | PROPOSTA |
| Peso | Participação de um critério na pontuação, em % | — | CONFIRMADA |
| Pontuação | Pontos atribuídos a uma entrega aprovada e avaliada | Score | PROPOSTA (a especificação também diz "nota") |
| Saldo mensal · Saldo histórico | Pontos do ciclo vigente · pontos dos ciclos anteriores | Saldo (sozinho, já usado no ponto) | CONFIRMADA |
| Ranking mensal | Classificação por pontuação no ciclo | Placar, leaderboard | CONFIRMADA |
| Ciclo | Período de apuração: mensal | Temporada | CONFIRMADA |
| Homologação | Conferência e oficialização do resultado do ciclo pelo RH | Fechamento (já usado no ponto) | CONFIRMADA |
| Destaque do Mês | Colaborador com a maior pontuação elegível do ciclo homologado | Campeão, vencedor | CONFIRMADA |
| Avatar | Imagem ilustrada da cartela que identifica a pessoa (não é foto) | Foto, imagem de perfil | CONFIRMADA |
| Pódio | Os três primeiros do ranking | Top 3 | PROPOSTA |

Formatos: pontuação de 1 a 5 com uma casa decimal e vírgula (`4,6`, CONFIRMADA em 21/10/2026); saldos com uma casa e separador de milhar (`1.250,4 pts`, PROPOSTA); variação com sinal (`+4,6`); posição no ranking `1º`, `2º`.
