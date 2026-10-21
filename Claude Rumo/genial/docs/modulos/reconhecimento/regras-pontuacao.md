# Regras de pontuação e ranking

Fontes: `briefing.md` e `especificacao.md` ("esp. N"). Itens `PROPOSTA` vieram do dono do produto como sugestão e **não podem ir para telas como regra fixa**; quando uma tela precisar deles, trate-os como valores configuráveis.

## Critérios — PROPOSTA (esp. 7.1)

| Critério | Peso sugerido | O que a IA considera (esp. 7.2) |
| --- | --- | --- |
| Impacto gerado pela entrega | 40% | Resultados obtidos: economia de tempo, redução de custos, melhoria de qualidade, resolução de problemas relevantes |
| Complexidade e esforço aplicado | 25% | Dificuldade da entrega e esforço para concluí-la |
| Iniciativa e proatividade | 20% | Veio de uma solicitação ou de iniciativa do colaborador |
| Evidências e reconhecimento do resultado | 15% | Informações verificáveis ou reconhecimento formal |

- Critérios e pesos são **configuráveis pelo RH** (CONFIRMADA, esp. 7.1 e 11.1).
- A tela de configuração é de RH e TI (esp. 13). Quem altera o quê nela: A DEFINIR (Q-config-criterios).
- Se o colaborador vê a pontuação por critério ou só a final: A DEFINIR (Q-pontuacao-criterio).

## Escala e cálculo

- Pontuação por entrega **de 1 a 5, com decimal** (ex.: 4,6) (CONFIRMADA, esp. 4 e 7; dono do produto em 21/10/2026, Q-escala). O "0 a 5" do exemplo da esp. 7.3 fica descartado.
- HIPÓTESE: uma casa decimal, resultado da média ponderada dos critérios.
- Só entregas aprovadas pelo validador geram pontos; recusadas não entram no ranking (CONFIRMADA, esp. 14).
- O validador não atribui pontuação: só aprova, solicita ajustes ou recusa (CONFIRMADA, esp. 6). Para aprovar, ele avalia a relevância da entrega, impacto x esforço (CONFIRMADA, 21/10/2026).
- O RH pode revisar pontuações antes da homologação, com justificativa e registro da alteração (CONFIRMADA, esp. 7.3 e 14). A revisão é feita por critério e a nota final é recalculada pelos pesos (CONFIRMADA, 21/10/2026).

## Saldos — CONFIRMADA (esp. 8)

| Saldo | Definição |
| --- | --- |
| Saldo mensal | Soma das pontuações consideradas no ciclo vigente |
| Saldo histórico | Total de pontos recebidos nos ciclos anteriores |
| Pendentes | Indicadores de entregas aguardando validação ou avaliação |

CONFIRMADA (21/10/2026, Q-saldos): o saldo mensal soma as entregas já avaliadas, com o rótulo "em apuração" até a apuração final do ciclo; o saldo histórico soma só ciclos homologados.

## Ciclo — CONFIRMADA (esp. 9)

Ciclo **mensal**. Calendário sugerido; as datas são **configuráveis** no sistema:

| Período | Etapa | Responsável |
| --- | --- | --- |
| Semanas 1 a 4 | Cadastro voluntário das entregas | Colaboradores |
| Até o dia 5 do mês seguinte | Finalização das validações | Gestores |
| Dia 6 | Avaliação e consolidação das pontuações | IA |
| Dias 7 a 9 | Conferência e homologação | RH |
| Dia 10 | Divulgação do Destaque do Mês | RH e Marketing |

- Entregas aprovadas durante o mês podem ser avaliadas na hora; no dia 6 roda a apuração final de todas as entregas elegíveis do ciclo (CONFIRMADA).
- Ao encerrar, o resultado fica definitivo, um novo ciclo começa e os anteriores são preservados (CONFIRMADA, esp. 9 e 14).
- HIPÓTESE: a entrega pertence ao ciclo do mês em que foi enviada, mesmo se validada até o dia 5 do mês seguinte (Q-ciclo-entrega).
- Entregas não validadas até o prazo: lembretes ao validador 3 dias antes e no dia; depois, o RH aprova no lugar do validador ou cancela, antes da homologação (CONFIRMADA, 21/10/2026).
- Homologação: uma ação para o ciclo inteiro, com resumo e confirmação; reabertura só com justificativa, refazendo o resultado oficial (CONFIRMADA, 21/10/2026).

## Ranking

- Ranking mensal consolidado a partir das pontuações (CONFIRMADA, esp. 8.1).
- Ranking definitivo só após homologação do RH (CONFIRMADA, esp. 14).
- Classificação pelo saldo mensal, a soma das pontuações (HIPÓTESE, decorre da esp. 8).
- **Não há limite de entregas por ciclo.** O volume é controlado pelo gestor, que só aprova entregas relevantes, avaliando impacto x esforço (CONFIRMADA, dono do produto em 21/10/2026, Q-limite). A sugestão da esp. 8.1 de contar só as melhores entregas fica descartada.
- **Desempate pelo volume de entregas aprovadas no ciclo** (CONFIRMADA, 21/10/2026, Q-desempate). Novo empate: A DEFINIR.
- Visibilidade: colaboradores veem o ranking, as entregas de destaque e o histórico público dos colegas, sem evidências confidenciais, comentários privados de gestores ou dados de clientes não autorizados (CONFIRMADA, esp. 8.2). Histórico público: título, resumo do resultado, pontuação e mês de todas as entregas homologadas, sem opção de esconder (CONFIRMADA, 21/10/2026, Q-historico-publico).
- Ranking provisório visível durante o mês, marcado "em apuração"; oficial depois da homologação (CONFIRMADA, 21/10/2026, Q-ranking).

## Destaque do Mês — CONFIRMADA (esp. 10)

- Quem tiver a maior pontuação elegível do ciclo, após homologação.
- Divulgação nos canais internos da Rumo, com resumo das principais realizações (PROPOSTA, "poderá").
- Qualquer colaborador pode ser Destaque, inclusive quem foi no mês anterior; empate resolvido pelo número de entregas aprovadas (CONFIRMADA, 21/10/2026, Q-elegibilidade).
- O histórico pode apoiar iniciativas futuras de valorização, mas não é avaliação formal de desempenho (CONFIRMADA).

> Atenção de UX: rankings abertos aumentam o engajamento de quem está no topo e podem desmotivar o restante. Mesmo com o ranking visível a todos (esp. 8.2), dê destaque, para o colaborador, à própria evolução (6 e 12 meses) e à própria posição.
