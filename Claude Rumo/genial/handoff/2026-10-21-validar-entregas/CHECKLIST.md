# Validação de entregas — checklist antes de publicar

## Desta tela

- [ ] Os 9 estados do gestor e os 7 da página externa.
- [ ] Comentário obrigatório para ajustes e recusa (também no servidor).
- [ ] Recusa pede confirmação no Genial; toda resposta pede confirmação na página externa.
- [ ] Depois de decidir, a próxima entrega da fila abre e o contador do menu diminui.
- [ ] Token: uso único, expira no fim do prazo, só para o e-mail informado; abrir não consome; responder consome.
- [ ] Clique nos botões do e-mail não registra decisão.
- [ ] Página externa sem menu, sem Bootstrap, sem dados de outras entregas; `noindex`.
- [ ] Página externa legível em 360px de largura.

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
