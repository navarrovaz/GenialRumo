# Telas previstas

Lista de telas da `especificacao.md` (esp. 13), CONFIRMADA. Só construir com pedido explícito, via `/nova-tela <id>`.

Status: `Não iniciada` → `Em planejamento` → `Em validação` → `Validada` → `Entregue aos devs`.

## Colaborador (fase 1)

| ID | Tela (esp. 13) | Objetivo | Depende de | Status |
| --- | --- | --- | --- | --- |
| `visao-geral` | Dashboard de Reconhecimento | Ranking do mês em destaque (pódio, lista e participantes com avatares), ciclo em uma linha, saldos, pendências, evolução de 6 e 12 meses, últimas entregas, reconhecimentos e troca de avatar | Respondidas na aprovação | Entregue aos devs (21/10/2026) |
| `cadastrar-entrega` | Cadastro de Entrega | Formulário curto (esp. 5.1), aviso de confidencialidade, rascunho e envio | Respondidas na aprovação | Entregue aos devs (21/10/2026) |
| `minhas-entregas` | Minhas Entregas | Saldos do ciclo, pendentes, lista por status com filtros, editar e excluir antes da decisão do validador | Respondidas na aprovação | Entregue aos devs (21/10/2026) |
| `detalhe-entrega` | Detalhamento e Edição de Entrega | Status, avaliação da IA (pontuação, critérios, justificativa, ajuste do RH), conteúdo, validação com comentário, histórico. A edição usa o formulário de cadastro (`cadastrar-entrega?estado=editar` e `?estado=ajustes`) | Respondidas na aprovação | Entregue aos devs (21/10/2026) |
| `ranking-mensal` | Ranking Mensal | Pódio com avatares e participantes do mês, tabela com avatares, sua posição, entregas de destaque e entregas públicas dos colegas | Respondidas na aprovação | Entregue aos devs (21/10/2026) |
| `historico-reconhecimentos` | Histórico de Reconhecimentos | Meu histórico (ciclos homologados com as entregas), histórico público dos colegas com busca e galeria de Destaques do Mês | Respondidas (Q-telas-menu, Q-historico-publico) | Entregue aos devs (21/10/2026) |

## Validador (fase 2)

| ID | Tela (esp. 13) | Objetivo | Depende de | Status |
| --- | --- | --- | --- | --- |
| `validar-entregas` | Validação de Entregas | Fila do gestor interno no Genial (pendentes e decididas) com a entrega aberta e a decisão Aprovar, Solicitar ajustes ou Recusar com comentário; versão externa sem menu para o representante do cliente (`externo.html`) | Respondidas na aprovação | Entregue aos devs (21/10/2026) |
| `email-validacao` | E-mail de solicitação de validação (não é tela; modelo da esp. 6) | Resumo da entrega e botões que abrem a página de validação com a decisão escolhida; variantes gestor e pessoa do cliente, mais texto puro | Decisão 003 (Proposta) | Entregue aos devs (21/10/2026) |

## RH e TI (fases 4 e 5)

| ID | Tela (esp. 13) | Perfil | Objetivo | Depende de | Status |
| --- | --- | --- | --- | --- | --- |
| `admin-painel` | Dashboard Administrativo | RH | Visão do ciclo: pendentes de validação e de avaliação, participação, etapa do calendário | Q-rh | Não iniciada |
| `admin-entregas` | Gestão de Entregas | RH | Lista com busca e filtros (ciclo, validador, cliente, situação) e a entrega aberta: aprovar no lugar do validador ou cancelar (prazo vencido), revisar pontuação por critério, corrigir texto, cancelar e reabrir, sempre com justificativa | Q-reabrir, cliente pela alocação (construída com HIPÓTESES) | Em validação (21/10/2026) |
| `admin-ciclos` | Gestão de Ciclos e Pontuações | RH | Resumo do ciclo, conferência antes de homologar, prévia com pódio, homologação única com confirmação, reabertura com justificativa, calendário editável e histórico | Q-empate-duplo (construída com HIPÓTESES) | Em validação (21/10/2026) |
| `admin-criterios` | Configuração dos Critérios da IA | RH / TI | Critérios, pesos (somando 100%) e instruções padronizadas | Q-config-criterios, Q-escala | Não iniciada |
| `admin-relatorios` | Relatórios e Indicadores | RH | Relatórios de acompanhamento e reconhecimento | Definir quais relatórios | Não iniciada |
| `admin-tecnico` | Configurações Técnicas | TI | Perfis de acesso, e-mail, integração com IA, falhas, logs de auditoria | Q-ia-dados, Q-ia-falha | Não iniciada |

## Navegação

CONFIRMADA (esp. 3.1): uma seção nova no menu, com os itens abaixo. Os rótulos seguem o glossário (caixa de frase):

- Colaborador: Visão geral · Cadastrar entrega · Minhas entregas · Ranking mensal · Histórico de reconhecimentos
- Gestor interno: + Validação de entregas, com contador de pendências (A DEFINIR, Q-fila-validador)
- RH e TI: + Administração (acesso restrito), com as telas do seu perfil

PROPOSTA: seção **RECONHECIMENTO** no menu lateral (componente Sidebar), entre MEU PONTO e RELATÓRIOS. Nome da seção ("Reconhecimento" ou "Reconhecimento profissional"): ver Q-termos.

## Componentes que provavelmente faltam no design system

Propor e aprovar antes de usar (skill `genial-ui`): card de entrega, linha do tempo de status, bloco de avaliação da IA (pontuação, critérios, justificativa, ajuste do RH), tabela ou pódio de ranking, campo de upload de evidência, gráfico de evolução (6 e 12 meses), editor de pesos com soma, calendário do ciclo, layout sem menu para o validador externo, modelo de e-mail.

Adicionados ao design system em 21/10/2026, aprovados com a tela `cadastrar-entrega`: textarea e contador (Field), AttachmentList, Steps, MeterList. O Badge ganhou o mapa dos 8 status da entrega. Ícones Lucide adicionados a `assets/icones`: `award`, `layout-dashboard`, `upload`, `link`, `trash-2`.

Adicionados ao design system em 21/10/2026, a pedido do dono do produto: Avatar com cartela de 12 avatares ilustrados e AvatarPicker, e Podium. Candidatos (por ora em `tela.css`): item clicável da fila (`validar-entregas`) e gráfico de colunas (`visao-geral`).

Já existem e devem ser reaproveitados: StatCard (saldos), Badge (status), AuditLog (histórico de decisões e alterações), FilterChip, Field, ConfirmDialog, EmptyState.
