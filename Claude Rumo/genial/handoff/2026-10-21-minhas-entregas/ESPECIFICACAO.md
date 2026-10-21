# Minhas entregas — especificação

Tela validada pelo dono do produto em 21/10/2026. Protótipo: `prototipo/index.html` (estados por `?estado=<nome>`). Fonte das regras: `docs/modulos/reconhecimento/`.

## Objetivo e acesso

- **Objetivo:** o colaborador acompanha as próprias entregas por ciclo: saldos, pendências, status, pontuação e as ações que cada status permite.
- **Perfil:** colaborador. Vê só as próprias entregas.
- **Menu:** RECONHECIMENTO → "Minhas entregas" (ícone `list-checks`), com contador de entregas que "precisam de você" (rascunhos + ajustes solicitados).

## Componentes do design system

Avatar (cartela de avatares ilustrados, atualização de 21/10/2026) · Sidebar (com `gn-badge--count`), Topbar, StatCard (`gn-grid-stats`), Alert, Field (`gn-select` do ciclo), FilterChip (filtros por grupo), TimesheetTable (estrutura `gn-table`), Badge, EmptyState, ConfirmDialog, Button.

## Indicadores do ciclo selecionado

| Indicador | Valor | Linha de apoio |
| --- | --- | --- |
| Saldo de <mês> | soma das pontuações das entregas avaliadas no ciclo, uma casa decimal (`11,9 pts`) | ciclo vigente: "N entregas avaliadas · em apuração até DD/MM"; ciclo homologado: "N entregas homologadas em DD/MM" |
| Saldo histórico | soma dos ciclos homologados | "Ciclos homologados desde <mês> de <ano>" |
| Entregas aprovadas | quantidade aprovada no ciclo | "No ciclo · usado no desempate do ranking" |
| Pendentes | aguardando validação + aguardando avaliação | "N com o validador · N aguardando avaliação" ou "Ciclo encerrado" |

## Filtros

- **Ciclo** (`gn-select`): ciclo vigente "(em andamento)" e ciclos anteriores "(homologado)". Trocar de ciclo volta o filtro para "Todas".
- **Grupos de situação** (chips com `aria-pressed` e contagem):

| Chip | Status incluídos |
| --- | --- |
| Todas | todos |
| Precisam de você | `rascunho`, `ajustes_solicitados` |
| Em andamento | `aguardando_validacao`, `aguardando_avaliacao` |
| Avaliadas | `avaliada`, `homologada` |
| Encerradas | `recusada`, `cancelada` |

## Tabela

Colunas: Entrega (título como link para o detalhe + linha de apoio) · Situação (Badge) · Pontuação (1 a 5) · Ações. Ordem: atualização mais recente primeiro.

| Status | Badge | Linha de apoio | Pontuação | Ações |
| --- | --- | --- | --- | --- |
| Rascunho | neutral · `pencil` | Salvo em DD/MM · ainda não enviado | — | Continuar · Excluir (ícone) |
| Aguardando validação | info · `send` | Enviada em DD/MM · validador: <nome> | — | Editar (ícone) · Excluir (ícone) |
| Ajustes solicitados | attention · `message-square-warning` | <validador> pediu ajustes em DD/MM | — | Ajustar |
| Aguardando avaliação | info · `clock` | Aprovada por <validador> em DD/MM | — | — |
| Avaliada | positive · `circle-check` | Avaliada em DD/MM · aprovada por <validador> | `4,6` | — |
| Homologada | positive · `shield-check` | Homologada em DD/MM · (pontuação ajustada pelo RH, se houver) | `4,9` | — |
| Recusada | negative · `circle-alert` | Recusada por <validador> em DD/MM | — | — |
| Cancelada | neutral · `x` | Cancelada pelo RH em DD/MM · motivo | — | — |

"—" tem texto para leitor de tela ("Sem pontuação").

## Estados

| Estado (`?estado=`) | Quando acontece |
| --- | --- |
| `padrao` | Ciclo vigente com entregas |
| `ciclo-anterior` | Ciclo homologado selecionado |
| `filtro-vazio` | Grupo sem entregas: EmptyState com "Ver todas" |
| `vazio` | Nenhuma entrega no ciclo: EmptyState com "Cadastrar entrega" (o botão do cabeçalho some) |
| `carregando` | Linhas-esqueleto na tabela e nos indicadores |
| `erro` | Falha ao carregar: EmptyState com "Tentar de novo" |
| `excluida` | Depois de excluir: alerta "Entrega excluída" |
| `sem-permissao` | Sem acesso ao módulo |

O alerta "Carlos Andrade pediu ajustes em uma entrega" aparece no topo enquanto houver entrega com ajustes solicitados no ciclo vigente (um alerta por entrega, ou um resumo se houver mais de uma).

## Ações

