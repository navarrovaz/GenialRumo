# Validação de entregas — especificação

Tela validada pelo dono do produto em 21/10/2026. Duas versões:

- **Gestor da Rumo:** `prototipo/index.html`, dentro do Genial, com menu.
- **Pessoa do cliente:** `prototipo/externo.html`, aberta pelo link seguro do e-mail, sem menu e sem login.

Os dois e-mails que levam a estas páginas estão no pacote `2026-10-21-email-validacao`. Fonte das regras: `docs/modulos/reconhecimento/`.

## Objetivo e acesso

- **Objetivo:** o validador confirma a entrega e decide: Aprovar, Solicitar ajustes ou Recusar.
- **Gestor da Rumo:** usuário do Genial indicado como validador em pelo menos uma entrega. Vê só as entregas em que foi indicado. Menu: RECONHECIMENTO → "Validação de entregas" (ícone `inbox`) com contador de pendências. Quem nunca foi indicado não vê o item (estado `sem-permissao` cobre acesso direto pela URL).
- **Pessoa do cliente:** acesso só pelo link seguro: uso único, válido até o fim do prazo de validação do ciclo, enviado só para o e-mail informado pelo colaborador. Nenhuma outra função do Genial.

## Componentes do design system

Avatar (cartela de avatares ilustrados, atualização de 21/10/2026) · Gestor: Sidebar, Topbar, Segmented (FilterChip), Card, Alert, Badge, Field (textarea e contador), AttachmentList, TimesheetTable (estrutura `gn-table` em "Decididas"), EmptyState, ConfirmDialog, Button, Readout.
Pessoa do cliente: os mesmos, sem Sidebar e Topbar (cabeçalho próprio `tela-ext__topo`).

Candidato a componente do design system: o item clicável da fila (`.tela-fila__item`). Por ora está em `tela.css`.

## Versão do gestor

### Estrutura

1. Cabeçalho: "Validação de entregas", descrição, ciclo e "Decida até DD/MM".
2. Alternância (Segmented): **Pendentes N** · **Decididas por você N**.
3. Pendentes: à esquerda a fila "Aguardando você" (mais antiga primeiro); à direita a entrega aberta com a decisão.
4. Decididas: tabela Colaborador · Entrega · Sua decisão · Data, do ciclo vigente.

Item da fila: avatar, nome, título, "Enviada há N dias · DD/MM" ou "Reenviada hoje · DD/MM" + badge "Reenviada" (`refresh-cw`).

Entrega aberta: pessoa (nome e papel), badge "Aguardando validação", título, "Enviada em DD/MM · decida até DD/MM", O que foi entregue, Em quanto tempo, Como a entrega começou, Resultado informado, Evidências. Se foi reenviada após ajustes, alerta info com o comentário anterior do gestor.

### Decisão

- Guia: "A entrega aconteceu como <nome> descreveu?", "É relevante pelo impacto e pelo esforço, além da rotina?", "Você não dá nota: a IA pontua as entregas aprovadas."
- Campo "Comentário para <nome>" (até 1.000 caracteres): opcional para aprovar, **obrigatório** para solicitar ajustes e para recusar.
- Botões: Recusar (fantasma, cor negativa, à esquerda) · Solicitar ajustes (secundário) · Aprovar entrega (primário).

| Decisão | Comentário | Confirmação | Status da entrega depois | Mensagem |
| --- | --- | --- | --- | --- |
| Aprovar | Opcional | Não | `aguardando_avaliacao` | Entrega aprovada: "<título>" · <nome> vê a decisão em Minhas entregas, e a entrega segue para a avaliação da IA. |
| Solicitar ajustes | Obrigatório: "Escreva o que <nome> precisa ajustar ou completar." | Não | `ajustes_solicitados` | Ajustes solicitados: "<título>" · <nome> vê o seu comentário e pode reenviar até DD/MM. |
| Recusar | Obrigatório: "Explique por que a entrega foi recusada. <nome> vai ver a justificativa." | Sim: "Recusar esta entrega?" mostrando a justificativa | `recusada` | Entrega recusada: "<título>" · <nome> vê a sua justificativa. A entrega não conta pontos. |

Depois de cada decisão, a entrega sai da fila, entra em "Decididas" e a próxima da fila abre sozinha. Fila vazia: EmptyState "Nenhuma entrega aguardando você".

### Vindo do e-mail

