# Papel da IA

Fontes: `briefing.md` e `especificacao.md` ("esp. N").

## O que está definido — CONFIRMADA

- A IA avalia **só entregas aprovadas** pelo validador (esp. 4, 7).
- Retorna uma **pontuação de 1 a 5** e uma **justificativa resumida** por entrega (esp. 7, 7.3). Ver conflito de escala em `regras-pontuacao.md` (Q-escala).
- Considera impacto, esforço e complexidade, iniciativa e evidências, com os pesos configurados pelo RH (esp. 7.1, 7.2).
- Usa instruções e parâmetros padronizados, iguais para todos (esp. 7.3, 14).
- Pode avaliar ao longo do mês, assim que a entrega é aprovada; a apuração final do ciclo roda no dia 6 (esp. 9).
- A pontuação da IA **não é final**: o RH pode revisá-la antes da homologação, com justificativa registrada (esp. 7.3, 14). Isso responde Q-ia-final.
- A TI configura e monitora a integração e acompanha falhas dos processos automáticos (esp. 11.2).

## A DEFINIR

- Qual modelo e fornecedor, e onde roda (impacta o que pode ser enviado) (Q-ia-dados).
- Quais dados a IA recebe: só os textos, ou também evidências e anexos (Q-ia-dados).
- O que acontece se a IA falhar (Q-ia-falha). Para o colaborador, a tela informa que a pontuação sai até a apuração do ciclo.

## Decidido em 21/10/2026 — CONFIRMADA

- A pontuação de cada critério é guardada e mostrada ao colaborador, com o peso, além da final e da justificativa.
- Não há contestação pelo colaborador; a revisão é do RH, antes da homologação.
- Como e onde o colaborador é informado de que a entrega será avaliada por IA (Q-ia-aviso).

## Princípios recomendados (PROPOSTA)

1. **Explicável:** toda pontuação vem com justificativa curta em linguagem simples (CONFIRMADA, esp. 7.3) e, se aprovado, com a pontuação de cada critério.
2. **Humano no circuito:** o RH revisa e homologa (CONFIRMADA). Mostrar quando uma pontuação foi ajustada pelo RH.
3. **Contestável:** permitir que o colaborador peça revisão com um motivo (A DEFINIR).
4. **Consistente:** mesmas regras para todos (CONFIRMADA); critérios e pesos visíveis ao colaborador antes de cadastrar.
5. **Privacidade (LGPD) e confidencialidade de clientes:** aviso obrigatório no cadastro (CONFIRMADA, esp. 5.1); informar que a entrega será analisada por IA.
6. **Rastreável:** registrar a versão dos critérios e pesos e a data da avaliação; alterações do RH vão para a auditoria (CONFIRMADA, esp. 14).

## O que isso exige das telas (PROPOSTA)

- No cadastro: aviso de confidencialidade (obrigatório); aviso de avaliação por IA com os critérios; dicas para descrever bem o resultado e as evidências.
- No detalhe da entrega: bloco "Avaliação da IA" com pontuação, justificativa e data; se revisada, "Ajustada pelo RH" com a justificativa.
- Estado "Aguardando avaliação" com expectativa de prazo.
- Ação "Pedir revisão", se a contestação for aprovada.
- Nenhum elemento visual sugere que a IA é uma pessoa (sem avatar humano, sem nome próprio).
