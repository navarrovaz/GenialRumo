# Field

Campos recebem dados do usuário; o Readout mostra dados que ele não pode alterar.

**O consumidor fornece:** `id` estável, rótulo, valor, texto de ajuda opcional e a mensagem de erro.

- Estrutura: `gn-field` > `gn-label` + `gn-input` (ou `gn-select`) + `gn-help`. Rótulo sempre visível acima do campo; placeholder só dá exemplo, nunca substitui o rótulo.
- Horários: `gn-input gn-input--time` com `inputmode="numeric"`, máscara HH:MM e algarismos tabulares. Valide ao sair do campo.
- Erro: `gn-field--error` + `aria-invalid="true"` + mensagem com ícone `circle-alert` que diz como corrigir ("Use 00:00 a 23:59"), nunca só "Valor inválido".
- **Somente leitura não é campo.** Dados como Nome, Mês de referência, Situação e Intervalo, que hoje aparecem em caixas cinza iguais a campos, viram `gn-readout` (`<dl>` com `dt`/`dd`). Assim, tudo que tem borda é editável e tudo que não tem é informação.
- Borda `border-control` (3:1); foco com contorno `focus-ring` de 2px. Desabilitado usa `bg-disabled` e precisa de motivo próximo.
- Busca: `gn-input-wrap` com o ícone `search` à esquerda.
- Texto longo: `<textarea class="gn-input gn-textarea">` com `rows="4"` e `maxlength`. Altura mínima de 104px, o usuário pode aumentar na vertical. Use para descrições com mais de uma frase (ex.: "O que você entregou?").
- Contador: quando há limite de caracteres, `gn-help-row` junta a ajuda (à esquerda) e o `gn-counter` (`36/100`, à direita, com `aria-hidden="true"`; o limite real vem do `maxlength`). Em erro, a mensagem ocupa o lugar da ajuda e o contador continua neutro.
- Grupo de opções (rádio ou checkbox): `fieldset.gn-field` com `legend.gn-label` e as opções em `gn-check`.
