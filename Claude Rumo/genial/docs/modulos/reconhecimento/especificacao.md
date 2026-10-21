# Especificação — Módulo de Reconhecimento e Valorização Profissional

Documento do dono do produto (recebido em 21/10/2026). Detalha o `briefing.md`. **Não editar**; a interpretação de cada regra (com status) fica em `escopo.md`, `regras-pontuacao.md`, `ia.md`, `telas-previstas.md` e `questoes-abertas.md`.

Como ler: o que o texto afirma com "deverá" foi tratado como `CONFIRMADA`; o que vem como "sugerido", "poderá" ou "uma possibilidade" foi tratado como `PROPOSTA` do dono do produto. Os blocos ilustrativos (e-mail, avaliação, ranking) foram convertidos em texto; os dados deles são fictícios.

---

## 1. Visão geral do projeto

A proposta consiste em desenvolver e acrescentar um módulo de reconhecimento e valorização profissional ao Genial Web, sistema já utilizado pela Rumo Soluções para controle de ponto e gestão da jornada dos colaboradores.

O Genial continuará operando normalmente com suas funcionalidades atuais. O novo módulo será uma funcionalidade complementar, acessível por meio de uma opção específica no menu de navegação, aproveitando a estrutura de usuários e autenticação já existente.

O objetivo do módulo é permitir que os colaboradores registrem voluntariamente suas principais entregas profissionais, que serão validadas por seus gestores e posteriormente avaliadas com apoio de Inteligência Artificial.

A partir dessas avaliações, o sistema irá gerar pontuações, rankings mensais e históricos individuais, possibilitando reconhecer os profissionais que mais se destacaram por suas contribuições.

O propósito central é dar visibilidade às entregas e reconhecer o impacto gerado pelos colaboradores, inclusive aqueles alocados diretamente nos clientes da Rumo.

## 2. Objetivos específicos

- Criar um canal interno para que os colaboradores registrem suas entregas relevantes.
- Dar visibilidade às realizações dos profissionais alocados em diferentes projetos e clientes.
- Envolver os gestores na confirmação e validação das entregas.
- Utilizar Inteligência Artificial para avaliar o impacto e o esforço aplicado em cada entrega.
- Estabelecer critérios de pontuação padronizados e transparentes.
- Criar um ranking mensal para identificação dos colaboradores de destaque.
- Construir um histórico individual de realizações profissionais.
- Disponibilizar indicadores e ferramentas de acompanhamento para o RH e a administração.

## 3. Integração com o Genial Web

O novo módulo deverá fazer parte da estrutura existente do Genial Web, sem alterar sua finalidade principal ou interferir nas funcionalidades atuais.

### 3.1. Organização da navegação (estrutura conceitual)

```
Genial Web
├── Controle de Ponto                 (existente)
├── Calendário e Jornada              (existente)
└── Reconhecimento Profissional       (novo)
    ├── Visão Geral
    ├── Cadastrar Entrega
    ├── Minhas Entregas
    ├── Ranking Mensal
    ├── Histórico de Reconhecimentos
    └── Administração (acesso restrito)
```

### 3.2. Reaproveitamento da estrutura existente

Sempre que tecnicamente possível, o novo módulo deverá utilizar recursos já disponíveis no Genial, como:

- Cadastro de colaboradores e identificação do usuário autenticado.
- Login e controle de acesso.
- Dados organizacionais e vínculos entre colaboradores e gestores, caso estejam cadastrados.
- Infraestrutura tecnológica e banco de dados, observando a arquitetura existente.
- Padrões de interface e navegação do Genial Web.

O módulo terá suas próprias regras de negócio, tabelas, processos e permissões, mantendo a independência funcional em relação ao controle de ponto.

## 4. Funcionamento geral do módulo

O processo será organizado em seis etapas:

1. **Cadastro da entrega:** o colaborador registra voluntariamente uma realização profissional.
2. **Notificação do gestor:** o sistema envia automaticamente um e-mail ao validador responsável.
3. **Validação:** o gestor confirma, rejeita ou solicita ajustes na entrega.
4. **Avaliação por IA:** a IA analisa as entregas aprovadas e atribui uma pontuação de 1 a 5.
5. **Consolidação:** o sistema atualiza as pontuações individuais e o ranking mensal.
6. **Reconhecimento:** após homologação, o colaborador com melhor resultado recebe o destaque do mês.

## 5. Módulo do colaborador

### 5.1. Cadastro de entregas

Os colaboradores poderão registrar suas principais entregas durante o mês, de forma voluntária.

