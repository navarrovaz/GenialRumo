# Detalhamento e edição de entrega — especificação

Tela validada pelo dono do produto em 21/10/2026. Protótipo: `prototipo/index.html` (estados por `?estado=<nome>`). A **edição** usa o formulário de cadastro (pacote `2026-10-21-cadastrar-entrega`, estados `editar` e `ajustes`). Fonte das regras: `docs/modulos/reconhecimento/`.

## Objetivo e acesso

- **Objetivo:** o colaborador vê tudo sobre uma entrega: status, avaliação da IA explicada, o que escreveu, a decisão e o comentário do validador, o efeito no ciclo e o histórico.
- **Perfil:** colaborador dono da entrega. Outra pessoa que abrir o endereço vê "Entrega não encontrada" (não revelar que a entrega existe).
- **Menu:** não tem item próprio; abre a partir de Minhas entregas (item ativo: "Minhas entregas"). Breadcrumb: Reconhecimento › Minhas entregas › Detalhe da entrega.

## Componentes do design system

Avatar (cartela de avatares ilustrados, atualização de 21/10/2026) · Sidebar, Topbar, Card, Alert, Badge, MeterList, AttachmentList, AuditLog, EmptyState, ConfirmDialog, Button, Readout (`gn-readout`), Delta (`gn-delta`).

## Estrutura

1. Voltar para "Minhas entregas" (botão fantasma).
2. Cabeçalho: título da entrega + Badge do status; linha "Ciclo de <mês> · enviada em DD/MM"; ações do status.
3. Alerta do status (quando houver).
4. Coluna principal: **Avaliação da IA** · **Sobre a entrega** · **Histórico**.
5. Coluna lateral: **Validação** · **No ciclo** (quando avaliada ou homologada).

### Ações e alerta por status

| Status | Ações no cabeçalho | Alerta |
| --- | --- | --- |
| Rascunho | Continuar cadastro (primário) · Excluir entrega | info: "Esta entrega ainda não foi enviada" + prazo do cadastro |
| Aguardando validação | Editar entrega (primário) · Excluir entrega | info: "Com <validador> desde DD/MM" + prazo + "o link de validação mostra sempre a versão mais recente" |
| Ajustes solicitados | Ajustar entrega (primário) | attention: "<validador> pediu ajustes" + prazo; o comentário fica em Validação |
| Aguardando avaliação | — | — (o card de avaliação mostra "A pontuação ainda não saiu") |
| Avaliada | — | — |
| Recusada | — | negative: "<validador> recusou esta entrega em DD/MM" + "não contam pontos" |
| Homologada | — | — |
| Cancelada | — | info: "O RH cancelou esta entrega em DD/MM" + motivo |

### Avaliação da IA

- Pontuação final em destaque ("4,6 de 5") com a origem: "Média ponderada dos critérios" ou "Pontuação da IA: 3,4" quando o RH ajustou.
- Badge de situação: "Em apuração até DD/MM" (info, `clock`) ou "Homologada em DD/MM" (positive, `shield-check`).
- Justificativa da IA em texto.
- Pontuação por critério (MeterList): nome, peso e nota com uma casa decimal; barra = nota / 5.
- Ajuste do RH (quando houver): badge "Ajustada pelo RH", nota anterior riscada e nova (`gn-diff`), autor, data e justificativa.
- Rodapé: "Avaliação automática, com os mesmos critérios e pesos para todos. O RH pode revisar a pontuação antes da homologação."
- A IA não aparece como pessoa: no histórico, avatar com ícone e nome "Avaliação automática".

## Estados

| Estado (`?estado=`) | Status / situação |
| --- | --- |
| `avaliada` (padrão) | Avaliada, em apuração |
| `rascunho` | Rascunho |
| `aguardando-validacao` | Aguardando validação (validador da pessoa do cliente) |
| `ajustes-solicitados` | Ajustes solicitados |
| `aguardando-avaliacao` | Aprovada, sem pontuação |
| `recusada` | Recusada |
| `homologada` | Homologada |
| `ajustada-rh` | Homologada com pontuação revisada pelo RH |
| `cancelada` | Cancelada pelo RH |
| `nao-encontrada` | Entrega inexistente, excluída ou de outra pessoa |
| `erro` | Falha ao carregar |

## Ações

| Ação | O que faz | Confirmação |
| --- | --- | --- |
| Continuar cadastro | Abre o cadastro com o rascunho | Não |
| Editar entrega | Abre o cadastro em modo `editar` | Não |
| Ajustar entrega | Abre o cadastro em modo `ajustes` | Não |
| Excluir entrega | Exclui e volta para Minhas entregas com "Entrega excluída" | Sim: "Excluir esta entrega?" |
| Evidência | Abre ou baixa o arquivo / abre o link | Não |

## Dados necessários (sugestão de contrato)

