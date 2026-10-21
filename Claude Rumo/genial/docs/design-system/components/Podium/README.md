# Podium

Os três primeiros de um ranking, com avatar grande, nome, pontos e degrau. Dá destaque às pessoas que estão participando (pedido do dono do produto, 21/10/2026).

**O consumidor fornece:** para cada uma das três posições, o avatar, o nome, o papel, os pontos já formatados (`15,2 pts`) e uma linha de apoio (`4 aprovadas`); se o ranking é provisório ou oficial; se a pessoa logada está entre os três.

- Estrutura: `ol.gn-podium` > `li.gn-podium__item.gn-podium__item--N` (N = 1, 2, 3, na ordem do ranking; o CSS posiciona o 1º no centro) com `gn-podium__avatar` (Avatar + `gn-podium__medalha` "1º"), `gn-podium__nome`, `gn-podium__papel`, `gn-podium__pontos`, `gn-podium__meta` e `gn-podium__degrau`.
- A lista está na ordem real (1º, 2º, 3º) para leitores de tela; só a disposição visual muda.
- Posição sempre em texto na medalha e no degrau, não só por altura ou cor. O 1º usa `gn-avatar--destaque`.
- Ranking provisório: diga "em apuração" no título do card que contém o pódio.
- Menos de três participantes: mostre só as posições existentes; nenhum: EmptyState.
- "Você" no pódio: Badge `info` "Você" abaixo do nome.
