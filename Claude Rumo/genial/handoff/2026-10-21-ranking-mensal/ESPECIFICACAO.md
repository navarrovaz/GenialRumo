# Ranking mensal — especificação

Tela validada pelo dono do produto em 21/10/2026 (com os ajustes: pódio e participantes em primeiro plano, avatares). Protótipo: `prototipo/index.html` (estados por `?estado=<nome>`). Fonte das regras: `docs/modulos/reconhecimento/`.

## Objetivo e acesso

- **Objetivo:** mostrar quem está participando e liderando o ciclo, a posição da pessoa e as entregas públicas dos colegas.
- **Perfil:** colaborador. Todos veem o ranking completo (provisório durante o mês, oficial depois da homologação).
- **Menu:** RECONHECIMENTO → "Ranking mensal" (ícone `award`).

## Componentes do design system

Avatar (cartela ilustrada e pilha), Podium, Card, Badge, Field (`gn-select` do ciclo), TimesheetTable (estrutura `gn-table`), Steps, EmptyState, Readout, Button.

## Estrutura

1. **Cabeçalho:** "Ranking mensal", regra de cálculo e desempate, seletor de ciclo ("Outubro de 2026 (em apuração)", "Setembro de 2026 (homologado)").
2. **Pódio** (card em largura total):
   - título "Quem lidera <mês>" (em apuração) ou "Os três primeiros de <mês>" (oficial);
   - Badge "Em apuração" ou "Oficial" e subtítulo com a data de divulgação ou de homologação;
   - Podium com os três primeiros; no ciclo oficial, a medalha do 1º diz "Destaque do Mês";
   - rodapé com a fileira de avatares e "N pessoas participando em <mês>".
3. **Tabela** (coluna principal):
   - colunas Posição · Colaborador (avatar, nome, papel, "Você") · Aprovadas · Pontos · Entregas;
   - 1º lugar com ícone `award`; linha da pessoa logada destacada;
   - ícone `info` na coluna Aprovadas quando o desempate foi usado.
   - "Entregas" abre uma linha com as entregas da pessoa (título e pontuação; no ciclo oficial, também o resumo do resultado).
4. **Entregas de destaque:** as 5 maiores pontuações do ciclo (título, pessoa, pontuação; resumo no ciclo oficial).
5. **Coluna lateral:**
   - **Sua posição:** avatar, posição "4º de 10", pontos, aprovadas e distância para a posição de cima ("Faltam 1,9 pts para o 3º lugar."). Sem participação: convite com "Cadastrar entrega".
   - **Como funciona:** os 3 passos da regra.

## Estados

| Estado (`?estado=`) | Quando |
| --- | --- |
| `padrao` | Ciclo vigente, em apuração |
| `homologado` | Ciclo anterior, oficial |
| `expandido` | Entregas de uma pessoa abertas |
| `sem-participacao` | A pessoa não pontuou no ciclo |
| `vazio` | Ninguém pontuou ainda |
| `carregando` | Linhas-esqueleto |
| `erro` | EmptyState com "Tentar de novo" |
| `sem-permissao` | EmptyState |

## Dados necessários (sugestão de contrato)

```json
{
  "ciclos": [ { "id": "2026-10", "nome": "outubro", "situacao": "em_apuracao", "divulgacaoEm": "2026-11-10" }, { "id": "2026-09", "nome": "setembro", "situacao": "homologado", "homologadoEm": "2026-10-09" } ],
  "ranking": [
    { "posicao": 2, "nome": "Marina Lopes", "papel": "Analista de qualidade", "avatar": 8, "pontos": 13.8, "aprovadas": 4, "desempate": true, "voce": false,
      "entregas": [ { "titulo": "Automação dos testes de regressão", "pontuacao": 4.9, "resumo": null } ] }
  ],
  "voce": { "posicao": 4, "pontos": 11.9, "aprovadas": 4, "distanciaAcima": 1.9 }
}
```

`resumo` vem preenchido só no ciclo homologado. A posição é calculada no servidor: soma das pontuações das entregas avaliadas no ciclo, desempate pelo número de entregas aprovadas. Sugestão; o modelo final é dos devs.

## Regras de negócio

| Regra | Status |
| --- | --- |
| Ranking pela soma das pontuações (saldo do mês) | CONFIRMADA |
| Desempate pelo número de entregas aprovadas no ciclo | CONFIRMADA |
| Ranking provisório visível, "em apuração"; oficial depois da homologação | CONFIRMADA |
| Destaque do Mês: maior pontuação homologada; pode repetir | CONFIRMADA |
| Só entra quem tem ao menos uma entrega avaliada no ciclo | CONFIRMADA |
| Entregas dos colegas: título e pontuação durante a apuração; resumo do resultado depois da homologação; nunca evidências ou comentários | CONFIRMADA |
| Pessoas em primeiro plano: pódio com avatares e participantes | CONFIRMADA (ajuste do dono do produto) |
| Empate em pontos e aprovadas ao mesmo tempo | **A DEFINIR** |

## Textos da interface

| Onde | Texto |
| --- | --- |
| Cabeçalho | Ranking mensal · Soma das pontuações das entregas avaliadas no ciclo. Em caso de empate, fica à frente quem teve mais entregas aprovadas. · <Mês> de <ano> (em apuração) · (homologado) |
| Pódio | Quem lidera <mês> · Os três primeiros de <mês> · Posições em apuração; o resultado oficial sai em DD/MM · Resultado oficial, homologado em DD/MM · Em apuração · Oficial · Destaque do Mês · 1º · N pts · N aprovadas · Você · N pessoas participando em <mês> |
| Tabela | Posição · Colaborador · Aprovadas · Pontos · Entregas · Suas entregas · Você · O resumo do resultado aparece depois da homologação. · Empate em pontos, desempate pelas entregas aprovadas (leitor de tela) |
| Entregas de destaque | Entregas de destaque · As 5 maiores pontuações de <mês> |
| Sua posição | Sua posição · Em apuração · de N · Pontos · Entregas aprovadas · Faltam N pts para o Nº lugar. · Você ficou a N pts do Nº lugar. · Você lidera o ranking de <mês>. · Você foi o Destaque de <mês>. · Ver minhas entregas · Você ainda não pontuou em <mês>. Entregas aprovadas e avaliadas entram no ranking. · Cadastrar entrega |
| Como funciona | Soma das pontuações · Cada entrega aprovada e avaliada soma de 1 a 5 pontos. · Empate · Fica à frente quem teve mais entregas aprovadas no ciclo. · Resultado oficial · O RH homologa e o Destaque do Mês sai no dia 10. |
| Vazio | O ranking de <mês> ainda não começou · Ele aparece quando a primeira entrega do ciclo for aprovada e avaliada. Que tal cadastrar a sua? |
| Erro | Não foi possível carregar o ranking · O Genial não respondeu. Tente de novo em alguns instantes. |

## Acessibilidade

- Pódio em `<ol>` na ordem real; posição em texto na medalha e no degrau (`aria-hidden` no degrau).
- Tabela com `<caption>` oculto e `<th scope="col">`.
- "Entregas" com `aria-expanded` e `aria-controls`; a seta gira (sem animação com `prefers-reduced-motion`).
- Avatares ao lado do nome com `alt=""`; a fileira de participantes é `aria-hidden` (o número está em texto).
