# Steps

Passos numerados que explicam um processo, como "Como funciona" no Reconhecimento: cadastro, avaliação do gestor, pontuação da IA, homologação.

**O consumidor fornece:** de 2 a 6 passos, cada um com título curto (quem faz o quê) e uma frase de apoio com prazo ou condição.

- Estrutura: `ol.gn-steps` > `li` com `gn-steps__num` (número em `bg-selected`, `aria-hidden="true"`, porque a `<ol>` já numera para leitores de tela) + `gn-steps__body` (`gn-steps__title` + `gn-steps__text`).
- Título com sujeito e verbo: "O gestor avalia", "O RH homologa". Texto de apoio diz quando e em que condição.
- É explicativo, não mostra andamento. Para o histórico de uma entrega (quem decidiu e quando), use `AuditLog`.
- Cabe dentro de um `Card` em coluna lateral (300 a 340px) ou no corpo de uma página de ajuda.