O formulário deverá ser simples, evitando processos burocráticos ou preenchimentos excessivos.

| Campo | Informação solicitada |
| --- | --- |
| Título da entrega | Nome resumido da realização |
| O que você entregou? | Descrição da atividade ou solução desenvolvida |
| Em quanto tempo? | Tempo necessário para realização |
| Qual foi o resultado? | Benefícios, melhorias e impactos gerados |
| Quem pode confirmar? | Gestor ou responsável pela validação |
| Evidências | Arquivos, documentos, prints ou links que comprovem a entrega |

Também poderá existir um campo complementar para informar se a entrega foi uma iniciativa própria ou uma demanda recebida.

**Orientação obrigatória:** o sistema deverá informar que não é permitido registrar informações confidenciais, dados sensíveis ou conteúdos sigilosos de clientes.

### 5.2. Exemplo prático (fictício)

Ana é uma desenvolvedora da Rumo alocada em um cliente de São Paulo. Durante o mês, ela realiza uma automação que reduz significativamente o tempo necessário para gerar um relatório de vendas. Ao acessar o módulo de Reconhecimento Profissional no Genial, Ana registra:

- **Entrega:** Automatização de relatório de vendas
- **O que você entregou?** Automatizei o processo de geração do relatório de vendas do cliente.
- **Em quanto tempo?** 7 dias.
- **Qual foi o resultado?** Um relatório que anteriormente levava 2 dias para ser produzido passou a ser gerado em aproximadamente 10 minutos.
- **Quem pode confirmar?** Carlos — gestor responsável pelo acompanhamento da atividade.
- **Evidência:** E-mail de agradecimento enviado pelo gestor, sem informações confidenciais.

Após salvar, o registro ficará com status **Aguardando validação**. O sistema enviará automaticamente uma notificação ao gestor indicado.

### 5.3. Gerenciamento das próprias entregas

O colaborador deverá conseguir:

- Cadastrar novas entregas durante o ciclo.
- Visualizar todas as entregas registradas.
- Editar ou excluir lançamentos que ainda não tenham sido validados.
- Consultar o status de cada entrega.
- Visualizar comentários e solicitações de ajustes dos gestores.
- Consultar notas e justificativas atribuídas pela IA.
- Acompanhar seus pontos mensais e acumulados.
- Consultar seu histórico de realizações e reconhecimentos.

## 6. Processo de validação pelo gestor

Ao receber um novo registro, o gestor será notificado automaticamente por e-mail. O e-mail deverá conter uma descrição resumida da entrega e um link para realizar a validação.

Exemplo de e-mail (fictício):

> **Solicitação de validação**
>
> Ana registrou uma nova entrega profissional no Genial.
>
> **Automatização de relatório de vendas**
> A colaboradora informou que reduziu de 2 dias para 10 minutos o tempo necessário para geração de um relatório.
>
> Você confirma a realização e os resultados apresentados?
>
> [Aprovar] [Solicitar ajustes] [Rejeitar]

### Possibilidades de decisão

- **Aprovar:** confirma a entrega e libera o registro para avaliação pela IA.
- **Solicitar ajustes:** devolve o registro ao colaborador com orientações para correção ou complementação.
- **Rejeitar:** encerra a solicitação sem conceder pontos, mediante justificativa.

O sistema deverá registrar o responsável pela decisão, a data e os comentários apresentados.

A validação poderá ser realizada por um gestor interno da Rumo ou por um representante autorizado do cliente. Para gestores externos, poderá ser utilizado um link seguro, sem exigir acesso às demais funcionalidades do Genial.

## 7. Motor de avaliação por Inteligência Artificial

Após a aprovação do gestor, um serviço de IA realizará a análise da entrega. A IA terá a responsabilidade de atribuir uma nota de 1 a 5 pontos por entrega, seguindo critérios previamente definidos.

### 7.1. Critérios sugeridos

| Critério | Peso sugerido |
| --- | --- |
| Impacto gerado pela entrega | 40% |
| Complexidade e esforço aplicado | 25% |
| Iniciativa e proatividade | 20% |
| Evidências e reconhecimento do resultado | 15% |

Os critérios e pesos poderão ser ajustados pelo RH conforme as necessidades do programa.

### 7.2. Análise da entrega

A IA deverá considerar:

- **Impacto:** quais resultados foram obtidos? Houve economia de tempo, redução de custos, melhoria de qualidade ou resolução de problemas relevantes?
- **Esforço e complexidade:** qual foi a dificuldade da entrega e o esforço necessário para concluí-la?
- **Iniciativa:** a entrega foi resultado de uma solicitação ou surgiu de uma iniciativa do colaborador?
- **Evidências:** existem informações verificáveis ou reconhecimento formal dos resultados?

