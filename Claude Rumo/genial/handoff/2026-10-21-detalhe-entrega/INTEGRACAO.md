# Detalhamento e edição de entrega — integração com o Genial Web

Genial Web: ASP.NET MVC, views Razor, Bootstrap 3, jQuery. O protótipo é HTML semântico + CSS do design system + JS vanilla (decisão 001), para portar quase copiando a marcação.

## Como encaixar no Genial Web

**Carregar o design system nas páginas novas, depois do Bootstrap 3:**

```html
<link rel="stylesheet" href="~/Content/bootstrap.css">
<!-- ... estilos atuais ... -->
<link rel="stylesheet" href="~/Content/genial-ds/tokens.css">
<link rel="stylesheet" href="~/Content/genial-ds/components/bundle.css">
<link rel="stylesheet" href="~/Content/reconhecimento/detalhe-entrega.css">
```

- As classes do design system começam com `gn-` e não colidem com o Bootstrap. O conteúdo das telas novas fica dentro de um elemento com a classe `gn` (o protótipo usa `<div class="gn gn-shell">`).
- `tokens.css` e `bundle.css` são cópias de `docs/design-system/`; ao atualizar o design system, substitua os dois arquivos. Não edite os arquivos copiados.
- `tela.css` só tem layout desta tela e só usa `var(--token)`.
- **Fonte:** Plus Jakarta Sans, importada do Google Fonts no topo do `bundle.css`. Se a rede da Rumo bloquear o Google Fonts, hospede os arquivos da fonte no Genial e troque o `@import` por `@font-face` local.
- **Ícones:** SVG inline (Lucide v0.460, ISC), copiados de `prototipo/design-system/assets/icones/`. Nas telas novas eles substituem Glyphicons e Font Awesome. Sugestão: um helper Razor `@Icone("send")` que lê o SVG e devolve a marcação com `class="gn-icon" aria-hidden="true"`.
- **Menu:** se o menu lateral atual (BeyondAdmin) continuar, crie a seção "Reconhecimento" com os itens do módulo e os ícones Lucide. O protótipo mostra o menu novo (componente Sidebar) como referência de rótulos, ordem, item ativo e contador.
- **Layout:** cabeçalho `gn-page__head`, conteúdo em `gn-page`. A tela funciona a partir de 1280px sem rolagem horizontal; abaixo de 1180px as colunas viram uma só.
- **Datas e números:** datas `DD/MM` e por extenso ("Quinta, 8 de outubro"); pontuação com uma casa decimal e vírgula (`4,6`), saldos com "pts" (`11,9 pts`). Formate no servidor com `pt-BR`.
- **Estados do protótipo:** `?estado=<nome>` existe só para revisão. Em produção, cada estado nasce dos dados (lista vazia, erro de carregamento, status da entrega).
- **JavaScript:** vanilla, sem dependências. Os trechos marcados `// SIMULAÇÃO` são chamadas ao backend (abaixo). O restante (contadores, diálogo, foco, filtros) pode ser mantido como está ou portado para jQuery.
- **Links entre telas:** no protótipo apontam para pastas vizinhas (`../minhas-entregas/index.html`); no pacote isolado eles não abrem. Troque pelas rotas do Genial (sugestão abaixo).

## Rotas sugeridas

| Tela | Rota |
| --- | --- |
| Cadastrar entrega | `/Reconhecimento/Entrega/Nova` |
| Editar / ajustar entrega | `/Reconhecimento/Entrega/{id}/Editar` |
| Minhas entregas | `/Reconhecimento/MinhasEntregas` |
| Detalhe da entrega | `/Reconhecimento/Entrega/{id}` |
| Validação de entregas (gestor) | `/Reconhecimento/Validacao` |
| Confirmação pela pessoa do cliente | `/Reconhecimento/Confirmar/{token}` (sem login, fora do layout do Genial) |

## Pontos de simulação nesta tela

| Trecho em `tela.js` | Vira |
| --- | --- |
| `ENTREGAS` e `render()` | A view Razor recebe o modelo da entrega e monta os blocos no servidor; `render()` mostra a marcação de cada bloco |
| Bloco de avaliação | Só aparece com `avaliacao` preenchida; "pendente" com status `aguardando_avaliacao` |
| Excluir entrega | `DELETE` e redireciona para Minhas entregas com a mensagem |
| Evidências | Download por rota autenticada que confere se o usuário é o dono, o validador ou o RH |

Entrega de outra pessoa: devolva a mesma página de "Entrega não encontrada" (não 403), para não revelar que existe.

## Avatares (atualização de 21/10/2026)

- As pessoas aparecem com avatares ilustrados da cartela (`prototipo/design-system/assets/avatares/avatar-01.svg` a `avatar-12.svg`), componente Avatar (`gn-avatar gn-avatar--img`). Não há fotos reais.
- O número do avatar (1 a 12) é um campo do perfil do usuário. Quem ainda não escolheu recebe um automaticamente (sugestão: matrícula módulo 12). A escolha é feita na Visão geral (componente AvatarPicker), que vem em um pacote próprio.
- Pessoa do cliente (validador externo) não tem perfil no Genial: continua com as iniciais.
- No protótipo, `[data-meu-avatar]` e o `localStorage` simulam o avatar escolhido; em produção, a view já recebe o número do avatar de cada pessoa.
