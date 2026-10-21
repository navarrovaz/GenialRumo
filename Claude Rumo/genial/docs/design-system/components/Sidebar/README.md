# Sidebar

Menu lateral fixo da web, com o logo no topo, seções rotuladas e o usuário no rodapé.

**O consumidor fornece:** a lista de seções e itens (ícone Lucide + rótulo + contador opcional), o item atual (`aria-current="page"`) e os dados do usuário.

- Largura `sidebar-width` (256px), fundo `bg-surface`, borda direita `border-default`. Logo colorido (`genial-logo.png`) com 34px de altura.
- Seções em `overline` (caixa alta, `text-muted`): INÍCIO, MEU PONTO, RELATÓRIOS, AJUDA. O perfil RH ganha a seção EQUIPE acima de RELATÓRIOS.
- Item ativo: `bg-selected`, texto `text-selected`, ícone `brand`. Não use barra colorida lateral.
- Contadores (`gn-badge--count`) só para pendências que pedem ação (justificativas a responder).
- **Só mostre o que o perfil pode abrir.** Hoje "Histórico Colaborador" e "Lanç. de Usuário por Data" aparecem no menu e levam a "ACESSO NÃO AUTORIZADO". Item sem permissão sai do menu.
- Nomes do menu seguem o glossário do README ("Contracheque", "Registrar ponto"). Abaixo de 900px o menu vira gaveta aberta pelo ícone `menu` na barra superior.
