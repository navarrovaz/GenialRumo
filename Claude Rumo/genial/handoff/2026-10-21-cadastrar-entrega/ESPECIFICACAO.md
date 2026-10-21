# Cadastrar entrega — especificação

Tela validada pelo dono do produto em 21/10/2026. Protótipo: `prototipo/index.html` (estados por `?estado=<nome>`). Fonte das regras: `docs/modulos/reconhecimento/` (especificação do dono do produto, escopo, regras e questões abertas).

## Objetivo e acesso

- **Objetivo:** o colaborador registra uma entrega profissional do mês para ser validada e avaliada. A mesma tela serve para **editar** uma entrega aguardando validação e para **ajustar** uma entrega com ajustes solicitados.
- **Perfil:** colaborador (qualquer pessoa com acesso ao módulo). Só o dono da entrega edita ou ajusta.
- **Menu:** seção RECONHECIMENTO → "Cadastrar entrega" (ícone `plus`). Em edição e ajuste, o item ativo do menu é "Minhas entregas".

## Componentes do design system

Avatar (cartela de avatares ilustrados, atualização de 21/10/2026) · Sidebar, Topbar, Card, Alert, Field (inclui textarea e contador), Button, Badge, AttachmentList, Steps, MeterList, EmptyState, ConfirmDialog. READMEs em `docs/design-system/components/<Nome>/README.md`.

Classes `tela-*` em `prototipo/tela.css` são só de layout desta tela.

## Campos

| Campo | Nome sugerido | Tipo | Obrigatório para enviar | Validação e limite | Mensagem de erro |
| --- | --- | --- | --- | --- | --- |
| Título da entrega | `titulo` | texto | Sim (também para salvar rascunho) | até 100 caracteres | Escreva um título para a entrega. |
| O que você entregou? | `descricao` | texto longo | Sim | até 1.000 caracteres | Conte o que você entregou. |
| Em quanto tempo? | `tempoQuantidade` + `tempoUnidade` | número inteiro + lista (horas, dias, semanas, meses) | Sim | 1 a 999; unidade padrão "dias" | Informe o tempo, por exemplo 7 dias. |
| Como a entrega começou? | `origem` | rádio: `iniciativa` · `demanda` | Sim | — | Escolha se foi uma iniciativa sua ou uma demanda. |
| Qual foi o resultado? | `resultado` | texto longo | Sim | até 1.000 caracteres | Conte qual foi o resultado. |
| Quem acompanhou a entrega? | `validador.tipo` | rádio: `gestor` · `externo` | Sim | padrão `gestor` | — |
| Gestor | `validador.usuarioId` | lista de gestores do Genial | Sim, se `gestor` | o gestor vinculado ao colaborador vem pré-selecionado | — |
| Nome (pessoa do cliente) | `validador.nome` | texto | Sim, se `externo` | — | Informe o nome de quem vai confirmar. |
| E-mail (pessoa do cliente) | `validador.email` | e-mail | Sim, se `externo` | formato de e-mail | Use um e-mail válido, como nome@cliente.com.br. |
| Evidências | `evidencias[]` | arquivos e links | Não | arquivo: PDF, PNG, JPG, DOC(X), XLS(X), PPT(X), até 10 MB cada; link: `http(s)://` | O arquivo X tem mais de 10 MB · Use um endereço completo, começando com https:// |

Erros de envio aparecem no campo (ícone `circle-alert`, `aria-invalid`) e num resumo no topo com links para cada campo.

## Estados

| Estado (`?estado=`) | Quando acontece |
| --- | --- |
| `padrao` | Abrir "Cadastrar entrega" |
| `preenchido` | Exemplo da especificação (Ana), pronto para enviar |
| `rascunho` | Abrir um rascunho salvo (título "Editar rascunho", badge "Rascunho", botão "Excluir rascunho") |
| `erro-validacao` | Enviar com campos obrigatórios vazios |
| `duplicada` | Ao sair do campo título, se existe entrega parecida do mesmo colaborador no ciclo (alerta, não bloqueia) |
| `externo` | Validador é uma pessoa do cliente |
| `enviando` | Envio em andamento (botão com spinner "Enviando…", botões desabilitados) |
| `enviada` | Envio concluído: confirmação com badge "Aguardando validação" e ações "Ver minhas entregas" e "Cadastrar outra entrega" |
| `erro-envio` | Falha no envio: os dados ficam como rascunho e a mensagem pede para tentar de novo |
| `sem-permissao` | Usuário sem acesso ao módulo |
| `editar` | Editar entrega aguardando validação: título "Editar entrega", badge "Aguardando validação", botão "Salvar alterações", sem "Salvar rascunho" |
| `ajustes` | Ajustar entrega: comentário do gestor no topo, badge "Ajustes solicitados", botão "Reenviar para validação" |

