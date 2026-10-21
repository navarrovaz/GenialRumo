# Button

Botões disparam ações. Cada tela tem no máximo um botão primário, para a ação principal (em Horas lançadas, "Enviar para o RH").

**O consumidor fornece:** o rótulo (verbo no infinitivo + objeto: "Enviar para o RH", "Registrar entrada"), a variante, o tamanho e, se quiser, um ícone Lucide à esquerda.

| Variante | Classe | Quando usar |
| --- | --- | --- |
| Primário | `gn-btn gn-btn--primary` | A ação principal da tela ou do diálogo. Fundo `action` (genial-600), texto `text-on-action`. |
| Secundário | `gn-btn gn-btn--secondary` | Ações de apoio ao lado do primário: "Salvar rascunho", "Cancelar". |
| Fantasma | `gn-btn gn-btn--ghost` | Ações terciárias e de baixo risco: "Exportar planilha", "Ver tudo". |
| Destrutivo | `gn-btn gn-btn--danger` | Exclusões. Sempre seguido de um ConfirmDialog. |

Tamanhos: `gn-btn--sm` (32px, ações em tabelas e filtros), padrão (40px, web), `gn-btn--lg` (48px, app e telas de registro). `gn-btn--icon` para botões só com ícone, sempre com `aria-label`.

- Use `genial-600` (`action`) no fundo, nunca `genial-500`: o Azul Genial puro tem 3.6:1 com texto branco e não passa para textos de 14px.
- Desabilitado: prefira `aria-disabled="true"` e explique o motivo ao lado ("Corrija 2 marcações sem par para enviar"). Um botão apagado sem explicação não diz ao usuário o que fazer.
- Carregando: troque o ícone por `gn-spinner` e o rótulo pelo gerúndio ("Enviando…"). Mantenha a largura.
- Não use dois primários lado a lado. Não use cor de status (verde, laranja) em botões comuns: a antiga combinação azul-claro + laranja + amarelo da tela de registro vira primário + secundário.