| Ação | O que faz | Confirmação | Retorno |
| --- | --- | --- | --- |
| Cadastrar entrega (primário) | Abre o cadastro | Não | — |
| Título da entrega | Abre o detalhe | Não | — |
| Continuar (rascunho) | Abre o cadastro com o rascunho | Não | — |
| Editar (aguardando validação) | Abre o cadastro em modo editar | Não | — |
| Ajustar | Abre o cadastro em modo ajustes | Não | — |
| Excluir | Exclui a entrega (rascunho ou aguardando validação). Se já enviada, o link do validador deixa de valer | Sim: "Excluir esta entrega?" | "Entrega excluída · "<título>" saiu da sua lista." |
| Ajustar entrega (no alerta) | Abre o cadastro em modo ajustes | Não | — |

## Dados necessários (sugestão de contrato)

```json
{
  "ciclos": [ { "id": "2026-10", "nome": "Outubro de 2026", "situacao": "em_andamento", "apuracaoEm": "2026-11-06" }, { "id": "2026-09", "nome": "Setembro de 2026", "situacao": "homologado", "homologadoEm": "2026-10-09" } ],
  "indicadores": { "saldoCiclo": 11.9, "avaliadasNoCiclo": 3, "saldoHistorico": 86.4, "historicoDesde": "2026-05", "aprovadasNoCiclo": 4, "comValidador": 1, "aguardandoAvaliacao": 1 },
  "entregas": [
    { "id": 101, "titulo": "Automatização do relatório de vendas", "status": "avaliada", "pontuacao": 4.6, "validador": { "nome": "Carlos Andrade", "tipo": "gestor" }, "enviadaEm": "2026-10-08", "decididaEm": "2026-10-09", "avaliadaEm": "2026-10-10", "homologadaEm": null, "ajustadaPeloRh": false, "atualizadaEm": "2026-10-10T02:10:00" }
  ]
}
```

Exclusão: `DELETE` da entrega; o backend recusa se o validador já decidiu. Sugestão; o modelo final é dos devs.

## Regras de negócio

| Regra | Status |
| --- | --- |
| Os 8 status e as ações de cada um (editar e excluir só até a decisão do validador; ajustar quando há ajustes) | CONFIRMADA |
| Pontuação de 1 a 5 com uma casa decimal | CONFIRMADA |
| Saldo do mês soma as avaliadas, marcado "em apuração" até a apuração final; saldo histórico só com ciclos homologados | CONFIRMADA |
| Indicador de pendentes (validação e avaliação) | CONFIRMADA |
| Desempate do ranking pelo número de entregas aprovadas no ciclo | CONFIRMADA |
| Filtros em 5 grupos de status | CONFIRMADA |
| Recusadas e canceladas não pontuam | CONFIRMADA |
| Ajustes devem ser reenviados até o fim do prazo de validação para entrar no ciclo | **HIPÓTESE** (Q-ciclo-entrega, Q-prazo-validacao) |

## Textos da interface

| Onde | Texto |
| --- | --- |
| Título e descrição | Minhas entregas · Acompanhe a validação, a pontuação e os seus saldos em cada ciclo. |
| Indicadores | Saldo de <mês> · Saldo histórico · Entregas aprovadas · Pendentes |
| Alerta de ajustes | <Validador> pediu ajustes em uma entrega · "<título>" precisa de mais detalhes sobre o resultado. Ajuste e reenvie até DD/MM para entrar no ciclo de <mês>. · Ajustar entrega |
| Filtros | Outubro de 2026 (em andamento) · Setembro de 2026 (homologado) · Todas · Precisam de você · Em andamento · Avaliadas · Encerradas |
| Colunas | Entrega · Situação · Pontuação (1 a 5) |
| Botões da linha | Continuar · Ajustar · Editar <título> (aria-label) · Excluir <título> (aria-label) |
| Rodapé | Você pode editar ou excluir uma entrega até o validador decidir. As pontuações avaliadas entram no ranking oficial depois da homologação do RH. |
| Vazio | Você ainda não cadastrou entregas em <mês> · Conte uma realização sua deste mês. O cadastro do ciclo vai até DD/MM. |
| Filtro vazio | Nenhuma entrega neste filtro · Escolha outra situação ou veja todas as entregas do ciclo. · Ver todas |
| Erro | Não foi possível carregar suas entregas · O Genial não respondeu. Suas entregas continuam salvas. Tente de novo em alguns instantes. · Tentar de novo |
| Excluir | Excluir esta entrega? · "<título>" sai da sua lista e não pode ser recuperada. Se ela já foi enviada, o validador deixa de ver o pedido. · Manter entrega · Excluir entrega · Entrega excluída |

## Acessibilidade

- Tabela com `<caption>` (oculto) e `<th scope="col">`; coluna de ações com cabeçalho oculto "Ações".
- Chips com `aria-pressed`; grupo com `aria-label="Filtrar por situação"`.
- Botões só com ícone têm `aria-label` com o título da entrega.
- Contador do menu com `aria-label` ("2 precisam de você").
- Mensagem de exclusão recebe foco; diálogo com foco preso e Esc.
