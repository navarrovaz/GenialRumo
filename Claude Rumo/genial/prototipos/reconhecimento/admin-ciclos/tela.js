/* Ciclos e pontuações (RH) — comportamento do protótipo (JS vanilla).
   CICLOS simula o que o backend devolve; render() monta a tela. Data simulada: 06/11/2026.
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
    escudo: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    premio: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
    refazer: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    salvar: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
    sino: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    calendario: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    criterios: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
    cadeado: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    seta: '<path d="m9 18 6-6-6-6"/>'
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

  /* ---------- Avatares ---------- */
  var AVATARES = { 'Ana Ribeiro': 2, 'Bruno Costa': 1, 'Marina Lopes': 8, 'Lucas Almeida': 5, 'Pedro Nunes': 9, 'Fernanda Rocha': 3, 'Rafael Souza': 7, 'Camila Duarte': 6, 'Diego Martins': 10, 'Patrícia Gomes': 4, 'Juliana Prado': 12 };
  function avatar(nome, classes) {
    var n = AVATARES[nome] || 1;
    return '<span class="gn-avatar gn-avatar--img ' + (classes || '') + '"><img src="../../../docs/design-system/assets/avatares/avatar-' + (n < 10 ? '0' : '') + n + '.svg" alt=""></span>';
  }

  /* ---------- Dados fictícios ---------- */
  // ranking: [nome, papel, pontos, aprovadas]
  var RK_OUT = [
    ['Bruno Costa', 'Desenvolvedor', 19.9, 5], ['Marina Lopes', 'Analista de qualidade', 18.4, 5], ['Ana Ribeiro', 'Desenvolvedora', 15.8, 5],
    ['Lucas Almeida', 'Analista de infraestrutura', 13.8, 3], ['Pedro Nunes', 'Desenvolvedor', 9.7, 2], ['Fernanda Rocha', 'Analista de dados', 8.4, 2],
    ['Rafael Souza', 'Desenvolvedor', 7.9, 2], ['Camila Duarte', 'Analista de suporte', 4.6, 1], ['Diego Martins', 'Desenvolvedor', 4.1, 1], ['Patrícia Gomes', 'Analista de requisitos', 3.5, 1]
  ];
  // Depois das decisões do RH: Treinamento de Git aprovado pelo RH (4,0) e Monitoramento avaliado (3,7); Painel de custos cancelado.
  var RK_OUT_PRONTO = [['Ana Ribeiro', 'Desenvolvedora', 23.5, 6]].concat(RK_OUT.filter(function (p) { return p[0] !== 'Ana Ribeiro'; }));

  var CICLOS = {
    '2026-10': {
      nome: 'Outubro de 2026', curto: 'outubro', situacao: 'aguardando', participantes: 10, avaliadas: 26,
      etapas: [
        ['Cadastro', 'cadastro', '2026-10-31', 'encerrada'], ['Validação', 'validacao', '2026-11-05', 'encerrada'],
        ['Apuração', 'apuracao', '2026-11-06', 'hoje'], ['Homologação até', 'homologacao', '2026-11-09', 'aberta'], ['Divulgação', 'divulgacao', '2026-11-10', 'aberta']
      ],
      lembretes: 'Lembretes aos validadores enviados em 02/11 e 05/11.',
      historico: [
        ['Hoje, 6 de novembro', [
          { ia: true, texto: 'apurou o resultado do ciclo', diffs: [['note', '26 entregas avaliadas']], hora: '06:00' },
          { rh: 'Juliana Prado', texto: 'revisou a pontuação de "Documentação do processo de deploy"', diffs: [['remove', '2,8'], ['add', '3,2']], hora: '09:40' }]],
        ['Quarta, 5 de novembro', [{ sistema: true, texto: 'enviou lembrete do prazo a 2 validadores', hora: '08:00' }]],
        ['Domingo, 2 de novembro', [{ sistema: true, texto: 'enviou lembrete do prazo a 5 validadores', hora: '08:00' }]],
        ['Terça, 20 de outubro', [{ rh: 'Juliana Prado', texto: 'alterou o calendário', diffs: [['note', 'Homologação até'], ['remove', '08/11'], ['add', '09/11']], hora: '15:12' }]]
      ]
    },
    '2026-09': {
      nome: 'Setembro de 2026', curto: 'setembro', situacao: 'homologado', homologadoEm: '09/10', homologadoPor: 'Juliana Prado', participantes: 8, avaliadas: 17,
      ranking: [
        ['Marina Lopes', 'Analista de qualidade', 18.4, 4], ['Ana Ribeiro', 'Desenvolvedora', 13.0, 3], ['Bruno Costa', 'Desenvolvedor', 12.6, 3], ['Lucas Almeida', 'Analista de infraestrutura', 9.1, 2],
        ['Pedro Nunes', 'Desenvolvedor', 8.8, 2], ['Fernanda Rocha', 'Analista de dados', 4.7, 1], ['Rafael Souza', 'Desenvolvedor', 4.2, 1], ['Camila Duarte', 'Analista de suporte', 3.9, 1]],
      historico: [
        ['Sexta, 9 de outubro', [{ rh: 'Juliana Prado', texto: 'homologou o ciclo', diffs: [['note', 'Destaque: Marina Lopes']], hora: '16:00' }]],
        ['Quinta, 8 de outubro', [{ rh: 'Juliana Prado', texto: 'revisou a pontuação de "Revisão do controle de acesso do sistema interno"', diffs: [['remove', '3,4'], ['add', '3,8']], hora: '15:20' },
          { rh: 'Juliana Prado', texto: 'cancelou "Painel de atendimento (registro repetido)"', diffs: [['note', 'Registro duplicado']], hora: '14:41' }]]
      ]
    },
    '2026-08': {
      nome: 'Agosto de 2026', curto: 'agosto', situacao: 'homologado', homologadoEm: '09/09', homologadoPor: 'Juliana Prado', participantes: 10, avaliadas: 30,
      ranking: [
        ['Ana Ribeiro', 'Desenvolvedora', 26.3, 6], ['Bruno Costa', 'Desenvolvedor', 18.2, 4], ['Pedro Nunes', 'Desenvolvedor', 16.5, 4], ['Marina Lopes', 'Analista de qualidade', 14.1, 3],
        ['Lucas Almeida', 'Analista de infraestrutura', 12.0, 3], ['Fernanda Rocha', 'Analista de dados', 9.8, 2], ['Rafael Souza', 'Desenvolvedor', 8.1, 2], ['Camila Duarte', 'Analista de suporte', 7.7, 2],
        ['Diego Martins', 'Desenvolvedor', 4.4, 1], ['Patrícia Gomes', 'Analista de requisitos', 3.6, 1]],
      historico: [['Quarta, 9 de setembro', [{ rh: 'Juliana Prado', texto: 'homologou o ciclo', diffs: [['note', 'Destaque: Ana Ribeiro']], hora: '17:05' }]]]
    }
  };

  var EU = (window.GenialSessao && GenialSessao.atual() ? GenialSessao.atual().nome : 'Juliana Prado');
  var cicloAtual = '2026-10';
  var pendenciasResolvidas = false;
  var emAndamento = false;

  /* ---------- Blocos ---------- */
  function situacaoBadge(c) {
    if (emAndamento && c === CICLOS['2026-10']) return badge('info', 'relogio', 'Em andamento');
    if (c.situacao === 'aguardando') return badge('attention', 'relogio', 'Aguardando homologação');
    if (c.situacao === 'reaberto') return badge('attention', 'refazer', 'Reaberto');
    return badge('positive', 'escudo', 'Homologado em ' + c.homologadoEm);
  }

  function blocoResumo(c) {
    var ranking = rankingDe(c);
    var leituras = [
      ['Participantes', c.participantes],
      ['Entregas avaliadas', c.avaliadas],
      [c.situacao === 'homologado' ? 'Destaque do Mês' : 'Lidera hoje', ranking[0][0] + ', ' + num(ranking[0][2]) + ' pts']
    ];
    if (c.situacao === 'homologado') leituras.push(['Homologado por', c.homologadoPor]);
    return '<section class="gn-card" aria-labelledby="t-ciclo"><div class="gn-card__header"><div><h2 class="gn-card__title" id="t-ciclo">' + esc(c.nome) + '</h2>' +
      '<p class="gn-card__subtitle">' + (emAndamento && c === CICLOS['2026-10'] ? 'Cadastro aberto até 31/10' : (c.situacao === 'homologado' ? 'Resultado oficial' : 'Apuração concluída hoje; homologação até 09/11')) + '</p></div>' + situacaoBadge(c) + '</div>' +
      '<div class="gn-card__body"><dl class="tela-leituras">' + leituras.map(function (l) {
        return '<div class="gn-readout"><dt>' + l[0] + '</dt><dd class="gn-num">' + esc(l[1]) + '</dd></div>';
      }).join('') + '</dl></div></section>';
  }

  function rankingDe(c) {
    if (c === CICLOS['2026-10']) return pendenciasResolvidas ? RK_OUT_PRONTO : RK_OUT;
    return c.ranking;
  }

  function itemConferencia(ok, titulo, texto, acao) {
    return '<li class="tela-conf__item"><span class="tela-conf__icone tela-conf__icone--' + (ok ? 'ok' : 'pendente') + '">' + icone(ok ? 'ok' : 'alerta') + '</span>' +
      '<div class="tela-conf__texto"><span class="tela-conf__titulo">' + titulo + '</span><span class="tela-conf__desc">' + texto + '</span></div>' + (acao || '') + '</li>';
  }

  function blocoConferencia() {
    var p = pendenciasResolvidas;
    var itens =
      (p ? itemConferencia(true, 'Todas as entregas do ciclo foram decididas', 'As 2 entregas que passaram do prazo foram decididas pelo RH: 1 aprovada e 1 cancelada.')
         : itemConferencia(false, '2 entregas passaram do prazo de validação', '"Treinamento de Git para a equipe do cliente" (Ana Ribeiro) e "Painel de custos de nuvem" (Lucas Almeida). Aprove no lugar do validador ou cancele.',
           '<a class="gn-btn gn-btn--secondary gn-btn--sm" href="../admin-entregas/index.html?estado=prazo-vencido">Decidir</a>')) +
      (p ? itemConferencia(true, 'Todas as entregas aprovadas têm pontuação', 'A IA avaliou as 28 entregas aprovadas do ciclo.')
         : itemConferencia(false, '1 entrega aprovada ainda sem pontuação', '"Monitoramento de filas com alertas" (Ana Ribeiro). A avaliação da IA não terminou.',
           '<a class="gn-btn gn-btn--secondary gn-btn--sm" href="../admin-entregas/index.html?estado=avaliacao-pendente">Ver entrega</a>')) +
      itemConferencia(true, 'Sem empate no pódio', 'Em caso de empate em pontos, fica à frente quem teve mais entregas aprovadas.') +
      itemConferencia(true, '2 pontuações revisadas pelo RH', 'Todas com justificativa registrada no histórico.', '<a class="gn-btn gn-btn--ghost gn-btn--sm" href="../admin-entregas/index.html?estado=revisada">Ver revisões</a>');
    var pendentes = p ? 0 : 2;
    var botao = pendentes
      ? '<button class="gn-btn gn-btn--primary" type="button" disabled aria-describedby="motivo-bloqueio">' + icone('escudo') + 'Homologar outubro</button>' +
        '<span class="gn-help" id="motivo-bloqueio">' + icone('info', 'gn-icon--sm') + 'Resolva as ' + pendentes + ' pendências para homologar.</span>'
      : '<button class="gn-btn gn-btn--primary" type="button" data-acao="homologar">' + icone('escudo') + 'Homologar outubro</button>' +
        '<span class="gn-help">Prazo para homologar: 09/11.</span>';
    return '<section class="gn-card" aria-labelledby="t-conf"><div class="gn-card__header"><div><h2 class="gn-card__title" id="t-conf">Antes de homologar</h2>' +
      '<p class="gn-card__subtitle">Confira as pendências do ciclo. A homologação vale para o ciclo inteiro.</p></div>' +
      (pendentes ? badge('attention', 'alerta', pendentes + ' pendências') : badge('positive', 'ok', 'Pronto para homologar')) + '</div>' +
      '<div class="gn-card__body"><ul class="tela-conf">' + itens + '</ul></div>' +
      '<div class="gn-card__footer tela-rodape-acao">' + botao + '</div></section>';
  }

  function blocoAndamento() {
    return '<section class="gn-card" aria-labelledby="t-andamento"><div class="gn-card__header"><div><h2 class="gn-card__title" id="t-andamento">Andamento do ciclo</h2>' +
      '<p class="gn-card__subtitle">A conferência e a homologação ficam disponíveis depois da apuração, em 06/11.</p></div></div>' +
      '<div class="gn-card__body"><dl class="tela-leituras"><div class="gn-readout"><dt>Entregas cadastradas</dt><dd class="gn-num">31</dd></div>' +
      '<div class="gn-readout"><dt>Aguardando validação</dt><dd class="gn-num">9</dd></div><div class="gn-readout"><dt>Aguardando avaliação</dt><dd class="gn-num">1</dd></div>' +
      '<div class="gn-readout"><dt>Avaliadas</dt><dd class="gn-num">18</dd></div></dl></div>' +
      '<div class="gn-card__footer tela-rodape-acao"><button class="gn-btn gn-btn--primary" type="button" disabled aria-describedby="motivo-andamento">' + icone('escudo') + 'Homologar outubro</button>' +
      '<span class="gn-help" id="motivo-andamento">' + icone('info', 'gn-icon--sm') + 'Disponível depois da apuração, em 06/11.</span></div></section>';
  }

  function blocoPrevia(c) {
    var r = rankingDe(c);
    var oficial = c.situacao === 'homologado';
    var podio = r.slice(0, 3).map(function (p, i) {
      var pos = i + 1;
      return '<li class="gn-podium__item gn-podium__item--' + pos + '"><span class="gn-podium__avatar">' + avatar(p[0], 'gn-avatar--xl' + (pos === 1 ? ' gn-avatar--destaque' : '')) +
        '<span class="gn-podium__medalha">' + (pos === 1 ? icone('premio') + (oficial ? 'Destaque do Mês' : '1º') : pos + 'º') + '</span></span>' +
        '<span class="gn-podium__nome">' + esc(p[0]) + '</span><span class="gn-podium__papel">' + esc(p[1]) + '</span>' +
        '<span class="gn-podium__pontos">' + num(p[2]) + ' pts</span><span class="gn-podium__meta">' + p[3] + ' aprovadas</span>' +
        '<span class="gn-podium__degrau" aria-hidden="true">' + pos + '</span></li>';
    }).join('');
    var linhas = r.slice(3).map(function (p, i) {
      return '<tr><td class="tela-pos">' + (i + 4) + 'º</td><td><span class="tela-pessoa">' + avatar(p[0], 'gn-avatar--sm') + esc(p[0]) + '</span></td>' +
        '<td class="is-num">' + p[3] + '</td><td class="is-num"><b class="gn-num">' + num(p[2]) + '</b></td></tr>';
    }).join('');
    return '<section class="gn-card" aria-labelledby="t-previa"><div class="gn-card__header"><div><h2 class="gn-card__title" id="t-previa">' + (oficial ? 'Resultado oficial' : 'Prévia do resultado') + '</h2>' +
      '<p class="gn-card__subtitle">' + (oficial ? 'Destaque do Mês: maior pontuação homologada.' : 'O 1º lugar na homologação será o Destaque do Mês.') + '</p></div>' +
      '<a class="gn-btn gn-btn--ghost gn-btn--sm" href="../ranking-mensal/index.html' + (oficial ? '?estado=homologado' : '') + '">Ver como os colaboradores veem</a></div>' +
      '<div class="gn-card__body tela-previa"><ol class="gn-podium tela-previa__podio">' + podio + '</ol>' +
      '<div class="gn-table-wrap tela-previa__tabela"><table class="gn-table"><caption class="gn-sr">Demais posições</caption><thead><tr><th scope="col">Posição</th><th scope="col">Colaborador</th><th scope="col" class="is-num">Aprovadas</th><th scope="col" class="is-num">Pontos</th></tr></thead><tbody>' + linhas + '</tbody></table></div></div></section>';
  }

  function campoData(e, editavel) {
    var data = e[2].split('-').reverse().join('/');
    if (!editavel) {
      return '<div class="gn-readout tela-etapa"><dt>' + esc(e[0]) + '</dt><dd><span class="gn-num">' + data + '</span> ' +
        (e[3] === 'hoje' ? badge('info', 'relogio', 'Hoje') : badge('neutral', 'cadeado', 'Encerrada')) + '</dd></div>';
    }
    return '<div class="gn-field" data-campo="' + e[1] + '"><label class="gn-label" for="f-' + e[1] + '">' + esc(e[0]) + '</label>' +
      '<input class="gn-input gn-num tela-data" type="date" id="f-' + e[1] + '" value="' + e[2] + '"></div>';
  }

  function blocoCalendario(c) {
    if (c.situacao === 'reaberto') {
      return '<section class="gn-card" aria-labelledby="t-reaberto"><div class="gn-card__header"><h2 class="gn-card__title" id="t-reaberto">Ciclo reaberto</h2></div>' +
        '<div class="gn-card__body gn-stack"><p class="tela-sem-margem">Corrija as entregas em Gestão de entregas e homologue de novo. Até lá, o ranking de ' + c.curto + ' aparece como em apuração.</p>' +
        '<a class="gn-btn gn-btn--secondary tela-alinha-inicio" href="../admin-entregas/index.html">Ir para Gestão de entregas</a></div>' +
        '<div class="gn-card__footer tela-rodape-acao"><button class="gn-btn gn-btn--primary" type="button" data-acao="homologar">' + icone('escudo') + 'Homologar ' + c.curto + '</button></div></section>';
    }
    if (c.situacao === 'homologado') {
      return '<section class="gn-card" aria-labelledby="t-reabrir"><div class="gn-card__header"><h2 class="gn-card__title" id="t-reabrir">Reabrir ciclo</h2></div>' +
        '<div class="gn-card__body gn-stack"><p class="tela-sem-margem">Use só para corrigir um erro no resultado oficial. O ranking volta a ficar em apuração para todos e o Destaque do Mês fica suspenso até a nova homologação.</p>' +
        '<button class="gn-btn gn-btn--secondary tela-alinha-inicio tela-btn-perigo" type="button" data-acao="reabrir">' + icone('refazer') + 'Reabrir ' + c.curto + '</button></div></section>';
    }
    var etapas = emAndamento
      ? [['Cadastro até', 'cadastro', '2026-10-31', 'aberta'], ['Validação até', 'validacao', '2026-11-05', 'aberta'], ['Apuração', 'apuracao', '2026-11-06', 'aberta'], ['Homologação até', 'homologacao', '2026-11-09', 'aberta'], ['Divulgação', 'divulgacao', '2026-11-10', 'aberta']]
      : c.etapas;
    return '<section class="gn-card" aria-labelledby="t-cal"><div class="gn-card__header"><div><h2 class="gn-card__title" id="t-cal">Calendário do ciclo</h2>' +
      '<p class="gn-card__subtitle">Etapas encerradas não mudam.</p></div></div>' +
      '<form class="gn-card__body gn-stack" id="form-calendario" novalidate><dl class="tela-sem-margem gn-stack">' +
        etapas.map(function (e) { return campoData(e, e[3] === 'aberta'); }).join('') + '</dl>' +
        '<p class="gn-help tela-sem-margem">' + icone('sino', 'gn-icon--sm') + (emAndamento ? 'Lembretes aos validadores: 3 dias antes e no dia do prazo de validação.' : esc(c.lembretes)) + '</p>' +
        '<button class="gn-btn gn-btn--secondary tela-alinha-inicio" type="submit">' + icone('salvar') + 'Salvar calendário</button></form></section>';
  }

  function blocoHistorico(c) {
    var linhas = c.historico.map(function (dia) {
      return '<li class="gn-log__day">' + esc(dia[0]) + '</li>' + dia[1].map(function (it) {
        var av, quem;
        if (it.ia) { av = '<span class="gn-avatar gn-avatar--sm tela-avatar-sistema">' + icone('criterios', 'gn-icon--sm') + '</span>'; quem = '<b>Apuração automática</b>'; }
        else if (it.sistema) { av = '<span class="gn-avatar gn-avatar--sm tela-avatar-sistema">' + icone('sino', 'gn-icon--sm') + '</span>'; quem = '<b>Genial</b>'; }
        else { av = avatar(it.rh, 'gn-avatar--sm'); quem = '<b>' + esc(it.rh) + '</b> <span class="gn-badge gn-badge--attention tela-badge-papel">RH</span>'; }
        var diffs = (it.diffs || []).map(function (d) { return '<span class="gn-diff gn-diff--' + d[0] + '">' + esc(d[1]) + '</span>'; }).join('');
        return '<li class="gn-log__item">' + av + '<div class="gn-log__text"><span class="gn-log__who">' + quem + ' ' + esc(it.texto) + '</span>' +
          (diffs ? '<div class="gn-log__changes">' + diffs + '</div>' : '') + '</div><span class="gn-log__time">' + esc(it.hora) + '</span></li>';
      }).join('');
    }).join('');
    return '<section class="gn-card" aria-labelledby="t-hist"><div class="gn-card__header"><h2 class="gn-card__title" id="t-hist">Histórico do ciclo</h2></div>' +
      '<div class="gn-card__body tela-hist"><ol class="gn-log">' + linhas + '</ol></div></section>';
  }

  function render() {
    var c = CICLOS[cicloAtual];
    var principal = (c.situacao === 'homologado' || c.situacao === 'reaberto')
      ? blocoPrevia(c) + blocoHistorico(c)
      : (emAndamento ? blocoAndamento() + blocoHistorico(c) : blocoConferencia() + blocoPrevia(c) + blocoHistorico(c));
    area.innerHTML = blocoResumo(c) + '<div class="tela-grid"><div class="gn-stack tela-coluna">' + principal + '</div>' +
      '<aside class="gn-stack tela-coluna" aria-label="Calendário e ações do ciclo">' + blocoCalendario(c) + '</aside></div>';
  }

  /* ---------- Mensagens ---------- */
  function mostrarMensagem(tipo, titulo, texto) {
    mensagens.innerHTML = '<div class="gn-alert gn-alert--' + tipo + '" role="status">' + icone(tipo === 'positive' ? 'ok' : 'erro') +
      '<div class="gn-alert__body"><span class="gn-alert__title">' + esc(titulo) + '</span>' + (texto ? '<span class="gn-alert__text">' + esc(texto) + '</span>' : '') + '</div></div>';
    mensagens.focus();
  }

  /* ---------- Diálogo ---------- */
  var dlg = $('#dlg');
  var form = $('#dlg-form');
  var focoAnterior = null;
  var acaoDialogo = null;
  function abrirDialogo(cfg) {
    focoAnterior = document.activeElement;
    acaoDialogo = cfg.acao;
    $('#dlg-t').textContent = cfg.titulo;
    $('#dlg-d').textContent = cfg.descricao;
    $('#dlg-icone').className = 'gn-dialog__icon ' + (cfg.perigo ? 'tela-dialog__icon--neg' : '');
    $('#dlg-icone').innerHTML = icone(cfg.icone);
    $('#dlg-corpo').innerHTML = cfg.corpo;
    var b = $('#dlg-confirmar');
    b.className = 'gn-btn ' + (cfg.perigo ? 'gn-btn--danger' : 'gn-btn--primary');
    b.textContent = cfg.botao;
    dlg.hidden = false;
    var primeiro = dlg.querySelector('textarea, input, [data-fechar]');
    primeiro.focus();
  }
  function fecharDialogo() { dlg.hidden = true; if (focoAnterior) focoAnterior.focus(); }
  dlg.querySelector('[data-fechar]').addEventListener('click', fecharDialogo);
  dlg.addEventListener('click', function (ev) { if (ev.target === dlg) fecharDialogo(); });
  dlg.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { fecharDialogo(); return; }
    if (ev.key !== 'Tab') return;
    var f = dlg.querySelectorAll('textarea, input, button');
    if (ev.shiftKey && document.activeElement === f[0]) { ev.preventDefault(); f[f.length - 1].focus(); }
    else if (!ev.shiftKey && document.activeElement === f[f.length - 1]) { ev.preventDefault(); f[0].focus(); }
  });
  function erroNoCampo(campo, alvo, texto) {
    campo.classList.add('gn-field--error');
    var antigo = campo.querySelector('[data-erro]'); if (antigo) antigo.remove();
    var e = document.createElement('span');
    e.className = 'gn-help'; e.setAttribute('data-erro', ''); e.id = alvo.id + '-erro';
    e.innerHTML = icone('erro', 'gn-icon--sm') + esc(texto);
    campo.appendChild(e);
    alvo.setAttribute('aria-invalid', 'true'); alvo.setAttribute('aria-describedby', e.id); alvo.focus();
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (acaoDialogo === 'homologar') {
      var ok = $('#dlg-conferi');
      if (!ok.checked) { erroNoCampo(ok.closest('.gn-field'), ok, 'Marque para confirmar que você conferiu o ciclo.'); return; }
      // SIMULAÇÃO: homologa o ciclo inteiro; entregas avaliadas viram "Homologada"; registra no histórico.
      dlg.hidden = true;
      var ch = CICLOS[cicloAtual];
      ch.ranking = rankingDe(ch).slice();
      ch.situacao = 'homologado';
      ch.homologadoEm = '06/11';
      ch.homologadoPor = EU;
      ch.historico.unshift(['Agora', [{ rh: EU, texto: 'homologou o ciclo', diffs: [['note', 'Destaque: ' + ch.ranking[0][0]]], hora: '10:12' }]]);
      $('#f-ciclo').selectedOptions[0].textContent = ch.nome + ' (homologado)';
      render();
      mostrarMensagem('positive', ch.nome + ' homologado', 'Destaque do Mês: ' + ch.ranking[0][0] + '. ' + (ch === CICLOS['2026-10'] ? 'O resultado oficial aparece para todos na divulgação, em 10/11.' : 'O resultado oficial voltou a aparecer para todos.'));
      return;
    }
    if (acaoDialogo === 'reabrir') {
      var just = $('#dlg-justificativa');
      if (!just.value.trim()) { erroNoCampo(just.closest('.gn-field'), just, 'Explique por que o ciclo precisa ser reaberto.'); return; }
      // SIMULAÇÃO: reabre o ciclo; entregas homologadas voltam a "Avaliada"; ranking volta a "em apuração".
      dlg.hidden = true;
      var c = CICLOS[cicloAtual];
      c.situacao = 'reaberto';
      $('#f-ciclo').selectedOptions[0].textContent = c.nome + ' (reaberto)';
      c.historico.unshift(['Agora', [{ rh: EU, texto: 'reabriu o ciclo', diffs: [['note', just.value.trim()]], hora: '10:12' }]]);
      render();
      mostrarMensagem('positive', c.nome + ' reaberto', 'O ranking voltou a ficar em apuração. Faça as correções em Gestão de entregas e homologue de novo.');
    }
  });

  function abrirHomologar() {
    var c = CICLOS[cicloAtual];
    var r = rankingDe(c);
    var avaliadas = c === CICLOS['2026-10'] ? 28 : c.avaliadas;
    abrirDialogo({
      acao: 'homologar', icone: 'escudo', titulo: 'Homologar ' + c.curto + ' de 2026?', botao: 'Homologar ' + c.curto,
      descricao: 'O resultado fica oficial e o Destaque do Mês é definido. Depois, só dá para mudar reabrindo o ciclo, com justificativa.',
      corpo: '<dl class="gn-dialog__summary tela-sem-margem"><div class="gn-readout"><dt>Participantes</dt><dd class="gn-num">' + c.participantes + '</dd></div>' +
        '<div class="gn-readout"><dt>Entregas avaliadas</dt><dd class="gn-num">' + avaliadas + '</dd></div>' +
        '<div class="gn-readout"><dt>Destaque do Mês</dt><dd>' + esc(r[0][0]) + ', ' + num(r[0][2]) + ' pts</dd></div></dl>' +
        '<p class="gn-help tela-sem-margem">' + (c === CICLOS['2026-10'] ? 'O resultado oficial aparece para todos na divulgação, em 10/11.' : 'O resultado oficial volta a aparecer para todos assim que você homologar.') + '</p>' +
        '<div class="gn-field"><label class="gn-check"><input type="checkbox" id="dlg-conferi">Conferi as pendências, as revisões e a prévia do resultado.</label></div>'
    });
  }
  function abrirReabrir() {
    var c = CICLOS[cicloAtual];
    abrirDialogo({
      acao: 'reabrir', icone: 'refazer', perigo: true, titulo: 'Reabrir ' + c.curto + ' de 2026?', botao: 'Reabrir ciclo',
      descricao: 'O ranking de ' + c.curto + ' volta a ficar em apuração para todos e o Destaque do Mês fica suspenso até a nova homologação.',
      corpo: '<div class="gn-field"><label class="gn-label" for="dlg-justificativa">Por que reabrir?<span class="gn-req" aria-hidden="true">*</span></label>' +
        '<textarea class="gn-input gn-textarea" id="dlg-justificativa" rows="3" maxlength="1000"></textarea>' +
        '<span class="gn-help">Fica registrado no histórico do ciclo.</span></div>'
    });
  }

  area.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-acao]');
    if (!b) return;
    if (b.getAttribute('data-acao') === 'homologar') abrirHomologar();
    if (b.getAttribute('data-acao') === 'reabrir') abrirReabrir();
  });
  area.addEventListener('submit', function (ev) {
    if (ev.target.id !== 'form-calendario') return;
    ev.preventDefault();
    var h = $('#f-homologacao'), d = $('#f-divulgacao');
    var campo = d.closest('.gn-field');
    campo.classList.remove('gn-field--error');
    var antigo = campo.querySelector('[data-erro]'); if (antigo) antigo.remove();
    if (h && d && d.value <= h.value) { erroNoCampo(campo, d, 'A divulgação precisa ser depois do fim da homologação.'); return; }
    // SIMULAÇÃO: grava as datas do ciclo e registra no histórico.
    mostrarMensagem('positive', 'Calendário salvo', 'As novas datas valem para este ciclo e aparecem para os colaboradores na Visão geral.');
  });
  $('#f-ciclo').addEventListener('change', function (e) { cicloAtual = e.target.value; mensagens.innerHTML = ''; render(); });

  function estadoCheio(nomeIcone, classe, titulo, texto, acao) {
    $('#f-ciclo').closest('.gn-field').hidden = true;
    area.innerHTML = '<section class="gn-card"><div class="gn-empty"><span class="gn-empty__icon ' + classe + '">' + icone(nomeIcone) + '</span>' +
      '<h2 class="gn-empty__title">' + esc(titulo) + '</h2><p class="gn-empty__text">' + esc(texto) + '</p>' + (acao ? '<div class="gn-empty__actions">' + acao + '</div>' : '') + '</div></section>';
  }

  var acoes = {
    padrao: render,
    pronto: function () { pendenciasResolvidas = true; render(); },
    confirmar: function () { pendenciasResolvidas = true; render(); abrirHomologar(); },
    homologado: function () { pendenciasResolvidas = true; render(); abrirHomologar(); $('#dlg-conferi').checked = true; form.requestSubmit(); },
    'em-andamento': function () {
      emAndamento = true;
      document.querySelector('.tela-hoje').lastChild.textContent = 'Hoje: 21/10/2026 (simulado)';
      $('#f-ciclo').options[0].textContent = 'Outubro de 2026 (em andamento)';
      render();
    },
    setembro: function () { cicloAtual = '2026-09'; $('#f-ciclo').value = '2026-09'; render(); },
    reabrir: function () { cicloAtual = '2026-09'; $('#f-ciclo').value = '2026-09'; render(); abrirReabrir(); },
    'erro-justificativa': function () { cicloAtual = '2026-09'; $('#f-ciclo').value = '2026-09'; render(); abrirReabrir(); form.requestSubmit(); },
    carregando: function () {
      area.innerHTML = '<section class="gn-card" aria-busy="true"><div class="gn-card__body gn-stack"><span class="tela-esqueleto tela-esqueleto--lg"></span><span class="tela-esqueleto"></span></div></section>' +
        '<section class="gn-card"><div class="gn-card__body"><span class="tela-esqueleto tela-esqueleto--bloco"></span></div></section>';
    },
    erro: function () {
      estadoCheio('erro', 'gn-empty__icon--lock', 'Não foi possível carregar os ciclos', 'O Genial não respondeu. Nenhuma alteração foi perdida. Tente de novo em alguns instantes.',
        '<a class="gn-btn gn-btn--secondary" href="?estado=padrao">Tentar de novo</a>');
    },
    'sem-permissao': function () {
      estadoCheio('cadeado', 'gn-empty__icon--lock', 'Esta área é do RH', 'A administração do Reconhecimento é só para o RH. Se você precisa de acesso, fale com a TI.', '');
    }
  };
  (acoes[estado] || acoes.padrao)();
})();
