/* Ranking mensal — comportamento do protótipo (JS vanilla).
   CICLOS simula o que o backend devolve por ciclo; render() monta a tela.
   // SIMULAÇÃO: em produção, o ranking vem calculado do servidor (soma das pontuações, desempate por aprovadas). */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var estado = new URLSearchParams(location.search).get('estado') || 'padrao';
  var area = $('#area');
  var EU = 'Ana Ribeiro';

  var ICONES = {
    premio: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
    relogio: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    escudo: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    abrir: '<path d="m6 9 6 6 6-6"/>',
    alerta: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    cadeado: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    mais: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    subir: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>'
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

  /* ---------- Avatares (cartela em docs/design-system/assets/avatares) ---------- */
  // SIMULAÇÃO: o avatar escolhido por cada pessoa vem do perfil; o seu fica guardado no navegador neste protótipo.
  var AVATARES = { 'Ana Ribeiro': 2, 'Bruno Costa': 1, 'Marina Lopes': 8, 'Lucas Almeida': 5, 'Pedro Nunes': 9, 'Fernanda Rocha': 3, 'Rafael Souza': 7, 'Camila Duarte': 6, 'Diego Martins': 10, 'Patrícia Gomes': 4 };
  try { var salvo = Number(localStorage.getItem('genial-avatar')); if (salvo >= 1 && salvo <= 12) AVATARES[EU] = salvo; } catch (e) { /* sem armazenamento */ }
  function avatar(nome, classes) {
    var n = AVATARES[nome] || 1;
    return '<span class="gn-avatar gn-avatar--img ' + (classes || '') + '"><img src="design-system/assets/avatares/avatar-' + (n < 10 ? '0' : '') + n + '.svg" alt=""></span>';
  }
  function aplicarMeuAvatar() {
    document.querySelectorAll('.gn-user .gn-avatar, .gn-topbar .gn-avatar').forEach(function (el) {
      var pequeno = el.classList.contains('gn-avatar--sm');
      el.outerHTML = avatar(EU, pequeno ? 'gn-avatar--sm' : '');
    });
  }

  /* ---------- Dados fictícios ---------- */
  // entregas: [título, pontuação, resumo do resultado (só no ciclo homologado)]
  var CICLOS = {
    '2026-10': {
      nome: 'outubro', homologado: false, apuracao: '06/11', divulgacao: '10/11',
      pessoas: [
        { nome: 'Bruno Costa', papel: 'Desenvolvedor', aprovadas: 4, entregas: [['Monitoramento de erros do aplicativo', 4.4], ['Testes automatizados do checkout', 4.1], ['Correção de vazamento de memória', 3.6], ['Documentação da API de pedidos', 3.1]] },
        { nome: 'Marina Lopes', papel: 'Analista de qualidade', aprovadas: 4, entregas: [['Automação dos testes de regressão', 4.9], ['Roteiro de testes de acessibilidade', 4.7], ['Treinamento de testes para estagiários', 4.2]] },
        { nome: 'Lucas Almeida', papel: 'Analista de infraestrutura', aprovadas: 3, entregas: [['Automação do backup dos servidores', 4.8], ['Redução de alertas falsos no monitoramento', 4.5], ['Inventário de servidores do cliente', 4.5]] },
        { nome: 'Ana Ribeiro', papel: 'Desenvolvedora', aprovadas: 4, entregas: [['Automatização do relatório de vendas', 4.6], ['Correção do cálculo de comissões em produção', 4.1], ['Documentação do processo de deploy', 3.2]] },
        { nome: 'Pedro Nunes', papel: 'Desenvolvedor', aprovadas: 2, entregas: [['Recuperação do ambiente após falha no cliente', 4.9], ['Integração com o novo meio de pagamento', 4.8]] },
        { nome: 'Fernanda Rocha', papel: 'Analista de dados', aprovadas: 2, entregas: [['Painel de vendas diárias', 4.4], ['Limpeza da base de clientes', 4.0]] },
        { nome: 'Rafael Souza', papel: 'Desenvolvedor', aprovadas: 2, entregas: [['Busca de produtos mais rápida', 4.3], ['Ajuste no cadastro de fornecedores', 3.6]] },
        { nome: 'Camila Duarte', papel: 'Analista de suporte', aprovadas: 1, entregas: [['Base de respostas para o suporte', 4.6]] },
        { nome: 'Diego Martins', papel: 'Desenvolvedor', aprovadas: 1, entregas: [['Correção na emissão de notas', 4.1]] },
        { nome: 'Patrícia Gomes', papel: 'Analista de requisitos', aprovadas: 1, entregas: [['Mapa do processo de devoluções', 3.5]] }
      ]
    },
    '2026-09': {
      nome: 'setembro', homologado: true, homologadoEm: '09/10', divulgadoEm: '10/10',
      pessoas: [
        { nome: 'Marina Lopes', papel: 'Analista de qualidade', aprovadas: 4, entregas: [
          ['Testes de carga do portal', 4.8, 'O portal aguentou 3 vezes o pico de acessos esperado para a Black Friday, sem quedas.'],
          ['Correção de 40 falhas de acessibilidade', 4.7, 'O portal passou na avaliação de acessibilidade do cliente na primeira tentativa.'],
          ['Roteiro de homologação com o cliente', 4.6, 'As homologações caíram de 5 para 2 dias.'],
          ['Treinamento de QA para a equipe do cliente', 4.3, 'Seis pessoas do cliente passaram a escrever os próprios casos de teste.']] },
        { nome: 'Ana Ribeiro', papel: 'Desenvolvedora', aprovadas: 3, entregas: [
          ['Painel de indicadores de atendimento', 4.9, 'A coordenação deixou de montar o relatório semanal à mão e passou a agir no mesmo dia.'],
          ['Padronização dos testes automatizados da API', 4.3, 'Os testes da API passaram a rodar em todas as alterações, com o mesmo padrão nas 3 equipes.'],
          ['Revisão do controle de acesso do sistema interno', 3.8, '214 permissões sem uso removidas; a auditoria do trimestre passou sem apontamentos.']] },
        { nome: 'Bruno Costa', papel: 'Desenvolvedor', aprovadas: 3, entregas: [
          ['Deploy do aplicativo em um clique', 4.5, 'Os deploys passaram de 40 para 5 minutos.'],
          ['Monitoramento de desempenho do aplicativo', 4.2, 'Lentidões passaram a ser vistas antes dos usuários em 9 de cada 10 casos.'],
          ['Atualização do framework do aplicativo', 3.9, 'O aplicativo ficou compatível com as versões novas dos celulares.']] },
        { nome: 'Lucas Almeida', papel: 'Analista de infraestrutura', aprovadas: 2, entregas: [
          ['Plano de recuperação de desastres', 4.7, 'No teste, o ambiente voltou em 40 minutos. Antes, levava 6 horas.'],
          ['Automação da renovação de certificados', 4.4, 'Nenhum certificado expirou desde a automação.']] },
        { nome: 'Pedro Nunes', papel: 'Desenvolvedor', aprovadas: 2, entregas: [
          ['Integração com o sistema de frete', 4.5, 'A cotação de frete no checkout caiu para 2 segundos.'],
          ['Relatório de vendas por região', 4.3, 'Os gerentes regionais recebem os números toda segunda de manhã.']] },
        { nome: 'Fernanda Rocha', papel: 'Analista de dados', aprovadas: 1, entregas: [['Revisão dos contratos de API', 4.7, 'Os erros de integração caíram pela metade.']] },
        { nome: 'Rafael Souza', papel: 'Desenvolvedor', aprovadas: 1, entregas: [['Script de conferência de estoque', 4.2, 'A conferência mensal passou de 1 dia para 1 hora.']] },
        { nome: 'Camila Duarte', papel: 'Analista de suporte', aprovadas: 1, entregas: [['Guia de boas práticas de SQL', 3.9, 'As consultas lentas caíram 30%.']] }
      ]
    }
  };

  /* ---------- Cálculo (no servidor, em produção) ---------- */
  function classificar(ciclo) {
    var lista = ciclo.pessoas.map(function (p) {
      var total = p.entregas.reduce(function (s, e) { return s + e[1]; }, 0);
      return { nome: p.nome, papel: p.papel, aprovadas: p.aprovadas, entregas: p.entregas, total: Math.round(total * 10) / 10 };
    });
    lista.sort(function (a, b) { return b.total - a.total || b.aprovadas - a.aprovadas; });
    lista.forEach(function (p, i) {
      p.posicao = i + 1;
      p.desempate = !!(lista[i - 1] && lista[i - 1].total === p.total) || !!(lista[i + 1] && lista[i + 1].total === p.total);
    });
    return lista;
  }

  /* ---------- Blocos ---------- */
  function blocoTabela(c, lista, aberto) {
    var linhas = lista.map(function (p, i) {
      var eu = p.nome === EU;
      var id = 'entregas-' + i;
      var detalhe = p.entregas.slice().sort(function (a, b) { return b[1] - a[1]; }).map(function (e) {
        return '<li><div class="tela-entrega-publica__linha"><span class="tela-entrega-publica__titulo">' + esc(e[0]) + '</span>' +
          '<span class="tela-pontos">' + num(e[1]) + '</span></div>' +
          (c.homologado && e[2] ? '<p class="tela-entrega-publica__resumo">' + esc(e[2]) + '</p>' : '') + '</li>';
      }).join('');
      var posicao = p.posicao === 1
        ? '<span class="tela-posicao tela-posicao--primeiro">' + icone('premio', 'gn-icon--sm') + p.posicao + 'º</span>'
        : '<span class="tela-posicao">' + p.posicao + 'º</span>';
      var expandido = aberto === i;
      return '<tr class="' + (eu ? 'tela-linha-eu' : '') + '">' +
        '<td>' + posicao + '</td>' +
        '<td><span class="tela-pessoa">' + avatar(p.nome, '') +
          '<span class="tela-pessoa__texto"><span class="tela-pessoa__nome">' + esc(p.nome) + (eu ? ' <span class="gn-badge gn-badge--info tela-badge-voce">Você</span>' : '') + '</span>' +
          '<span class="tela-pessoa__papel">' + esc(p.papel) + '</span></span></span></td>' +
        '<td class="is-num">' + p.aprovadas + (p.desempate ? ' <span class="tela-desempate" title="Empate em pontos: fica à frente quem teve mais entregas aprovadas">' + icone('info', 'gn-icon--sm') + '<span class="gn-sr">Empate em pontos, desempate pelas entregas aprovadas</span></span>' : '') + '</td>' +
        '<td class="is-num"><span class="tela-pontos">' + num(p.total) + '</span></td>' +
        '<td class="tela-col-acao"><button class="gn-btn gn-btn--ghost gn-btn--sm tela-btn-abrir" type="button" aria-expanded="' + expandido + '" aria-controls="' + id + '" data-abrir="' + i + '">' +
          (eu ? 'Suas entregas' : 'Entregas') + icone('abrir', 'gn-icon--sm tela-seta') + '</button></td>' +
      '</tr>' +
      '<tr class="tela-linha-detalhe" id="' + id + '"' + (expandido ? '' : ' hidden') + '><td></td><td colspan="4"><ul class="tela-entregas-publicas">' + detalhe + '</ul>' +
        (c.homologado ? '' : '<p class="gn-help tela-sem-margem">O resumo do resultado aparece depois da homologação.</p>') + '</td></tr>';
    }).join('');
    return '<div class="gn-table-wrap"><table class="gn-table tela-ranking">' +
      '<caption class="gn-sr">Ranking de ' + c.nome + (c.homologado ? ', oficial' : ', em apuração') + '</caption>' +
      '<thead><tr><th scope="col">Posição</th><th scope="col">Colaborador</th><th scope="col" class="is-num">Aprovadas</th><th scope="col" class="is-num">Pontos</th><th scope="col"><span class="gn-sr">Entregas</span></th></tr></thead>' +
      '<tbody>' + linhas + '</tbody></table></div>';
  }

  function blocoSuaPosicao(c, lista) {
    var eu = lista.filter(function (p) { return p.nome === EU; })[0];
    if (!eu) {
      return '<section class="gn-card" aria-labelledby="t-posicao"><div class="gn-card__header"><h2 class="gn-card__title" id="t-posicao">Sua posição</h2></div>' +
        '<div class="gn-card__body gn-stack"><p class="tela-sem-margem">Você ainda não pontuou em ' + c.nome + '. Entregas aprovadas e avaliadas entram no ranking.</p>' +
        '<a class="gn-btn gn-btn--primary" href="../cadastrar-entrega/index.html">' + icone('mais') + 'Cadastrar entrega</a></div></section>';
    }
    var acima = lista[eu.posicao - 2];
    var distancia = acima
      ? (c.homologado ? 'Você ficou a ' + num(acima.total - eu.total) + ' pts do ' + acima.posicao + 'º lugar.' : 'Faltam ' + num(acima.total - eu.total) + ' pts para o ' + acima.posicao + 'º lugar.')
      : (c.homologado ? 'Você foi o Destaque de ' + c.nome + '.' : 'Você lidera o ranking de ' + c.nome + '.');
    return '<section class="gn-card" aria-labelledby="t-posicao"><div class="gn-card__header"><h2 class="gn-card__title" id="t-posicao">Sua posição</h2>' +
      (c.homologado ? '' : '<span class="gn-badge gn-badge--info">' + icone('relogio') + 'Em apuração</span>') + '</div>' +
      '<div class="gn-card__body gn-stack">' +
        '<div class="tela-sua-posicao">' + avatar(EU, 'gn-avatar--lg') + '<span class="tela-sua-posicao__valor">' + eu.posicao + 'º</span><span class="tela-sua-posicao__de">de ' + lista.length + '</span></div>' +
        '<dl class="tela-readouts"><div class="gn-readout"><dt>Pontos</dt><dd class="gn-num">' + num(eu.total) + ' pts</dd></div><div class="gn-readout"><dt>Entregas aprovadas</dt><dd class="gn-num">' + eu.aprovadas + '</dd></div></dl>' +
        '<p class="tela-sem-margem tela-distancia">' + icone('subir', 'gn-icon--sm') + esc(distancia) + '</p>' +
        '<a class="gn-btn gn-btn--secondary gn-btn--sm tela-alinha-inicio" href="../minhas-entregas/index.html">Ver minhas entregas</a>' +
      '</div></section>';
  }

  /* Pódio e participantes: as pessoas em primeiro plano */
  function blocoPodio(c, lista) {
    var itens = lista.slice(0, 3).map(function (p) {
      var eu = p.nome === EU;
      var medalha = p.posicao === 1
        ? icone('premio') + (c.homologado ? 'Destaque do Mês' : '1º')
        : p.posicao + 'º';
      return '<li class="gn-podium__item gn-podium__item--' + p.posicao + '">' +
        '<span class="gn-podium__avatar">' + avatar(p.nome, 'gn-avatar--xl' + (p.posicao === 1 ? ' gn-avatar--destaque' : '')) +
          '<span class="gn-podium__medalha">' + medalha + '</span></span>' +
        '<span class="gn-podium__nome">' + esc(p.nome) + '</span>' +
        (eu ? '<span class="gn-badge gn-badge--info tela-badge-voce">Você</span>' : '<span class="gn-podium__papel">' + esc(p.papel) + '</span>') +
        '<span class="gn-podium__pontos">' + num(p.total) + ' pts</span>' +
        '<span class="gn-podium__meta">' + p.aprovadas + (p.aprovadas === 1 ? ' aprovada' : ' aprovadas') + '</span>' +
        '<span class="gn-podium__degrau" aria-hidden="true">' + p.posicao + '</span></li>';
    }).join('');
    var pilha = lista.map(function (p) { return avatar(p.nome, 'gn-avatar--sm'); }).join('');
    var titulo = c.homologado ? 'Os três primeiros de ' + c.nome : 'Quem lidera ' + c.nome;
    return '<section class="gn-card tela-podio" aria-labelledby="t-podio">' +
      '<div class="gn-card__header"><div><h2 class="gn-card__title" id="t-podio">' + titulo + '</h2>' +
        '<p class="gn-card__subtitle">' + (c.homologado ? 'Resultado oficial, homologado em ' + c.homologadoEm : 'Posições em apuração; o resultado oficial sai em ' + c.divulgacao) + '</p></div>' +
        (c.homologado ? '<span class="gn-badge gn-badge--positive">' + icone('escudo') + 'Oficial</span>' : '<span class="gn-badge gn-badge--info">' + icone('relogio') + 'Em apuração</span>') + '</div>' +
      '<div class="gn-card__body tela-podio__corpo"><ol class="gn-podium">' + itens + '</ol></div>' +
      '<div class="gn-card__footer tela-participantes"><span class="gn-avatar-stack" aria-hidden="true">' + pilha + '</span>' +
        '<span class="tela-participantes__texto"><b>' + lista.length + ' pessoas</b> participando em ' + c.nome + '</span></div>' +
      '</section>';
  }

  function blocoDestaques(c, lista) {
    var todas = [];
    lista.forEach(function (p) { p.entregas.forEach(function (e) { todas.push({ pessoa: p.nome, titulo: e[0], nota: e[1], resumo: e[2] }); }); });
    todas.sort(function (a, b) { return b.nota - a.nota; });
    var itens = todas.slice(0, 5).map(function (e) {
      return '<li><div class="tela-entrega-publica__linha"><span class="tela-entrega-publica__titulo">' + esc(e.titulo) + '</span><span class="tela-pontos">' + num(e.nota) + '</span></div>' +
        '<span class="tela-entrega-publica__autor">' + esc(e.pessoa) + '</span>' +
        (c.homologado && e.resumo ? '<p class="tela-entrega-publica__resumo">' + esc(e.resumo) + '</p>' : '') + '</li>';
    }).join('');
    return '<section class="gn-card" aria-labelledby="t-melhores"><div class="gn-card__header"><div><h2 class="gn-card__title" id="t-melhores">Entregas de destaque</h2>' +
      '<p class="gn-card__subtitle">As 5 maiores pontuações de ' + c.nome + '</p></div></div>' +
      '<div class="gn-card__body"><ul class="tela-entregas-publicas tela-entregas-publicas--separadas">' + itens + '</ul></div></section>';
  }

  function blocoRegras() {
    return '<section class="gn-card" aria-labelledby="t-regras"><div class="gn-card__header"><h2 class="gn-card__title" id="t-regras">Como funciona</h2></div>' +
      '<div class="gn-card__body"><ol class="gn-steps">' +
        '<li><span class="gn-steps__num" aria-hidden="true">1</span><div class="gn-steps__body"><span class="gn-steps__title">Soma das pontuações</span><span class="gn-steps__text">Cada entrega aprovada e avaliada soma de 1 a 5 pontos.</span></div></li>' +
        '<li><span class="gn-steps__num" aria-hidden="true">2</span><div class="gn-steps__body"><span class="gn-steps__title">Empate</span><span class="gn-steps__text">Fica à frente quem teve mais entregas aprovadas no ciclo.</span></div></li>' +
        '<li><span class="gn-steps__num" aria-hidden="true">3</span><div class="gn-steps__body"><span class="gn-steps__title">Resultado oficial</span><span class="gn-steps__text">O RH homologa e o Destaque do Mês sai no dia 10.</span></div></li>' +
      '</ol></div></section>';
  }

  function estadoCheio(nomeIcone, classe, titulo, texto, acao) {
    area.innerHTML = '<section class="gn-card"><div class="gn-empty"><span class="gn-empty__icon ' + classe + '">' + icone(nomeIcone) + '</span>' +
      '<h2 class="gn-empty__title">' + esc(titulo) + '</h2><p class="gn-empty__text">' + esc(texto) + '</p>' +
      (acao ? '<div class="gn-empty__actions">' + acao + '</div>' : '') + '</div></section>';
  }

  var cicloAtual = '2026-10';
  var aberto = null;
  var semMim = false;

  function render() {
    var c = CICLOS[cicloAtual];
    var dados = semMim ? { pessoas: c.pessoas.filter(function (p) { return p.nome !== EU; }) } : c;
    var lista = classificar(dados);
    area.innerHTML = blocoPodio(c, lista) +
      '<div class="tela-grid"><div class="gn-stack tela-coluna">' + blocoTabela(c, lista, aberto) + blocoDestaques(c, lista) + '</div>' +
      '<aside class="gn-stack tela-coluna" aria-label="Sua posição e regras">' + blocoSuaPosicao(c, lista) + blocoRegras() + '</aside></div>';
  }

  $('#f-ciclo').addEventListener('change', function (e) {
    cicloAtual = e.target.value;
    aberto = null;
    render();
  });
  area.addEventListener('click', function (ev) {
    var botao = ev.target.closest('[data-abrir]');
    if (!botao) return;
    var i = Number(botao.getAttribute('data-abrir'));
    var linha = document.getElementById('entregas-' + i);
    var abrir = linha.hidden;
    linha.hidden = !abrir;
    botao.setAttribute('aria-expanded', String(abrir));
    aberto = abrir ? i : null;
  });

  /* ---------- Estados do protótipo ---------- */
  var acoes = {
    padrao: render,
    homologado: function () { cicloAtual = '2026-09'; $('#f-ciclo').value = '2026-09'; render(); },
    expandido: function () { aberto = 1; render(); },
    'sem-participacao': function () { semMim = true; render(); },
    vazio: function () {
      estadoCheio('premio', '', 'O ranking de outubro ainda não começou', 'Ele aparece quando a primeira entrega do ciclo for aprovada e avaliada. Que tal cadastrar a sua?',
        '<a class="gn-btn gn-btn--primary" href="../cadastrar-entrega/index.html">Cadastrar entrega</a>');
    },
    carregando: function () {
      var linhas = '';
      for (var i = 0; i < 6; i++) linhas += '<tr><td><span class="tela-esqueleto tela-esqueleto--sm"></span></td><td><span class="tela-esqueleto tela-esqueleto--lg"></span></td><td class="is-num"><span class="tela-esqueleto tela-esqueleto--sm"></span></td><td class="is-num"><span class="tela-esqueleto tela-esqueleto--sm"></span></td><td></td></tr>';
      area.innerHTML = '<div class="gn-table-wrap" aria-busy="true"><table class="gn-table"><thead><tr><th scope="col">Posição</th><th scope="col">Colaborador</th><th scope="col" class="is-num">Aprovadas</th><th scope="col" class="is-num">Pontos</th><th scope="col"><span class="gn-sr">Entregas</span></th></tr></thead><tbody>' + linhas + '</tbody></table></div>';
    },
    erro: function () {
      estadoCheio('alerta', 'gn-empty__icon--lock', 'Não foi possível carregar o ranking', 'O Genial não respondeu. Tente de novo em alguns instantes.',
        '<a class="gn-btn gn-btn--secondary" href="?estado=padrao">Tentar de novo</a>');
    },
    'sem-permissao': function () {
      estadoCheio('cadeado', 'gn-empty__icon--lock', 'Você não tem acesso ao Reconhecimento', 'O módulo é para colaboradores da Rumo. Se você deveria ter acesso, fale com o RH.',
        '<a class="gn-btn gn-btn--secondary" href="#">Falar com o RH</a>');
    }
  };
  aplicarMeuAvatar();
  (acoes[estado] || acoes.padrao)();
})();
