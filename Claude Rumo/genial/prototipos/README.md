# Protótipos

Telas só são criadas com pedido explícito (`/nova-tela <id>`). Status de cada uma em `docs/modulos/reconhecimento/telas-previstas.md`.

**Comece por `http://localhost:8000/prototipos/`**: abre o login simulado (`login/index.html`) ou, se já houver sessão, a página inicial da conta. Contas de teste (pedido do dono do produto, 21/10/2026):

| Conta | E-mail | Senha | Vê |
| --- | --- | --- | --- |
| Colaboradora (Ana Ribeiro) | `ana.ribeiro@teste.com` | `123@` | Visão geral, Cadastrar entrega, Minhas entregas, Detalhe, Ranking, Histórico |
| RH (administração) | `rh@teste.com` | `123` | Ciclos e pontuações, Gestão de entregas |
| Gestor (Carlos Andrade) | `carlos.andrade@teste.com` | `123` | Validação de entregas |

- A sessão simulada fica em `_comum/sessao.js`. Cada tela declara o perfil em `<html data-perfil="colaborador|rh|gestor|publico">`. Sem login, a tela manda para o login; com outra conta, volta para a página inicial da conta com um aviso.
- Sair: botão no rodapé do menu lateral ou no menu do avatar na barra superior ("Sair e trocar de conta").
- `validar-entregas/index.html` é do perfil gestor (conta do Carlos). A página do link seguro (`externo.html`) e os e-mails são públicos.
- **O login é só para navegar nos protótipos** (decisão 004). No Genial, vale o login que o sistema já tem.

| Tela | Pasta |
| --- | --- |
| Visão geral | `reconhecimento/visao-geral/` |
| Ranking mensal | `reconhecimento/ranking-mensal/` |
| Histórico de reconhecimentos | `reconhecimento/historico-reconhecimentos/` |
| Ciclos e pontuações (RH) | `reconhecimento/admin-ciclos/` |
| Gestão de entregas (RH) | `reconhecimento/admin-entregas/` |
| Cadastrar entrega | `reconhecimento/cadastrar-entrega/` |
| Minhas entregas | `reconhecimento/minhas-entregas/` |
| Validação de entregas | `reconhecimento/validar-entregas/` (gestor) e `validar-entregas/externo.html` (representante do cliente) |
| E-mail de solicitação de validação | `reconhecimento/email-validacao/` (`index.html` gestor, `cliente.html`, `texto.txt`) |
| Detalhamento e edição de entrega | `reconhecimento/detalhe-entrega/` (edição em `cadastrar-entrega/?estado=editar` e `?estado=ajustes`) |

## Convenções

```
prototipos/
└── reconhecimento/
    └── <id-da-tela>/          ids em docs/modulos/reconhecimento/telas-previstas.md
        ├── index.html         estado padrão; comentário no topo lista os estados disponíveis
        ├── tela.css           opcional, só layout, só var(--token)
        └── tela.js            opcional, vanilla; trechos simulados marcados com // SIMULAÇÃO
```

- CSS por caminho relativo: `../../../docs/design-system/tokens.css` e `../../../docs/design-system/components/bundle.css`.
- Estados alternativos por `?estado=<nome>` (vazio, carregando, erro, sem-permissao, e os de negócio).
- Dados fictícios e plausíveis; nada de dados reais de colaboradores ou clientes.
- Para visualizar: `python -m http.server 8000` na raiz do projeto e abrir `http://localhost:8000/prototipos/...`.
