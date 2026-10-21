# AuditLog

Histórico de alterações de um período, agrupado por dia, mostrando quem mudou o quê.

**O consumidor fornece:** as entradas (autor, papel, ação, dia afetado, horários incluídos e removidos, hora da alteração), ordenadas da mais recente para a mais antiga.

- Agrupe por dia (`gn-log__day`, em `overline`). Cada linha: avatar, frase em linguagem natural ("Você registrou a saída", "Ana Ribeiro ajustou 3 dias"), mudanças em chips e a hora à direita.
- Mudanças: `gn-diff--add` (incluído, com `plus`), `gn-diff--remove` (removido, riscado), `gn-diff--note` (o dia afetado). Não registre "excluiu 14:05 / incluiu 14:05/18:09" quando a pessoa só completou um par: mostre apenas o que mudou.
- Alterações feitas por outra pessoa trazem o badge do papel (RH) e o avatar `gn-avatar--rh`. É a informação que o colaborador mais procura no histórico.
- Use "Você" para o próprio usuário.
- Mostre os 10 últimos dias e um botão fantasma "Ver histórico completo"; a paginação numerada (Anterior 1 2 3 Próximo) sai.
