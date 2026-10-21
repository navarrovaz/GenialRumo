# E-mail de solicitação de validação — especificação

Modelo entregue junto com a tela Validação de entregas (validada em 21/10/2026). Protótipo: `prototipo/index.html` (gestor da Rumo), `prototipo/cliente.html` (pessoa do cliente) e `prototipo/texto.txt` (versão em texto puro das duas). Fonte: especificação do dono do produto, seção 6; decisão `docs/decisoes/003-email-valores-literais.md` (Proposta, validar com os devs).

## Quando é enviado

| Evento | Destinatário | Variante |
| --- | --- | --- |
| Colaborador envia a entrega para validação | validador escolhido | gestor (`index.html`) ou cliente (`cliente.html`) |
| Colaborador reenvia depois de ajustes | mesmo validador | mesma variante; assunto começa com "Reenviada:" (sugestão) |
| Colaborador edita uma entrega aguardando validação | ninguém | — (o link mostra sempre a versão atual) |

## Conteúdo

| Bloco | Gestor | Pessoa do cliente |
| --- | --- | --- |
| Assunto | <Colaborador> pediu sua validação: <título> | <Colaborador>, da Rumo Soluções, pediu que você confirme uma entrega |
| Pré-cabeçalho | <Colaborador> registrou uma entrega e indicou você para confirmar. Decida até DD/MM. | <Colaborador>, da Rumo Soluções, pediu que você confirme uma entrega feita no seu projeto. Responda até DD/MM. |
| Rótulo | SOLICITAÇÃO DE VALIDAÇÃO | CONFIRMAÇÃO DE ENTREGA |
| Título | <Colaborador> registrou uma entrega e indicou você para confirmar | <Colaborador> pediu que você confirme uma entrega |
| Abertura | Olá, <validador>. A entrega foi registrada no módulo de Reconhecimento do Genial. Você confirma a realização e os resultados apresentados? | Olá, <validador>. <Colaborador> é <papel> da Rumo Soluções e trabalhou no seu projeto... não precisa de login. |
| Resumo | título · "Resultado informado" (até 280 caracteres) · tempo · origem · data de envio | igual |
| Botões | Aprovar · Solicitar ajustes · Recusar | igual |
| Explicação | Os botões abrem a entrega completa no Genial, com as evidências, para você confirmar a decisão... | igual, sem "no Genial" |
| Prazo | Decida até DD/MM. As entregas aprovadas... entram no ranking de <mês>. Link "Validação de entregas". | Responda até DD/MM. Este link é pessoal: vale só para você, pode ser usado uma vez e expira em DD/MM. Não encaminhe este e-mail. |
| Rodapé | Você recebeu este e-mail porque <colaborador> indicou você como validador... Dúvidas sobre o programa: fale com o RH. | ...Se você não conhece este trabalho, ignore a mensagem: nada é registrado sem a sua resposta... |

Remetente sugerido: "Genial · Rumo Soluções" com endereço que não recebe respostas. **A DEFINIR** com a TI.

## Variáveis

`nomeValidador`, `nomeColaborador`, `primeiroNomeColaborador`, `papelColaborador` (cliente), `tituloEntrega`, `resultado` (cortado em 280 caracteres com "…"), `tempo` ("5 dias"), `origem` ("Iniciativa própria" · "Demanda recebida"), `enviadaEm`, `prazo`, `mesCiclo`, links.

## Links dos botões

| Variante | Aprovar | Solicitar ajustes | Recusar |
| --- | --- | --- | --- |
| Gestor | `/Reconhecimento/Validacao?entrega={id}&decisao=aprovar` | `...&decisao=ajustes` | `...&decisao=recusar` |
| Cliente | `/Reconhecimento/Confirmar/{token}?decisao=aprovar` | `...?decisao=ajustes` | `...?decisao=recusar` |

Rotas são sugestão. **Os links só abrem a página; nenhum clique no e-mail registra decisão.** Isso evita decisões feitas por leitores automáticos de link (antivírus de e-mail costumam abrir todos os links) e garante o comentário obrigatório de ajustes e recusa. Para o gestor, a página exige login no Genial; para o cliente, o token não é consumido ao abrir, só ao confirmar a resposta.

## Regras de negócio

| Regra | Status |
| --- | --- |
| E-mail automático ao validador com resumo e link | CONFIRMADA |
| Três decisões no e-mail: Aprovar · Solicitar ajustes · Recusar | CONFIRMADA |
| Link do cliente: uso único, até o fim do prazo, só para o e-mail informado | CONFIRMADA |
| Botões abrem a página com a decisão escolhida, sem decidir no clique | CONFIRMADA (aprovado com a tela de validação) |
| Valores dos tokens escritos por extenso no e-mail | **PROPOSTA** (decisão 003) |
| Lembrete antes do prazo | **A DEFINIR** (Q-prazo-validacao) |
| E-mail de reenvio com assunto diferente | **HIPÓTESE** |

## Requisitos técnicos

- HTML em tabelas, largura 600px, estilos inline, sem JavaScript, sem CSS externo, sem fontes obrigatórias (`'Plus Jakarta Sans','Segoe UI',Arial,sans-serif`).
- Logo hospedado em endereço público e absoluto (no protótipo o caminho é relativo); `alt` sempre preenchido.
- Envio `multipart/alternative` com a versão em texto (`texto.txt`).
- Testar em Outlook para Windows, Outlook web, Gmail (web e app) e Apple Mail.
