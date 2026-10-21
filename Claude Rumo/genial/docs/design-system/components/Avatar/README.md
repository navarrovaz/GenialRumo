# Avatar

Identifica uma pessoa por uma imagem da cartela de avatares ilustrados (`assets/avatares/`) ou, sem imagem, pelas iniciais. Não há fotos reais no Genial.

**O consumidor fornece:** o número do avatar escolhido pela pessoa (1 a 12) ou as iniciais, o nome (para o `alt` quando o avatar aparece sozinho) e o tamanho.

- Estrutura: `span.gn-avatar.gn-avatar--img > img` (ilustração) ou `span.gn-avatar` com as iniciais (`AR`).
- Tamanhos: `gn-avatar--sm` (28px, listas e tabelas), padrão (36px, menu), `gn-avatar--lg` (48px, cabeçalhos), `gn-avatar--xl` (72px, pódio e perfil).
- `gn-avatar--destaque`: anel na cor da marca para o primeiro lugar ou para "você" quando a pessoa precisa ser encontrada numa lista.
- `gn-avatar-stack`: avatares sobrepostos para mostrar quem participa ("10 pessoas"), com `gn-avatar-stack__mais` ("+6").
- Com o nome ao lado, o `img` tem `alt=""`. Sozinho, `alt` com o nome. A IA nunca usa avatar de pessoa.
- `gn-avatar--rh` continua para iniciais de pessoas do RH no histórico.

## AvatarPicker (escolher avatar)

Grade de 12 opções (6 por linha; 4 abaixo de 640px) dentro de um diálogo "Escolher avatar".

- Estrutura: `fieldset.gn-avatar-picker` > `label.gn-avatar-option` (`input type="radio"` + avatar `--img` + `gn-avatar-option__check` com ícone `check`).
- Selecionado: anel na cor da marca **e** selo com ✓ (não só cor). Foco com contorno `focus-ring`.
- Cada opção tem nome acessível ("Avatar 7"). Rodapé do diálogo: "Cancelar" e "Salvar avatar" (primário). O avatar novo vale para todo o Genial.
