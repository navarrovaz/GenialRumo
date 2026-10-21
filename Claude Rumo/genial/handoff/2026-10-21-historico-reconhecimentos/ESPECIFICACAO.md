# Histórico de reconhecimentos — especificação

Tela validada pelo dono do produto em 21/10/2026. Protótipo: `prototipo/index.html` (estados por `?estado=<nome>`). Fonte das regras: `docs/modulos/reconhecimento/`.

## Objetivo e acesso

- **Objetivo:** reunir as realizações homologadas: as da pessoa, as dos colegas (histórico público) e a galeria de Destaques do Mês.
- **Perfil:** colaborador. Vê o próprio histórico e o histórico público de todos os colegas.
- **Menu:** RECONHECIMENTO → "Histórico de reconhecimentos" (ícone `history`).

## Componentes do design system

Avatar (cartela ilustrada), Card, Badge, Segmented (FilterChip), Field (busca com `gn-input-wrap`), Readout, Alert, EmptyState, Button.
Na tela (por ora em `tela.css`): ciclo recolhível (`details`/`summary`), item selecionável da lista de pessoas (mesmo padrão da fila de validação) e card da galeria.

## Estrutura

Alternância (Segmented): **Meu histórico** · **Colegas** · **Destaques do Mês**.

**Meu histórico**
1. Card da pessoa: avatar `xl` (com anel se já foi Destaque), nome, "Você", papel e leituras: Saldo histórico, Ciclos homologados, Entregas homologadas, Melhor posição, Destaques do Mês.
2. Aviso: "<Mês vigente> entra no histórico depois da homologação, em DD/MM. Até lá, acompanhe em Minhas entregas."
3. Um bloco recolhível por ciclo homologado, do mais recente para o mais antigo (os 2 primeiros abertos).
   - Resumo: mês, Badge "Destaque do Mês" (se houver) e "Nº de N · N pts · N entregas".
   - Conteúdo: entregas homologadas por pontuação, com título, pontuação e resumo do resultado.

**Colegas**
- À esquerda, busca pelo nome e lista de pessoas: avatar, nome, papel e ícone `award` para quem já foi Destaque. A pessoa aberta fica marcada.
- À direita, o histórico público da pessoa: o mesmo card de resumo e os ciclos (o primeiro aberto). Quem não tem ciclo homologado mostra "<Nome> ainda não tem entregas em ciclos homologados."
- Busca sem resultado: "Ninguém encontrado para "<texto>"" e "Limpar busca".

**Destaques do Mês**
- Galeria, do mês mais recente para o mais antigo. Cada card mostra:
  - o mês, o avatar `xl` com anel, o nome e o papel ("Você" quando for a pessoa);
  - "N pts · N entregas · entre N pessoas";
  - as 2 entregas de maior pontuação, com o resumo.

Rodapé da página: "O histórico reconhece realizações e não é avaliação formal de desempenho. Evidências e comentários dos validadores não aparecem para os colegas."

## Estados

| Estado (`?estado=`) | Quando |
| --- | --- |
| `padrao` | Meu histórico |
| `colegas` | Aba Colegas, primeira pessoa aberta |
| `colega-aberto` | Histórico de uma colega aberto |
| `busca-vazia` | Busca sem resultado |
| `destaques` | Galeria |
| `sem-historico` | A pessoa não tem ciclo homologado: EmptyState com "Cadastrar entrega" |
| `carregando` | Esqueletos |
| `erro` | EmptyState com "Tentar de novo" |
| `sem-permissao` | EmptyState |

## Dados necessários (sugestão de contrato)

```json
{
  "pessoa": { "nome": "Ana Ribeiro", "papel": "Desenvolvedora", "avatar": 2,
    "resumo": { "saldoHistorico": 86.4, "ciclos": 5, "entregas": 20, "melhorPosicao": { "posicao": 1, "mes": "2026-08" }, "destaques": 1 },
    "ciclos": [ { "mes": "2026-09", "posicao": 2, "participantes": 8, "pontos": 13.0, "destaque": false,
      "entregas": [ { "titulo": "Painel de indicadores de atendimento", "pontuacao": 4.9, "resumo": "A coordenação deixou de montar..." } ] } ] },
  "colegas": [ { "id": 31, "nome": "Marina Lopes", "papel": "Analista de qualidade", "avatar": 8, "jaFoiDestaque": true } ],
  "destaques": [ { "mes": "2026-09", "nome": "Marina Lopes", "papel": "Analista de qualidade", "avatar": 8, "pontos": 18.4, "entregas": 4, "participantes": 8,
    "principais": [ { "titulo": "Testes de carga do portal", "resumo": "..." } ] } ]
}
```

O histórico de um colega (`GET` por id) tem o mesmo formato de `pessoa`. Só entram ciclos homologados e entregas homologadas; nunca evidências, comentários ou dados de entregas recusadas ou canceladas. Sugestão; o modelo final é dos devs.

## Regras de negócio

| Regra | Status |
| --- | --- |
| Conteúdo: histórico próprio, dos colegas e galeria de Destaques do Mês | CONFIRMADA |
| Histórico público: título, resumo do resultado, pontuação e mês das homologadas; sem evidências e comentários; sem opção de esconder | CONFIRMADA |
| Só ciclos homologados no histórico; o ciclo vigente aparece depois da homologação | CONFIRMADA |
| Destaque do Mês pode repetir | CONFIRMADA |
| Avatares da cartela | CONFIRMADA |
| O histórico não é avaliação formal de desempenho | CONFIRMADA (esp. 10) |
| Colaboradores desligados aparecem no histórico e na galeria? | **A DEFINIR** |

## Textos da interface

| Onde | Texto |
| --- | --- |
| Cabeçalho | Histórico de reconhecimentos · As realizações homologadas, suas e dos colegas, mês a mês, e a galeria de Destaques do Mês. |
| Abas | Meu histórico · Colegas · Destaques do Mês |
| Card da pessoa | Você · Saldo histórico · Ciclos homologados · Entregas homologadas · Melhor posição · Destaques do Mês · Ainda sem entregas homologadas. |
| Aviso | <Mês> entra no histórico depois da homologação, em DD/MM. Até lá, acompanhe em Minhas entregas. |
| Ciclo | <Mês> de <ano> · Destaque do Mês · Nº de N · N pts · N entregas |
| Colegas | Buscar colega (rótulo oculto) · Buscar pelo nome · Já foi Destaque do Mês (leitor de tela) · Ninguém encontrado para "<texto>" · Limpar busca · <Nome> ainda não tem entregas em ciclos homologados. |
| Galeria | <MÊS> DE <ANO> · N pts · N entregas · entre N pessoas |
| Sem histórico | Seu histórico começa no primeiro ciclo homologado · Quando o RH homologar um ciclo em que você teve entregas avaliadas, elas aparecem aqui. <Mês> é homologado em DD/MM. · Cadastrar entrega |
| Rodapé | O histórico reconhece realizações e não é avaliação formal de desempenho. Evidências e comentários dos validadores não aparecem para os colegas. |
| Erro | Não foi possível carregar o histórico · O Genial não respondeu. Tente de novo em alguns instantes. |

## Acessibilidade

- Abas com `aria-pressed`.
- Ciclos em `details`/`summary` (teclado e leitor de tela nativos).
- Lista de colegas: botões com `aria-current="true"` na pessoa aberta; ao abrir, o foco vai para o nome no card.
- Busca com rótulo oculto e `type="search"`; o foco fica no campo enquanto a pessoa digita.
- Ícone `award` da lista com texto para leitor de tela.