`?entrega=<id>&decisao=<aprovar|ajustes|recusar>` abre a entrega com um alerta "Você escolheu <decisão> no e-mail" e o foco no botão Aprovar entrega ou no comentário. **Nada é decidido só pelo clique no e-mail.**

### Estados

| Estado (`?estado=`) | Quando |
| --- | --- |
| `padrao` | Fila com a primeira entrega aberta |
| `reenviada` | Entrega reenviada depois de ajustes aberta |
| `aprovada` | Logo após aprovar |
| `ajustes-sem-comentario` | Solicitar ajustes sem comentário |
| `recusar` | Diálogo de recusa aberto |
| `decididas` | Aba "Decididas por você" |
| `vazio` | Nenhuma pendência |
| `erro` | Falha ao carregar |
| `sem-permissao` | Usuário sem entregas para validar |

## Versão da pessoa do cliente

### Estrutura

- Cabeçalho com logo e "Link seguro · válido até DD/MM · uso único" (ícone `lock`).
- "<Colaborador> pediu que você confirme uma entrega" + explicação ("Leva cerca de 2 minutos").
- Leitura: "Você está respondendo como <nome>" · "Responda até DD/MM".
- A entrega (mesmos blocos da versão do gestor) e "Sua resposta" com o mesmo campo e os mesmos três botões.
- Rodapé: por que a pessoa recebeu o link; "Não encaminhe".

### Decisão

Mesmas regras de comentário. **Toda decisão pede confirmação**, porque o link fecha depois da resposta ("Aprovar esta entrega?", "Solicitar ajustes?", "Recusar esta entrega?" + "Sua resposta vai para <colaborador> e este link deixa de funcionar."). Depois: "Você aprovou a entrega. Obrigado, <nome>." e o link deixa de valer.

`?decisao=aprovar` (vindo do e-mail) abre o diálogo de aprovação; `ajustes` e `recusar` mostram o alerta e põem o foco no comentário.

### Estados

| Estado (`?estado=`) | Quando |
| --- | --- |
| `padrao` | Link válido, sem resposta |
| `confirmar` | Diálogo de confirmação |
| `sem-comentario` | Solicitar ajustes sem comentário |
| `decidida` | Resposta registrada |
| `link-usado` | O link já foi usado ("A resposta... foi registrada em DD/MM") |
| `link-expirado` | Passou do prazo |
| `erro` | Falha ao carregar ("O link continua valendo") |

## Dados necessários (sugestão de contrato)

**Fila do gestor:**

```json
{
  "ciclo": { "id": "2026-10", "validacaoAte": "2026-11-05" },
  "pendentes": [
    { "id": "e1", "colaborador": { "nome": "Bruno Costa", "papel": "Desenvolvedor · alocado em cliente" }, "titulo": "Redução do tempo de build do aplicativo",
      "enviadaEm": "2026-10-19", "reenvio": null,
      "conteudo": { "descricao": "...", "tempoQuantidade": 5, "tempoUnidade": "dias", "origem": "iniciativa", "resultado": "...", "evidencias": [] } }
  ],
  "decididas": [ { "colaborador": "Ana Ribeiro", "titulo": "...", "decisao": "aprovar", "data": "2026-10-18" } ]
}
```

`reenvio` quando houver: `{ "pedidoEm": "2026-10-19", "comentarioAnterior": "..." }`.

**Decisão (gestor e pessoa do cliente):**

```json
{ "entregaId": "e1", "decisao": "aprovar | ajustes | recusar", "comentario": "texto ou null" }
```

O backend grava responsável (usuário do Genial ou e-mail do link), data e hora, e comentário; muda o status; no link externo, invalida o token na mesma transação. Recusar e ajustes sem comentário devem ser recusados também no backend.

**Link seguro:** token aleatório, de uso único, ligado à entrega e ao e-mail, expirando no fim do prazo de validação. A página externa recebe só os dados desta entrega. Sugestão; o modelo final é dos devs.

## Regras de negócio

