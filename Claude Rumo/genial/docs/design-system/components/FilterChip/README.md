# FilterChip

Filtros compactos em linha, acima de tabelas e listas, no padrão das referências ("All Industries ▾").

**O consumidor fornece:** rótulo com o valor atual ("Situação: todas"), o menu ou popover que abre ao clicar, e `aria-pressed="true"` quando o filtro está diferente do padrão.

- `gn-chip` para filtros que abrem opções (termina com `chevron-down`). Ativo: `bg-selected`, borda `link`, texto `text-selected`.
- `gn-segmented` para alternar entre 2 a 4 visões da mesma informação (Mês / Semana / Dia).
- Substitui os blocos "Filtros de Pesquisa" com campos soltos e o botão "Buscar": o filtro aplica na hora, sem botão.
- No app, os chips rolam na horizontal em uma linha; não quebre em várias.
