# Topbar

Barra superior: na web mostra onde o usuário está e as ações globais; no app mostra o título da tela.

**O consumidor fornece:** o caminho (breadcrumb), o número de notificações e o usuário; no app, o título e as ações de canto.

- Web `gn-topbar`: altura `topbar-height`, fundo **`bg-surface`** (branco), borda inferior `border-default`. A barra azul cheia (#0072C6) do sistema atual sai: o azul passa a aparecer no logo, no item ativo e nas ações, e o conteúdo ganha protagonismo.
- Breadcrumb em `caption` com o último nível em `text-strong`. Não repita o título da página ("Horas Lançadas > Horas Lançadas").
- Ações à direita em `gn-iconbtn` com `aria-label`: Ajuda (`circle-help`), Notificações (`bell` + ponto `negative` quando há novidades), avatar.
- App `gn-appbar`: 56px, título centralizado em 16px/700, ícone `menu` à esquerda e no máximo uma ação à direita. Escreva o título por extenso: "Registrar ponto", não "Lanc. Manual".
- Os ícones de tela cheia e de recarregar da barra atual saem; recarregar só existe no app.
