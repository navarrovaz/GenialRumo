/* Visão geral — comportamento do protótipo (JS vanilla).
   Os dados abaixo simulam o que o backend devolve; render() monta a tela.
   // SIMULAÇÃO: em produção, indicadores, etapas do ciclo e evolução vêm do servidor. */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var estado = new URLSearchParams(location.search).get('estado') || 'padrao';
  var area = $('#area');

  var ICONES = {
    tendencia: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    premio: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
    historico: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
    relogio: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    mensagem: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v2"/><path d="M12 13h.01"/>',
    lapis: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    enviar: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    alerta: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    cadeado: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    mais: '<path d="M5 12h14"/><path d="M12 5v14"/>',
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

  /* ---------- Dados fictícios ---------- */
  var ETAPAS = [
    { nome: 'Cadastro', data: 'até 31/10', situacao: 'atual', nota: 'faltam 10 dias' },
    { nome: 'Validação', data: 'até 05/11', situacao: 'proxima' },
    { nome: 'Apuração', data: '06/11', situacao: 'proxima' },
    { nome: 'Homologação', data: '07 a 09/11', situacao: 'proxima' },
    { nome: 'Destaque do Mês', data: '10/11', situacao: 'proxima' }
  ];
  // O programa começou em maio de 2026: meses anteriores não têm pontuação.
  var MESES = [
    { curto: 'Nov', nome: 'Novembro de 2025' }, { curto: 'Dez', nome: 'Dezembro de 2025' },
    { curto: 'Jan', nome: 'Janeiro de 2026' }, { curto: 'Fev', nome: 'Fevereiro de 2026' },
    { curto: 'Mar', nome: 'Março de 2026' }, { curto: 'Abr', nome: 'Abril de 2026' },
    { curto: 'Mai', nome: 'Maio de 2026', pts: 15.8, pos: 3, de: 9 },
    { curto: 'Jun', nome: 'Junho de 2026', pts: 12.4, pos: 6, de: 10 },
    { curto: 'Jul', nome: 'Julho de 2026', pts: 18.9, pos: 2, de: 9 },
    { curto: 'Ago', nome: 'Agosto de 2026', pts: 26.3, pos: 1, de: 10, destaque: true },
    { curto: 'Set', nome: 'Setembro de 2026', pts: 13.0, pos: 2, de: 8 },
    { curto: 'Out', nome: 'Outubro de 2026', pts: 11.9, pos: 4, de: 10, apuracao: true }
  ];
  var EU = 'Ana Ribeiro';
  // SIMULAÇÃO: avatar escolhido por cada pessoa (perfil); o seu fica guardado no navegador neste protótipo.
  var AVATARES = { 'Ana Ribeiro': 2, 'Bruno Costa': 1, 'Marina Lopes': 8, 'Lucas Almeida': 5, 'Pedro Nunes': 9, 'Fernanda Rocha': 3, 'Rafael Souza': 7, 'Camila Duarte': 6, 'Diego Martins': 10, 'Patrícia Gomes': 4 };
  try { var salvo = Number(localStorage.getItem('genial-avatar')); if (salvo >= 1 && salvo <= 12) AVATARES[EU] = salvo; } catch (e) { /* sem armazenamento */ }
  var RANKING = [
    { nome: 'Bruno Costa', papel: 'Desenvolvedor', pts: 15.2, aprovadas: 4 },
    { nome: 'Marina Lopes', papel: 'Analista de qualidade', pts: 13.8, aprovadas: 4 },
    { nome: 'Lucas Almeida', papel: 'Analista de infraestrutura', pts: 13.8, aprovadas: 3 },
    { nome: 'Ana Ribeiro', papel: 'Desenvolvedora', pts: 11.9, aprovadas: 4 },
    { nome: 'Pedro Nunes', papel: 'Desenvolvedor', pts: 9.7, aprovadas: 2 },
    { nome: 'Fernanda Rocha', papel: 'Analista de dados', pts: 8.4, aprovadas: 2 },
    { nome: 'Rafael Souza', papel: 'Desenvolvedor', pts: 7.9, aprovadas: 2 },
    { nome: 'Camila Duarte', papel: 'Analista de suporte', pts: 4.6, aprovadas: 1 },
    { nome: 'Diego Martins', papel: 'Desenvolvedor', pts: 4.1, aprovadas: 1 },
    { nome: 'Patrícia Gomes', papel: 'Analista de requisitos', pts: 3.5, aprovadas: 1 }
  ];
  var ULTIMAS = [
    ['Script de limpeza de logs', 'rascunho', 'Salvo em 21/10'],
    ['Treinamento de Git para a equipe do cliente', 'aguardando-validacao', 'Enviada em 20/10'],
    ['Migração do servidor de testes', 'ajustes-solicitados', 'Ajustes pedidos em 19/10']
  ];
  var STATUS = {
    'rascunho': ['neutral', 'lapis', 'Rascunho'],
    'aguardando-validacao': ['info', 'enviar', 'Aguardando validação'],
    'ajustes-solicitados': ['attention', 'mensagem', 'Ajustes solicitados']
  };

  /* ---------- Blocos ---------- */
  /* Ciclo em uma linha discreta (pedido do dono do produto: menos destaque) */
  function blocoCiclo() {
    var itens = ETAPAS.map(function (e) {
      var atual = e.situacao === 'atual';
      return '<li class="tela-ciclo__etapa' + (atual ? ' tela-ciclo__etapa--atual' : '') + '"' + (atual ? ' aria-current="step"' : '') + '>' +
        (atual ? icone('relogio', 'gn-icon--sm') : '') + '<span>' + esc(e.nome) + ' <span class="gn-num">' + esc(e.data) + '</span>' +
        (atual ? ' · ' + esc(e.nota) : '') + '</span></li>';
    }).join('');
    return '<nav class="tela-ciclo" aria-label="Etapas do ciclo de outubro"><span class="tela-ciclo__rotulo">Ciclo de outubro</span><ol class="tela-ciclo__etapas">' + itens + '</ol></nav>';
  }

  /* Ranking do mês com as pessoas em primeiro plano */
  function avatar(nome, classes) {
    var n = AVATARES[nome] || 1;
    return '<span class="gn-avatar gn-avatar--img ' + (classes || '') + '"><img src="design-system/assets/avatares/avatar-' + (n < 10 ? '0' : '') + n + '.svg" alt=""></span>';
  }
  function blocoRanking() {
    var R = primeiroAcesso ? RANKING.filter(function (p) { return p.nome !== EU; }) : RANKING;
    var podio = R.slice(0, 3).map(function (p, i) {
      var pos = i + 1;
      return '<li class="gn-podium__item gn-podium__item--' + pos + '"><span class="gn-podium__avatar">' + avatar(p.nome, 'gn-avatar--xl' + (pos === 1 ? ' gn-avatar--destaque' : '')) +
        '<span class="gn-podium__medalha">' + (pos === 1 ? icone('premio') : '') + pos + 'º</span></span>' +
        '<span class="gn-podium__nome">' + esc(p.nome) + '</span><span class="gn-podium__papel">' + esc(p.papel) + '</span>' +
        '<span class="gn-podium__pontos">' + num(p.pts) + ' pts</span><span class="gn-podium__meta">' + p.aprovadas + ' aprovadas</span>' +
        '<span class="gn-podium__degrau" aria-hidden="true">' + pos + '</span></li>';
    }).join('');
    var lista = R.slice(3, 8).map(function (p, i) {
      var eu = p.nome === EU;
      return '<li class="tela-lista-rk__item' + (eu ? ' tela-lista-rk__item--eu' : '') + '"><span class="tela-lista-rk__pos">' + (i + 4) + 'º</span>' + avatar(p.nome, 'gn-avatar--sm') +
        '<span class="tela-lista-rk__nome">' + esc(p.nome) + (eu ? ' <span class="gn-badge gn-badge--info tela-badge-voce">Você</span>' : '') + '</span>' +
        '<span class="tela-lista-rk__pts">' + num(p.pts) + '</span></li>';
    }).join('');
    var pilha = R.map(function (p) { return avatar(p.nome, 'gn-avatar--sm'); }).join('');
    return '<section class="gn-card" aria-labelledby="t-ranking"><div class="gn-card__header"><div><h2 class="gn-card__title" id="t-ranking">Ranking de outubro</h2>' +
      '<p class="gn-card__subtitle">Em apuração; o resultado oficial e o Destaque do Mês saem em 10/11</p></div>' +
      '<a class="gn-btn gn-btn--secondary gn-btn--sm" href="../ranking-mensal/index.html">Ver ranking completo</a></div>' +
      '<div class="gn-card__body tela-rk"><ol class="gn-podium tela-rk__podio">' + podio + '</ol>' +
        '<div class="tela-rk__lista"><ol class="tela-lista-rk" start="4">' + lista + '</ol>' +
        '<p class="gn-help tela-sem-margem">E mais ' + (R.length - 8) + ' pessoas. Em caso de empate, fica à frente quem teve mais entregas aprovadas.</p></div></div>' +
      '<div class="gn-card__footer tela-rk__rodape"><span class="gn-avatar-stack" aria-hidden="true">' + pilha + '</span>' +
        '<span><b class="tela-forte">' + R.length + ' pessoas</b> participando em outubro</span>' +
        '<span class="tela-rk__anterior">' + icone('premio', 'gn-icon--sm') + 'Destaque de setembro: ' + avatar('Marina Lopes', 'gn-avatar--sm') + '<span><b class="tela-forte">Marina Lopes</b>, 18,4 pts</span></span></div>' +
      '</section>';
  }

  function stat(rotulo, nomeIcone, valor, meta) {
    return '<div class="gn-card gn-stat"><div class="gn-stat__head"><span class="gn-stat__label">' + rotulo + '</span><span class="gn-stat__icon">' + icone(nomeIcone) + '</span></div>' +
      '<span class="gn-stat__value">' + valor + '</span><span class="gn-stat__meta">' + meta + '</span></div>';
  }
  function blocoIndicadores() {
    return '<div class="gn-grid-stats">' +
      stat('Saldo de outubro', 'tendencia', '11,9 pts', '3 entregas avaliadas · em apuração até 06/11') +
      stat('Posição no ranking', 'premio', '4º <span class="tela-de">de 10</span>', 'Em apuração · <a class="tela-link" href="../ranking-mensal/index.html">ver ranking</a>') +
      stat('Saldo histórico', 'historico', '86,4 pts', 'Desde maio de 2026 · média de 17,3 por mês') +
      stat('Pendentes', 'relogio', '2', '1 com o validador · 1 aguardando avaliação') +
      '</div>';
  }

  function blocoPrecisam() {
    return '<div class="gn-alert gn-alert--attention" role="status">' + icone('mensagem') + '<div class="gn-alert__body">' +
      '<span class="gn-alert__title">2 entregas precisam de você</span>' +
      '<span class="gn-alert__text">Um rascunho ainda não enviado e um pedido de ajustes de Carlos Andrade. O cadastro de outubro vai até 31/10.</span></div>' +
      '<div class="gn-alert__actions"><a class="gn-btn gn-btn--secondary gn-btn--sm" href="../minhas-entregas/index.html">Ver minhas entregas</a></div></div>';
  }

  function blocoEvolucao(meses, comoTabela) {
    var lista = MESES.slice(MESES.length - meses);
    var MAX = 30;
    var corpo;
    if (comoTabela) {
      corpo = '<div class="gn-table-wrap"><table class="gn-table"><caption class="gn-sr">Pontos e posição por mês</caption>' +
        '<thead><tr><th scope="col">Mês</th><th scope="col" class="is-num">Pontos</th><th scope="col" class="is-num">Posição</th><th scope="col">Situação</th></tr></thead><tbody>' +
        lista.map(function (m) {
          if (m.pts == null) return '<tr><td>' + m.nome + '</td><td class="is-num is-empty">—</td><td class="is-num is-empty">—</td><td class="gn-muted">Antes do programa</td></tr>';
          return '<tr><td>' + m.nome + '</td><td class="is-num"><b class="gn-num">' + num(m.pts) + '</b></td><td class="is-num gn-num">' + m.pos + 'º de ' + m.de + '</td><td>' +
            (m.apuracao ? 'Em apuração' : (m.destaque ? 'Destaque do Mês' : 'Homologado')) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    } else {
      var colunas = lista.map(function (m) {
        if (m.pts == null) {
          return '<div class="tela-coluna tela-coluna--vazia" role="img" aria-label="' + m.nome + ': antes do programa"><div class="tela-coluna__trilho"></div>' +
            '<span class="tela-coluna__mes">' + m.curto + '</span><span class="tela-coluna__pos">—</span></div>';
        }
        var rotulo = m.apuracao || m.destaque ? '<span class="tela-coluna__valor" style="bottom:calc(' + (m.pts / MAX * 100) + '% + 6px)">' + (m.destaque ? icone('premio', 'gn-icon--sm') : '') + num(m.pts) + '</span>' : '';
        var descricao = m.nome + ': ' + num(m.pts) + ' pontos, ' + m.pos + 'º de ' + m.de + (m.destaque ? ', Destaque do Mês' : '') + (m.apuracao ? ', em apuração' : '');
        return '<div class="tela-coluna' + (m.apuracao ? ' tela-coluna--apuracao' : '') + '" tabindex="0" role="img" aria-label="' + descricao + '">' +
          '<div class="tela-coluna__trilho">' + rotulo + '<span class="tela-coluna__barra" style="height:' + (m.pts / MAX * 100) + '%"></span></div>' +
          '<span class="tela-coluna__mes">' + m.curto + '</span><span class="tela-coluna__pos">' + m.pos + 'º</span>' +
          '<span class="tela-dica" aria-hidden="true"><b>' + m.nome + '</b><br>' + num(m.pts) + ' pts · ' + m.pos + 'º de ' + m.de + (m.destaque ? '<br>Destaque do Mês' : '') + (m.apuracao ? '<br>Em apuração' : '') + '</span></div>';
      }).join('');
      corpo = '<figure class="tela-grafico" aria-labelledby="t-evolucao">' +
        '<div class="tela-grafico__plot">' +
          '<div class="tela-grafico__grade" aria-hidden="true"><span data-v="30" style="bottom:100%"></span><span data-v="20" style="bottom:66.667%"></span><span data-v="10" style="bottom:33.333%"></span><span data-v="0" style="bottom:0"></span></div>' +
          '<div class="tela-grafico__colunas" style="grid-template-columns:repeat(' + lista.length + ', minmax(0, 1fr))">' + colunas + '</div>' +
        '</div>' +
        '<figcaption class="tela-grafico__legenda"><span class="tela-legenda-item"><span class="tela-amostra" aria-hidden="true"></span>Homologado</span>' +
          '<span class="tela-legenda-item"><span class="tela-amostra tela-amostra--apuracao" aria-hidden="true"></span>Em apuração</span>' +
          '<span class="tela-legenda-item">' + icone('premio', 'gn-icon--sm') + 'Destaque do Mês</span>' +
          (meses === 12 ? '<span class="tela-legenda-item gn-muted">O programa começou em maio de 2026.</span>' : '') + '</figcaption></figure>';
    }
    return '<section class="gn-card" aria-labelledby="t-evolucao"><div class="gn-card__header"><div><h2 class="gn-card__title" id="t-evolucao">Sua evolução</h2>' +
      '<p class="gn-card__subtitle">Pontos por mês e posição no ranking</p></div>' +
      '<div class="gn-row tela-controles"><div class="gn-segmented" role="group" aria-label="Período">' +
        '<button type="button" data-meses="6" aria-pressed="' + (meses === 6) + '">6 meses</button><button type="button" data-meses="12" aria-pressed="' + (meses === 12) + '">12 meses</button></div>' +
        '<button class="gn-btn gn-btn--ghost gn-btn--sm" type="button" data-tabela>' + (comoTabela ? 'Ver como gráfico' : 'Ver como tabela') + '</button></div></div>' +
      '<div class="gn-card__body">' + corpo + '</div></section>';
  }

  function blocoUltimas() {
    var itens = ULTIMAS.map(function (u) {
      var s = STATUS[u[1]];
      return '<li><a class="tela-ultima" href="../detalhe-entrega/index.html?estado=' + u[1] + '"><span class="tela-ultima__texto"><span class="tela-ultima__titulo">' + esc(u[0]) + '</span>' +
        '<span class="tela-ultima__meta">' + esc(u[2]) + '</span></span><span class="gn-badge gn-badge--' + s[0] + '">' + icone(s[1]) + s[2] + '</span>' + icone('seta', 'gn-icon--sm tela-ultima__seta') + '</a></li>';
    }).join('');
    return '<section class="gn-card" aria-labelledby="t-ultimas"><div class="gn-card__header"><h2 class="gn-card__title" id="t-ultimas">Suas últimas entregas</h2>' +
      '<a class="gn-btn gn-btn--ghost gn-btn--sm" href="../minhas-entregas/index.html">Ver todas</a></div>' +
      '<ul class="tela-ultimas">' + itens + '</ul></section>';
  }

  function blocoReconhecimentos() {
    return '<section class="gn-card" aria-labelledby="t-reconhec"><div class="gn-card__header"><h2 class="gn-card__title" id="t-reconhec">Seus reconhecimentos</h2></div>' +
      '<div class="gn-card__body gn-stack">' +
        '<div class="tela-reconhecimento"><span class="tela-reconhecimento__icone">' + icone('premio') + '</span><div><b class="tela-forte">Destaque do Mês de agosto de 2026</b>' +
        '<p class="gn-help tela-sem-margem">26,3 pts · 1º de 10 · 6 entregas aprovadas</p></div></div>' +
        '<dl class="tela-readouts"><div class="gn-readout"><dt>Melhor posição</dt><dd>1º, agosto</dd></div><div class="gn-readout"><dt>Meses no ranking</dt><dd class="gn-num">6</dd></div></dl>' +
        '<a class="gn-btn gn-btn--secondary gn-btn--sm tela-alinha-inicio" href="../historico-reconhecimentos/index.html">Ver histórico de reconhecimentos</a>' +
      '</div></section>';
  }

  function blocoBoasVindas() {
    return '<section class="gn-card" aria-labelledby="t-bemvindo"><div class="gn-card__header"><div><h2 class="gn-card__title" id="t-bemvindo">Comece pelo que você entregou este mês</h2>' +
      '<p class="gn-card__subtitle">A participação é voluntária. Cadastre as entregas de que você mais se orgulha.</p></div></div>' +
      '<div class="gn-card__body gn-stack"><ol class="gn-steps">' +
        '<li><span class="gn-steps__num" aria-hidden="true">1</span><div class="gn-steps__body"><span class="gn-steps__title">Você cadastra a entrega</span><span class="gn-steps__text">O que fez, em quanto tempo e qual foi o resultado.</span></div></li>' +
        '<li><span class="gn-steps__num" aria-hidden="true">2</span><div class="gn-steps__body"><span class="gn-steps__title">O gestor avalia</span><span class="gn-steps__text">Aprova se a entrega for relevante pelo impacto e pelo esforço.</span></div></li>' +
        '<li><span class="gn-steps__num" aria-hidden="true">3</span><div class="gn-steps__body"><span class="gn-steps__title">A IA atribui a pontuação</span><span class="gn-steps__text">De 1 a 5, com justificativa e critérios iguais para todos.</span></div></li>' +
        '<li><span class="gn-steps__num" aria-hidden="true">4</span><div class="gn-steps__body"><span class="gn-steps__title">Ranking e Destaque do Mês</span><span class="gn-steps__text">O RH homologa e divulga o resultado no dia 10.</span></div></li>' +
      '</ol></div></section>';
  }

  /* ---------- Montagem ---------- */
  var meses = 6;
  var comoTabela = false;
  var primeiroAcesso = false;

  function render() {
    if (primeiroAcesso) {
      area.innerHTML = blocoCiclo() + blocoBoasVindas() + blocoRanking() +
        '<section class="gn-card"><div class="gn-empty"><span class="gn-empty__icon">' + icone('tendencia') + '</span>' +
        '<h2 class="gn-empty__title">Sua evolução aparece aqui</h2><p class="gn-empty__text">Depois da sua primeira entrega avaliada, você acompanha pontos e posição mês a mês.</p></div></section>';
      return;
    }
    area.innerHTML = blocoCiclo() + blocoPrecisam() + blocoRanking() + blocoIndicadores() +
      '<div class="tela-grid"><div class="gn-stack tela-coluna-principal">' + blocoEvolucao(meses, comoTabela) + blocoUltimas() + '</div>' +
      '<aside class="gn-stack tela-coluna-principal" aria-label="Seus reconhecimentos">' + blocoReconhecimentos() + '</aside></div>';
  }

  area.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-meses]');
    if (b) { meses = Number(b.getAttribute('data-meses')); render(); area.querySelector('[data-meses="' + meses + '"]').focus(); return; }
    if (ev.target.closest('[data-tabela]')) { comoTabela = !comoTabela; render(); area.querySelector('[data-tabela]').focus(); }
  });

  function estadoCheio(nomeIcone, classe, titulo, texto, acao) {
    area.innerHTML = '<section class="gn-card"><div class="gn-empty"><span class="gn-empty__icon ' + classe + '">' + icone(nomeIcone) + '</span>' +
      '<h2 class="gn-empty__title">' + esc(titulo) + '</h2><p class="gn-empty__text">' + esc(texto) + '</p>' +
      (acao ? '<div class="gn-empty__actions">' + acao + '</div>' : '') + '</div></section>';
  }

  /* ---------- Seu avatar (componente AvatarPicker) ---------- */
  var dialogo = $('#dlg-avatar');
  var formAvatar = $('#form-avatar');
  var focoAnterior = null;
  function aplicarMeuAvatar() {
    var n = AVATARES[EU];
    var src = 'design-system/assets/avatares/avatar-' + (n < 10 ? '0' : '') + n + '.svg';
    $('#meu-avatar img').src = src;
    document.querySelectorAll('.gn-user .gn-avatar, .gn-topbar .gn-avatar').forEach(function (el) {
      var pequeno = el.classList.contains('gn-avatar--sm');
      el.outerHTML = avatar(EU, pequeno ? 'gn-avatar--sm' : '');
    });
  }
  function abrirAvatar() {
    focoAnterior = document.activeElement;
    formAvatar.querySelectorAll('input[name="avatar"]').forEach(function (r) { r.checked = Number(r.value) === AVATARES[EU]; });
    dialogo.hidden = false;
    formAvatar.querySelector('input[name="avatar"]:checked').focus();
  }
  function fecharAvatar() {
    dialogo.hidden = true;
    if (focoAnterior) focoAnterior.focus();
  }
  $('#btn-avatar').addEventListener('click', abrirAvatar);
  dialogo.querySelector('[data-fechar]').addEventListener('click', fecharAvatar);
  dialogo.addEventListener('click', function (ev) { if (ev.target === dialogo) fecharAvatar(); });
  dialogo.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { fecharAvatar(); return; }
    if (ev.key !== 'Tab') return;
    var focaveis = dialogo.querySelectorAll('input[name="avatar"]:checked, button');
    var primeiro = focaveis[0];
    var ultimo = focaveis[focaveis.length - 1];
    if (ev.shiftKey && document.activeElement === primeiro) { ev.preventDefault(); ultimo.focus(); }
    else if (!ev.shiftKey && document.activeElement === ultimo) { ev.preventDefault(); primeiro.focus(); }
  });
  formAvatar.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var escolhido = formAvatar.querySelector('input[name="avatar"]:checked');
    AVATARES[EU] = Number(escolhido.value);
    // SIMULAÇÃO: grava o avatar no perfil; neste protótipo, no navegador.
    try { localStorage.setItem('genial-avatar', String(AVATARES[EU])); } catch (e) { /* sem armazenamento */ }
    aplicarMeuAvatar();
    if (!primeiroAcesso && area.querySelector('#t-ranking')) render();
    fecharAvatar();
  });

  var acoes = {
    'escolher-avatar': function () { render(); abrirAvatar(); },
    padrao: render,
    'doze-meses': function () { meses = 12; render(); },
    tabela: function () { comoTabela = true; render(); },
    'primeiro-acesso': function () {
      primeiroAcesso = true;
      document.querySelector('.gn-page__desc').textContent = 'Boa tarde, Ana. Boas-vindas ao Reconhecimento profissional.';
      render();
    },
    carregando: function () {
      var esq = '<span class="tela-esqueleto tela-esqueleto--lg"></span>';
      area.innerHTML = '<div class="gn-grid-stats" aria-busy="true">' + [1, 2, 3, 4].map(function () {
        return '<div class="gn-card gn-stat"><span class="tela-esqueleto"></span>' + esq + '<span class="tela-esqueleto"></span></div>';
      }).join('') + '</div><section class="gn-card"><div class="gn-card__body"><div class="tela-esqueleto-grafico"></div></div></section>';
    },
    erro: function () {
      estadoCheio('alerta', 'gn-empty__icon--lock', 'Não foi possível carregar a visão geral', 'O Genial não respondeu. Suas entregas e pontos continuam salvos. Tente de novo em alguns instantes.',
        '<a class="gn-btn gn-btn--secondary" href="?estado=padrao">Tentar de novo</a>');
    },
    'sem-permissao': function () {
      $('#btn-cadastrar').hidden = true;
      estadoCheio('cadeado', 'gn-empty__icon--lock', 'Você não tem acesso ao Reconhecimento', 'O módulo é para colaboradores da Rumo. Se você deveria ter acesso, fale com o RH.',
        '<a class="gn-btn gn-btn--secondary" href="#">Falar com o RH</a>');
    }
  };
  aplicarMeuAvatar();
  (acoes[estado] || acoes.padrao)();
})();