### 7.3. Resultado da avaliação

A IA deverá retornar uma pontuação e uma justificativa resumida.

Exemplo ilustrativo (Ana): entrega **Aprovada**, pontuação **4,6** ("Pontuação de 0 a 5"). Justificativa da IA: "A entrega gerou alto impacto operacional ao reduzir significativamente o tempo necessário para produzir um relatório. Apresenta resultado mensurável e foi confirmada pelo gestor responsável."

Para garantir consistência, as avaliações deverão usar instruções e parâmetros padronizados. O RH poderá revisar pontuações antes da homologação mensal, sempre com registro das alterações.

## 8. Sistema de pontuação e ranking

Cada entrega aprovada acumulará uma quantidade de pontos para o colaborador. O sistema deverá apresentar dois tipos principais de saldo:

- **Saldo mensal:** soma das pontuações consideradas no ciclo vigente.
- **Saldo histórico:** total de pontos recebidos nos ciclos anteriores, permitindo acompanhar a trajetória profissional de cada colaborador.

Também haverá indicadores específicos para entregas ainda pendentes de validação ou avaliação.

### 8.1. Ranking mensal

O sistema consolidará as pontuações dos colaboradores em um ranking.

Exemplo fictício: 1º Ana, 23 pts · 2º Bruno, 20 pts · 3º Marina, 18 pts · 4º Lucas, 14 pts.

**Ponto de atenção:** será necessário definir regras que evitem premiar apenas o volume de tarefas cadastradas. A quantidade de registros não deve se sobrepor à relevância das entregas. Uma possibilidade é considerar somente as melhores entregas de cada colaborador no ciclo, garantindo maior equilíbrio entre profissionais de diferentes funções.

### 8.2. Consulta ao histórico dos colegas

Os colaboradores poderão consultar o ranking, as entregas de destaque e o histórico público dos colegas. Essa visualização deverá apresentar informações resumidas, sem expor evidências confidenciais, comentários privados de gestores ou dados de clientes não autorizados.

## 9. Ciclo mensal de funcionamento

O programa será estruturado em ciclos mensais, com etapas de cadastro, validação, avaliação e reconhecimento.

| Período | Etapa | Responsável |
| --- | --- | --- |
| Semanas 1 a 4 | Cadastro voluntário das entregas | Colaboradores |
| Até o dia 5 do mês seguinte | Finalização das validações | Gestores |
| Dia 6 | Avaliação e consolidação das pontuações | Motor de IA |
| Dias 7 a 9 | Conferência e homologação dos resultados | RH |
| Dia 10 | Divulgação do destaque do mês | RH/Marketing |

As datas são sugestões e deverão ser configuráveis no sistema.

As entregas validadas durante o mês poderão receber pontuação automaticamente. No dia 6, o motor de consolidação realizará a apuração final, considerando todas as entregas elegíveis do ciclo.

Ao encerrar o processo, o sistema deverá registrar o resultado definitivo e iniciar um novo ciclo, preservando os dados anteriores.

## 10. Reconhecimento dos colaboradores

Ao final de cada ciclo, o profissional com maior pontuação elegível será identificado como Destaque do Mês.

O reconhecimento poderá ser divulgado nos canais internos de comunicação da Rumo, com informações sobre o colaborador e um resumo de suas principais realizações.

Além do reconhecimento mensal, o sistema permitirá consultar a evolução individual ao longo de 6 ou 12 meses.

Esse histórico poderá contribuir para iniciativas futuras de valorização profissional, desde que não seja confundido com uma avaliação formal de desempenho.

## 11. Painel administrativo — RH e TI

O novo módulo deverá contar com uma área administrativa, disponível exclusivamente para usuários autorizados.

### 11.1. Administração pelo RH

- Visualizar todas as entregas registradas.
- Pesquisar registros por colaborador, equipe, gestor, cliente ou período.
- Acompanhar entregas pendentes de validação.
- Corrigir, cancelar ou reabrir lançamentos quando necessário.
- Consultar as pontuações atribuídas pela IA.
- Revisar avaliações e registrar justificativas.
- Configurar os critérios e pesos de pontuação.
- Gerenciar os ciclos mensais.
- Homologar os resultados do ranking.
- Consultar o histórico individual dos colaboradores.
- Gerar relatórios de acompanhamento e reconhecimento.

### 11.2. Administração técnica pela TI

