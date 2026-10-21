# Cadastrar entrega — checklist antes de publicar

## Desta tela

- [ ] Os 12 estados da especificação (inclusive `editar` e `ajustes`).
- [ ] Rascunho salva só com título; envio exige todos os obrigatórios.
- [ ] Limites: título 100, textos 1.000, arquivo 10 MB e tipos aceitos (também no servidor).
- [ ] Aviso de confidencialidade sempre visível acima dos campos.
- [ ] Gestor vinculado pré-selecionado; "Pessoa do cliente" pede nome e e-mail.
- [ ] E-mail disparado só no envio e no reenvio, não ao salvar alterações.
- [ ] Entrega parecida: alerta não bloqueia o envio.

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