| Regra | Status |
| --- | --- |
| Decisões Aprovar · Solicitar ajustes · Recusar; status "Recusada" | CONFIRMADA |
| Recusar exige justificativa; solicitar ajustes exige comentário | CONFIRMADA |
| Registrar responsável, data e comentário de cada decisão | CONFIRMADA |
| O gestor aprova pela relevância (impacto x esforço) e não dá nota | CONFIRMADA |
| Fila "Validação de entregas" no Genial para o gestor, além do e-mail | CONFIRMADA |
| No Genial, só a recusa pede confirmação; no link do cliente, toda decisão pede | CONFIRMADA |
| Link do cliente: uso único, válido até o fim do prazo, só para o e-mail informado, sem acesso ao resto do Genial | CONFIRMADA |
| Prazo de validação até o dia 5 do mês seguinte (configurável) | CONFIRMADA |
| O colaborador pode editar até a decisão; a página mostra sempre a versão atual | CONFIRMADA |
| Fila ordenada pelo envio, mais antiga primeiro | CONFIRMADA |
| Lembretes ao validador antes do prazo e o que acontece com entregas não validadas no prazo | **A DEFINIR** (Q-prazo-validacao) |
| Avisos ao colaborador sobre a decisão além do Genial (e-mail?) | **A DEFINIR** (Q-notificacoes) |
| Gestor substituto (férias, desligamento) | **A DEFINIR** |

## Textos da interface

| Onde | Texto |
| --- | --- |
| Gestor: título | Validação de entregas · Confirme as entregas de quem você acompanha. Aprove as que forem relevantes pelo impacto e pelo esforço. |
| Gestor: leitura | Ciclo · Decida até |
| Gestor: abas | Pendentes · Decididas por você |
| Gestor: fila | Aguardando você · Da mais antiga para a mais recente · Enviada há N dias · Reenviada hoje · Reenviada |
| Entrega | O que foi entregue · Em quanto tempo · Como a entrega começou · Resultado informado · Evidências · Nenhuma evidência anexada · Enviada em DD/MM · decida até DD/MM |
| Reenvio | <Nome> ajustou e reenviou em DD/MM · Seu pedido de ajustes de DD/MM: "<comentário>" |
| Decisão | Sua decisão · (guia de 3 itens) · Comentário para <nome> · Opcional para aprovar. Obrigatório para solicitar ajustes ou recusar. <Nome> vê este comentário. · Recusar · Solicitar ajustes · Aprovar entrega |
| Recusa | Recusar esta entrega? · <Nome> vê a sua justificativa. A entrega não conta pontos, e a decisão não pode ser desfeita. · Sua justificativa · Voltar · Recusar entrega |
| Decididas | Colaborador · Entrega · Sua decisão · Data |
| Vazio | Nenhuma entrega aguardando você · Quando alguém indicar você para confirmar uma entrega, ela aparece aqui e você recebe um e-mail. · Ver decididas por você |
| Erro | Não foi possível carregar as entregas · O Genial não respondeu. Nenhuma decisão foi perdida. Tente de novo em alguns instantes. |
| Sem permissão | Você não valida entregas · Esta área é para quem foi indicado como validador. Se alguém da sua equipe indicou você, fale com o RH. |
| Externa: topo | Link seguro · válido até DD/MM · uso único |
| Externa: título | <Colaborador> pediu que você confirme uma entrega · <Nome> é <papel> da Rumo Soluções e trabalhou no seu projeto. Ela indicou você para confirmar o que foi feito e o resultado. Leva cerca de 2 minutos. |
| Externa: leitura | Você está respondendo como · Responda até |
| Externa: decisão | Sua resposta · Você responde uma vez. Depois de enviar, este link deixa de funcionar. · Comentário para <nome> |
| Externa: confirmação | Aprovar esta entrega? · Solicitar ajustes? · Recusar esta entrega? · Sua resposta vai para <colaborador> e este link deixa de funcionar. · Seu comentário |
| Externa: fim | Você aprovou a entrega. Obrigado, <nome>. · <Colaborador> vê a sua resposta no Genial. Este link não funciona mais; pode fechar a página. |
| Externa: link | Este link já foi usado · Este link expirou · Não foi possível abrir a entrega |
| Externa: rodapé | Genial · Rumo Soluções. Você recebeu este link porque <colaborador> informou o seu e-mail. Não encaminhe. |
| Vindo do e-mail | Você escolheu <decisão> no e-mail · Confira a entrega e clique em Aprovar entrega para confirmar. · Escreva o comentário para <nome> e clique em <decisão>. |

## Acessibilidade

- Fila: botões com `aria-current="true"` no item aberto; ao trocar, o foco vai para o título da entrega.
- Abas com `aria-pressed`.
- Comentário com `<label for>`; erro com `aria-invalid` e `aria-describedby`; foco volta ao campo.
- Mensagem de decisão recebe foco (`tabindex="-1"`).
- Diálogos com `role="dialog"`, `aria-modal`, foco preso, Esc e retorno do foco.
- Página externa com `<meta name="robots" content="noindex, nofollow">`; funciona a partir de 360px de largura.
