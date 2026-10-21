# Genial Design System

Guia oficial de UX e interface do Genial (decisão 002). Versão navegável: artifact "Genial Design System" no Claude. Arquivos: `tokens.json` (valores), `tokens.css` (variáveis CSS geradas), `components/bundle.css` (componentes gn-*), `components/<Nome>/` (README de uso + preview.html), `assets/logos` e `assets/icones`.

O Genial registra a jornada de quem trabalha na Rumo. A interface existe para responder rápido a três perguntas: **o que eu preciso registrar agora, como está meu saldo e o que falta para fechar o mês.** Web e app seguem o mesmo sistema visual.

## Princípios

1. **Clareza antes de densidade.** Mostre o resumo (saldo, pendências) antes da grade de dias. Cada tela tem um título, uma ação primária e o restante em segundo plano.
2. **Nada só por cor.** Todo estado tem texto ou ícone: saldo com sinal `+`/`−` e seta, feriado com o nome do feriado, fim de semana com rótulo. Cor reforça, nunca carrega a informação sozinha.
3. **Diga o próximo passo.** Pendências, erros e telas vazias dizem o que fazer ("Em 08/10 falta uma saída. Corrija antes de enviar para o RH.").
4. **O que tem borda é editável.** Campos têm contorno `border-control`; dados somente leitura aparecem como texto (`gn-readout`). Desabilitado sempre vem com o motivo.

## Voz e textos

- Fale com a pessoa usando **você**, em português do Brasil, frases curtas e voz ativa. Use o nome em saudações ("Boa tarde, Giovanni").
- **Caixa de frase** em títulos, botões, menus e badges: "Enviar para o RH", "Horas lançadas". Caixa alta só no estilo `overline` (rótulos de seção e cabeçalhos de coluna).
- Botões começam com verbo no infinitivo e nomeiam o objeto: "Registrar entrada", "Exportar planilha", "Enviar para o RH". Nunca "OK", "Sim" ou "Confirmar" sozinhos.
- Sem abreviações na interface: "Lanc. Manual", "Qtd Ent/Sai" e "Lanç. Mês" viram "Registrar ponto", "Pares de marcação" e "Situação do mês". Acentue tudo: "Liberação de IP".
- Erros dizem o que aconteceu e como resolver, sem "Ops" e sem pedir desculpas: "Não foi possível registrar o ponto. Sem conexão. Sua marcação ficou salva no aparelho e será enviada quando a internet voltar."
- Sem emoji e sem pontos de exclamação na interface. Sucesso é factual: "Outubro enviado para o RH".

### Glossário

| Use | Em vez de |
| --- | --- |
| Registrar ponto | Lançamento de Ponto, Lanc. Manual, Meu Ponto, Registro Ponto |
| Marcação | E/S, batida |
| Entrada · Intervalo · Retorno · Saída | Entrada 1 · Saída 1 · Entrada 2 · Saída 2 (no app) |
| Pares de marcação | Qtd Ent/Sai |
| Horas lançadas | Total de Horas Lançadas |
| Saldo do dia · Saldo do mês · Banco de horas | Saldo, Saldo Banco de Horas |
| Situação do mês: Não enviado · Enviado ao RH · Aprovado · Devolvido para ajuste | Situação do Lanç. Mês |
| Marcação sem par | (antes não era avisado) |
| Contracheque | Contra - Cheque |
| Afastamentos e atestados | Cadastrar Afastamento |
| Falar com o suporte · Falar com o RH | Contate o Suporte, Tire Dúvidas Com o RH |

### Formatos

- Horário: `08:58` (24h, dois dígitos). Duração: `08:07`. Saldo: `+01:23`, `−03:56` (sinal de menos tipográfico U+2212) e `00:00` sem sinal.
- Data em tabela: `Seg 05/10`. Data por extenso: "Quarta, 21 de outubro". Mês: "Outubro de 2026"; em filtros, "Outubro 2026".
- Todos os números de horário e saldo usam algarismos tabulares (`gn-num` ou os estilos `num-kpi` e `num-cell`).

## Cores

