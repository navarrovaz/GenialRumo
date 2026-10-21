# EmptyState

Ocupa o lugar do conteúdo quando não há nada para mostrar, quando o usuário não tem acesso ou quando algo falhou.

**O consumidor fornece:** ícone, título (o que aconteceu), texto (por que, e o que isso significa) e até duas ações.

- Lista vazia: ícone em `bg-selected` + `brand`, título no positivo ("Nenhum afastamento futuro") e uma ação primária que cria o primeiro item. Substitui o "Nenhum registro encontrado." solto na tabela.
- Sem permissão: ícone `lock` em `bg-sunken`, título que nomeia a restrição, texto que diz com quem falar, ações "Voltar para o início" e "Falar com o RH". Substitui a tela "ACESSO NÃO AUTORIZADO".
- Erro de carregamento: ícone `circle-alert`, "Não foi possível carregar os lançamentos", ação "Tentar de novo".
- Busca sem resultado: ícone `search`, "Nenhum colaborador encontrado para \"Silva\"", ação "Limpar filtros".
- Texto em até duas linhas (`max-width: 42ch`). Sem ilustrações decorativas nem emoji.
