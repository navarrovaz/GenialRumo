# Visão geral — especificação

Tela validada pelo dono do produto em 21/10/2026 (com os ajustes: pessoas em primeiro plano, ciclo discreto, avatares). Protótipo: `prototipo/index.html` (estados por `?estado=<nome>`). Fonte das regras: `docs/modulos/reconhecimento/`.

## Objetivo e acesso

- **Objetivo:** página inicial do Reconhecimento. Mostra quem está participando e liderando o mês, a situação da pessoa (saldos, posição, pendências), a evolução de 6 e 12 meses e os reconhecimentos dela. Também é onde a pessoa escolhe o próprio avatar.
- **Perfil:** colaborador.
- **Menu:** RECONHECIMENTO → "Visão geral" (ícone `layout-dashboard`), primeiro item da seção.

## Componentes do design system

Avatar (cartela ilustrada) e AvatarPicker, Podium, StatCard, Alert, Card, Badge, Segmented (FilterChip), TimesheetTable (estrutura `gn-table` da visão em tabela), EmptyState, Steps, ConfirmDialog (estrutura do diálogo), Button.
Candidato ao design system, por ora em `tela.css`: gráfico de colunas (`.tela-grafico`).

## Estrutura, de cima para baixo

1. **Cabeçalho:** avatar da pessoa (`gn-avatar--lg`) com lápis para trocar, "Visão geral", saudação ("Boa tarde, Ana. Este é o seu Reconhecimento em outubro de 2026.") e "Cadastrar entrega" (primário).
2. **Ciclo em uma linha:** "Ciclo de outubro" e as etapas Cadastro até DD/MM · Validação até DD/MM · Apuração DD/MM · Homologação DD a DD/MM · Destaque do Mês DD/MM. A etapa atual fica marcada com ícone `clock`, texto em destaque e quanto falta ("faltam 10 dias").
3. **Aviso de pendências:** "N entregas precisam de você" (rascunhos e ajustes solicitados), com "Ver minhas entregas". Some quando não há pendências.
4. **Ranking do mês** (card principal):
   - pódio com os três primeiros (Podium, avatar 88/72px, medalha, nome, papel, pontos, aprovadas);
   - lista do 4º ao 8º com avatar, nome e pontos, com a pessoa logada destacada ("Você");
   - "E mais N pessoas" e a regra de desempate;
   - rodapé com a fileira de avatares dos participantes ("10 pessoas participando em outubro") e o Destaque do mês anterior;
   - ação "Ver ranking completo".
5. **Indicadores:** Saldo de <mês> (em apuração), Posição no ranking (com "ver ranking"), Saldo histórico (com média mensal), Pendentes.
6. **Sua evolução:** gráfico de colunas de pontos por mês, com a posição embaixo de cada mês.
   - Alterna entre 6 e 12 meses e tem "Ver como tabela".
   - Mês em apuração listrado; mês de Destaque com ícone `award`.
   - Valores escritos só no mês atual e no de Destaque; os outros aparecem no tooltip (mouse e teclado).
   - Meses antes do programa aparecem com "—".
7. **Suas últimas entregas:** 3 itens com Badge de status, que levam ao detalhe; ação "Ver todas".
8. **Seus reconhecimentos** (coluna lateral): Destaques do Mês da pessoa, melhor posição, meses no ranking e "Ver histórico de reconhecimentos".

## Escolher avatar (AvatarPicker)

- Abre pelo botão do avatar no cabeçalho (`aria-label="Trocar seu avatar"`).
- Diálogo "Escolher avatar" com os 12 avatares da cartela em rádio; o atual vem marcado (anel + ✓).
- "Salvar avatar" grava no perfil e atualiza o avatar na tela, no menu e na barra superior; "Cancelar" ou Esc fecham sem mudar.
- Quem nunca escolheu tem um avatar atribuído automaticamente.

## Estados

| Estado (`?estado=`) | Quando |
| --- | --- |
| `padrao` | Ciclo em andamento |
| `escolher-avatar` | Diálogo de avatar aberto |
| `doze-meses` | Evolução de 12 meses |
| `tabela` | Evolução como tabela |
| `primeiro-acesso` | Sem histórico: "Comece pelo que você entregou este mês" com os 4 passos; o ranking aparece (sem a pessoa); a evolução vira EmptyState |
| `carregando` | Esqueletos |
| `erro` | EmptyState com "Tentar de novo" |
| `sem-permissao` | EmptyState; o botão do cabeçalho some |

## Dados necessários (sugestão de contrato)

