# PunchClock

Registro de ponto do dia, no app ("Registrar ponto") e na web (Lançamento de Ponto): relógio oficial, botão Registrar e as marcações do dia.

**O consumidor fornece:** data, nome e centro de custo, hora oficial (atualizada a cada segundo), o tipo da próxima marcação, o estado da localização e a lista de marcações previstas e feitas.

- Relógio em `display-clock` com algarismos tabulares, em `text-strong`. Substitui o relógio "flip" escuro da web e o relógio azul do app: um único visual nas duas plataformas.
- Botão `gn-punch__btn`: círculo de 132px em `action`, ícone `fingerprint`, sombra `shadow-action` e halo `genial-50`. É o único elemento com esse peso na tela.
- Abaixo do botão, diga **qual marcação será feita** ("Próxima marcação: Saída para intervalo"). O usuário não precisa deduzir.
- Marcações do dia em `gn-marks`: feita (`check` + horário), próxima (`gn-mark--next`), prevista (`gn-mark--pending`, horário esperado em cinza). Os rótulos Entrada / Intervalo / Retorno / Saída substituem as setas verde e cinza sem legenda.
- Localização: `map-pin` + texto ("Localização confirmada · Rumo Matriz"). Se falhar, troque por um Alert `attention` explicando como liberar.
- Na web, o card aparece centralizado com até 480px; "Registrar atividade" e "Registrar justificativa" viram botões secundários abaixo dele, não botões coloridos lado a lado.
- Depois de registrar: Alert `positive` "Saída para intervalo registrada às 13:34" por 4 segundos e atualização das marcações.
