/* Gestão de entregas (RH) — comportamento do protótipo (JS vanilla).
   ENTREGAS simula o que o backend devolve; render() monta filtros, lista e entrega aberta. Data simulada: 06/11/2026.
   Trechos que representam chamadas ao backend estão marcados com // SIMULAÇÃO. */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var estado = new URLSearchParams(location.search).get('estado') || 'padrao';
  var area = $('#area');
  var mensagens = $('#mensagens');

  var ICONES = {
    ok: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    alerta: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    erro: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    relogio: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    enviar: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    escudo: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    lapis: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    refazer: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    busca: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    arquivo: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    criterios: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
    cadeado: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
  };
  function icone(nome, classe) {
    return '<svg class="gn-icon' + (classe ? ' ' + classe : '') + '" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONES[nome] + '</svg>';
  }
  function esc(texto) {
    var div = document.createElement('div');
    div.textContent = texto == null ? '' : String(texto);
    return div.innerHTML;
  }
  function num(v) { return v.toFixed(1).replace('.', ','); }
  function badge(variante, nomeIcone, texto) { return '<span class="gn-badge gn-badge--' + variante + '">' + icone(nomeIcone) + esc(texto) + '</span>'; }

  var AVATARES = { 'Ana Ribeiro': 2, 'Bruno Costa': 1, 'Marina Lopes': 8, 'Lucas Almeida': 5, 'Pedro Nunes': 9, 'Fernanda Rocha': 3, 'Rafael Souza': 7, 'Camila Duarte': 6, 'Diego Martins': 10, 'Patrícia Gomes': 4, 'Juliana Prado': 12, 'Carlos Andrade': 11 };
  function avatar(nome, classes) {
    var n = AVATARES[nome];
    if (!n) return '<span class="gn-avatar ' + (classes || '') + '" aria-hidden="true">' + esc(nome.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2)) + '</span>';
    return '<span class="gn-avatar gn-avatar--img ' + (classes || '') + '"><img src="../../../docs/design-system/assets/avatares/avatar-' + (n < 10 ? '0' : '') + n + '.svg" alt=""></span>';
  }

  /* ---------- Status ---------- */
  var STATUS = {
    vencida: ['attention', 'alerta', 'Prazo vencido'],
    aguardando_validacao: ['info', 'enviar', 'Aguardando validação'],
    aguardando_avaliacao: ['info', 'relogio', 'Aguardando avaliação'],
    avaliada: ['positive', 'ok', 'Avaliada'],
    homologada: ['positive', 'escudo', 'Homologada'],
    recusada: ['negative', 'erro', 'Recusada'],
    cancelada: ['neutral', 'x', 'Cancelada']
  };
  var FILTROS = [
    ['todas', 'Todas', function () { return true; }],
    ['vencida', 'Prazo vencido', function (e) { return e.status === 'vencida'; }],
    ['aguardando_avaliacao', 'Aguardando avaliação', function (e) { return e.status === 'aguardando_avaliacao'; }],
    ['avaliada', 'Avaliadas', function (e) { return e.status === 'avaliada' || e.status === 'homologada'; }],
    ['revisada', 'Revisadas pelo RH', function (e) { return !!e.revisao; }],
    ['encerradas', 'Recusadas e canceladas', function (e) { return e.status === 'recusada' || e.status === 'cancelada'; }]
  ];
  var CRITERIOS = ['Impacto gerado', 'Complexidade e esforço', 'Iniciativa e proatividade', 'Evidências do resultado'];
  var PESOS = [0.4, 0.25, 0.2, 0.15];
  function media(notas) { return Math.round(notas.reduce(function (s, n, i) { return s + n * PESOS[i]; }, 0) * 10 + 1e-9) / 10; }

  /* ---------- Dados fictícios (cliente = centro de custo da alocação do colaborador) ---------- */
  function E(o) { o.historico = o.historico || []; return o; }
  var ENTREGAS = [
    E({ id: 1, ciclo: '2026-10', pessoa: 'Ana Ribeiro', papel: 'Desenvolvedora', cliente: 'Varejo Sul', validador: 'Marcos Teixeira (cliente)', status: 'vencida',
      titulo: 'Treinamento de Git para a equipe do cliente', enviada: '20/10',
      descricao: 'Preparei e conduzi um treinamento de Git em 3 encontros para a equipe de desenvolvimento do cliente.', tempo: '2 semanas', origem: 'Iniciativa própria',
      resultado: 'Oito pessoas treinadas. Os conflitos de merge que travavam as entregas caíram de cerca de 6 para 1 por sprint.', evidencias: [['link', 'https://exemplo.com/material-treinamento-git']],
      historico: [['05/11', 'Genial', 'enviou o último lembrete ao validador'], ['02/11', 'Genial', 'enviou lembrete ao validador'], ['20/10', 'Ana Ribeiro', 'enviou para validação']] }),
    E({ id: 2, ciclo: '2026-10', pessoa: 'Lucas Almeida', papel: 'Analista de infraestrutura', cliente: 'Rumo interno', validador: 'Helena Martins', status: 'vencida',
      titulo: 'Painel de custos de nuvem', enviada: '21/10',
      descricao: 'Criei um painel com o custo diário de nuvem por projeto, com alerta quando o gasto passa da média.', tempo: '1 semana', origem: 'Iniciativa própria',
      resultado: 'Em 10 dias, o painel mostrou 3 servidores esquecidos ligados. Desligá-los reduziu o custo mensal em cerca de 18%.', evidencias: [],
      historico: [['05/11', 'Genial', 'enviou o último lembrete ao validador'], ['21/10', 'Lucas Almeida', 'enviou para validação']] }),
    E({ id: 3, ciclo: '2026-10', pessoa: 'Ana Ribeiro', papel: 'Desenvolvedora', cliente: 'Varejo Sul', validador: 'Carlos Andrade', status: 'aguardando_avaliacao',
      titulo: 'Monitoramento de filas com alertas', enviada: '16/10', decisao: ['Aprovada', '18/10', ''],
      descricao: 'Configurei alertas para as filas de processamento de pedidos.', tempo: '4 dias', origem: 'Iniciativa própria',
      resultado: 'Nas duas semanas seguintes, nenhum pedido ficou parado mais de 15 minutos.', evidencias: [['arquivo', 'painel-alertas.png']],
      historico: [['06/11', 'Apuração automática', 'não conseguiu avaliar; nova tentativa às 18:00'], ['18/10', 'Carlos Andrade', 'aprovou a entrega']] }),
    E({ id: 4, ciclo: '2026-10', pessoa: 'Ana Ribeiro', papel: 'Desenvolvedora', cliente: 'Varejo Sul', validador: 'Carlos Andrade', status: 'avaliada',
      titulo: 'Automatização do relatório de vendas', enviada: '08/10', decisao: ['Aprovada', '09/10', 'Resultado confirmado. O time comercial já usa o relatório novo.'],
      descricao: 'Automatizei o processo de geração do relatório de vendas do cliente.', tempo: '7 dias', origem: 'Iniciativa própria',
      resultado: 'Um relatório que levava 2 dias para ser produzido passou a ser gerado em aproximadamente 10 minutos.', evidencias: [['arquivo', 'email-agradecimento-gestor.pdf']],
      notas: [4.8, 4.2, 5.0, 4.0], justificativa: 'Alto impacto operacional, resultado mensurável, iniciativa própria e confirmação do gestor.',
      historico: [['10/10', 'Avaliação automática', 'atribuiu a pontuação 4,6'], ['09/10', 'Carlos Andrade', 'aprovou a entrega']] }),
    E({ id: 5, ciclo: '2026-10', pessoa: 'Ana Ribeiro', papel: 'Desenvolvedora', cliente: 'Varejo Sul', validador: 'Carlos Andrade', status: 'avaliada',
      titulo: 'Documentação do processo de deploy', enviada: '14/10', decisao: ['Aprovada', '16/10', ''],
      descricao: 'Documentei o processo de deploy do cliente, com o passo a passo e os testes de cada etapa.', tempo: '3 dias', origem: 'Demanda recebida',
      resultado: 'Duas pessoas novas fizeram o primeiro deploy sozinhas, na primeira semana.', evidencias: [],
      notas: [3.5, 3.0, 3.0, 2.8], notasIa: [2.5, 3.0, 3.0, 2.8], justificativa: 'Entrega útil, de esforço moderado, a partir de uma demanda.',
      revisao: ['Juliana Prado', '06/11', 'O gestor informou que o guia já é usado por 3 equipes; o impacto é maior que o avaliado.'],
      historico: [['06/11', 'Juliana Prado', 'revisou a pontuação de 2,8 para 3,2'], ['17/10', 'Avaliação automática', 'atribuiu a pontuação 2,8']] }),
    E({ id: 6, ciclo: '2026-10', pessoa: 'Bruno Costa', papel: 'Desenvolvedor', cliente: 'Varejo Sul', validador: 'Carlos Andrade', status: 'avaliada',
      titulo: 'Redução do tempo de build do aplicativo', enviada: '19/10', decisao: ['Aprovada', '22/10', ''],
      descricao: 'Reorganizei o pipeline de build do aplicativo, com cache de dependências e etapas em paralelo.', tempo: '5 dias', origem: 'Iniciativa própria',
      resultado: 'O build caiu de 42 para 11 minutos, liberando cerca de 15 horas de espera por dia.', evidencias: [['arquivo', 'comparativo-tempos-build.pdf']],
      notas: [4.9, 4.6, 4.8, 4.3], justificativa: 'Ganho grande e mensurável para toda a equipe, de iniciativa própria.',
      historico: [['23/10', 'Avaliação automática', 'atribuiu a pontuação 4,7'], ['22/10', 'Carlos Andrade', 'aprovou a entrega']] }),
    E({ id: 7, ciclo: '2026-10', pessoa: 'Marina Lopes', papel: 'Analista de qualidade', cliente: 'Banco Horizonte', validador: 'Carlos Andrade', status: 'avaliada',
      titulo: 'Atendimento à auditoria de segurança do cliente', enviada: '20/10', decisao: ['Aprovada', '23/10', ''],
      descricao: 'Organizei as evidências da auditoria de segurança e corrigi os 4 pontos da pré-auditoria.', tempo: '3 semanas', origem: 'Demanda recebida',
      resultado: 'A auditoria terminou sem nenhuma não conformidade. No ano anterior foram 7.', evidencias: [['link', 'https://exemplo.com/resumo-auditoria']],
      notas: [4.8, 4.5, 4.0, 4.9], justificativa: 'Resultado expressivo e bem comprovado; partiu de uma demanda.',
      historico: [['24/10', 'Avaliação automática', 'atribuiu a pontuação 4,6'], ['23/10', 'Carlos Andrade', 'aprovou a entrega']] }),
    E({ id: 8, ciclo: '2026-10', pessoa: 'Diego Martins', papel: 'Desenvolvedor', cliente: 'Logística Norte', validador: 'Helena Martins', status: 'avaliada',
      titulo: 'Correção na emissão de notas', enviada: '13/10', decisao: ['Aprovada', '15/10', ''],
      descricao: 'Corrigi a falha que gerava notas fiscais com o endereço de entrega errado.', tempo: '2 dias', origem: 'Demanda recebida',
      resultado: 'Nenhuma nota com endereço errado desde a correção; antes eram cerca de 40 por mês.', evidencias: [],
      notas: [4.3, 4.0, 3.8, 4.2], notasIa: [3.6, 4.0, 3.8, 4.2], justificativa: 'Correção importante com resultado claro.',
      revisao: ['Juliana Prado', '05/11', 'A falha gerava multas para o cliente; o impacto financeiro não estava no texto.'],
      historico: [['05/11', 'Juliana Prado', 'revisou a pontuação de 3,8 para 4,1'], ['16/10', 'Avaliação automática', 'atribuiu a pontuação 3,8']] }),
    E({ id: 9, ciclo: '2026-10', pessoa: 'Pedro Nunes', papel: 'Desenvolvedor', cliente: 'Logística Norte', validador: 'Helena Martins', status: 'avaliada',
      titulo: 'Recuperação do ambiente após falha no cliente', enviada: '09/10', decisao: ['Aprovada', '10/10', ''],
      descricao: 'Coordenei a recuperação do ambiente de produção depois de uma falha de disco no cliente.', tempo: '2 dias', origem: 'Iniciativa própria',
      resultado: 'O sistema voltou em 3 horas, sem perda de dados.', evidencias: [],
      notas: [5.0, 4.9, 5.0, 4.6], justificativa: 'Impacto crítico, alta complexidade e iniciativa própria.',
      historico: [['11/10', 'Avaliação automática', 'atribuiu a pontuação 4,9'], ['10/10', 'Helena Martins', 'aprovou a entrega']] }),
    E({ id: 10, ciclo: '2026-10', pessoa: 'Ana Ribeiro', papel: 'Desenvolvedora', cliente: 'Varejo Sul', validador: 'Carlos Andrade', status: 'recusada',
      titulo: 'Ajuste no layout do portal de pedidos', enviada: '12/10', decisao: ['Recusada', '13/10', 'Foi um ajuste de rotina previsto no contrato.'],
      descricao: 'Ajustei o layout da tela de pedidos do portal do cliente.', tempo: '1 dia', origem: 'Demanda recebida', resultado: 'A tela ficou no padrão novo.', evidencias: [],
      historico: [['13/10', 'Carlos Andrade', 'recusou a entrega']] }),
    E({ id: 11, ciclo: '2026-10', pessoa: 'Rafael Souza', papel: 'Desenvolvedor', cliente: 'Rumo interno', validador: 'Helena Martins', status: 'cancelada',
      titulo: 'Página de status do sistema (registro repetido)', enviada: '15/10',
      descricao: 'Criei a página de status do sistema.', tempo: '3 dias', origem: 'Iniciativa própria', resultado: 'Os usuários veem quando há instabilidade.', evidencias: [],
      cancelamento: ['Juliana Prado', '28/10', 'Registro duplicado de "Página de status do sistema", que segue em avaliação.'],
      historico: [['28/10', 'Juliana Prado', 'cancelou a entrega']] }),
    E({ id: 12, ciclo: '2026-09', pessoa: 'Marina Lopes', papel: 'Analista de qualidade', cliente: 'Banco Horizonte', validador: 'Carlos Andrade', status: 'homologada',
      titulo: 'Testes de carga do portal', enviada: '10/09', decisao: ['Aprovada', '11/09', ''],
      descricao: 'Planejei e executei os testes de carga do portal antes da Black Friday.', tempo: '2 semanas', origem: 'Iniciativa própria',
      resultado: 'O portal aguentou 3 vezes o pico de acessos esperado, sem quedas.', evidencias: [['arquivo', 'relatorio-testes-carga.pdf']],
      notas: [5.0, 4.8, 5.0, 4.0], justificativa: 'Alto impacto e boa evidência.',
      historico: [['09/10', 'Juliana Prado', 'homologou o ciclo de setembro'], ['12/09', 'Avaliação automática', 'atribuiu a pontuação 4,8']] })
  ];

  var EU = (window.GenialSessao && GenialSessao.atual() ? GenialSessao.atual().nome : 'Juliana Prado');
  var filtro = 'todas';
  var ciclo = '2026-10';
  var busca = '';
  var validador = '';
  var cliente = '';
  var aberta = 1;
  var painel = null; // 'revisar' | 'corrigir' | 'reabrir' | null

  /* ---------- Filtros e lista ---------- */
  function filtradas() {
    var f = FILTROS.filter(function (x) { return x[0] === filtro; })[0][2];
    var b = busca.toLowerCase();
    return ENTREGAS.filter(function (e) {
      return e.ciclo === ciclo && f(e) && (!validador || e.validador === validador) && (!cliente || e.cliente === cliente) &&
        (!b || e.pessoa.toLowerCase().indexOf(b) >= 0 || e.titulo.toLowerCase().indexOf(b) >= 0);
    });
  }
  function opcoes(campo, rotulo, atual) {
    var valores = [];
    ENTREGAS.forEach(function (e) { if (valores.indexOf(e[campo]) < 0) valores.push(e[campo]); });
    return '<option value="">' + rotulo + '</option>' + valores.sort().map(function (v) { return '<option' + (v === atual ? ' selected' : '') + '>' + esc(v) + '</option>'; }).join('');
  }
  function blocoFiltros() {
    var contagem = function (id) {
      var f = FILTROS.filter(function (x) { return x[0] === id; })[0][2];
      return ENTREGAS.filter(function (e) { return e.ciclo === ciclo && f(e); }).length;
    };
    return '<div class="tela-filtros">' +
      '<div class="gn-field tela-busca"><label class="gn-sr" for="f-busca">Buscar</label><div class="gn-input-wrap">' + icone('busca') +
        '<input class="gn-input" id="f-busca" type="search" placeholder="Colaborador ou título" value="' + esc(busca) + '" autocomplete="off"></div></div>' +
      '<div class="gn-field"><label class="gn-sr" for="f-ciclo">Ciclo</label><select class="gn-select" id="f-ciclo"><option value="2026-10"' + (ciclo === '2026-10' ? ' selected' : '') + '>Outubro de 2026</option><option value="2026-09"' + (ciclo === '2026-09' ? ' selected' : '') + '>Setembro de 2026 (homologado)</option></select></div>' +
      '<div class="gn-field"><label class="gn-sr" for="f-validador">Validador</label><select class="gn-select" id="f-validador">' + opcoes('validador', 'Todos os validadores', validador) + '</select></div>' +
      '<div class="gn-field"><label class="gn-sr" for="f-cliente">Cliente</label><select class="gn-select" id="f-cliente">' + opcoes('cliente', 'Todos os clientes', cliente) + '</select></div>' +
      '</div>' +
      '<div class="gn-row tela-chips" role="group" aria-label="Filtrar por situação">' + FILTROS.map(function (x) {
        return '<button class="gn-chip" type="button" data-filtro="' + x[0] + '" aria-pressed="' + (filtro === x[0]) + '">' + x[1] + ' <span class="gn-num">' + contagem(x[0]) + '</span></button>';
      }).join('') + '</div>';
  }
  function blocoLista(lista) {
    if (!lista.length) {
      return '<section class="gn-card tela-lista"><div class="gn-empty"><span class="gn-empty__icon">' + icone('busca') + '</span><p class="gn-empty__title">Nenhuma entrega com esses filtros</p>' +
        '<div class="gn-empty__actions"><button class="gn-btn gn-btn--secondary gn-btn--sm" type="button" data-limpar>Limpar filtros</button></div></div></section>';
    }
    return '<section class="gn-card tela-lista" aria-label="Entregas"><ul class="tela-itens">' + lista.map(function (e) {
      var s = STATUS[e.status];
      var nota = e.notas ? '<span class="tela-item__nota gn-num">' + num(media(e.notas)) + '</span>' : '';
      return '<li><button class="tela-item" type="button" data-id="' + e.id + '"' + (e.id === aberta ? ' aria-current="true"' : '') + '>' + avatar(e.pessoa, 'gn-avatar--sm') +
        '<span class="tela-item__texto"><span class="tela-item__pessoa">' + esc(e.pessoa) + ' · ' + esc(e.cliente) + '</span><span class="tela-item__titulo">' + esc(e.titulo) + '</span>' +
        '<span class="tela-item__status">' + badge(s[0], s[1], s[2]) + (e.revisao ? ' <span class="gn-badge gn-badge--attention">' + icone('lapis') + 'Revisada pelo RH</span>' : '') + '</span></span>' + nota + '</button></li>';
    }).join('') + '</ul></section>';
  }

  /* ---------- Entrega aberta ---------- */
  function blocoAvaliacao(e) {
    if (!e.notas) return '';
    var criterios = CRITERIOS.map(function (c, i) {
      return '<li><div class="gn-meter__row"><span>' + c + ' <span class="gn-muted">· peso ' + Math.round(PESOS[i] * 100) + '%</span></span><span class="gn-meter__value">' + num(e.notas[i]) +
        (e.notasIa && e.notasIa[i] !== e.notas[i] ? ' <span class="gn-diff gn-diff--remove">' + num(e.notasIa[i]) + '</span>' : '') + '</span></div>' +
        '<div class="gn-progress" aria-hidden="true"><span style="width:' + Math.round(e.notas[i] / 5 * 100) + '%"></span></div></li>';
    }).join('');
    return '<div class="tela-bloco"><h3 class="tela-subtitulo">Avaliação' + (e.revisao ? ' revisada pelo RH' : ' da IA') + ': <span class="gn-num">' + num(media(e.notas)) + '</span>' +
      (e.notasIa ? ' <span class="gn-muted">(IA: ' + num(media(e.notasIa)) + ')</span>' : '') + '</h3>' +
      '<ul class="gn-meters">' + criterios + '</ul><p class="tela-sem-margem"><b class="tela-forte">Justificativa da IA:</b> ' + esc(e.justificativa) + '</p>' +
      (e.revisao ? '<p class="tela-sem-margem tela-revisao"><b class="tela-forte">Revisão de ' + esc(e.revisao[0]) + ' (RH), em ' + esc(e.revisao[1]) + ':</b> ' + esc(e.revisao[2]) + '</p>' : '') + '</div>';
  }
  function campoJustificativa(id, rotulo, ajuda) {
    return '<div class="gn-field" data-campo="' + id + '"><label class="gn-label" for="' + id + '">' + rotulo + '<span class="gn-req" aria-hidden="true">*</span></label>' +
      '<textarea class="gn-input gn-textarea" id="' + id + '" rows="3" maxlength="1000"></textarea><span class="gn-help">' + ajuda + '</span></div>';
  }
  function blocoAcoes(e) {
    if (e.status === 'homologada') {
      return '<div class="gn-alert gn-alert--info" role="note">' + icone('cadeado') + '<div class="gn-alert__body"><span class="gn-alert__title">Entrega de ciclo homologado</span>' +
        '<span class="gn-alert__text">Para alterar, reabra o ciclo em <a class="tela-link" href="../admin-ciclos/index.html?estado=setembro">Ciclos e pontuações</a>.</span></div></div>';
    }
    if (painel === 'revisar') {
      var campos = CRITERIOS.map(function (c, i) {
        return '<div class="tela-rev__linha"><label class="tela-rev__rotulo" for="rev-' + i + '">' + c + ' <span class="gn-muted">· peso ' + Math.round(PESOS[i] * 100) + '%</span></label>' +
          '<span class="tela-rev__ia gn-num">IA: ' + num((e.notasIa || e.notas)[i]) + '</span>' +
          '<input class="gn-input gn-num tela-rev__nota" id="rev-' + i + '" type="number" min="1" max="5" step="0.1" value="' + e.notas[i].toFixed(1) + '" data-rev></div>';
      }).join('');
      return '<form class="tela-acoes-form" id="form-revisar" novalidate aria-labelledby="t-revisar"><h3 class="tela-subtitulo" id="t-revisar">Revisar pontuação</h3>' +
        '<p class="gn-help tela-sem-margem">Ajuste um ou mais critérios de 1 a 5. A nota final é recalculada pelos pesos.</p>' +
        '<div class="tela-rev">' + campos + '</div>' +
        '<p class="tela-rev__final" aria-live="polite">Nova pontuação final: <b class="gn-num" id="rev-final">' + num(media(e.notas)) + '</b> <span class="gn-muted">(atual ' + num(media(e.notas)) + ')</span></p>' +
        campoJustificativa('rev-just', 'Justificativa', 'Aparece para ' + esc(e.pessoa.split(' ')[0]) + ' no detalhe da entrega e fica no histórico.') +
        '<div class="tela-acoes-botoes"><button class="gn-btn gn-btn--secondary" type="button" data-painel="">Cancelar revisão</button><button class="gn-btn gn-btn--primary" type="submit">' + icone('ok') + 'Salvar revisão</button></div></form>';
    }
    if (painel === 'corrigir') {
      return '<form class="tela-acoes-form" id="form-corrigir" novalidate aria-labelledby="t-corrigir"><h3 class="tela-subtitulo" id="t-corrigir">Corrigir texto</h3>' +
        '<p class="gn-help tela-sem-margem">Use para tirar dados sigilosos de clientes ou corrigir erros evidentes. ' + esc(e.pessoa.split(' ')[0]) + ' é avisada da correção.</p>' +
        '<div class="gn-field"><label class="gn-label" for="cor-titulo">Título da entrega</label><input class="gn-input" id="cor-titulo" maxlength="100" value="' + esc(e.titulo) + '"></div>' +
        '<div class="gn-field"><label class="gn-label" for="cor-resultado">Qual foi o resultado?</label><textarea class="gn-input gn-textarea" id="cor-resultado" rows="3" maxlength="1000">' + esc(e.resultado) + '</textarea></div>' +
        campoJustificativa('cor-just', 'O que foi corrigido e por quê', 'Fica no histórico da entrega.') +
        '<div class="tela-acoes-botoes"><button class="gn-btn gn-btn--secondary" type="button" data-painel="">Cancelar</button><button class="gn-btn gn-btn--primary" type="submit">' + icone('ok') + 'Salvar correção</button></div></form>';
    }
    if (painel === 'reabrir') {
      return '<form class="tela-acoes-form" id="form-reabrir" novalidate aria-labelledby="t-reabrir"><h3 class="tela-subtitulo" id="t-reabrir">Reabrir entrega</h3>' +
        '<fieldset class="gn-field tela-grupo"><legend class="gn-label">Voltar para</legend><div class="tela-opcoes">' +
        '<label class="gn-check"><input type="radio" name="reabrir-para" value="aguardando_validacao" checked>Aguardando validação</label>' +
        '<label class="gn-check"><input type="radio" name="reabrir-para" value="aguardando_avaliacao">Aguardando avaliação (aprovada)</label></div></fieldset>' +
        campoJustificativa('reab-just', 'Justificativa', 'Fica no histórico e aparece para ' + esc(e.pessoa.split(' ')[0]) + '.') +
        '<div class="tela-acoes-botoes"><button class="gn-btn gn-btn--secondary" type="button" data-painel="">Cancelar</button><button class="gn-btn gn-btn--primary" type="submit">' + icone('refazer') + 'Reabrir entrega</button></div></form>';
    }
    if (e.status === 'vencida') {
      return '<form class="tela-acoes-form" id="form-vencida" novalidate aria-labelledby="t-vencida"><h3 class="tela-subtitulo" id="t-vencida">Decisão do RH</h3>' +
        '<p class="tela-sem-margem">Para entrar no resultado de outubro, a entrega precisa ser decidida antes da homologação.</p>' +
        campoJustificativa('venc-just', 'Justificativa', 'Obrigatória nos dois casos. Aparece para ' + esc(e.pessoa.split(' ')[0]) + ' e fica no histórico.') +
        '<div class="tela-acoes-botoes"><button class="gn-btn gn-btn--ghost tela-btn-perigo" type="button" data-acao="cancelar-vencida">' + icone('x') + 'Cancelar entrega</button>' +
        '<button class="gn-btn gn-btn--primary" type="submit">' + icone('ok') + 'Aprovar no lugar do validador</button></div></form>';
    }
    var botoes = [];
    if (e.status === 'avaliada') botoes.push('<button class="gn-btn gn-btn--secondary" type="button" data-painel="revisar">' + icone('criterios') + 'Revisar pontuação</button>');
    if (e.status === 'recusada' || e.status === 'cancelada') botoes.push('<button class="gn-btn gn-btn--secondary" type="button" data-painel="reabrir">' + icone('refazer') + 'Reabrir entrega</button>');
    else botoes.push('<button class="gn-btn gn-btn--ghost" type="button" data-painel="corrigir">' + icone('lapis') + 'Corrigir texto</button>', '<button class="gn-btn gn-btn--ghost tela-btn-perigo" type="button" data-acao="cancelar">' + icone('x') + 'Cancelar entrega</button>');
    return '<div class="tela-acoes-botoes tela-acoes-botoes--inicio">' + botoes.join('') + '</div>';
  }
  function blocoAberta(e) {
    if (!e) return '<section class="gn-card tela-aberta"><div class="gn-empty"><span class="gn-empty__icon">' + icone('arquivo') + '</span><p class="gn-empty__text">Escolha uma entrega na lista.</p></div></section>';
    var s = STATUS[e.status];
    var alerta = e.status === 'vencida'
      ? '<div class="gn-alert gn-alert--attention" role="note">' + icone('alerta') + '<div class="gn-alert__body"><span class="gn-alert__title">Passou do prazo de validação em 05/11</span><span class="gn-alert__text">' + esc(e.validador) + ' não decidiu, mesmo com os lembretes de 02/11 e 05/11. O RH aprova no lugar do validador ou cancela.</span></div></div>'
      : (e.status === 'aguardando_avaliacao' ? '<div class="gn-alert gn-alert--info" role="note">' + icone('relogio') + '<div class="gn-alert__body"><span class="gn-alert__text">Aprovada em ' + esc(e.decisao[1]) + '. A avaliação da IA não terminou; a apuração tenta de novo às 18:00.</span></div></div>' : '')
      + (e.cancelamento ? '<div class="gn-alert gn-alert--info" role="note">' + icone('x') + '<div class="gn-alert__body"><span class="gn-alert__title">Cancelada por ' + esc(e.cancelamento[0]) + ' (RH) em ' + esc(e.cancelamento[1]) + '</span><span class="gn-alert__text">' + esc(e.cancelamento[2]) + '</span></div></div>' : '');
    var evid = e.evidencias.length ? '<ul class="gn-attach-list">' + e.evidencias.map(function (ev) {
      return '<li class="gn-attach">' + icone(ev[0] === 'link' ? 'link' : 'arquivo') + '<div class="gn-attach__text"><a class="gn-attach__name" href="#">' + esc(ev[1]) + '</a><span class="gn-attach__meta">' + (ev[0] === 'link' ? 'Link' : 'Arquivo') + '</span></div></li>';
    }).join('') + '</ul>' : '<span class="gn-muted">Nenhuma evidência anexada</span>';
    var hist = '<ol class="gn-log">' + e.historico.map(function (h) {
      var av = h[1] === 'Genial' || h[1].indexOf('automática') >= 0 ? '<span class="gn-avatar gn-avatar--sm tela-avatar-sistema">' + icone('criterios', 'gn-icon--sm') + '</span>' : avatar(h[1], 'gn-avatar--sm');
      return '<li class="gn-log__item">' + av + '<div class="gn-log__text"><span class="gn-log__who"><b>' + esc(h[1]) + '</b> ' + esc(h[2]) + '</span></div><span class="gn-log__time gn-num">' + esc(h[0]) + '</span></li>';
    }).join('') + '</ol>';
    return '<section class="gn-card tela-aberta" aria-labelledby="t-entrega">' +
      '<div class="gn-card__header"><div class="gn-user tela-pessoa">' + avatar(e.pessoa, '') + '<div class="tela-min0"><div class="gn-user__name">' + esc(e.pessoa) + '</div><div class="gn-user__role">' + esc(e.papel) + ' · ' + esc(e.cliente) + '</div></div></div>' + badge(s[0], s[1], s[2]) + '</div>' +
      '<div class="gn-card__body gn-stack tela-aberta__corpo">' + alerta +
        '<div><h2 class="tela-titulo-entrega" id="t-entrega" tabindex="-1">' + esc(e.titulo) + '</h2><p class="gn-help tela-sem-margem">Enviada em ' + esc(e.enviada) + ' · validador: ' + esc(e.validador) + '</p></div>' +
        '<dl class="tela-conteudo"><div><dt>O que foi entregue</dt><dd>' + esc(e.descricao) + '</dd></div>' +
          '<div class="tela-conteudo__par"><div><dt>Em quanto tempo</dt><dd>' + esc(e.tempo) + '</dd></div><div><dt>Como começou</dt><dd>' + esc(e.origem) + '</dd></div></div>' +
          '<div><dt>Resultado informado</dt><dd>' + esc(e.resultado) + '</dd></div><div><dt>Evidências</dt><dd>' + evid + '</dd></div>' +
          (e.decisao ? '<div><dt>Validação</dt><dd>' + esc(e.decisao[0]) + ' por ' + esc(e.validador) + ' em ' + esc(e.decisao[1]) + (e.decisao[2] ? ': "' + esc(e.decisao[2]) + '"' : '') + '</dd></div>' : '') +
        '</dl>' + blocoAvaliacao(e) +
        '<details class="tela-hist"><summary>Histórico da entrega</summary>' + hist + '</details>' +
      '</div><div class="tela-acoes">' + blocoAcoes(e) + '</div></section>';
  }

  /* ---------- Montagem ---------- */
  function render() {
    var lista = filtradas();
    if (lista.length && !lista.some(function (e) { return e.id === aberta; })) { aberta = lista[0].id; painel = null; }
    var e = ENTREGAS.filter(function (x) { return x.id === aberta; })[0];
    var vencidas = ENTREGAS.filter(function (x) { return x.status === 'vencida'; }).length;
    var aviso = vencidas && ciclo === '2026-10'
      ? '<div class="gn-alert gn-alert--attention" role="status">' + icone('alerta') + '<div class="gn-alert__body"><span class="gn-alert__title">' + vencidas + (vencidas === 1 ? ' entrega passou' : ' entregas passaram') + ' do prazo de validação</span>' +
        '<span class="gn-alert__text">Decida antes da homologação de outubro, até 09/11.</span></div>' +
        (filtro !== 'vencida' ? '<div class="gn-alert__actions"><button class="gn-btn gn-btn--secondary gn-btn--sm" type="button" data-filtro="vencida">Ver entregas</button></div>' : '') + '</div>'
      : '';
    area.innerHTML = aviso + blocoFiltros() + '<div class="tela-grid">' + blocoLista(lista) + (lista.length ? blocoAberta(e) : '') + '</div>';
  }

  function mostrarMensagem(titulo, texto) {
    mensagens.innerHTML = '<div class="gn-alert gn-alert--positive" role="status">' + icone('ok') + '<div class="gn-alert__body"><span class="gn-alert__title">' + esc(titulo) + '</span>' + (texto ? '<span class="gn-alert__text">' + esc(texto) + '</span>' : '') + '</div></div>';
    mensagens.focus();
  }
  function erroCampo(id, texto) {
    var alvo = document.getElementById(id);
    var campo = alvo.closest('.gn-field');
    campo.classList.add('gn-field--error');
    var antigo = campo.querySelector('[data-erro]'); if (antigo) antigo.remove();
    var ajuda = campo.querySelector('.gn-help'); if (ajuda) ajuda.hidden = true;
    var span = document.createElement('span');
    span.className = 'gn-help'; span.setAttribute('data-erro', ''); span.id = id + '-erro';
    span.innerHTML = icone('erro', 'gn-icon--sm') + esc(texto);
    campo.appendChild(span);
    alvo.setAttribute('aria-invalid', 'true'); alvo.setAttribute('aria-describedby', span.id); alvo.focus();
    return false;
  }
  function atual() { return ENTREGAS.filter(function (x) { return x.id === aberta; })[0]; }
  function registrar(e, quem, texto) { e.historico.unshift(['06/11', quem, texto]); }

  /* ---------- Eventos ---------- */
  area.addEventListener('click', function (ev) {
    var t = ev.target;
    var item = t.closest('.tela-item');
    if (item) { aberta = Number(item.getAttribute('data-id')); painel = null; render(); $('#t-entrega').focus(); return; }
    var f = t.closest('[data-filtro]');
    if (f) { filtro = f.getAttribute('data-filtro'); painel = null; render(); return; }
    var p = t.closest('[data-painel]');
    if (p) {
      painel = p.getAttribute('data-painel') || null; render();
      var foco = area.querySelector('.tela-acoes input:not([type=radio]), .tela-acoes textarea, .tela-acoes [data-painel]'); if (foco) foco.focus();
      return;
    }
    if (t.closest('[data-limpar]')) { busca = ''; validador = ''; cliente = ''; filtro = 'todas'; render(); return; }
    var a = t.closest('[data-acao]');
    if (a && (a.getAttribute('data-acao') === 'cancelar' || a.getAttribute('data-acao') === 'cancelar-vencida')) abrirCancelar();
  });
  area.addEventListener('input', function (ev) {
    if (ev.target.id === 'f-busca') {
      busca = ev.target.value; var pos = ev.target.selectionStart; render(); var c = $('#f-busca'); c.focus(); c.setSelectionRange(pos, pos); return;
    }
    if (ev.target.hasAttribute('data-rev')) {
      var notas = [0, 1, 2, 3].map(function (i) { var v = parseFloat($('#rev-' + i).value); return isNaN(v) ? 0 : Math.min(5, Math.max(1, v)); });
      $('#rev-final').textContent = num(media(notas));
    }
  });
  area.addEventListener('change', function (ev) {
    if (ev.target.id === 'f-ciclo') { ciclo = ev.target.value; painel = null; render(); }
    if (ev.target.id === 'f-validador') { validador = ev.target.value; render(); }
    if (ev.target.id === 'f-cliente') { cliente = ev.target.value; render(); }
  });
  area.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var e = atual();
    var id = ev.target.id;
    if (id === 'form-revisar') {
      var notas = [];
      for (var i = 0; i < 4; i++) {
        var v = parseFloat($('#rev-' + i).value);
        if (isNaN(v) || v < 1 || v > 5) return erroCampo('rev-' + i, 'Use uma nota de 1 a 5.');
        notas.push(Math.round(v * 10) / 10);
      }
      if (!$('#rev-just').value.trim()) return erroCampo('rev-just', 'Explique o motivo da revisão. Ela aparece para ' + e.pessoa.split(' ')[0] + '.');
      // SIMULAÇÃO: grava a revisão por critério, recalcula a nota final e registra no histórico.
      var antes = media(e.notas);
      if (!e.notasIa) e.notasIa = e.notas.slice();
      e.notas = notas;
      e.revisao = [EU, '06/11', $('#rev-just').value.trim()];
      registrar(e, EU, 'revisou a pontuação de ' + num(antes) + ' para ' + num(media(notas)));
      painel = null; render();
      mostrarMensagem('Pontuação revisada: ' + num(media(notas)), e.pessoa + ' vê a revisão e a justificativa no detalhe da entrega.');
      return;
    }
    if (id === 'form-corrigir') {
      if (!$('#cor-titulo').value.trim()) return erroCampo('cor-titulo', 'O título não pode ficar vazio.');
      if (!$('#cor-just').value.trim()) return erroCampo('cor-just', 'Diga o que foi corrigido e por quê.');
      // SIMULAÇÃO: grava a correção, avisa o colaborador e registra no histórico.
      e.titulo = $('#cor-titulo').value.trim(); e.resultado = $('#cor-resultado').value.trim();
      registrar(e, EU, 'corrigiu o texto da entrega');
      painel = null; render();
      mostrarMensagem('Texto corrigido', e.pessoa + ' foi avisada da correção.');
      return;
    }
    if (id === 'form-reabrir') {
      if (!$('#reab-just').value.trim()) return erroCampo('reab-just', 'Explique por que a entrega está sendo reaberta.');
      var para = area.querySelector('input[name="reabrir-para"]:checked').value;
      // SIMULAÇÃO: reabre a entrega no estado escolhido e registra no histórico.
      e.status = para; e.cancelamento = null;
      registrar(e, EU, 'reabriu a entrega para "' + STATUS[para][2] + '"');
      painel = null; filtro = 'todas'; render();
      mostrarMensagem('Entrega reaberta', 'Agora está em "' + STATUS[para][2] + '".');
      return;
    }
    if (id === 'form-vencida') {
      if (!$('#venc-just').value.trim()) return erroCampo('venc-just', 'Explique a decisão. Ela aparece para ' + e.pessoa.split(' ')[0] + '.');
      // SIMULAÇÃO: o RH aprova no lugar do validador; a entrega segue para a avaliação da IA.
      e.status = 'aguardando_avaliacao'; e.decisao = ['Aprovada pelo RH (' + EU + ')', '06/11', $('#venc-just').value.trim()];
      registrar(e, EU, 'aprovou no lugar do validador');
      render();
      mostrarMensagem('Entrega aprovada pelo RH', '"' + e.titulo + '" segue para a avaliação da IA e entra no resultado de outubro.');
    }
  });

  /* ---------- Diálogo de cancelamento ---------- */
  var dlg = $('#dlg');
  var form = $('#dlg-form');
  var focoAnterior = null;
  function abrirCancelar() {
    var e = atual();
    var just = $('#venc-just') ? $('#venc-just').value : '';
    focoAnterior = document.activeElement;
    $('#dlg-t').textContent = 'Cancelar esta entrega?';
    $('#dlg-d').textContent = '"' + e.titulo + '" não conta pontos. O histórico fica guardado e dá para reabrir depois.';
    $('#dlg-icone').className = 'gn-dialog__icon tela-dialog__icon--neg';
    $('#dlg-icone').innerHTML = icone('x');
    $('#dlg-corpo').innerHTML = '<div class="gn-field"><label class="gn-label" for="dlg-just">Justificativa<span class="gn-req" aria-hidden="true">*</span></label>' +
      '<textarea class="gn-input gn-textarea" id="dlg-just" rows="3" maxlength="1000">' + esc(just) + '</textarea><span class="gn-help">Aparece para ' + esc(e.pessoa.split(' ')[0]) + ' e fica no histórico.</span></div>';
    var b = $('#dlg-confirmar'); b.className = 'gn-btn gn-btn--danger'; b.textContent = 'Cancelar entrega';
    dlg.querySelector('[data-fechar]').textContent = 'Voltar';
    dlg.hidden = false;
    $('#dlg-just').focus();
  }
  function fecharDialogo() { dlg.hidden = true; if (focoAnterior) focoAnterior.focus(); }
  dlg.querySelector('[data-fechar]').addEventListener('click', fecharDialogo);
  dlg.addEventListener('click', function (ev) { if (ev.target === dlg) fecharDialogo(); });
  dlg.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { fecharDialogo(); return; }
    if (ev.key !== 'Tab') return;
    var f = dlg.querySelectorAll('textarea, button');
    if (ev.shiftKey && document.activeElement === f[0]) { ev.preventDefault(); f[f.length - 1].focus(); }
    else if (!ev.shiftKey && document.activeElement === f[f.length - 1]) { ev.preventDefault(); f[0].focus(); }
  });
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (!$('#dlg-just').value.trim()) { erroCampo('dlg-just', 'Explique por que a entrega está sendo cancelada.'); return; }
    var e = atual();
    // SIMULAÇÃO: cancela a entrega (histórico preservado) e registra para auditoria.
    e.status = 'cancelada'; e.cancelamento = [EU, '06/11', $('#dlg-just').value.trim()];
    registrar(e, EU, 'cancelou a entrega');
    dlg.hidden = true; painel = null; render();
    mostrarMensagem('Entrega cancelada', '"' + e.titulo + '" não conta pontos. ' + e.pessoa + ' vê a justificativa.');
  });

  function estadoCheio(nomeIcone, titulo, texto, acao) {
    area.innerHTML = '<section class="gn-card"><div class="gn-empty"><span class="gn-empty__icon gn-empty__icon--lock">' + icone(nomeIcone) + '</span>' +
      '<h2 class="gn-empty__title">' + esc(titulo) + '</h2><p class="gn-empty__text">' + esc(texto) + '</p>' + (acao ? '<div class="gn-empty__actions">' + acao + '</div>' : '') + '</div></section>';
  }

  var acoes = {
    padrao: render,
    'prazo-vencido': function () { filtro = 'vencida'; aberta = 1; render(); },
    revisar: function () { aberta = 4; painel = 'revisar'; render(); },
    'revisao-erro': function () { aberta = 4; painel = 'revisar'; render(); $('#rev-1').value = '4.6'; $('#rev-1').dispatchEvent(new Event('input', { bubbles: true })); $('#form-revisar').requestSubmit(); },
    revisada: function () { filtro = 'revisada'; aberta = 5; render(); },
    'avaliacao-pendente': function () { filtro = 'aguardando_avaliacao'; aberta = 3; render(); },
    cancelar: function () { aberta = 6; render(); abrirCancelar(); },
    reabrir: function () { filtro = 'encerradas'; aberta = 11; painel = 'reabrir'; render(); },
    corrigir: function () { aberta = 7; painel = 'corrigir'; render(); },
    homologada: function () { ciclo = '2026-09'; aberta = 12; render(); },
    'busca-vazia': function () { busca = 'Joaquim'; render(); },
    carregando: function () {
      area.innerHTML = '<div class="tela-grid" aria-busy="true"><section class="gn-card"><div class="gn-card__body gn-stack"><span class="tela-esqueleto"></span><span class="tela-esqueleto"></span><span class="tela-esqueleto"></span></div></section>' +
        '<section class="gn-card"><div class="gn-card__body"><span class="tela-esqueleto tela-esqueleto--bloco"></span></div></section></div>';
    },
    erro: function () { estadoCheio('erro', 'Não foi possível carregar as entregas', 'O Genial não respondeu. Nenhuma alteração foi perdida. Tente de novo em alguns instantes.', '<a class="gn-btn gn-btn--secondary" href="?estado=padrao">Tentar de novo</a>'); },
    'sem-permissao': function () { estadoCheio('cadeado', 'Esta área é do RH', 'A administração do Reconhecimento é só para o RH. Se você precisa de acesso, fale com a TI.', ''); }
  };
  (acoes[estado] || acoes.padrao)();
})();
