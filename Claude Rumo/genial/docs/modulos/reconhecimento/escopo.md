# Escopo

Fontes: `briefing.md` e `especificacao.md` (seção indicada como "esp. N").

## Objetivo — CONFIRMADA

Identificar, registrar, validar e reconhecer as entregas de destaque dos colaboradores, dando visibilidade às contribuições individuais, especialmente de quem está alocado em clientes externos.

O módulo é complementar e independente do controle de ponto: tem regras, tabelas, processos e permissões próprios, mas reaproveita login, cadastro de colaboradores, vínculos com gestores (se cadastrados) e o padrão de interface do Genial Web (esp. 3).

## Atores

| Ator | Papel no módulo | Status |
| --- | --- | --- |
| Colaborador | Registra entregas voluntariamente; acompanha status, comentários, avaliação da IA, pontos, ranking e histórico; consulta o histórico público dos colegas (esp. 5.3, 8.2) | CONFIRMADA |
| Gestor interno (validador) | Recebe e-mail e aprova, solicita ajustes ou recusa a entrega (esp. 6) | CONFIRMADA |
| Representante do cliente (validador externo) | Mesma decisão do gestor, por link seguro (uso único, válido até o fim do prazo, só para o e-mail informado), sem acesso ao resto do Genial (esp. 6) | CONFIRMADA (21/10/2026) |
| IA | Avalia entregas aprovadas, atribui pontuação de 1 a 5 e justificativa (esp. 7) | CONFIRMADA |
| RH | Administra o programa: entregas, revisão de pontuações, critérios e pesos, ciclos, homologação, relatórios (esp. 11.1) | CONFIRMADA |
| TI | Administração técnica: perfis, e-mail, integração com IA, falhas, logs (esp. 11.2) | CONFIRMADA |
| Marketing | Divulga o Destaque do Mês com o RH (esp. 9) | CONFIRMADA (fora do sistema) |

Separar as permissões do RH das da TI, para que a TI não veja avaliações sem necessidade operacional: PROPOSTA ("recomenda-se", esp. 11.2).

## Ciclo de vida de uma entrega — CONFIRMADA (esp. 12)

```
Rascunho ──enviar──▶ Aguardando validação ──aprovar──▶ Aguardando avaliação ──IA──▶ Avaliada ──homologar──▶ Homologada
   │                     │          ▲
 excluir                 │          └──reenviar── Ajustes solicitados ◀──solicitar ajustes── (validador)
                         └──recusar, com justificativa──▶ Recusada

Qualquer estado ──RH cancela──▶ Cancelada (histórico preservado)
```

| Estado | Significado (esp. 12) | Colaborador pode | Status |
| --- | --- | --- | --- |
| Rascunho | Iniciada, ainda não enviada | Editar, excluir, enviar | CONFIRMADA |
| Aguardando validação | Enviada ao validador | Editar e excluir até o gestor decidir | CONFIRMADA (21/10/2026) · HIPÓTESE: o link do e-mail abre sempre a versão atual (Q-edicao-pendente) |
| Ajustes solicitados | Validador pediu correções | Ajustar e reenviar | CONFIRMADA |
| Recusada | Não confirmada, com justificativa; não pontua ("Rejeitada" na esp. 12) | Consultar | CONFIRMADA |
| Aguardando avaliação | Aprovada, pendente de pontuação | Consultar | CONFIRMADA |
| Avaliada | Pontuada pela IA; o RH pode revisar | Consultar pontuação e justificativa | CONFIRMADA |
| Homologada | Pontuação incluída no resultado oficial do ciclo | Consultar | CONFIRMADA |
| Cancelada | Cancelada com histórico preservado | Consultar | CONFIRMADA · A DEFINIR quem cancela além do RH (Q-cancelamento) |

- O RH pode corrigir, cancelar ou reabrir lançamentos (esp. 11.1). Para qual estado volta uma entrega reaberta: A DEFINIR (Q-reabrir).
- Toda decisão do validador registra responsável, data e comentário (esp. 6). Toda alteração administrativa fica em auditoria (esp. 14).
- Excluir (colaborador, antes da validação) remove; cancelar (RH) preserva o histórico. HIPÓTESE: a exclusão também deixa rastro em auditoria (Q-cancelamento).

