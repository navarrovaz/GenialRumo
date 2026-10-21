# Genial Web — como é hoje

Levantamento feito em 21/10/2026, navegando só com perfil **colaborador**, sem alterar dados. Base: `https://genial.rumosolucoes.com/Rumo/`.

## Menu (perfil colaborador)

| Seção | Item | Rota | Observação |
| --- | --- | --- | --- |
| — | Página inicial | `/Rumo/` | Redireciona para Lançamento de Ponto |
| Colaborador | Lançamento de Ponto | `/Configuracao/LancamentoPontoOnline` | Relógio e botões de registro |
| Colaborador | Horas Lançadas | `/Configuracao/LancamentoHoras` | Grade mensal (detalhada abaixo) |
| Colaborador | Cadastrar Afastamento | `/Configuracao/RegistroAfastamento` | Filtros + lista |
| Colaborador | Contra - Cheque | `/Configuracao/DemonstrativoPagamento` | Não aberto |
| Colaborador | Histórico Colaborador | `/Configuracao/HistoricoColaborador` | Aparece no menu, mas retorna "ACESSO NÃO AUTORIZADO" |
| Relatório | Lanç. de Usuário por Data | `/Relatorio/Relatorio?nomeRelatorio=...` | Visualizador de relatório legado |
| Central de Ajuda | Sobre | `/Acesso/Acesso/Sobre` | |
| Central de Ajuda | Tutoriais | `/Acesso/Acesso/Tutoriais` | Só um link para material externo |

Barra superior azul (#0072C6) com logo branco, ícone de notificações e nome do usuário. Rodapé com "Contate o Suporte" (WhatsApp) e versão.

## Horas Lançadas

- **Cabeçalho "Dados Lançamentos"** (campos somente leitura em caixas cinza): Mês Referência (seletor), Data de Início, Data de Término, Situação do Lanç. Mês ("Não Enviado"), Nome, Intervalo (01:00), Qtd Ent/Sai (seletor 1 a 4 pares).
- **Grade "Lançamentos"**: Data, Entrada 1, Saída 1, Entrada 2, Saída 2, Total, Saldo, Indicador(es) (quadrado verde/vermelho), ícone de edição, Atividade (texto livre).
  - Fins de semana em azul-claro (#87CEFA), feriado em salmão (#FFA07A), sem legenda.
  - Campos de dia útil em cinza, de fim de semana em branco.
- **Rodapé**: Total de Horas Esperadas, Total de Horas Lançadas, Horas de Atestado, Saldo Banco de Horas, Extra a Receber (com botão de edição).
- **Ações**: Exportar Planilha Lançamentos, Apenas Salvar, Enviar para o RH, Cancelar, Voltar.
- **Histórico(s)**: tabela Data / Usuário / Descrição, com texto corrido ("Dia 05/10/2026: E/S Excluido(s): 09:10/ E/S Incluída(s): 09:10/16:05"), paginada.

## Lançamento de Ponto

Card central: saudação ("Boa tarde, <nome>!"), Centro de Custo, Número PIS, data por extenso, relógio estilo flip escuro, "Horário Oficial de Brasília", botões Registrar Ponto (azul-claro), Registrar Atividade (laranja), Registrar Justificativa (amarelo).

## Cadastrar Afastamento

Botão "Registrar Afastamento" (canto superior). Filtros de Pesquisa: Nome da Pessoa, Tipo (Futuros), Situação (Todos), Tipo de Afastamento, Data de Início, Data de Término, botão Buscar. Lista: Id, Período, Nome, Tipo Afastamento, Situação. Estado vazio: "Nenhum registro encontrado."

## Relatório "Lançamentos de Usuário por Data"

Visualizador de relatório antigo (barra própria de paginação/exportação): Data Inicial, Data Final, Colaborador, Exibir Relatório. Tabela com Entrada, Total Dia, CH, Atestados, Saldo, Atividade do Dia, totalizador.

## Padrão visual atual

Bootstrap 3 + BeyondAdmin, Open Sans 13px (peso 400 em ~95% dos textos), raio 4px, cinzas variados (#DDD, #E5E5E5, #D5D5D5, #CCC), azuis soltos (#0072C6, #337AB7, #57B5E3, #87CEFA), Glyphicons + Font Awesome. O mapeamento do atual para o novo está no fim de `docs/design-system/README.md`.
