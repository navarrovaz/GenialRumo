# TabBar

Barra de abas inferior do app, com as 3 a 5 tarefas mais frequentes do colaborador.

**O consumidor fornece:** as abas (ícone + rótulo de uma palavra) e a aba atual (`aria-current="page"`).

- Altura `tabbar-height` + área segura inferior. Fundo `bg-surface`, borda superior `border-default`.
- Aba ativa: ícone `brand` dentro de uma pílula `bg-selected`, rótulo em `link`. Inativas: `text-muted`.
- Ordem: Ponto, Histórico, Justificar, Atestado (e Férias quando o recurso estiver disponível).
- **Não mostre abas indisponíveis esmaecidas.** Hoje "Férias" e "Atestado" aparecem apagadas sem explicação. Se o recurso não existe para o usuário, a aba não aparece; se depende de algo, abra a tela e explique com um EmptyState.
- Itens de configuração (Liberação de IP, VPN horários especiais, Sobre) ficam no menu lateral do app, não nas abas.
