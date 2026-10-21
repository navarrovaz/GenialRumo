# AttachmentList

Lista de arquivos e links anexados a um registro, como as evidências de uma entrega do Reconhecimento.

**O consumidor fornece:** para cada item, o tipo (arquivo ou link), o nome, a linha de apoio (tipo e tamanho) e, quando editável, a ação de remover.

- Estrutura: `ul.gn-attach-list` > `li.gn-attach` com ícone (`file-text` para arquivo, `link` para link) + `gn-attach__text` (`gn-attach__name` + `gn-attach__meta`) + ação.
- Edição: botão `gn-btn--ghost gn-btn--icon gn-btn--sm` com ícone `x` e `aria-label="Remover <nome>"`. Abaixo da lista, `gn-attach-actions` com "Anexar arquivo" (`upload`) e "Adicionar link" (`link`), ambos `gn-btn--secondary gn-btn--sm`.
- Leitura: o nome vira link (`a.gn-attach__name`) que abre ou baixa o arquivo; sem botão de remover.
- Meta: "Arquivo · 182 KB" ou "Link". Tamanho em KB ou MB com vírgula decimal.
- Lista vazia some (`:empty`); a ajuda do campo explica o que anexar e os limites.
- Nomes longos são cortados com reticências; o `aria-label` do botão leva o nome completo.
