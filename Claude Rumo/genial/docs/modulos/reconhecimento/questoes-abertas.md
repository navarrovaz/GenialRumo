# Questões abertas

Responder antes de construir as telas que dependem delas (ver `telas-previstas.md`). Ao responder, preencha "Resposta", mova a regra para o documento certo com status `CONFIRMADA` e mantenha a linha aqui como histórico.

Situação: **Respondida** · **Parcial** (a especificação respondeu uma parte; o que falta está em "Resposta") · **Aberta**. "esp." = `especificacao.md`.

## Respondidas ou parciais pela especificação (21/10/2026)

| ID | Pergunta | Resposta | Situação | Data |
| --- | --- | --- | --- | --- |
| Q-campos | Quais campos tem uma entrega? | Título (até 100 caracteres), o que você entregou e resultado (até 1.000 cada), em quanto tempo (número + unidade: horas, dias, semanas, meses), como a entrega começou, quem pode confirmar, evidências (esp. 5.1; protótipo aprovado em 21/10/2026) | Respondida | 21/10/2026 |
| Q-evidencias | Que evidências são aceitas e são obrigatórias? | Opcionais. Arquivos PDF, imagem ou Office até 10 MB cada, e links (protótipo aprovado em 21/10/2026). Quantidade máxima: A DEFINIR | Respondida | 21/10/2026 |
| Q-confidencial | Como tratar informações confidenciais de clientes externos? | Aviso obrigatório no cadastro (esp. 5.1); histórico público sem evidências confidenciais, comentários privados ou dados de clientes não autorizados (esp. 8.2, 14) | Respondida | 21/10/2026 |
| Q-validador | Quem valida? | Gestor interno da Rumo ou representante autorizado do cliente (esp. 6) | Respondida | 21/10/2026 |
| Q-validador-nota | O validador só confirma ou também ajusta a pontuação? | Só decide: aprovar, solicitar ajustes ou recusar. A pontuação é da IA, com revisão do RH (esp. 6, 7.3) | Respondida | 21/10/2026 |
| Q-estados | Os estados propostos estão corretos? | Substituídos pelos 8 estados da esp. 12: Rascunho, Aguardando validação, Ajustes solicitados, Recusada, Aguardando avaliação, Avaliada, Homologada, Cancelada | Respondida | 21/10/2026 |
| Q-ia-final | A avaliação da IA é final ou sugestão? | Não é final: o RH pode revisar antes da homologação, com justificativa registrada (esp. 7.3) | Respondida | 21/10/2026 |
| Q-criterios | Quais critérios e pesos? Quem define? | Impacto 40%, Complexidade e esforço 25%, Iniciativa 20%, Evidências 15%, como sugestão; o RH ajusta (esp. 7.1) | Respondida (pesos são PROPOSTA) | 21/10/2026 |
| Q-ciclo | Qual o ciclo de apuração? A pontuação zera? | Mensal; saldo mensal reinicia a cada ciclo e o saldo histórico preserva os anteriores (esp. 8, 9) | Respondida | 21/10/2026 |
| Q-recompensa | O que o reconhecimento gera? | Destaque do Mês divulgado nos canais internos; histórico não é avaliação formal de desempenho (esp. 10). Falta: se há premiação | Parcial | 21/10/2026 |
| Q-notificacoes | Por onde avisar? | E-mail automático ao validador com resumo e link (esp. 6). Falta: avisos ao colaborador (ajustes solicitados, recusada, avaliada) e ao RH, e se também aparecem no Genial | Parcial | 21/10/2026 |
| Q-perfil-validador | O Genial já tem perfil de gestor com equipe vinculada? | A esp. 3.2 diz "caso estejam cadastrados". Falta confirmar com os devs | Parcial | 21/10/2026 |

## Respondidas pelo dono do produto (21/10/2026)

