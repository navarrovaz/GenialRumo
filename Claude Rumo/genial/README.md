# Genial — contexto e protótipos

Pasta de trabalho para desenhar novas telas do Genial com o Claude Code e entregá-las aos desenvolvedores.

## Como usar

1. Abra esta pasta (`genial`) no Claude Code. Ele lê o `CLAUDE.md` automaticamente.
2. Comandos disponíveis:
   - `/nova-tela <nome>`: planeja uma tela do módulo, faz perguntas e só constrói depois da sua aprovação.
   - `/revisar-ux <caminho>`: revisa um protótipo contra o design system e o checklist de UX.
   - `/handoff-dev <tela>`: monta o pacote de entrega para os desenvolvedores.
   - `/genial-ui`: carrega as regras de interface (o Claude também carrega sozinho quando o trabalho é de UI).
3. Agentes: `ux-reviewer` (revisão independente) e `analista-negocio` (regras de ponto e de reconhecimento).

## Estrutura

```
genial/
├── CLAUDE.md                  instruções que o Claude Code lê em toda sessão
├── .claude/
│   ├── settings.json          permissões
│   ├── skills/                comandos e conhecimento sob demanda
│   └── agents/                revisores e especialistas com contexto próprio
├── docs/
│   ├── produto/               visão do Genial e perfis de usuário
│   ├── sistema-atual/         como o Genial é hoje (web, app, regras de ponto)
│   ├── dominio/               glossário
│   ├── modulos/reconhecimento/ briefing, escopo, regras, IA, telas previstas, questões abertas
│   ├── design-system/         guia, tokens, CSS, componentes, logos e ícones
│   ├── referencias/           prints do app atual e referências visuais
│   └── decisoes/              registro de decisões (ADR)
├── prototipos/                telas em HTML/CSS (vazio até a primeira tela)
└── handoff/                   pacotes de entrega para os devs
```

## Manutenção

- O design system tem uma versão navegável no Claude (artifact "Genial Design System"). Ao mudar tokens ou componentes lá, atualize `docs/design-system/` aqui (ou peça ao Claude para sincronizar).
- Quando uma pergunta de `questoes-abertas.md` for respondida, mova a resposta para o documento certo e mude o status da regra para `CONFIRMADA`.
