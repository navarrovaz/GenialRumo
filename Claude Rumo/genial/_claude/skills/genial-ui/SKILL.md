---
name: genial-ui
description: Regras de interface do Genial (design system, tokens, componentes gn-*, textos, acessibilidade). Use sempre que for criar, alterar ou revisar qualquer tela, protótipo ou componente visual do Genial.
---

# Interface do Genial

Fonte única: `docs/design-system/`. Leia `docs/design-system/README.md` inteiro na primeira vez que trabalhar com interface nesta sessão.

## Antes de desenhar

1. Leia o README do componente que vai usar em `docs/design-system/components/<Nome>/README.md`. O `preview.html` ao lado mostra a marcação exata.
2. Componentes disponíveis: Button, Field (inclui Readout, textarea e contador), AttachmentList, Steps, MeterList, Avatar (inclui cartela ilustrada e AvatarPicker), Podium, FilterChip (inclui Segmented), Badge (inclui Delta), Alert, Card, StatCard, Sidebar, Topbar, TabBar, TimesheetTable, PunchClock, AuditLog, EmptyState, ConfirmDialog. Telas de exemplo: TelaHorasLancadas, TelaAppPonto.
3. Precisa de algo que não existe (ranking, card de entrega, nota da IA, linha do tempo de validação)? **Pare e proponha** antes de usar:
   - nome do componente, para que serve, quais tokens usa, estados e variações;
   - por que nenhum componente existente resolve.
   Só depois da aprovação crie `docs/design-system/components/<Nome>/README.md` + `preview.html` e as classes no `bundle.css`, no mesmo padrão dos existentes (prefixo `gn-`, só `var(--token)`).

## Montagem de uma página web

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nome da tela — Genial</title>
  <link rel="stylesheet" href="../../docs/design-system/tokens.css">
  <link rel="stylesheet" href="../../docs/design-system/components/bundle.css">
  <link rel="stylesheet" href="./tela.css"> <!-- só layout específico, sempre com var(--token) -->
</head>
<body>
  <div class="gn gn-shell">
    <!-- Sidebar → gn-main > Topbar + main.gn-page -->
  </div>
</body>
</html>
```

- Estrutura da página: `gn-page__head` (título h1 + descrição + no máximo um botão primário) → filtros (`gn-chip`) → indicadores (`gn-grid-stats`) → alertas → conteúdo principal.
- Ícones: copie o SVG de `docs/design-system/assets/icones/` inline, com `class="gn-icon"` e `aria-hidden="true"`. Mapa de ícones no README do design system.
- Logo: `docs/design-system/assets/logos/genial-logo.png` (fundo claro) ou `genial-logo-branco.png` (fundo azul/escuro).

## Regras que não se negociam

- Só `var(--token)`. Nenhum hex, rgb, nome de cor, sombra ou fonte literal fora de `tokens.css`.
- `--genial-500` (#008FD2) é a marca: logo, item ativo, foco, ícones de marca, números grandes. Ações e links em `--action`/`--link`.
- Todo estado com texto ou ícone além da cor. Pontuação e saldo com sinal (`+`, `−` U+2212).
- O que é editável tem borda (`gn-input`); o que é leitura é texto (`gn-readout`).
- Um botão primário por tela/diálogo. Ações irreversíveis passam por `ConfirmDialog`.
- Estados obrigatórios para cada lista ou tabela: carregando, vazio (`EmptyState`), erro, sem permissão.
- Algarismos tabulares (`gn-num`) em números, horas e pontuações.
- Contraste: texto ≥ 4.5:1, ícones/bordas/foco ≥ 3:1 (os pares do design system já atendem; não crie combinações novas sem checar).
- Foco visível, navegação por teclado, `aria-label` em botões só com ícone, `<th>` em tabelas.
- Funciona a partir de 1280px de largura sem rolagem horizontal da página; abaixo de 900px o menu vira gaveta.

## Textos

Siga `docs/dominio/glossario.md` e a seção "Voz e textos" do README do design system: "você", caixa de frase, verbo + objeto nos botões, erros que dizem como resolver, sem emoji, sem "OK".
