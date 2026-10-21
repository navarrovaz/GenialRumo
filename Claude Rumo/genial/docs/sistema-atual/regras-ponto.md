# Regras de ponto

Legenda: `CONFIRMADA` (dono do produto ou documentação) · `HIPÓTESE` (deduzida do comportamento das telas, validar com RH/devs) · `A DEFINIR`.

| # | Regra | Status | Evidência |
| --- | --- | --- | --- |
| P1 | Banco de horas calcula saldos e horas extras automaticamente | CONFIRMADA | Dono do produto |
| P2 | Fechamento mensal é automatizado | CONFIRMADA | Dono do produto |
| P3 | Feriados vêm do Calendário Colaborativo e não contam como hora esperada | HIPÓTESE | 12/10 aparece destacado; out/2026 tem 21 dias úteis × 8h = 168:00 esperadas |
| P4 | Jornada esperada de 8h por dia útil | HIPÓTESE | Saldo −08:00 em dias sem marcação |
| P5 | Tolerância de 5 minutos no saldo diário (padrão CLT) | HIPÓTESE | 07:59 trabalhadas → saldo 00:00; 07:50 → −00:10 |
| P6 | Total do dia só soma pares completos de marcação; marcação ímpar é ignorada sem aviso | HIPÓTESE | Dia com 3 marcações mostrou só o primeiro par no total |
| P7 | Intervalo previsto de 1h | HIPÓTESE | Campo "Intervalo: 01:00" |
| P8 | Quantidade de pares de marcação configurável de 1 a 4 | CONFIRMADA | Seletor "Qtd Ent/Sai" |
| P9 | Fluxo do mês: colaborador lança → "Apenas Salvar" ou "Enviar para o RH" → RH pode ajustar | CONFIRMADA (telas) / HIPÓTESE (o que muda depois do envio) | Botões e histórico com ajustes do RH |
| P10 | Saldo do banco de horas inclui meses anteriores | HIPÓTESE | Soma dos saldos do mês ≠ saldo do banco exibido |
| P11 | Histórico registra toda inclusão e exclusão de marcação, com autor e data/hora | CONFIRMADA | Tabela de histórico |
| P12 | Geolocalização obrigatória no registro pelo app | A DEFINIR | Informado que existe; obrigatoriedade não confirmada |
