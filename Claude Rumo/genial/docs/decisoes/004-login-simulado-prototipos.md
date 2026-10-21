# 004 — Login simulado só nos protótipos

**Status:** Aceita (21/10/2026, pedido do dono do produto)

## Contexto

O dono do produto pediu para navegar pelos protótipos entrando com contas de teste e trocando de conta, para ver cada perfil (colaboradora e RH) só com os recursos dele. A especificação (3.2) manda reaproveitar o login e o controle de acesso que o Genial já tem.

## Decisão

- Os protótipos têm uma tela "Entrar" (`prototipos/login/`) e uma sessão simulada no navegador (`prototipos/_comum/sessao.js`), com três contas de teste: `ana.ribeiro@teste.com` / `123@` (colaboradora), `rh@teste.com` / `123` (RH) e `carlos.andrade@teste.com` / `123` (gestor, pedida pelo dono do produto em 21/10/2026).
- Cada tela declara o perfil que pode abri-la; sem sessão vai para o login; com outro perfil volta para a página inicial da conta, com aviso.
- O menu lateral e o menu do avatar mostram a conta logada e a opção "Sair".
- **Nada disso vai para o Genial.** Os pacotes de handoff não incluem o login nem a sessão simulada; no sistema, valem a autenticação e os perfis que já existem.

## Consequências

- Senhas de teste ficam em texto no JavaScript do protótipo: aceitável só por serem fictícias e o protótipo rodar localmente. Nunca usar senhas reais aqui.
- A tela do gestor (`validar-entregas`) abre com a conta do Carlos.
- Os menus do RH e do gestor nos protótipos mostram só os itens do perfil, porque as telas do colaborador usam os dados da Ana. No Genial, um gestor também é colaborador e vê os dois grupos de itens.