- Gerenciamento de permissões e perfis de acesso.
- Configuração dos serviços de notificação por e-mail.
- Configuração e monitoramento da integração com IA.
- Manutenção dos dados e parâmetros técnicos.
- Monitoramento de falhas nos processos automáticos.
- Consulta aos logs e registros de auditoria.

Recomenda-se separar as permissões do RH das permissões técnicas, de modo que administradores de infraestrutura não tenham acesso irrestrito a avaliações confidenciais sem necessidade operacional.

## 12. Status das entregas

| Status | Significado |
| --- | --- |
| Rascunho | Entrega iniciada, mas ainda não enviada |
| Aguardando validação | Registro enviado ao gestor |
| Ajustes solicitados | Gestor solicitou correções |
| Rejeitada | Entrega não confirmada |
| Aguardando avaliação | Entrega aprovada e pendente de pontuação |
| Avaliada | Entrega pontuada pela IA |
| Homologada | Pontuação incluída no resultado oficial do ciclo |
| Cancelada | Registro cancelado com histórico preservado |

O colaborador poderá editar ou excluir seus lançamentos enquanto estiverem em rascunho ou aguardando validação. Caso o registro esteja em revisão, também poderá realizar os ajustes solicitados.

## 13. Telas necessárias para desenvolvimento

| Tela | Perfil |
| --- | --- |
| Dashboard de Reconhecimento | Colaborador |
| Cadastro de Entrega | Colaborador |
| Minhas Entregas | Colaborador |
| Detalhamento e Edição de Entrega | Colaborador |
| Ranking Mensal | Colaborador |
| Histórico de Reconhecimentos | Colaborador |
| Validação de Entregas | Gestor |
| Dashboard Administrativo | RH |
| Gestão de Entregas | RH |
| Gestão de Ciclos e Pontuações | RH |
| Configuração dos Critérios da IA | RH / TI |
| Relatórios e Indicadores | RH |
| Configurações Técnicas | TI |

A navegação será integrada ao Genial Web, mantendo a identidade visual e os padrões de usabilidade existentes.

## 14. Regras de negócio essenciais

1. A participação dos colaboradores será voluntária.
2. O módulo será independente das funcionalidades de controle de ponto.
3. Cada entrega deverá possuir um responsável pela validação.
4. Somente entregas aprovadas poderão gerar pontos.
5. Entregas rejeitadas não serão consideradas no ranking.
6. O colaborador poderá editar ou excluir registros antes da validação.
7. O sistema deverá evitar registros duplicados de uma mesma entrega.
8. A IA deverá utilizar critérios padronizados e apresentar justificativas.
9. O RH terá permissão para revisar resultados mediante justificativa.
10. O ranking definitivo dependerá de homologação.
11. Os resultados dos ciclos anteriores deverão ser preservados.
12. O acesso às informações deverá respeitar os perfis de usuário.
13. Dados sigilosos de clientes não poderão ser publicados no histórico compartilhado.
14. Todas as alterações administrativas deverão ser registradas para auditoria.

## 15. Etapas sugeridas para implementação

| Fase | Foco | Conteúdo |
| --- | --- | --- |
| 1 | Estrutura e cadastro | Adicionar o módulo ao Genial Web, criar as telas do colaborador, os cadastros e o histórico de entregas. |
| 2 | Validação e notificações | Implementar os e-mails automáticos, fluxo de aprovação pelos gestores e gestão dos status. |
| 3 | Avaliação por Inteligência Artificial | Desenvolver a integração com IA, os critérios de pontuação, os resultados individuais e as justificativas. |
| 4 | Ranking e gestão administrativa | Implementar o ranking, ciclos mensais, homologação pelo RH e controles administrativos. |
| 5 | Relatórios e evolução | Disponibilizar dashboards históricos, indicadores gerenciais e melhorias a partir da utilização do módulo. |

## 16. Resultado esperado

Com a implementação do novo módulo, a Rumo Soluções passará a contar com um processo estruturado de reconhecimento das contribuições profissionais de sua equipe.

A solução permitirá aumentar a visibilidade das entregas, fortalecer a cultura de valorização dos colaboradores e construir um histórico de realizações baseado em informações registradas, verificadas e avaliadas.

O Genial Web continuará sendo o sistema de controle de ponto e gestão da jornada utilizado pela Rumo, passando a oferecer, adicionalmente, uma funcionalidade de reconhecimento profissional.

Assim, a empresa poderá aproveitar um ambiente já conhecido e utilizado pelos colaboradores, sem a necessidade de implantar uma plataforma independente para essa finalidade.