| ID | Pergunta | Resposta | Situação | Data |
| --- | --- | --- | --- | --- |
| Q-escala | A pontuação é de 1 a 5 ou de 0 a 5? Tem casa decimal? | De 1 a 5, com decimal (ex.: 4,6) | Respondida | 21/10/2026 |
| Q-edicao-pendente | O colaborador pode editar uma entrega aguardando validação? E o link do gestor? | Pode editar até o gestor decidir (aprovar, recusar ou comentar para o colaborador editar). Depois da decisão, não. O link do e-mail abre sempre a versão atual da entrega, sem novo e-mail a cada edição (protótipo aprovado) | Respondida | 21/10/2026 |
| Q-limite | Há limite de entregas por ciclo? | Não. O volume é controlado pelo gestor, que só aprova entregas relevantes, avaliando impacto x esforço | Respondida | 21/10/2026 |
| Q-desempate | Como desempatar no ranking? | Pelo volume de entregas aprovadas no ciclo | Respondida | 21/10/2026 |
| Q-campo-iniciativa | O campo "iniciativa própria ou demanda recebida" entra? É obrigatório? | Entra como "Como a entrega começou?" e é obrigatório (protótipo aprovado) | Respondida | 21/10/2026 |
| Q-quem-confirma | "Quem pode confirmar?": usuário do Genial ou nome e e-mail? | Escolha entre "Um gestor da Rumo" (lista do Genial, com o gestor vinculado pré-selecionado) e "Uma pessoa do cliente" (nome e e-mail) (protótipo aprovado) | Respondida | 21/10/2026 |
| Q-duplicidade | Como o sistema evita entregas duplicadas? | Alerta quando o título se parece com outra entrega do colaborador no ciclo, com link para a existente; não bloqueia o envio (protótipo aprovado) | Respondida | 21/10/2026 |
| Q-rascunho | O que é obrigatório para salvar rascunho? | Só o título (protótipo aprovado) | Respondida | 21/10/2026 |
| Q-pontuacao-criterio | O colaborador vê a pontuação por critério ou só a final? | Vê a pontuação de cada critério, com o peso, além da final e da justificativa (protótipo Detalhe aprovado) | Respondida | 21/10/2026 |
| Q-contestacao | Existe contestação pelo colaborador? | Não. Só a revisão do RH antes da homologação (protótipo Detalhe aprovado) | Respondida | 21/10/2026 |
| Q-ia-prazo | Que prazo a tela mostra para a avaliação? | "Até a apuração do ciclo" (dia 6 do mês seguinte). O que acontece se a IA falhar continua em Q-ia-falha | Respondida | 21/10/2026 |
| Q-saldos | O saldo mensal mostra pontuações não homologadas? O que entra no saldo histórico? | Sim: o saldo do mês soma as entregas avaliadas, marcado "em apuração" até a apuração final. O saldo histórico soma só ciclos homologados (protótipo Minhas entregas aprovado) | Respondida | 21/10/2026 |
| Q-termos | Que palavras aparecem nos botões do gestor e nos status? | Aprovar · Solicitar ajustes · Recusar; status "Recusada" (no lugar de "Rejeitar"/"Rejeitada" da especificação) | Respondida | 21/10/2026 |
| Q-validador-externo | Link seguro: validade, uso, para quem? | Vale até o fim do prazo de validação do ciclo (ex.: 05/11), pode ser usado uma vez e vai só para o e-mail que o colaborador informou | Respondida | 21/10/2026 |
| Q-fila-validador | O gestor interno tem uma fila no Genial além do link do e-mail? | Sim: "Validação de entregas" no menu, com pendentes e decididas (protótipo aprovado) | Respondida | 21/10/2026 |
| Q-decisao-regras | Comentário e confirmação na decisão do validador | Comentário obrigatório para solicitar ajustes e para recusar. No Genial, só a recusa pede confirmação; no link do cliente, toda decisão pede, porque o link fecha (protótipo aprovado) | Respondida | 21/10/2026 |
| Q-ranking | Os colegas veem o ranking durante o mês? | Sim: ranking provisório visível, marcado "em apuração"; vira oficial depois da homologação do RH | Respondida | 21/10/2026 |
| Q-historico-publico | O que aparece de cada entrega no histórico público dos colegas? | Título, resumo do resultado, pontuação e mês, para todas as entregas homologadas, sem opção de esconder. Sem evidências e sem comentários | Respondida | 21/10/2026 |
| Q-elegibilidade | Quem pode ser Destaque do Mês? | Qualquer colaborador: maior pontuação homologada do ciclo, inclusive quem foi destaque no mês anterior | Respondida | 21/10/2026 |
| Q-telas-menu | Conteúdo de "Visão geral" e "Histórico de reconhecimentos" | Visão geral: saldos, posição e evolução de 6 e 12 meses. Histórico: o próprio, o dos colegas e a galeria de Destaques do Mês | Respondida | 21/10/2026 |
| Q-avatar | Como identificar as pessoas no ranking? | Cartela padronizada de avatares ilustrados (sem foto real); cada pessoa escolhe e troca o seu. Até escolher, recebe um da cartela automaticamente (aprovado) | Respondida | 21/10/2026 |
| Q-ranking-regras | Detalhes do ranking e da Visão geral | Só entra no ranking quem tem ao menos uma entrega avaliada no ciclo; no ciclo em apuração, as entregas dos colegas aparecem só com título e pontuação (o resumo vem depois da homologação); a etapa atual do ciclo é calculada pela data de hoje e pelo calendário do RH (protótipos aprovados) | Respondida | 21/10/2026 |
| Q-prazo-validacao | O que acontece com entregas não validadas até o prazo? | O validador recebe lembrete 3 dias antes e no dia do prazo. Depois, a entrega vai para o RH, que aprova no lugar do validador ou cancela, antes da homologação | Respondida | 21/10/2026 |
| Q-homologacao | Como funciona a homologação? | Uma ação para o ciclo inteiro, com resumo e confirmação. Depois de homologado, o ciclo só reabre com justificativa registrada, e o resultado oficial é refeito | Respondida | 21/10/2026 |
| Q-revisao-rh | O que o RH altera ao revisar a pontuação da IA? | A nota de um ou mais critérios; a nota final é recalculada pelos pesos. Justificativa obrigatória | Respondida | 21/10/2026 |
| Q-rh | Quem do RH pode fazer o quê? | Um perfil só: todas as pessoas do RH com acesso à administração podem tudo, inclusive homologar | Respondida | 21/10/2026 |
| Q-reabrir | Quando o RH reabre uma entrega cancelada ou recusada, para onde ela volta? | Para "Aguardando validação" ou "Aguardando avaliação", à escolha do RH, com justificativa (sugestão usada no protótipo, HIPÓTESE) | | |