- **Azul Genial `genial-500` (#008FD2) é a cor da marca e não muda.** Use-o no logo, no ícone do item ativo do menu, no anel de foco (`focus-ring`), em ícones de marca, barras de progresso e números grandes (24px ou mais).
- Para **ações e textos azuis** use `action` / `link` (`genial-600`, #0676AE), a variação mais escura do mesmo azul. O #008FD2 puro tem 3.6:1 com branco e não atinge os 4.5:1 exigidos para texto de 14px; o `genial-600` tem 5.0:1. Hover `action-hover` (`genial-700`), pressionado `action-pressed` (`genial-800`).
- `genial-300` (#8BD6F7) é o azul-claro dos raios do logo: uso decorativo, nunca em texto.
- Superfícies: página `bg-page` (`neutral-25`), cards e tabelas `bg-surface` (branco), áreas afundadas `bg-sunken` (`neutral-50`), selecionado `bg-selected` (`genial-50`). Neutros levemente azulados (matiz 245), nunca cinza puro.
- Texto: títulos e números `text-strong`, corpo `text-default`, apoio `text-muted` (6.2:1 ou mais em todas as superfícies neutras). `text-placeholder` só dentro de campos.
- Bordas: cards `border-default`, divisórias `border-subtle`, controles `border-control` (3:1).
- Status: `positive` (verde), `negative` (vermelho), `attention` (âmbar). Cada um tem `-bg` para fundos e `-text` para texto sobre esse fundo. Verde e vermelho têm luminosidade parecida, por isso **sempre** vêm com sinal, seta ou ícone.
- Dias na grade: `day-weekend-bg`, `day-holiday-bg`, `day-today-bg`, cada um com rótulo visível.
- Não há modo escuro.

## Tipografia

- Família única: **Plus Jakarta Sans** (Google Fonts, pesos 400 a 800), com fallback `Segoe UI` e `system-ui`. Geométrica e arredondada como o logotipo, com algarismos tabulares para horários.
- Escala: `display-clock` 56 (relógio), `display` 32, `title-lg` 24 (h1, um por tela), `title-md` 18 (títulos de card), `title-sm` 15, `body-lg` 16 (app), `body` 14 (padrão web), `body-strong` 14/600, `label` 13/600, `caption` 12, `overline` 11/700 em caixa alta com espaçamento 0.08em, `num-kpi` 28, `num-cell` 14.
- O corpo da web sobe de 13px (atual) para 14px; no app, 16px.
- Hierarquia vem de tamanho e peso, não de cor: títulos 700, rótulos 600, corpo 400.

## Espaçamento, grade e densidade

- Base de 4px: `space-1` 4, `space-2` 8, `space-3` 12, `space-4` 16, `space-5` 20, `space-6` 24, `space-8` 32, `space-12` 48.
- **Web:** menu lateral `sidebar-width` (256px) + barra superior `topbar-height` (64px). Conteúdo com margem `space-8` (32px), `space-4` abaixo de 900px. Blocos da página separados por `space-6`; cards de indicador em 4 colunas com gap `space-4`.
- **App:** margem lateral `space-4` (16px), cards separados por `space-3`, barra de abas `tabbar-height` + área segura.
- Densidade compacta para dados (linhas `row-compact`, 44px, controles `control-md` e `control-sm`); confortável no app (`row-comfortable`, 56px; controles `control-lg`, 48px, área mínima de toque).

## Formas, bordas e sombras

- Raios: `radius-md` (8px) em botões, campos, chips e itens de menu; `radius-lg` (12px) em cards, tabelas e alertas da web; `radius-xl` (16px) em cards do app e diálogos; `radius-full` em badges, avatares e no botão Registrar; `radius-sm` (6px) em checkbox e chips de diferença.
- Cards separam-se do fundo com borda `border-default` + `shadow-xs`. No app, `shadow-sm`. Diálogos `shadow-lg`. O botão Registrar é o único com `shadow-action`.
- Não use barras coloridas na lateral de cards ou alertas e não use gradientes.

## Estados

- Hover: controles neutros ganham `bg-sunken`; primário escurece para `action-hover`; linhas de tabela ganham `bg-page`.
- Foco: contorno sólido de 2px em `focus-ring` (Azul Genial), afastado 2px. Sempre visível no teclado.
- Selecionado/atual: `bg-selected` + `text-selected` (menu, chips, linha de hoje).
- Desabilitado: `bg-disabled` + `text-disabled`, com o motivo ao lado.
- Carregando: spinner dentro do botão e rótulo no gerúndio; tabelas mostram linhas-esqueleto em `bg-sunken`.
- Vazio, erro e sem permissão: componente `EmptyState`.

## Iconografia

- Biblioteca única: **Lucide** (v0.460, licença ISC), traço de 1.75 a 20px e de 2 a 16px. Substitui Glyphicons e Font Awesome, hoje misturados.
- Tamanhos: 20px em menu, botões e cabeçalhos; 16px dentro de botões pequenos, badges e tabelas; 24px em destaques.
- Os arquivos do grupo **Ícones** são os SVGs originais da Lucide; use-os inline para herdar `currentColor`.
- Ícone sozinho só com `aria-label` e só para ações universais (editar, notificações, ajuda, menu). Nos demais casos, ícone + texto.
- Mapa de ícones: Página inicial `house` · Registrar ponto `fingerprint` · Horas lançadas e Histórico `calendar-clock` · Justificativas `message-square-warning` · Afastamentos e atestados `briefcase-medical` · Férias `tree-palm` · Contracheque `receipt-text` · Relatórios `chart-column` · Tutoriais `circle-play` · Suporte `message-circle` · QR Code `qr-code` · Liberação de IP `globe` · VPN horários especiais `shield-check` · Localização `map-pin` · Entrada `log-in` · Saída `log-out` · Intervalo `coffee` · Saldo positivo `trending-up` · Saldo negativo `trending-down` · Sem par `triangle-alert` · Feriado `calendar-off` · Reconhecimento (PROPOSTA): Visão geral `layout-dashboard` · Cadastrar entrega `plus` · Minhas entregas `list-checks` · Ranking mensal `award` · Histórico de reconhecimentos `history` · Anexar arquivo `upload` · Link `link` · Excluir `trash-2`.

## Logotipo

- `genial-logo.png`: versão colorida, sobre fundos brancos e claros (menu lateral, login, app).
- `genial-logo-branco.png`: sobre `genial-500` ou fundos escuros (tela de abertura do app, materiais de comunicação).
- `genial-simbolo.png`: o símbolo (lâmpada G) para espaços quadrados: ícone do app, avatar do sistema em notificações, menu recolhido.
- `genial-favicon-48.png`: favicon do navegador.
- Altura mínima do logo completo: 28px na tela. Respiro mínimo em volta: a altura de um raio da lâmpada. Não recolora, não distorça, não aplique sombra e não coloque sobre fotos.

## Acessibilidade

- Texto com 4.5:1 ou mais em todos os pares documentados; ícones, bordas de controle e anel de foco com 3:1 ou mais.
- Toda a interface funciona por teclado; diálogos prendem o foco e fecham com Esc.
- Tabelas usam `<th>` reais; ícones decorativos têm `aria-hidden="true"`.
- Respeite `prefers-reduced-motion`.

## Do sistema atual para o Genial Design System

| Hoje | Passa a ser |
| --- | --- |
| Barra superior azul #0072C6 | `gn-topbar` branca; o azul fica no logo, no item ativo e nas ações |
| Azuis soltos #0072C6, #337AB7, #57B5E3, #87CEFA | Escala `genial-50` a `genial-900`, derivada de #008FD2 |
| Open Sans 13px, peso 400 em quase tudo | Plus Jakarta Sans, corpo 14px, escala de 11 estilos |
| Glyphicons + Font Awesome | Lucide |
| Painéis com linha azul inferior | `Card` |
| Caixas cinza para dados somente leitura | `gn-readout` |
| Coluna "Indicador(es)" com quadrados verde/vermelho | Coluna Situação com `Badge` + saldo com `gn-delta` |
| Fim de semana em azul-claro e feriado em salmão, sem legenda | `day-weekend-bg` e `day-holiday-bg`, sempre com rótulo |
| Relógio flip escuro (web) e relógio azul (app) | `PunchClock` único |
| Botões azul-claro, laranja e amarelo lado a lado | Um primário + secundários |
| "ACESSO NÃO AUTORIZADO" e "Nenhum registro encontrado." | `EmptyState` |
| Histórico em texto corrido com paginação | `AuditLog` agrupado por dia |
| Abas do app apagadas sem explicação | `TabBar` só com o que está disponível |