```json
{
  "pessoa": { "nome": "Ana Ribeiro", "primeiroNome": "Ana", "avatar": 2 },
  "ciclo": { "id": "2026-10", "nome": "outubro", "etapas": [ { "nome": "Cadastro", "ate": "2026-10-31", "atual": true, "diasRestantes": 10 } ] },
  "pendencias": { "rascunhos": 1, "ajustesSolicitados": 1, "validadorAjustes": "Carlos Andrade" },
  "ranking": { "situacao": "em_apuracao", "divulgacaoEm": "2026-11-10", "participantes": 10,
    "posicoes": [ { "posicao": 1, "nome": "Bruno Costa", "papel": "Desenvolvedor", "avatar": 1, "pontos": 15.2, "aprovadas": 4, "voce": false } ],
    "destaqueAnterior": { "mes": "setembro", "nome": "Marina Lopes", "avatar": 8, "pontos": 18.4 } },
  "indicadores": { "saldoCiclo": 11.9, "avaliadas": 3, "apuracaoEm": "2026-11-06", "posicao": 4, "saldoHistorico": 86.4, "historicoDesde": "2026-05", "mediaMensal": 17.3, "comValidador": 1, "aguardandoAvaliacao": 1 },
  "evolucao": [ { "mes": "2026-08", "pontos": 26.3, "posicao": 1, "participantes": 10, "destaque": true, "emApuracao": false } ],
  "ultimasEntregas": [ { "id": 77, "titulo": "Script de limpeza de logs", "status": "rascunho", "data": "2026-10-21" } ],
  "reconhecimentos": { "destaques": [ { "mes": "2026-08", "pontos": 26.3, "posicao": 1, "participantes": 10, "aprovadas": 6 } ], "melhorPosicao": { "posicao": 1, "mes": "agosto" }, "mesesNoRanking": 6 }
}
```

Gravação do avatar: `PUT` no perfil com `{ "avatar": 7 }` (1 a 12). Sugestão; o modelo final é dos devs.

## Regras de negócio

| Regra | Status |
| --- | --- |
| Visão geral: saldos, posição, evolução de 6 e 12 meses | CONFIRMADA |
| Pessoas em primeiro plano: ranking do mês com pódio, lista e participantes | CONFIRMADA (ajuste do dono do produto) |
| Ciclo com pouco destaque, em uma linha | CONFIRMADA (ajuste do dono do produto) |
| Etapa atual calculada pela data de hoje e pelo calendário do RH | CONFIRMADA |
| Ranking provisório visível, "em apuração"; oficial após homologação | CONFIRMADA |
| Saldo do mês com avaliadas "em apuração"; histórico só com ciclos homologados | CONFIRMADA |
| Só entra no ranking quem tem entrega avaliada no ciclo | CONFIRMADA |
| Desempate pelo número de entregas aprovadas | CONFIRMADA |
| Avatar da cartela (sem foto), escolhido pela pessoa; atribuído automaticamente até ela escolher | CONFIRMADA |
| Regra de atribuição automática do avatar (sugestão: matrícula módulo 12) | **A DEFINIR** com os devs |
| Empate em pontos e aprovadas ao mesmo tempo | **A DEFINIR** |

## Textos da interface

| Onde | Texto |
| --- | --- |
| Cabeçalho | Visão geral · Boa tarde, <nome>. Este é o seu Reconhecimento em <mês> de <ano>. · Cadastrar entrega · Trocar seu avatar (aria-label) |
| Ciclo | Ciclo de <mês> · Cadastro até DD/MM · faltam N dias · Validação até DD/MM · Apuração DD/MM · Homologação DD a DD/MM · Destaque do Mês DD/MM |
| Pendências | N entregas precisam de você · Um rascunho ainda não enviado e um pedido de ajustes de <validador>. O cadastro de <mês> vai até DD/MM. · Ver minhas entregas |
| Ranking | Ranking de <mês> · Em apuração; o resultado oficial e o Destaque do Mês saem em DD/MM · Ver ranking completo · N aprovadas · Você · E mais N pessoas. Em caso de empate, fica à frente quem teve mais entregas aprovadas. · N pessoas participando em <mês> · Destaque de <mês anterior>: <nome>, N pts |
| Indicadores | Saldo de <mês> · N entregas avaliadas · em apuração até DD/MM · Posição no ranking · de N · Em apuração · ver ranking · Saldo histórico · Desde <mês> de <ano> · média de N por mês · Pendentes · N com o validador · N aguardando avaliação |
| Evolução | Sua evolução · Pontos por mês e posição no ranking · 6 meses · 12 meses · Ver como tabela · Ver como gráfico · Homologado · Em apuração · Destaque do Mês · O programa começou em maio de 2026. · Tabela: Mês · Pontos · Posição · Situação · Antes do programa |
| Últimas entregas | Suas últimas entregas · Ver todas |
| Reconhecimentos | Seus reconhecimentos · Destaque do Mês de <mês> de <ano> · Melhor posição · Meses no ranking · Ver histórico de reconhecimentos |
| Avatar | Escolher avatar · Ele aparece para os colegas no ranking e em todo o Genial. Você pode trocar quando quiser. · Avatar N · Cancelar · Salvar avatar |
| Primeiro acesso | Comece pelo que você entregou este mês · A participação é voluntária. Cadastre as entregas de que você mais se orgulha. · Sua evolução aparece aqui · Depois da sua primeira entrega avaliada, você acompanha pontos e posição mês a mês. |
| Erro | Não foi possível carregar a visão geral · O Genial não respondeu. Suas entregas e pontos continuam salvos. Tente de novo em alguns instantes. · Tentar de novo |

## Acessibilidade

- Pódio em `<ol>` na ordem real (1º, 2º, 3º); a posição está em texto na medalha.
- Ciclo em `<nav aria-label>` com `<ol>`; etapa atual com `aria-current="step"`.
- Gráfico: cada coluna é focável (`tabindex="0"`, `role="img"`, `aria-label` com mês, pontos, posição e situação); tooltip `aria-hidden`; alternativa em tabela.
- Diálogo de avatar: `role="dialog"`, `aria-modal`, rádios com nome ("Avatar 7"), foco no avatar atual, Esc fecha, foco volta ao botão.
- Avatares ao lado do nome com `alt=""`.
