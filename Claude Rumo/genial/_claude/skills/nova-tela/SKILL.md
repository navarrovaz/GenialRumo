---
name: nova-tela
description: Planeja e constrói o protótipo de uma tela nova do Genial, com aprovação antes de construir. Use quando o usuário pedir explicitamente uma tela (ex. /nova-tela cadastrar-entrega).
argument-hint: "[identificador da tela, como em telas-previstas.md]"
disable-model-invocation: true
---

# Nova tela: $ARGUMENTS

Siga as etapas em ordem. **Não escreva HTML antes da aprovação da etapa 3.**

## 1. Entender

- Leia `docs/modulos/reconhecimento/README.md`, `escopo.md`, `telas-previstas.md` (a linha desta tela) e `questoes-abertas.md`.
- Leia `docs/produto/perfis.md` para saber quem usa a tela e com que permissão.
- Carregue a skill `genial-ui`.

## 2. Levantar dúvidas

Liste as regras de negócio que a tela depende e que estão `HIPÓTESE` ou `A DEFINIR`. Pergunte ao usuário (no máximo 5 perguntas, objetivas, com uma sugestão de resposta em cada). Registre as respostas em `questoes-abertas.md` e, se confirmadas, no documento de regras.

## 3. Propor o plano (e esperar aprovação)

Apresente em texto, sem código:
- **Objetivo da tela** em uma frase e o perfil que a usa.
- **Conteúdo em ordem** (do topo para baixo) e a ação primária.
- **Componentes** do design system usados e componentes novos necessários (com a proposta da skill `genial-ui`).
- **Estados**: padrão, vazio, carregando, erro, sem permissão, e os estados específicos (ex.: entrega devolvida, aguardando IA).
- **Fluxo**: de onde o usuário vem, para onde vai, o que acontece em cada ação.
- **Dados de exemplo** que vai usar (fictícios).

## 4. Construir

- Pasta: `prototipos/reconhecimento/<identificador>/` com `index.html` e, se precisar, `tela.css` e `tela.js`.
- Estados alternativos: `index.html?estado=vazio` alternado por JS mínimo, ou arquivos `estado-vazio.html`. Liste-os no topo do `index.html` em um comentário.
- Siga todas as regras da skill `genial-ui`.

## 5. Revisar

Rode a skill `revisar-ux` (ou o agente `ux-reviewer`) sobre a pasta da tela e corrija o que for apontado.

## 6. Registrar

Atualize o status da tela em `telas-previstas.md` para `Em validação` e informe ao usuário como abrir a tela e quais estados existem.