## Ações

| Ação | O que faz | Confirmação | Sucesso / erro |
| --- | --- | --- | --- |
| Enviar para validação (primário) | Valida tudo; cria a entrega com status `aguardando_validacao`; envia o e-mail ao validador | Não | Tela "Entrega enviada para <validador>" · erro: resumo dos campos ou "Não foi possível enviar a entrega" |
| Salvar rascunho | Exige só o título; grava com status `rascunho` | Não | "Rascunho salvo às HH:MM" |
| Excluir rascunho | Remove o rascunho | Sim (ConfirmDialog "Excluir este rascunho?") | "Rascunho excluído" |
| Anexar arquivo | Abre o seletor; envia o arquivo; lista na AttachmentList | Não | Erro de tamanho no topo |
| Adicionar link | Mostra o campo de link; valida `http(s)://` | Não | Erro no campo |
| Remover evidência | Tira o item da lista | Não | Foco volta para "Anexar arquivo" |
| Salvar alterações (`editar`) | Atualiza a entrega; status continua `aguardando_validacao`; o link do validador passa a mostrar a versão nova (sem novo e-mail) | Não | "Alterações salvas" |
| Reenviar para validação (`ajustes`) | Atualiza a entrega e volta o status para `aguardando_validacao`; avisa o validador | Não | "Entrega enviada para <validador>" |

## Dados necessários (sugestão de contrato)

**Leitura ao abrir:** ciclo vigente com datas, gestores disponíveis com o gestor vinculado, critérios e pesos vigentes; em `rascunho`, `editar` e `ajustes`, a entrega e o último comentário do validador.

```json
{
  "ciclo": { "id": "2026-10", "nome": "Outubro de 2026", "cadastroAte": "2026-10-31", "validacaoAte": "2026-11-05", "divulgacaoEm": "2026-11-10" },
  "gestores": [ { "usuarioId": 12, "nome": "Carlos Andrade", "vinculado": true } ],
  "criterios": [ { "nome": "Impacto gerado", "peso": 40 }, { "nome": "Complexidade e esforço", "peso": 25 }, { "nome": "Iniciativa e proatividade", "peso": 20 }, { "nome": "Evidências do resultado", "peso": 15 } ]
}
```

**Gravação (enviar, salvar rascunho, salvar alterações, reenviar):**

```json
{
  "id": null,
  "acao": "enviar | salvarRascunho | salvarAlteracoes | reenviar",
  "titulo": "Automatização do relatório de vendas",
  "descricao": "Automatizei o processo de geração do relatório...",
  "tempoQuantidade": 7,
  "tempoUnidade": "dias",
  "origem": "iniciativa",
  "resultado": "Um relatório que levava 2 dias...",
  "validador": { "tipo": "gestor", "usuarioId": 12 },
  "evidencias": [ { "tipo": "arquivo", "arquivoId": "f1a2", "nome": "email-agradecimento-gestor.pdf", "tamanhoBytes": 186368 }, { "tipo": "link", "url": "https://exemplo.com/painel" } ]
}
```

Para pessoa do cliente: `"validador": { "tipo": "externo", "nome": "Marcos Teixeira", "email": "marcos@cliente.com.br" }`.

**Duplicidade (ao sair do título):** `GET` com o título → `{ "parecida": { "id": 98, "titulo": "...", "enviadaEm": "2026-10-08" } }` ou `null`.

Status possíveis da entrega (todo o módulo): `rascunho`, `aguardando_validacao`, `ajustes_solicitados`, `recusada`, `aguardando_avaliacao`, `avaliada`, `homologada`, `cancelada`. Isto é sugestão; o modelo final é dos devs.

## Regras de negócio

