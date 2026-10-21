# Visão do Genial

**Genial – Controle de Ponto** é um sistema próprio da Rumo Soluções (Rumo IT Solutions LTDA), criado em 2017 e usado internamente para gerenciar a jornada de trabalho dos colaboradores. Tem uma versão web (Genial Web) e um aplicativo móvel com o mesmo visual. Versão observada em 21/10/2026: 1.11.0.2609.

## Funcionalidades atuais (CONFIRMADA, informadas pelo dono do produto)

- Registro de ponto digital: pelo aplicativo, por QR Code ou por lista coletiva.
- Geolocalização no registro feito pelo aplicativo.
- Gestão de jornada: entrada, saída e intervalos.
- Banco de horas: cálculo automático de saldos e horas extras.
- Painel gerencial para o RH acompanhar registros e jornadas.
- Fechamento mensal automatizado.
- Calendário Colaborativo da Rumo (feriados e alterações de horário) disponível no Genial.

## Quem usa

Colaboradores da Rumo, inclusive os **alocados em clientes externos**, gestores e o RH. Ver `perfis.md`.

## Direção atual

1. **Novas telas, não reescrita.** O sistema não será refeito. Telas específicas são prototipadas aqui, validadas e entregues aos desenvolvedores para implementação no Genial Web.
2. **Iniciativa em andamento:** módulo de Reconhecimento Profissional (`docs/modulos/reconhecimento/`).
3. **Futuro:** usar o contexto e o design system para redesenhar telas existentes aos poucos (ex.: Horas lançadas e Registrar ponto já têm proposta no design system).

## Stack do Genial Web (observada, CONFIRMADA pelo código das páginas)

- ASP.NET MVC (rotas como `/Rumo/Configuracao/LancamentoHoras`).
- Bootstrap 3 + template de painel BeyondAdmin.
- jQuery; Glyphicons e Font Awesome; fonte Open Sans 13px.
