# Genial — protótipos de telas

Este repositório guarda o contexto do **Genial – Controle de Ponto** (sistema interno da Rumo Soluções, criado em 2017) e os **protótipos de novas telas** que, depois de validados, são entregues aos desenvolvedores para implementação no Genial Web.

**Não é o código do Genial.** Aqui não há backend, banco de dados nem integração real. O trabalho é: entender o produto, desenhar telas em HTML/CSS seguindo o design system, validar com o dono do produto e preparar a entrega para os devs.

## Iniciativa atual

**Módulo de Reconhecimento Profissional** dentro do Genial Web: o colaborador registra suas entregas de destaque, um gestor valida, uma IA avalia por critérios objetivos e o sistema gera pontuação, ranking e histórico. Detalhes: @docs/modulos/reconhecimento/briefing.md e `docs/modulos/reconhecimento/especificacao.md` (documento completo do dono do produto).

## Regras de ouro

1. **Nenhuma tela sem pedido explícito.** Nunca crie ou altere protótipos por iniciativa própria. Na dúvida, pergunte.
2. **Design system é lei.** Use só os tokens de `docs/design-system/tokens.css` e as classes `gn-*` de `docs/design-system/components/bundle.css`. Nada de hex, px de cor ou fonte soltos. Se faltar um componente, proponha a adição ao design system antes de usar (skill `genial-ui`).
3. **O Azul Genial #008FD2 (`--genial-500`) é imutável.** Botões e links usam `--action`/`--link` (genial-600) por contraste.
4. **Nada só por cor.** Todo estado tem texto ou ícone. Saldo e pontuação têm sinal; status têm rótulo.
5. **Textos seguem o glossário** (`docs/dominio/glossario.md`): português do Brasil, "você", caixa de frase, sem abreviações.
6. **Separe fato de hipótese.** Regras de negócio em `docs/` estão marcadas como `CONFIRMADA`, `HIPÓTESE` ou `A DEFINIR`. Nunca trate hipótese como regra. Ao precisar de uma regra indefinida, pergunte e registre a resposta em `questoes-abertas.md`.
7. **Pense na implementação.** O Genial Web é ASP.NET MVC + Bootstrap 3 + jQuery. Protótipos em HTML semântico + CSS + JS mínimo (vanilla), sem frameworks, para os devs portarem para views Razor. Ver @docs/decisoes/001-prototipos-html.md
8. **Dados de exemplo são fictícios** e marcados como exemplo. Não use dados reais de colaboradores.

## Onde está cada coisa

| Preciso de… | Arquivo |
| --- | --- |
| O que é o Genial e quem usa | `docs/produto/visao-genial.md`, `docs/produto/perfis.md` |
| Como o sistema é hoje (web e app) | `docs/sistema-atual/` |
| Regras de ponto (tolerância, banco de horas) | `docs/sistema-atual/regras-ponto.md` |
| Termos e textos da interface | `docs/dominio/glossario.md` |
| Módulo de Reconhecimento | `docs/modulos/reconhecimento/` (comece pelo `README.md`) |
| Design system (guia completo) | `docs/design-system/README.md` |
| Tokens e CSS | `docs/design-system/tokens.css`, `docs/design-system/components/bundle.css` |
| Componentes (uso + exemplo) | `docs/design-system/components/<Nome>/README.md` e `preview.html` |
| Prints do sistema atual e referências visuais | `docs/referencias/` |
| Decisões tomadas | `docs/decisoes/` |
| Protótipos | `prototipos/` (convenções no `README.md` da pasta) |
| Pacotes para os devs | `handoff/` |

## Fluxo de trabalho

1. Entender: ler o módulo e as questões abertas antes de propor qualquer coisa.
2. Planejar: para cada tela, usar `/nova-tela` (planeja, pergunta e só então constrói).
3. Revisar: `/revisar-ux` ou o agente `ux-reviewer` antes de mostrar ao dono do produto.
4. Entregar: `/handoff-dev` gera o pacote em `handoff/`.

## Como visualizar

Abra o `.html` direto no navegador ou rode um servidor estático na raiz (`python -m http.server 8000`) e acesse `http://localhost:8000/prototipos/...`. Os protótipos referenciam o CSS por caminho relativo a partir da raiz.

## Ao terminar uma tarefa

- Atualize `docs/modulos/reconhecimento/telas-previstas.md` (status da tela).
- Registre decisões novas em `docs/decisoes/` e perguntas em `questoes-abertas.md`.
- Não crie arquivos de resumo ou relatório que ninguém pediu.