| Regra | Status |
| --- | --- |
| Participação voluntária; cadastro de quantas entregas quiser, sem limite | CONFIRMADA |
| Campos da especificação (5.1) mais "Como a entrega começou?" obrigatório | CONFIRMADA |
| Aviso obrigatório: não registrar informações confidenciais, sensíveis ou sigilosas de clientes | CONFIRMADA |
| Rascunho exige só o título | CONFIRMADA |
| Ao enviar, status `aguardando_validacao` e e-mail automático ao validador | CONFIRMADA |
| Validador: gestor da Rumo (lista do Genial, vinculado pré-selecionado) ou pessoa do cliente (nome e e-mail) | CONFIRMADA |
| Pessoa do cliente recebe link seguro de uso único, válido até o fim do prazo de validação, só no e-mail informado | CONFIRMADA |
| Evidências opcionais; até 10 MB por arquivo | CONFIRMADA |
| Alerta de entrega parecida no ciclo, sem bloquear | CONFIRMADA |
| Editar e excluir até o validador decidir; o link do validador mostra sempre a versão atual | CONFIRMADA |
| Ajustes: o colaborador ajusta e reenvia; volta para `aguardando_validacao` | CONFIRMADA |
| A entrega pertence ao ciclo em que foi enviada | **HIPÓTESE** (Q-ciclo-entrega) |
| Quantidade máxima de evidências por entrega | **A DEFINIR** |
| O que é enviado à IA (textos, evidências) | **A DEFINIR** (Q-ia-dados) |
| Pesos exibidos vêm da configuração do RH; os da tela são os sugeridos | PROPOSTA |

## Textos da interface

| Onde | Texto |
| --- | --- |
| Título | Cadastrar entrega · Editar rascunho · Editar entrega · Ajustar entrega |
| Descrição | Conte uma realização sua deste mês. Seu gestor confirma e a entrega é avaliada pelos mesmos critérios para todos. |
| Leitura do ciclo | Ciclo · Cadastro até · Validação até |
| Card | Sobre a entrega · Campos com * são obrigatórios para enviar. |
| Aviso | Não registre informações confidenciais · Não inclua dados sensíveis nem conteúdo sigiloso de clientes, nem nos textos nem nas evidências. Descreva o cliente de forma geral, como "um varejista de São Paulo". |
| Seções | A ENTREGA · O RESULTADO · QUEM PODE CONFIRMAR · EVIDÊNCIAS |
| Ajudas | Um nome curto, como você contaria a um colega. · A atividade ou a solução que você desenvolveu. · Do início à conclusão da entrega. · Conta no critério Iniciativa e proatividade. · Prefira números: antes e depois, tempo economizado, custo evitado, problema resolvido. · Seu gestor cadastrado no Genial já vem selecionado. Quem você escolher recebe um e-mail para aprovar. · A pessoa recebe por e-mail um link seguro para validar, sem acesso ao Genial. · Opcional, mas conta no critério Evidências... até 10 MB cada. · Confira se o gestor consegue abrir o link. |
| Opções | Foi uma iniciativa minha · Foi uma demanda que recebi · Um gestor da Rumo · Uma pessoa do cliente |
| Botões | Anexar arquivo · Adicionar link · Adicionar · Excluir rascunho · Salvar rascunho · Enviar para validação · Salvar alterações · Reenviar para validação · Ver minhas entregas · Cadastrar outra entrega · Ver entrega |
| Duplicada | Você já cadastrou uma entrega parecida neste ciclo · "<título>", enviada em DD/MM. Se for a mesma entrega, edite a que já existe. |
| Sucesso | Entrega enviada para <validador> · Rascunho salvo às HH:MM · Rascunho excluído · Alterações salvas |
| Erros | Revise N campos antes de enviar · Escreva um título para salvar o rascunho · Não foi possível enviar a entrega. O Genial não respondeu. Seus dados ficaram salvos como rascunho. Tente enviar de novo em alguns minutos. |
| Sem permissão | Você não tem acesso ao Reconhecimento · O cadastro de entregas é para colaboradores da Rumo. Se você deveria ter acesso, fale com o RH. |
| Coluna de apoio | Como funciona (4 passos) · Critérios da avaliação · Para descrever bem (3 dicas) |
| Excluir rascunho | Excluir este rascunho? · O rascunho sai de Minhas entregas e não pode ser recuperado. · Manter rascunho · Excluir rascunho |

## Acessibilidade

- Ordem de foco: menu → barra superior → mensagens → título → descrição → tempo → origem → resultado → validador → evidências → rodapé (Excluir · Salvar rascunho · Enviar).
- Rótulos com `<label for>`; grupos de rádio em `fieldset`/`legend`; obrigatórios com `*` visível e `aria-hidden` no asterisco.
- Erros: `aria-invalid="true"` e `aria-describedby` apontando para a mensagem; resumo com `role="alert"` recebe foco e tem links para os campos.
- Contadores com `aria-hidden` (o limite real é o `maxlength`).
- Diálogo: `role="dialog"`, `aria-modal`, foco preso, Esc fecha, foco volta ao botão que abriu.
- Ícones decorativos com `aria-hidden="true"`; botão de remover evidência com `aria-label="Remover <nome>"`.
