# Detalhamento e edição de entrega — checklist antes de publicar

## Desta tela

- [ ] Os 11 estados da especificação.
- [ ] Pontuação final igual à média ponderada dos critérios (ou à nota do RH, quando ajustada).
- [ ] Ajuste do RH mostra nota anterior, nova, autor, data e justificativa.
- [ ] Histórico completo, mais recente primeiro, com "Avaliação automática" sem avatar de pessoa.
- [ ] Entrega de outra pessoa devolve "Entrega não encontrada".
- [ ] Evidências baixam só para quem tem permissão.

## Geral

- [ ] Avatares da cartela em todas as pessoas do Genial (menu, barra superior, listas, histórico); iniciais só para a pessoa do cliente.
- [ ] `tokens.css` e `bundle.css` carregados depois do Bootstrap; nenhum estilo do Bootstrap alterando as telas novas.
- [ ] Nenhuma cor, fonte, raio ou sombra literal no CSS da tela (só `var(--token)`).
- [ ] Fonte Plus Jakarta Sans carregando (ou hospedada localmente).
- [ ] Um único botão primário por tela e por diálogo.
- [ ] Todo status tem texto e ícone, não só cor.
- [ ] Textos iguais à tabela "Textos da interface" (caixa de frase, "você", sem abreviações, sem exclamação).
- [ ] Datas `DD/MM`, pontuação com vírgula e uma casa decimal.
- [ ] Navegação completa por teclado; foco visível (anel azul de 2px).
- [ ] Diálogos: foco preso, Esc fecha, foco volta ao botão que abriu.
- [ ] Campos com rótulo visível, erros com `aria-invalid` e mensagem que diz como corrigir.
- [ ] Ícones decorativos com `aria-hidden="true"`; botões só com ícone têm `aria-label`.
- [ ] Contraste conferido nos pares do design system (texto 4,5:1, ícones e bordas 3:1).
- [ ] Sem rolagem horizontal em 1280px; leitura correta abaixo de 900px.
- [ ] Todos os trechos `// SIMULAÇÃO` trocados por chamadas reais; validações repetidas no servidor.
- [ ] Permissões conferidas no servidor (não só esconder botões).
- [ ] Toda gravação e decisão registrada para auditoria (regra 14 da especificação).
- [ ] Regras marcadas **HIPÓTESE** ou **A DEFINIR** na especificação resolvidas com o dono do produto antes de publicar.
