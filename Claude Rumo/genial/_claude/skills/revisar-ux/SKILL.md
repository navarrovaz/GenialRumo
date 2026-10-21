---
name: revisar-ux
description: Revisa um protótipo do Genial contra o design system, acessibilidade, textos e regras de negócio, e lista problemas com correção sugerida. Use quando o usuário pedir revisão ou antes de apresentar uma tela.
argument-hint: "[caminho da pasta ou arquivo do protótipo]"
---

# Revisão de UX: $ARGUMENTS

Leia o protótipo, a skill `genial-ui`, o glossário e os documentos do módulo. Verifique cada item e responda com uma tabela **Problema · Onde · Por que importa · Correção**, do mais grave ao menos grave. Não altere arquivos a menos que o usuário peça.

## Checklist

**Design system**
- [ ] Nenhuma cor, sombra, raio, espaçamento ou fonte literal (procure `#`, `rgb`, `px` em `color`/`background`, `font-family`).
- [ ] Só classes `gn-*` existentes ou componentes novos já aprovados e documentados.
- [ ] `--genial-500` usado só para marca/foco/realces; ações em `--action`.
- [ ] Um único botão primário.

**Clareza**
- [ ] Título diz onde a pessoa está; a ação principal é óbvia em 5 segundos.
- [ ] Resumo antes do detalhe.
- [ ] Todo número tem contexto (de quanto, desde quando, por quê).
- [ ] Pontuações da IA mostram o critério e a justificativa, não só o número.

**Estados**
- [ ] Carregando, vazio, erro e sem permissão existem.
- [ ] Estados de negócio cobertos (rascunho, enviada, em validação, devolvida, validada, avaliada, contestada…).
- [ ] Desabilitado sempre com motivo visível.
- [ ] Ações irreversíveis com `ConfirmDialog`.

**Acessibilidade**
- [ ] Nada comunicado só por cor.
- [ ] Contraste conforme os pares documentados.
- [ ] Foco visível, ordem de tabulação lógica, `aria-label` em botões de ícone, `<label for>` em campos, `<th>` em tabelas.

**Textos**
- [ ] Glossário respeitado; "você"; caixa de frase; sem abreviações; botões com verbo + objeto.
- [ ] Mensagens de erro dizem como resolver.

**Regras de negócio**
- [ ] Nada na tela depende de regra `HIPÓTESE`/`A DEFINIR` sem estar sinalizado no handoff.
- [ ] Permissões do perfil respeitadas (o colaborador não vê o que é do gestor).

**Implementação**
- [ ] HTML semântico, sem framework, JS mínimo e isolado.
- [ ] Funciona em 1280px e abaixo de 900px.