## Funcionalidades

| # | Funcionalidade | Fonte | Status |
| --- | --- | --- | --- |
| F1 | Cadastrar entrega: título, o que entregou, em quanto tempo, resultado, quem pode confirmar, evidências | esp. 5.1 | CONFIRMADA (formatos em Q-campos) |
| F1a | Campo "Como a entrega começou?" (iniciativa ou demanda), obrigatório | esp. 5.1 | CONFIRMADA (21/10/2026) |
| F1b | Aviso obrigatório: proibido registrar dados confidenciais, sensíveis ou sigilosos de clientes | esp. 5.1 | CONFIRMADA |
| F1c | Salvar como rascunho | esp. 12 | CONFIRMADA |
| F1d | Evitar entregas duplicadas: alerta de título parecido, sem bloquear | esp. 14 | CONFIRMADA (21/10/2026) |
| F2 | Minhas entregas: lista com status; editar e excluir antes da validação | esp. 5.3 | CONFIRMADA |
| F3 | Detalhe da entrega: comentários do validador, pontuação e justificativa da IA | esp. 5.3 | CONFIRMADA |
| F4 | Validação por e-mail com resumo e link, e pela fila "Validação de entregas" no Genial; decisões Aprovar, Solicitar ajustes, Recusar | esp. 6 | CONFIRMADA |
| F4a | Link seguro para validador externo | esp. 6 | CONFIRMADA (21/10/2026) |
| F5 | Avaliação pela IA com pontuação de 1 a 5 e justificativa | esp. 7 | CONFIRMADA |
| F6 | Saldo mensal, saldo histórico e indicadores de pendentes | esp. 8 | CONFIRMADA |
| F7 | Ranking mensal | esp. 8.1 | CONFIRMADA (existe) · A DEFINIR (regra contra volume, Q-limite) |
| F8 | Histórico público dos colegas, resumido e sem dados sigilosos | esp. 8.2 | CONFIRMADA (existe) · A DEFINIR (campos, Q-historico-publico) |
| F9 | Ciclo mensal com datas configuráveis e apuração final | esp. 9 | CONFIRMADA |
| F10 | Destaque do Mês após homologação | esp. 10 | CONFIRMADA |
| F11 | Evolução individual em 6 ou 12 meses | esp. 10 | CONFIRMADA |
| F12 | Administração RH: entregas, revisão de pontuações, critérios e pesos, ciclos, homologação, relatórios | esp. 11.1 | CONFIRMADA |
| F13 | Administração TI: perfis, e-mail, integração com IA, falhas, logs de auditoria | esp. 11.2 | CONFIRMADA |
| F14 | Contestação da pontuação pelo colaborador | — | Fora do escopo (21/10/2026): só a revisão do RH |
| F15 | Notificações além do e-mail ao validador | — | A DEFINIR (Q-notificacoes) |
| F17 | Avatar ilustrado escolhido pela pessoa (cartela de 12, sem foto), usado no ranking e em todo o Genial | dono do produto, 21/10/2026 | CONFIRMADA |
| F16 | Disponível no app | — | A DEFINIR (a especificação cita só o Genial Web) |

## Fases de implementação — PROPOSTA (esp. 15)

1. Estrutura e cadastro: telas do colaborador, cadastros, histórico de entregas.
2. Validação e notificações: e-mails, fluxo do validador, status.
3. Avaliação por IA: integração, critérios, pontuações e justificativas.
4. Ranking e gestão administrativa: ranking, ciclos, homologação, controles.
5. Relatórios e evolução: dashboards históricos e indicadores.

## Fora do escopo (até decisão contrária)

- Alterar a finalidade ou as funcionalidades atuais do Genial (CONFIRMADA, esp. 3).
- Usar o histórico como avaliação formal de desempenho (CONFIRMADA, esp. 10).
- Recompensas financeiras ou integração com folha.
- Implementação de backend ou da IA (aqui só se prototipa a interface e se descreve o contrato de dados).