```json
{
  "id": 101,
  "titulo": "Automatização do relatório de vendas",
  "status": "avaliada",
  "ciclo": { "id": "2026-10", "nome": "Outubro de 2026", "apuracaoEm": "2026-11-06" },
  "enviadaEm": "2026-10-08",
  "conteudo": { "descricao": "...", "tempoQuantidade": 7, "tempoUnidade": "dias", "origem": "iniciativa", "resultado": "...",
    "evidencias": [ { "tipo": "arquivo", "nome": "email-agradecimento-gestor.pdf", "tamanhoBytes": 186368, "url": "/Reconhecimento/Evidencia/55" } ] },
  "validacao": { "validador": { "tipo": "gestor", "nome": "Carlos Andrade" }, "decisao": "aprovar", "data": "2026-10-09", "comentario": "Resultado confirmado..." },
  "avaliacao": {
    "pontuacao": 4.6, "pontuacaoIa": 4.6, "avaliadaEm": "2026-10-10", "versaoCriterios": "2026-10",
    "criterios": [ { "nome": "Impacto gerado", "peso": 40, "nota": 4.8 }, { "nome": "Complexidade e esforço", "peso": 25, "nota": 4.2 }, { "nome": "Iniciativa e proatividade", "peso": 20, "nota": 5.0 }, { "nome": "Evidências do resultado", "peso": 15, "nota": 4.0 } ],
    "justificativa": "A entrega gerou alto impacto operacional...",
    "ajusteRh": null,
    "homologadaEm": null
  },
  "ciclo_resumo": { "contribuicao": 4.6, "saldoCiclo": 11.9, "situacaoSaldo": "em_apuracao" },
  "historico": [ { "quando": "2026-10-10T02:10:00", "autor": { "tipo": "ia" }, "acao": "atribuiu a pontuação", "detalhes": [ { "tipo": "add", "texto": "4,6" } ] } ]
}
```

`ajusteRh` quando houver: `{ "autor": "Juliana Prado", "data": "2026-10-08", "de": 3.4, "para": 3.8, "justificativa": "..." }`. `autor.tipo` no histórico: `voce`, `pessoa`, `rh`, `ia`. Sugestão; o modelo final é dos devs.

## Regras de negócio

| Regra | Status |
| --- | --- |
| Os 8 status e as ações permitidas em cada um | CONFIRMADA |
| Comentários do validador visíveis ao colaborador | CONFIRMADA |
| Pontuação de 1 a 5 com uma casa decimal; justificativa da IA sempre visível | CONFIRMADA |
| Pontuação por critério visível ao colaborador, com o peso | CONFIRMADA |
| Revisão do RH com justificativa, visível ao colaborador, registrada no histórico | CONFIRMADA |
| Responsável, data e comentário de cada decisão | CONFIRMADA |
| "Em apuração" até a apuração final; oficial depois da homologação | CONFIRMADA |
| Sem contestação pelo colaborador | CONFIRMADA |
| Prazo exibido para a avaliação: "até a apuração do ciclo" (dia 6 do mês seguinte) | CONFIRMADA |
| O link do validador mostra sempre a versão atual da entrega | CONFIRMADA |
| O que acontece se a IA falhar (mensagem ao colaborador, reprocessamento) | **A DEFINIR** (Q-ia-falha) |
| A IA não é apresentada como pessoa | CONFIRMADA (princípio do módulo) |

## Textos da interface

| Onde | Texto |
| --- | --- |
| Navegação | Minhas entregas · Detalhe da entrega |
| Cards | Avaliação da IA · Sobre a entrega · Histórico · Validação · No ciclo |
| Avaliação | de 5 · Média ponderada dos critérios · Pontuação da IA: N · Justificativa · Pontuação por critério · <critério> · peso N% · Ajustada pelo RH · <autor> (RH), em DD/MM: <justificativa> · Avaliação automática, com os mesmos critérios e pesos para todos. O RH pode revisar a pontuação antes da homologação. |
| Avaliação pendente | A pontuação ainda não saiu · A IA avalia as entregas aprovadas pelos critérios do ciclo. A pontuação aparece aqui até a apuração de DD/MM. |
| Sobre a entrega | O que você entregou? · Em quanto tempo? · Como a entrega começou? · Qual foi o resultado? · Evidências · Não preenchido · Nenhuma evidência anexada |
| Validação | Decisão · Data · Comentário de <validador> · Aprovada · Ajustes solicitados · Recusada · Aguardando decisão · Ainda não enviada · Sem decisão |
| No ciclo | Ciclo · Esta entrega (+4,6 pts) · Seu saldo do ciclo (em apuração / homologado) |
| Histórico | Você · <pessoa> · <pessoa> RH · Avaliação automática · cadastrou a entrega · enviou para validação · aprovou a entrega · pediu ajustes · recusou a entrega · atribuiu a pontuação · revisou a pontuação · homologou o resultado de <mês> · cancelou a entrega · salvou o rascunho |
| Não encontrada | Entrega não encontrada · Ela pode ter sido excluída ou o link está incompleto. Suas entregas estão na lista. · Ver minhas entregas |
| Erro | Não foi possível carregar a entrega · O Genial não respondeu. A entrega continua salva. Tente de novo em alguns instantes. · Tentar de novo |

Alertas por status: ver tabela "Ações e alerta por status".

## Acessibilidade

- Um `h1` (título da entrega); cards com `h2` e `aria-labelledby`.
- Badge sempre com texto e ícone; pontuação nunca só por cor.
- Barras de critério com `aria-hidden` (o valor está em texto).
- Histórico em `<ol>` (AuditLog), mais recente primeiro.
- Diálogo de exclusão com foco preso, Esc e retorno do foco.