## Abertas

| ID | Pergunta | Sugestão para discutir | Resposta | Data |
| --- | --- | --- | --- | --- |
| Q-cancelamento | Quem pode cancelar (só RH?) e qual a diferença para excluir? A exclusão deixa rastro? | Colaborador exclui antes da validação (some da lista, fica na auditoria); só o RH cancela depois | | |
| Q-ciclo-entrega | A entrega pertence ao ciclo em que foi enviada ou em que foi aprovada? Dá para cadastrar entregas do mês anterior entre os dias 1 e 5? | Ciclo do envio; cadastro do mês anterior não permitido após o dia 1 | | |
| Q-config-criterios | Na tela de critérios (RH / TI), quem altera o quê? Mudar pesos no meio do ciclo afeta entregas já avaliadas? | RH altera critérios e pesos; TI altera instruções e parâmetros técnicos; mudança vale só para o próximo ciclo | | |
| Q-ia-falha | Qual o prazo esperado de avaliação e o que acontece se a IA falhar? | Até 1 dia útil; em falha, a entrega fica "Aguardando avaliação" e a TI é avisada | | |
| Q-ia-dados | Que dados vão para a IA e qual fornecedor e modelo? | Só textos e metadados, sem anexos, até definição de segurança | | |
| Q-ia-aviso | Como informar o colaborador sobre a avaliação por IA? | Aviso no cadastro + página "Como funciona" | | |
| Q-equipe | Entregas feitas em equipe: como registrar e pontuar? | Um cadastra e marca coautores, que confirmam | | |
| Q-app | O módulo também vai para o app? A especificação cita só o Genial Web | Fase posterior: cadastrar e acompanhar entregas | | |
| Q-gestor-substituto | Quem valida quando o gestor indicado está de férias ou sai da empresa? | O RH pode reatribuir o validador; a entrega mantém o prazo do ciclo | | |
| Q-email-remetente | Remetente e serviço de envio dos e-mails do módulo | Definir com a TI (seção 11.2) | | |
| Q-empate-duplo | Empate em pontos e em entregas aprovadas ao mesmo tempo: quem fica à frente? | Mesma posição para os dois (ex.: dois 3º lugares); no Destaque do Mês, decide o RH na homologação | | |
| Q-desligados | Colaboradores desligados continuam no histórico público e na galeria de Destaques? | Sim, com o nome e sem o papel atual; saem da busca de colegas | | |
| Q-cliente | De onde vem o "cliente" para filtrar entregas, se o formulário não pede o cliente (confidencialidade)? | Do centro de custo ou da alocação do colaborador no Genial, no momento do envio (HIPÓTESE usada em Gestão de entregas) | | |
| Q-correcao-texto | O RH pode corrigir o texto de uma entrega? O colaborador é avisado? | Sim, com justificativa; o colaborador é avisado e a correção fica no histórico (HIPÓTESE) | | |
| Q-divulgacao | O resultado homologado aparece para todos na hora ou só na data de divulgação? | Só na data de divulgação (dia 10), para o RH e o marketing prepararem a comunicação (HIPÓTESE) | | |
