---
name: handoff-dev
description: Monta o pacote de entrega de uma tela validada para os desenvolvedores do Genial Web (ASP.NET MVC + Bootstrap 3). Use quando o usuário disser que a tela foi aprovada e pedir o handoff.
argument-hint: "[identificador da tela]"
disable-model-invocation: true
---

# Handoff: $ARGUMENTS

Confirme com o usuário que a tela está **validada** antes de começar. Crie `handoff/<AAAA-MM-DD>-<identificador>/` com:

1. **`prototipo/`**: cópia do protótipo final + `tokens.css` e `bundle.css` copiados (caminhos relativos ajustados para a pasta funcionar sozinha) + ícones e logo usados.
2. **`ESPECIFICACAO.md`** com:
   - Objetivo, perfil de acesso e onde a tela entra no menu.
   - Lista de componentes usados (link para o README de cada um no design system).
   - Campos: nome, tipo, obrigatório, validação, mensagem de erro, limite de caracteres.
   - Estados da tela e o que dispara cada um.
   - Ações: o que cada botão faz, confirmação, mensagem de sucesso/erro.
   - **Dados necessários** (o que a tela lê e grava), em formato de contrato sugerido (JSON de exemplo), deixando claro que é sugestão.
   - Regras de negócio aplicadas, cada uma com status `CONFIRMADA` / `HIPÓTESE` / `A DEFINIR`. Hipóteses em destaque.
   - Textos da interface (tabela com todos os rótulos e mensagens), para revisão e tradução futura.
   - Acessibilidade: ordem de foco, `aria-*` usados.
3. **`INTEGRACAO.md`** com orientações para o Genial Web:
   - Classes `gn-*` não conflitam com Bootstrap 3; carregar `tokens.css` e `bundle.css` depois do Bootstrap.
   - A fonte Plus Jakarta Sans vem do Google Fonts (import no topo do `bundle.css`); se a rede da Rumo bloquear, hospedar localmente.
   - Ícones são SVG inline (Lucide); substituem Glyphicons/Font Awesome só nas telas novas.
   - Pontos onde o JS do protótipo é só simulação e precisa virar chamada ao backend.
4. **`CHECKLIST.md`**: itens para o dev conferir antes de publicar (estados, textos, contraste, teclado).

Ao final, atualize o status da tela em `docs/modulos/reconhecimento/telas-previstas.md` para `Entregue aos devs` com a data.
