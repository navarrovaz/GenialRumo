/* Histórico de reconhecimentos — comportamento do protótipo (JS vanilla).
   MEU, COLEGAS e DESTAQUES simulam o que o backend devolve (só ciclos homologados); render() monta a tela.
   // SIMULAÇÃO: em produção, os dados vêm do servidor, já filtrados para o que é público. */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var estado = new URLSearchParams(location.search).get('estado') || 'padrao';
  var area = $('#area');
  var EU = 'Ana Ribeiro';

  var ICONES = {
    premio: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
    busca: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    abrir: '<path d="m6 9 6 6 6-6"/>',
    relogio: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    alerta: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    cadeado: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    historico: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>'
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

  /* ---------- Avatares (cartela do design system) ---------- */
  var AVATARES = { 'Ana Ribeiro': 2, 'Bruno Costa': 1, 'Marina Lopes': 8, 'Lucas Almeida': 5, 'Pedro Nunes': 9, 'Fernanda Rocha': 3, 'Rafael Souza': 7, 'Camila Duarte': 6, 'Diego Martins': 10, 'Patrícia Gomes': 4 };
  try { var salvo = Number(localStorage.getItem('genial-avatar')); if (salvo >= 1 && salvo <= 12) AVATARES[EU] = salvo; } catch (e) { /* sem armazenamento */ }
  function avatar(nome, classes) {
    var n = AVATARES[nome] || 1;
    return '<span class="gn-avatar gn-avatar--img ' + (classes || '') + '"><img src="../../../docs/design-system/assets/avatares/avatar-' + (n < 10 ? '0' : '') + n + '.svg" alt=""></span>';
  }
  function aplicarMeuAvatar() {
    document.querySelectorAll('.gn-user .gn-avatar, .gn-topbar .gn-avatar').forEach(function (el) {
      el.outerHTML = avatar(EU, el.classList.contains('gn-avatar--sm') ? 'gn-avatar--sm' : '');
    });
  }

  /* ---------- Dados fictícios (só ciclos homologados) ---------- */
  // ciclo: [mês, posição, participantes, pontos, destaque, entregas: [título, pontuação, resumo]]
  var MEU = {
    nome: 'Ana Ribeiro', papel: 'Desenvolvedora',
    ciclos: [
      ['Setembro de 2026', 2, 8, 13.0, false, [
        ['Painel de indicadores de atendimento', 4.9, 'A coordenação deixou de montar o relatório semanal à mão e passou a agir no mesmo dia.'],
        ['Padronização dos testes automatizados da API', 4.3, 'Os testes da API passaram a rodar em todas as alterações, com o mesmo padrão nas 3 equipes.'],
        ['Revisão do controle de acesso do sistema interno', 3.8, '214 permissões sem uso removidas; a auditoria do trimestre passou sem apontamentos.']]],
      ['Agosto de 2026', 1, 10, 26.3, true, [
        ['Recuperação dos pedidos perdidos na falha do servidor', 5.0, 'Recuperou 1.200 pedidos que teriam sido perdidos.'],
        ['Deploy sem parada do sistema', 5.0, 'O sistema deixou de ficar fora do ar nas atualizações.'],
        ['Redução do custo de envio de e-mails', 4.6, 'O custo mensal caiu 40%.'],
        ['Monitoramento de pagamentos recusados', 4.2, 'Problemas com a operadora passaram a ser vistos em minutos.'],
        ['Treinamento de testes para a equipe', 3.8, 'Quatro pessoas passaram a escrever testes automatizados.'],
        ['Ajuste na exportação para o contábil', 3.7, 'O contábil recebe o arquivo sem retrabalho.']]],
      ['Julho de 2026', 2, 9, 18.9, false, [
        ['Correção do cálculo de impostos', 4.9, 'Evitou cobranças erradas em cerca de 300 notas por mês.'],
        ['Painel de acompanhamento de entregas', 4.8, 'A logística passou a ver os atrasos no mesmo dia.'],
        ['Automação do fechamento mensal', 4.7, 'O fechamento caiu de 2 dias para 4 horas.'],
        ['Migração dos relatórios para o novo banco', 4.5, 'Os relatórios ficaram 5 vezes mais rápidos.']]],
      ['Junho de 2026', 6, 10, 12.4, false, [
        ['Integração com o sistema de estoque', 4.5, 'Os vendedores passaram a ver o estoque real na hora do pedido.'],
        ['Correção de duplicidade de pedidos', 4.2, 'Nenhum pedido duplicado desde a correção.'],
        ['Atualização da biblioteca de relatórios', 3.7, 'Os relatórios voltaram a abrir no navegador novo do cliente.']]],
      ['Maio de 2026', 3, 9, 15.8, false, [
        ['Script de importação de pedidos', 4.4, 'A importação diária passou de 3 horas para 20 minutos.'],
        ['Correção de lentidão no login', 4.1, 'O login voltou a responder em menos de 1 segundo.'],
        ['Testes do módulo de cadastro', 3.9, 'Os erros em produção do cadastro caíram de 6 para 1 por mês.'],
        ['Guia de padrões de código da equipe', 3.4, 'As revisões de código ficaram mais curtas.']]]
    ]
  };

  var COLEGAS = [
    { nome: 'Marina Lopes', papel: 'Analista de qualidade', ciclos: [
      ['Setembro de 2026', 1, 8, 18.4, true, [
        ['Testes de carga do portal', 4.8, 'O portal aguentou 3 vezes o pico de acessos esperado para a Black Friday, sem quedas.'],
        ['Correção de 40 falhas de acessibilidade', 4.7, 'O portal passou na avaliação de acessibilidade do cliente na primeira tentativa.'],
        ['Roteiro de homologação com o cliente', 4.6, 'As homologações caíram de 5 para 2 dias.'],
        ['Treinamento de QA para a equipe do cliente', 4.3, 'Seis pessoas do cliente passaram a escrever os próprios casos de teste.']]],
      ['Agosto de 2026', 4, 10, 14.1, false, [
        ['Automação dos testes de pagamento', 4.9, 'Os testes de pagamento passaram de 1 dia para 15 minutos.'],
        ['Plano de testes do aplicativo novo', 4.8, 'O aplicativo foi lançado sem erros graves.'],
        ['Checklist de acessibilidade', 4.4, 'A equipe passou a revisar acessibilidade antes de cada entrega.']]]] },
    { nome: 'Bruno Costa', papel: 'Desenvolvedor', ciclos: [
      ['Setembro de 2026', 3, 8, 12.6, false, [
        ['Deploy do aplicativo em um clique', 4.5, 'Os deploys passaram de 40 para 5 minutos.'],
        ['Monitoramento de desempenho do aplicativo', 4.2, 'Lentidões passaram a ser vistas antes dos usuários em 9 de cada 10 casos.'],
        ['Atualização do framework do aplicativo', 3.9, 'O aplicativo ficou compatível com as versões novas dos celulares.']]],
      ['Julho de 2026', 1, 9, 20.7, true, [
        ['Aplicativo funcionando sem internet', 4.9, 'Os vendedores registram pedidos mesmo sem sinal; o aplicativo sincroniza depois.'],
        ['Redução do tamanho do aplicativo', 4.6, 'O aplicativo ficou 60% menor e abre na metade do tempo.'],
        ['Notificações de pedido aprovado', 4.0, 'Os vendedores deixaram de ligar para saber se o pedido foi aprovado.'],
        ['Correção de falhas no login com biometria', 3.8, 'As reclamações de login caíram 70%.'],
        ['Documentação das telas do aplicativo', 3.4, 'Pessoas novas na equipe começam a contribuir na primeira semana.']]]] },
    { nome: 'Lucas Almeida', papel: 'Analista de infraestrutura', ciclos: [
      ['Setembro de 2026', 4, 8, 9.1, false, [
        ['Plano de recuperação de desastres', 4.7, 'No teste, o ambiente voltou em 40 minutos. Antes, levava 6 horas.'],
        ['Automação da renovação de certificados', 4.4, 'Nenhum certificado expirou desde a automação.']]],
      ['Junho de 2026', 1, 10, 17.2, true, [
        ['Migração dos servidores para a nuvem', 4.8, 'O custo de infraestrutura caiu 25% no primeiro mês.'],
        ['Alertas de disco cheio', 4.4, 'Nenhuma parada por falta de espaço desde a mudança.'],
        ['Padronização dos ambientes de teste', 4.1, 'Novos ambientes ficam prontos em 1 hora, não mais em 2 dias.'],
        ['Inventário de licenças de software', 3.9, 'Licenças sem uso canceladas, com economia mensal.']]]] },
    { nome: 'Pedro Nunes', papel: 'Desenvolvedor', ciclos: [
      ['Setembro de 2026', 5, 8, 8.8, false, [
        ['Integração com o sistema de frete', 4.5, 'A cotação de frete no checkout caiu para 2 segundos.'],
        ['Relatório de vendas por região', 4.3, 'Os gerentes regionais recebem os números toda segunda de manhã.']]],
      ['Maio de 2026', 1, 9, 19.3, true, [
        ['Checkout em uma página', 5.0, 'A desistência no checkout caiu de 38% para 24%.'],
        ['Integração com pagamento por Pix', 4.7, 'O Pix virou 30% dos pagamentos em um mês.'],
        ['Cupom de desconto no aplicativo', 4.9, 'As campanhas de cupom passaram a ser criadas pelo marketing, sem desenvolvimento.'],
        ['Correção no cálculo de frete grátis', 4.7, 'Fim das reclamações de frete cobrado indevidamente.']]]] },
    { nome: 'Fernanda Rocha', papel: 'Analista de dados', ciclos: [
      ['Setembro de 2026', 6, 8, 4.7, false, [['Revisão dos contratos de API', 4.7, 'Os erros de integração caíram pela metade.']]]] },
    { nome: 'Rafael Souza', papel: 'Desenvolvedor', ciclos: [
      ['Setembro de 2026', 7, 8, 4.2, false, [['Script de conferência de estoque', 4.2, 'A conferência mensal passou de 1 dia para 1 hora.']]]] },
    { nome: 'Camila Duarte', papel: 'Analista de suporte', ciclos: [
      ['Setembro de 2026', 8, 8, 3.9, false, [['Guia de boas práticas de SQL', 3.9, 'As consultas lentas caíram 30%.']]]] },
    { nome: 'Diego Martins', papel: 'Desenvolvedor', ciclos: [] },
    { nome: 'Patrícia Gomes', papel: 'Analista de requisitos', ciclos: [] }
  ];

  var DESTAQUES = [
    ['Setembro de 2026', 'Marina Lopes', 'Analista de qualidade', 18.4, 8],
    ['Agosto de 2026', 'Ana Ribeiro', 'Desenvolvedora', 26.3, 10],
    ['Julho de 2026', 'Bruno Costa', 'Desenvolvedor', 20.7, 9],
    ['Junho de 2026', 'Lucas Almeida', 'Analista de infraestrutura', 17.2, 10],
    ['Maio de 2026', 'Pedro Nunes', 'Desenvolvedor', 19.3, 9]
  ];

  /* ---------- Blocos ---------- */
  function resumoPessoa(ciclos) {
    var total = 0, entregas = 0, melhor = null, destaques = 0;
    ciclos.forEach(function (c) {
      total += c[3]; entregas += c[5].length; if (c[4]) destaques++;
      if (!melhor || c[1] < melhor[1]) melhor = c;
    });
    return { total: total, entregas: entregas, melhor: melhor, destaques: destaques };
  }

  function blocoCabecalhoPessoa(nome, papel, ciclos, eu) {
    var r = resumoPessoa(ciclos);
    var leituras = ciclos.length
      ? '<dl class="tela-leituras">' +
          '<div class="gn-readout"><dt>Saldo histórico</dt><dd class="gn-num">' + num(r.total) + ' pts</dd></div>' +
          '<div class="gn-readout"><dt>Ciclos homologados</dt><dd class="gn-num">' + ciclos.length + '</dd></div>' +
          '<div class="gn-readout"><dt>Entregas homologadas</dt><dd class="gn-num">' + r.entregas + '</dd></div>' +
          '<div class="gn-readout"><dt>Melhor posição</dt><dd>' + r.melhor[1] + 'º, ' + esc(r.melhor[0].split(' de ')[0].toLowerCase()) + '</dd></div>' +
          '<div class="gn-readout"><dt>Destaques do Mês</dt><dd class="gn-num">' + r.destaques + '</dd></div>' +
        '</dl>'
      : '<p class="gn-help tela-sem-margem">Ainda sem entregas homologadas.</p>';
    return '<section class="gn-card tela-pessoa-card"><div class="gn-card__body tela-pessoa-card__corpo">' +
      avatar(nome, 'gn-avatar--xl' + (r.destaques ? ' gn-avatar--destaque' : '')) +
      '<div class="tela-pessoa-card__texto"><h2 class="tela-pessoa-card__nome" id="t-pessoa">' + esc(nome) + (eu ? ' <span class="gn-badge gn-badge--info">Você</span>' : '') + '</h2>' +
      '<p class="gn-help tela-sem-margem">' + esc(papel) + '</p>' + leituras + '</div></div></section>';
  }

  function blocoCiclos(ciclos, abertos) {
    return '<ol class="tela-ciclos">' + ciclos.map(function (c, i) {
      var entregas = c[5].slice().sort(function (a, b) { return b[1] - a[1]; }).map(function (e) {
        return '<li><div class="tela-entrega__linha"><span class="tela-entrega__titulo">' + esc(e[0]) + '</span><span class="tela-pontos">' + num(e[1]) + '</span></div>' +
          '<p class="tela-entrega__resumo">' + esc(e[2]) + '</p></li>';
      }).join('');
      return '<li><details class="gn-card tela-ciclo"' + (i < abertos ? ' open' : '') + '>' +
        '<summary class="tela-ciclo__resumo"><span class="tela-ciclo__mes">' + esc(c[0]) + '</span>' +
          (c[4] ? '<span class="gn-badge gn-badge--positive">' + icone('premio') + 'Destaque do Mês</span>' : '') +
          '<span class="tela-ciclo__dados"><span class="gn-num">' + c[1] + 'º de ' + c[2] + '</span> · <b class="gn-num">' + num(c[3]) + ' pts</b> · ' + c[5].length + (c[5].length === 1 ? ' entrega' : ' entregas') + '</span>' +
          icone('abrir', 'gn-icon--sm tela-ciclo__seta') + '</summary>' +
        '<ul class="tela-entregas">' + entregas + '</ul></details></li>';
    }).join('') + '</ol>';
  }

  function abaMeu(semHistorico) {
    if (semHistorico) {
      return blocoCabecalhoPessoa(MEU.nome, MEU.papel, [], true) +
        '<section class="gn-card"><div class="gn-empty"><span class="gn-empty__icon">' + icone('historico') + '</span>' +
        '<h2 class="gn-empty__title">Seu histórico começa no primeiro ciclo homologado</h2>' +
        '<p class="gn-empty__text">Quando o RH homologar um ciclo em que você teve entregas avaliadas, elas aparecem aqui. Outubro é homologado em 10/11.</p>' +
        '<div class="gn-empty__actions"><a class="gn-btn gn-btn--primary" href="../cadastrar-entrega/index.html">Cadastrar entrega</a></div></div></section>';
    }
    return blocoCabecalhoPessoa(MEU.nome, MEU.papel, MEU.ciclos, true) +
      '<div class="gn-alert gn-alert--info" role="note">' + icone('relogio') + '<div class="gn-alert__body"><span class="gn-alert__text">Outubro entra no histórico depois da homologação, em 10/11. Até lá, acompanhe em <a class="tela-link" href="../minhas-entregas/index.html">Minhas entregas</a>.</span></div></div>' +
      blocoCiclos(MEU.ciclos, 2);
  }

  var colegaAberta = 0;
  var busca = '';
  function abaColegas() {
    var filtrados = COLEGAS.map(function (p, i) { return { p: p, i: i }; }).filter(function (x) {
      return x.p.nome.toLowerCase().indexOf(busca.toLowerCase()) >= 0;
    });
    var lista = filtrados.length
      ? '<ul class="tela-lista-pessoas">' + filtrados.map(function (x) {
          var r = resumoPessoa(x.p.ciclos);
          return '<li><button class="tela-pessoa-item" type="button" data-colega="' + x.i + '"' + (x.i === colegaAberta ? ' aria-current="true"' : '') + '>' +
            avatar(x.p.nome, 'gn-avatar--sm') + '<span class="tela-pessoa-item__texto"><span class="tela-pessoa-item__nome">' + esc(x.p.nome) + '</span>' +
            '<span class="tela-pessoa-item__papel">' + esc(x.p.papel) + '</span></span>' +
            (r.destaques ? '<span class="tela-pessoa-item__premio" title="Destaque do Mês">' + icone('premio', 'gn-icon--sm') + '<span class="gn-sr">Já foi Destaque do Mês</span></span>' : '') + '</button></li>';
        }).join('') + '</ul>'
      : '<div class="gn-empty tela-empty-compacto"><span class="gn-empty__icon">' + icone('busca') + '</span><p class="gn-empty__title">Ninguém encontrado para "' + esc(busca) + '"</p>' +
        '<div class="gn-empty__actions"><button class="gn-btn gn-btn--secondary gn-btn--sm" type="button" data-limpar>Limpar busca</button></div></div>';
    var p = COLEGAS[colegaAberta];
    var detalhe = filtrados.length
      ? blocoCabecalhoPessoa(p.nome, p.papel, p.ciclos, false) +
        (p.ciclos.length ? blocoCiclos(p.ciclos, 1) : '<section class="gn-card"><div class="gn-empty tela-empty-compacto"><span class="gn-empty__icon">' + icone('historico') + '</span><p class="gn-empty__text">' + esc(p.nome.split(' ')[0]) + ' ainda não tem entregas em ciclos homologados.</p></div></section>')
      : '';
    return '<div class="tela-colegas"><section class="gn-card tela-colegas__lista" aria-label="Colegas">' +
        '<div class="gn-card__body tela-busca"><div class="gn-field"><label class="gn-sr" for="f-busca">Buscar colega</label>' +
        '<div class="gn-input-wrap">' + icone('busca') + '<input class="gn-input" id="f-busca" type="search" placeholder="Buscar pelo nome" value="' + esc(busca) + '" autocomplete="off"></div></div></div>' +
        lista + '</section>' +
      '<div class="gn-stack tela-colegas__detalhe" aria-labelledby="t-pessoa">' + detalhe + '</div></div>';
  }

  function abaDestaques() {
    return '<ul class="tela-galeria">' + DESTAQUES.map(function (d) {
      var eu = d[1] === EU;
      var pessoa = eu ? MEU : COLEGAS.filter(function (c) { return c.nome === d[1]; })[0];
      var ciclo = pessoa.ciclos.filter(function (c) { return c[0] === d[0]; })[0];
      var top = ciclo[5].slice().sort(function (a, b) { return b[1] - a[1]; }).slice(0, 2).map(function (e) {
        return '<li><span class="tela-entrega__titulo">' + esc(e[0]) + '</span><p class="tela-entrega__resumo">' + esc(e[2]) + '</p></li>';
      }).join('');
      return '<li class="gn-card tela-destaque' + (eu ? ' tela-destaque--eu' : '') + '"><div class="gn-card__body tela-destaque__corpo">' +
        '<p class="overline tela-sem-margem tela-destaque__mes">' + icone('premio', 'gn-icon--sm') + esc(d[0].toUpperCase()) + '</p>' +
        avatar(d[1], 'gn-avatar--xl gn-avatar--destaque') +
        '<div><h2 class="tela-destaque__nome">' + esc(d[1]) + '</h2>' + (eu ? '<span class="gn-badge gn-badge--info">Você</span>' : '<p class="gn-help tela-sem-margem">' + esc(d[2]) + '</p>') + '</div>' +
        '<p class="tela-destaque__pontos"><b class="gn-num">' + num(d[3]) + ' pts</b> · ' + ciclo[5].length + ' entregas · entre ' + d[4] + ' pessoas</p>' +
        '<ul class="tela-entregas tela-entregas--destaque">' + top + '</ul></div></li>';
    }).join('') + '</ul>';
  }

  /* ---------- Montagem ---------- */
  var aba = 'meu';
  var semHistorico = false;
  function render() {
    document.querySelectorAll('[data-aba]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-aba') === aba)); });
    area.innerHTML = aba === 'meu' ? abaMeu(semHistorico) : (aba === 'colegas' ? abaColegas() : abaDestaques());
  }

  $('#abas').addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-aba]');
    if (!b) return;
    aba = b.getAttribute('data-aba');
    render();
  });
  area.addEventListener('click', function (ev) {
    var c = ev.target.closest('[data-colega]');
    if (c) {
      colegaAberta = Number(c.getAttribute('data-colega'));
      render();
      var titulo = $('#t-pessoa'); if (titulo) { titulo.setAttribute('tabindex', '-1'); titulo.focus(); }
      return;
    }
    if (ev.target.closest('[data-limpar]')) { busca = ''; render(); $('#f-busca').focus(); }
  });
  area.addEventListener('input', function (ev) {
    if (ev.target.id !== 'f-busca') return;
    busca = ev.target.value;
    var pos = ev.target.selectionStart;
    var visiveis = COLEGAS.map(function (p, i) { return i; }).filter(function (i) { return COLEGAS[i].nome.toLowerCase().indexOf(busca.toLowerCase()) >= 0; });
    if (visiveis.length && visiveis.indexOf(colegaAberta) < 0) colegaAberta = visiveis[0];
    render();
    var campo = $('#f-busca'); campo.focus(); campo.setSelectionRange(pos, pos);
  });

  function estadoCheio(nomeIcone, classe, titulo, texto, acao) {
    $('#abas').hidden = true;
    area.innerHTML = '<section class="gn-card"><div class="gn-empty"><span class="gn-empty__icon ' + classe + '">' + icone(nomeIcone) + '</span>' +
      '<h2 class="gn-empty__title">' + esc(titulo) + '</h2><p class="gn-empty__text">' + esc(texto) + '</p>' +
      (acao ? '<div class="gn-empty__actions">' + acao + '</div>' : '') + '</div></section>';
  }

  var acoes = {
    padrao: render,
    colegas: function () { aba = 'colegas'; render(); },
    'colega-aberto': function () { aba = 'colegas'; colegaAberta = 0; render(); },
    'busca-vazia': function () { aba = 'colegas'; busca = 'Joaquim'; render(); },
    destaques: function () { aba = 'destaques'; render(); },
    'sem-historico': function () { semHistorico = true; render(); },
    carregando: function () {
      area.innerHTML = '<section class="gn-card" aria-busy="true"><div class="gn-card__body tela-pessoa-card__corpo"><span class="tela-esqueleto tela-esqueleto--circulo"></span><div class="gn-stack"><span class="tela-esqueleto tela-esqueleto--lg"></span><span class="tela-esqueleto"></span></div></div></section>' +
        '<section class="gn-card"><div class="gn-card__body"><span class="tela-esqueleto tela-esqueleto--lg"></span></div></section>';
    },
    erro: function () {
      estadoCheio('alerta', 'gn-empty__icon--lock', 'Não foi possível carregar o histórico', 'O Genial não respondeu. Tente de novo em alguns instantes.',
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
