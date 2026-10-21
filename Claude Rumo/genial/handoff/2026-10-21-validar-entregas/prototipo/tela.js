/* Validação de entregas (gestor interno) — comportamento do protótipo (JS vanilla).
   FILA e DECIDIDAS simulam o que o backend devolve; render*() montam a fila, a entrega aberta e a tabela.
   Trechos que representam chamadas ao backend estão marcados com // SIMULAÇÃO. */
(function () {
  'use strict';

  // Seu avatar (cartela do design system). SIMULAÇÃO: em produção vem do perfil; aqui, da escolha feita na Visão geral.
  try {
    var meuAvatar = Number(localStorage.getItem('genial-avatar'));
    if (meuAvatar >= 1 && meuAvatar <= 12) {
      document.querySelectorAll('[data-meu-avatar]').forEach(function (img) {
        img.src = img.src.replace(/avatar-\d+\.svg/, 'avatar-' + (meuAvatar < 10 ? '0' : '') + meuAvatar + '.svg');
      });
    }
  } catch (e) { /* sem armazenamento */ }

  var $ = function (sel) { return document.querySelector(sel); };
  var estado = new URLSearchParams(location.search).get('estado') || 'padrao';
  var mensagens = $('#mensagens');

  /* ---------- Ícones (Lucide) ---------- */
  var ICONES = {
    send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    mensagem: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v2"/><path d="M12 13h.01"/>',
    alerta: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    ok: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    arquivo: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    caixa: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    cadeado: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    refazer: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>'
  };
  function icone(nome, classe) {
    return '<svg class="gn-icon' + (classe ? ' ' + classe : '') + '" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONES[nome] + '</svg>';
  }
  function esc(texto) {
    var div = document.createElement('div');
    div.textContent = texto == null ? '' : String(texto);
    return div.innerHTML;
  }
  var AVATARES = { 'Bruno Costa': 1, 'Marina Lopes': 8, 'Lucas Almeida': 5, 'Ana Ribeiro': 2 };
  function avatar(nome, iniciais, classes) {
    var n = AVATARES[nome];
    if (!n) return '<span class="gn-avatar ' + (classes || '') + '" aria-hidden="true">' + esc(iniciais) + '</span>';
    return '<span class="gn-avatar gn-avatar--img ' + (classes || '') + '"><img src="design-system/assets/avatares/avatar-' + (n < 10 ? '0' : '') + n + '.svg" alt=""></span>';
  }
  function badge(variante, nomeIcone, texto) {
    return '<span class="gn-badge gn-badge--' + variante + '">' + icone(nomeIcone) + esc(texto) + '</span>';
  }
  var DECISOES = {
    aprovar: { badge: ['positive', 'ok', 'Aprovada'], mensagem: 'Entrega aprovada', texto: ' vê a decisão em Minhas entregas, e a entrega segue para a avaliação da IA.' },
    ajustes: { badge: ['attention', 'mensagem', 'Ajustes solicitados'], mensagem: 'Ajustes solicitados', texto: ' vê o seu comentário e pode reenviar até 05/11.' },
    recusar: { badge: ['negative', 'alerta', 'Recusada'], mensagem: 'Entrega recusada', texto: ' vê a sua justificativa. A entrega não conta pontos.' }
  };

  /* ---------- Dados fictícios ---------- */
  var FILA = [
    {
      id: 'e1', nome: 'Bruno Costa', primeiroNome: 'Bruno', iniciais: 'BC', papel: 'Desenvolvedor · alocado em cliente',
      titulo: 'Redução do tempo de build do aplicativo', enviada: '19/10', espera: 'há 2 dias',
      descricao: 'Reorganizei o pipeline de build do aplicativo móvel do cliente, com cache de dependências e etapas em paralelo.',
      tempo: '5 dias', origem: 'Foi uma iniciativa dele',
      resultado: 'O build caiu de 42 para 11 minutos. A equipe faz em média 30 builds por dia, o que libera cerca de 15 horas de espera por dia.',
      evidencias: [['arquivo', 'comparativo-tempos-build.pdf', 'Arquivo · 140 KB']]
    },
    {
      id: 'e2', nome: 'Marina Lopes', primeiroNome: 'Marina', iniciais: 'ML', papel: 'Analista de qualidade · alocada em cliente',
      titulo: 'Atendimento à auditoria de segurança do cliente', enviada: '20/10', espera: 'ontem',
      descricao: 'Organizei as evidências técnicas pedidas pela auditoria de segurança do cliente e corrigi os 4 pontos levantados na pré-auditoria.',
      tempo: '3 semanas', origem: 'Foi uma demanda que ela recebeu',
      resultado: 'A auditoria terminou sem nenhuma não conformidade. No ano anterior foram 7.',
      evidencias: [['link', 'https://exemplo.com/resumo-auditoria-sem-dados-do-cliente', 'Link']]
    },
    {
      id: 'e3', nome: 'Lucas Almeida', primeiroNome: 'Lucas', iniciais: 'LA', papel: 'Analista de infraestrutura',
      titulo: 'Painel de custos de nuvem', enviada: '21/10', espera: 'hoje',
      descricao: 'Criei um painel com o custo diário de nuvem por projeto, com alerta quando o gasto passa da média.',
      tempo: '1 semana', origem: 'Foi uma iniciativa dele',
      resultado: 'Em 10 dias, o painel mostrou 3 servidores esquecidos ligados. Desligá-los reduziu o custo mensal em cerca de 18%.',
      evidencias: []
    },
    {
      id: 'e4', nome: 'Ana Ribeiro', primeiroNome: 'Ana', iniciais: 'AR', papel: 'Desenvolvedora · alocada em cliente',
      titulo: 'Migração do servidor de testes', enviada: '21/10', espera: 'hoje',
      reenvio: { pedido: '19/10', comentario: 'Ficou bom, mas faltou o resultado: quanto tempo os testes levavam antes e depois da migração? Inclua também quem passou a usar o servidor novo.' },
      descricao: 'Migrei o ambiente de testes do cliente para um servidor novo, com os testes automatizados rodando a cada alteração.',
      tempo: '10 dias', origem: 'Foi uma demanda que ela recebeu',
      resultado: 'Os testes, que levavam 50 minutos, agora rodam em 12. As 3 equipes de desenvolvimento do cliente passaram a usar o servidor novo.',
      evidencias: [['arquivo', 'tempos-antes-depois.png', 'Arquivo · 88 KB']]
    }
  ];
  var DECIDIDAS = [
    { nome: 'Ana Ribeiro', iniciais: 'AR', titulo: 'Monitoramento de filas com alertas', decisao: 'aprovar', data: '18/10' },
    { nome: 'Bruno Costa', iniciais: 'BC', titulo: 'Atualização das bibliotecas do aplicativo', decisao: 'ajustes', data: '16/10' },
    { nome: 'Ana Ribeiro', iniciais: 'AR', titulo: 'Ajuste no layout do portal de pedidos', decisao: 'recusar', data: '13/10' },
    { nome: 'Marina Lopes', iniciais: 'ML', titulo: 'Roteiro de testes de acessibilidade', decisao: 'aprovar', data: '12/10' },
    { nome: 'Ana Ribeiro', iniciais: 'AR', titulo: 'Automatização do relatório de vendas', decisao: 'aprovar', data: '09/10' }
  ];
  var selecionada = FILA[0] ? FILA[0].id : null;

  /* ---------- Fila ---------- */
  function renderFila() {
    $('#fila').innerHTML = FILA.map(function (e) {
      return '<li><button class="tela-fila__item" type="button" data-id="' + e.id + '"' + (e.id === selecionada ? ' aria-current="true"' : '') + '>' +
        avatar(e.nome, e.iniciais, 'gn-avatar--sm') +
        '<span class="tela-fila__texto"><span class="tela-fila__nome">' + esc(e.nome) + '</span>' +
        '<span class="tela-fila__titulo">' + esc(e.titulo) + '</span>' +
        '<span class="tela-fila__meta">' + (e.reenvio ? 'Reenviada ' : 'Enviada ') + esc(e.espera) + ' · ' + esc(e.enviada) + '</span></span>' +
        (e.reenvio ? '<span class="gn-badge gn-badge--info tela-fila__badge">' + icone('refazer') + 'Reenviada</span>' : '') +
        '</button></li>';
    }).join('');
    $('#cont-pendentes').textContent = FILA.length;
    $('#menu-contagem').textContent = FILA.length;
    $('#menu-contagem').setAttribute('aria-label', FILA.length + ' aguardando você');
    $('#menu-contagem').hidden = FILA.length === 0;
  }

  /* ---------- Entrega aberta + decisão ---------- */
  function renderDetalhe() {
    var e = FILA.filter(function (x) { return x.id === selecionada; })[0];
    var painel = $('#detalhe');
    if (!e) {
      painel.innerHTML = '<div class="gn-empty"><span class="gn-empty__icon">' + icone('ok') + '</span>' +
        '<h2 class="gn-empty__title">Nenhuma entrega aguardando você</h2>' +
        '<p class="gn-empty__text">Quando alguém indicar você para confirmar uma entrega, ela aparece aqui e você recebe um e-mail.</p>' +
        '<div class="gn-empty__actions"><button class="gn-btn gn-btn--secondary" type="button" data-ir="decididas">Ver decididas por você</button></div></div>';
      return;
    }
    var evid = e.evidencias.length
      ? '<ul class="gn-attach-list">' + e.evidencias.map(function (ev) {
          return '<li class="gn-attach">' + icone(ev[0] === 'link' ? 'link' : 'arquivo') +
            '<div class="gn-attach__text"><a class="gn-attach__name" href="#">' + esc(ev[1]) + '</a><span class="gn-attach__meta">' + esc(ev[2]) + '</span></div></li>';
        }).join('') + '</ul>'
      : '<span class="gn-muted">Nenhuma evidência anexada</span>';
    var reenvio = e.reenvio
      ? '<div class="gn-alert gn-alert--info" role="note">' + icone('refazer') + '<div class="gn-alert__body">' +
        '<span class="gn-alert__title">' + esc(e.primeiroNome) + ' ajustou e reenviou em ' + esc(e.enviada) + '</span>' +
        '<span class="gn-alert__text">Seu pedido de ajustes de ' + esc(e.reenvio.pedido) + ': "' + esc(e.reenvio.comentario) + '"</span></div></div>'
      : '';
    painel.innerHTML =
      '<div class="gn-card__header">' +
        '<div class="gn-user tela-pessoa">' + avatar(e.nome, e.iniciais, '') + '<div class="tela-min0"><div class="gn-user__name">' + esc(e.nome) + '</div><div class="gn-user__role">' + esc(e.papel) + '</div></div></div>' +
        badge('info', 'send', 'Aguardando validação') +
      '</div>' +
      '<div class="gn-card__body tela-detalhe__corpo">' + reenvio +
        '<div><h2 class="tela-detalhe__titulo" id="t-entrega" tabindex="-1">' + esc(e.titulo) + '</h2>' +
        '<p class="gn-help tela-sem-margem">Enviada em ' + esc(e.enviada) + ' · decida até 05/11</p></div>' +
        '<dl class="tela-conteudo">' +
          '<div><dt>O que foi entregue</dt><dd>' + esc(e.descricao) + '</dd></div>' +
          '<div class="tela-conteudo__par"><div><dt>Em quanto tempo</dt><dd>' + esc(e.tempo) + '</dd></div><div><dt>Como a entrega começou</dt><dd>' + esc(e.origem) + '</dd></div></div>' +
          '<div><dt>Resultado informado</dt><dd>' + esc(e.resultado) + '</dd></div>' +
          '<div><dt>Evidências</dt><dd>' + evid + '</dd></div>' +
        '</dl>' +
      '</div>' +
      '<form class="tela-decisao" id="form-decisao" novalidate aria-labelledby="t-decisao">' +
        '<h3 class="tela-subtitulo" id="t-decisao">Sua decisão</h3>' +
        '<ul class="tela-guia">' +
          '<li>' + icone('check', 'gn-icon--sm') + 'A entrega aconteceu como ' + esc(e.primeiroNome) + ' descreveu?</li>' +
          '<li>' + icone('check', 'gn-icon--sm') + 'É relevante pelo impacto e pelo esforço, além da rotina?</li>' +
          '<li>' + icone('info', 'gn-icon--sm') + 'Você não dá nota: a IA pontua as entregas aprovadas.</li>' +
        '</ul>' +
        '<div class="gn-field" data-campo="comentario">' +
          '<label class="gn-label" for="f-comentario">Comentário para ' + esc(e.primeiroNome) + '</label>' +
          '<textarea class="gn-input gn-textarea" id="f-comentario" rows="3" maxlength="1000" aria-describedby="f-comentario-help"></textarea>' +
          '<div class="gn-help-row"><span class="gn-help" id="f-comentario-help">Opcional para aprovar. Obrigatório para solicitar ajustes ou recusar. ' + esc(e.primeiroNome) + ' vê este comentário.</span><span class="gn-counter" id="f-comentario-cont" aria-hidden="true">0/1000</span></div>' +
        '</div>' +
        '<div class="tela-decisao__acoes">' +
          '<button class="gn-btn gn-btn--ghost tela-btn-recusar" type="button" data-decisao="recusar">' + icone('alerta') + 'Recusar</button>' +
          '<button class="gn-btn gn-btn--secondary" type="button" data-decisao="ajustes">' + icone('mensagem') + 'Solicitar ajustes</button>' +
          '<button class="gn-btn gn-btn--primary" type="button" data-decisao="aprovar">' + icone('ok') + 'Aprovar entrega</button>' +
        '</div>' +
      '</form>';
    var campo = $('#f-comentario');
    campo.addEventListener('input', function () {
      $('#f-comentario-cont').textContent = campo.value.length + '/1000';
      limparErro();
    });
  }

  /* ---------- Decididas ---------- */
  function renderDecididas() {
    $('#decididas').innerHTML = DECIDIDAS.map(function (d) {
      var b = DECISOES[d.decisao].badge;
      return '<tr><td><span class="tela-pessoa-celula">' + avatar(d.nome, d.iniciais, 'gn-avatar--sm') + esc(d.nome) + '</span></td>' +
        '<td class="tela-col-titulo">' + esc(d.titulo) + '</td><td>' + badge(b[0], b[1], b[2]) + '</td><td class="is-time">' + esc(d.data) + '</td></tr>';
    }).join('');
    $('#cont-decididas').textContent = DECIDIDAS.length;
  }

  function mostrarVisao(visao) {
    document.querySelectorAll('[data-visao]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-visao') === visao));
    });
    $('#visao-pendentes').hidden = visao !== 'pendentes';
    $('#visao-decididas').hidden = visao !== 'decididas';
  }

  /* ---------- Mensagens e erros ---------- */
  function mostrarMensagem(tipo, titulo, texto) {
    mensagens.innerHTML = '<div class="gn-alert gn-alert--' + tipo + '" role="status">' + icone(tipo === 'positive' ? 'ok' : 'alerta') +
      '<div class="gn-alert__body"><span class="gn-alert__title">' + esc(titulo) + '</span>' + (texto ? '<span class="gn-alert__text">' + esc(texto) + '</span>' : '') + '</div></div>';
  }
  function marcarErro(texto) {
    limparErro();
    var campo = document.querySelector('[data-campo="comentario"]');
    var input = $('#f-comentario');
    campo.classList.add('gn-field--error');
    $('#f-comentario-help').hidden = true;
    var erro = document.createElement('span');
    erro.className = 'gn-help';
    erro.id = 'f-comentario-erro';
    erro.innerHTML = icone('alerta', 'gn-icon--sm') + esc(texto);
    campo.querySelector('.gn-help-row').insertBefore(erro, campo.querySelector('.gn-counter'));
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', 'f-comentario-erro');
    input.focus();
  }
  function limparErro() {
    var campo = document.querySelector('[data-campo="comentario"]');
    if (!campo || !campo.classList.contains('gn-field--error')) return;
    campo.classList.remove('gn-field--error');
    $('#f-comentario-erro').remove();
    $('#f-comentario-help').hidden = false;
    $('#f-comentario').removeAttribute('aria-invalid');
    $('#f-comentario').setAttribute('aria-describedby', 'f-comentario-help');
  }

  /* ---------- Decisão ---------- */
  function atual() { return FILA.filter(function (x) { return x.id === selecionada; })[0]; }

  function registrar(decisao) {
    var e = atual();
    var comentario = $('#f-comentario').value.trim();
    // SIMULAÇÃO: grava decisão, responsável, data e comentário; atualiza o status da entrega.
    FILA = FILA.filter(function (x) { return x.id !== e.id; });
    DECIDIDAS.unshift({ nome: e.nome, iniciais: e.iniciais, titulo: e.titulo, decisao: decisao, data: '21/10', comentario: comentario });
    selecionada = FILA[0] ? FILA[0].id : null;
    var d = DECISOES[decisao];
    mostrarMensagem('positive', d.mensagem + ': "' + e.titulo + '"', e.primeiroNome + d.texto);
    renderFila();
    renderDetalhe();
    renderDecididas();
    mensagens.focus();
  }

  function decidir(decisao) {
    var comentario = $('#f-comentario').value.trim();
    var e = atual();
    if (decisao === 'ajustes' && !comentario) { marcarErro('Escreva o que ' + e.primeiroNome + ' precisa ajustar ou completar.'); return; }
    if (decisao === 'recusar' && !comentario) { marcarErro('Explique por que a entrega foi recusada. ' + e.primeiroNome + ' vai ver a justificativa.'); return; }
    if (decisao === 'recusar') { abrirDialogo(e, comentario); return; }
    registrar(decisao);
  }

  $('#conteudo').addEventListener('click', function (ev) {
    var item = ev.target.closest('.tela-fila__item');
    if (item) {
      selecionada = item.getAttribute('data-id');
      renderFila();
      renderDetalhe();
      $('#t-entrega').focus();
      return;
    }
    var botao = ev.target.closest('[data-decisao]');
    if (botao) { decidir(botao.getAttribute('data-decisao')); return; }
    var ir = ev.target.closest('[data-ir]');
    if (ir) { mostrarVisao(ir.getAttribute('data-ir')); return; }
    var visao = ev.target.closest('[data-visao]');
    if (visao) mostrarVisao(visao.getAttribute('data-visao'));
  });

  /* ---------- Diálogo de recusa ---------- */
  var dialogo = $('#dlg-recusar');
  var focoAnterior = null;
  function abrirDialogo(e, comentario) {
    focoAnterior = document.activeElement;
    $('#dlg-recusar-nome').textContent = e.nome;
    $('#dlg-recusar-texto').textContent = comentario;
    dialogo.hidden = false;
    dialogo.querySelector('[data-fechar]').focus();
  }
  function fecharDialogo() {
    dialogo.hidden = true;
    if (focoAnterior) focoAnterior.focus();
  }
  dialogo.querySelector('[data-fechar]').addEventListener('click', fecharDialogo);
  dialogo.addEventListener('click', function (ev) { if (ev.target === dialogo) fecharDialogo(); });
  dialogo.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { fecharDialogo(); return; }
    if (ev.key !== 'Tab') return;
    var focaveis = dialogo.querySelectorAll('button');
    var primeiro = focaveis[0];
    var ultimo = focaveis[focaveis.length - 1];
    if (ev.shiftKey && document.activeElement === primeiro) { ev.preventDefault(); ultimo.focus(); }
    else if (!ev.shiftKey && document.activeElement === ultimo) { ev.preventDefault(); primeiro.focus(); }
  });
  $('#btn-recusar-confirmar').addEventListener('click', function () {
    dialogo.hidden = true;
    registrar('recusar');
  });

  /* ---------- Estados do protótipo ---------- */
  function estadoCheio(iconeNome, classeIcone, titulo, texto, acao) {
    $('#area-principal').hidden = true;
    var area = $('#area-estado');
    area.hidden = false;
    area.innerHTML = '<div class="gn-empty"><span class="gn-empty__icon ' + classeIcone + '">' + icone(iconeNome) + '</span>' +
      '<h2 class="gn-empty__title">' + esc(titulo) + '</h2><p class="gn-empty__text">' + esc(texto) + '</p>' +
      '<div class="gn-empty__actions">' + acao + '</div></div>';
  }

  var acoes = {
    padrao: function () {},
    reenviada: function () { selecionada = 'e4'; },
    aprovada: function () { renderTudo(); registrar('aprovar'); },
    'ajustes-sem-comentario': function () { renderTudo(); decidir('ajustes'); },
    recusar: function () {
      renderTudo();
      $('#f-comentario').value = 'Reorganizar o pipeline faz parte do escopo contratado deste mês. Registre se o ganho se mantiver no próximo trimestre.';
      decidir('recusar');
    },
    decididas: function () { mostrarVisao('decididas'); },
    vazio: function () { FILA = []; selecionada = null; },
    erro: function () {
      estadoCheio('alerta', 'gn-empty__icon--lock', 'Não foi possível carregar as entregas', 'O Genial não respondeu. Nenhuma decisão foi perdida. Tente de novo em alguns instantes.',
        '<a class="gn-btn gn-btn--secondary" href="?estado=padrao">Tentar de novo</a>');
    },
    'sem-permissao': function () {
      estadoCheio('cadeado', 'gn-empty__icon--lock', 'Você não valida entregas', 'Esta área é para quem foi indicado como validador. Se alguém da sua equipe indicou você, fale com o RH.',
        '<a class="gn-btn gn-btn--secondary" href="#">Falar com o RH</a>');
    }
  };

  var renderizado = false;
  function renderTudo() {
    if (renderizado) return;
    renderizado = true;
    renderFila();
    renderDetalhe();
    renderDecididas();
  }

  if (estado === 'reenviada' || estado === 'vazio') { acoes[estado](); renderTudo(); }
  else { renderTudo(); (acoes[estado] || acoes.padrao)(); }

  /* ---------- Vindo do e-mail: ?entrega=<id>&decisao=<aprovar|ajustes|recusar> ----------
     O clique no e-mail só abre a entrega com a decisão escolhida; a decisão é confirmada aqui. */
  var params = new URLSearchParams(location.search);
  var entregaEmail = params.get('entrega');
  var decisaoEmail = params.get('decisao');
  if (entregaEmail && FILA.some(function (x) { return x.id === entregaEmail; })) {
    selecionada = entregaEmail;
    renderFila();
    renderDetalhe();
  }
  if (decisaoEmail && DECISOES[decisaoEmail] && atual()) {
    var e = atual();
    var rotulos = { aprovar: 'Aprovar', ajustes: 'Solicitar ajustes', recusar: 'Recusar' };
    var instrucao = decisaoEmail === 'aprovar'
      ? 'Confira a entrega e clique em Aprovar entrega para confirmar.'
      : 'Escreva o comentário para ' + e.primeiroNome + ' e clique em ' + rotulos[decisaoEmail] + '.';
    mensagens.innerHTML = '<div class="gn-alert gn-alert--info" role="status">' + icone('info') +
      '<div class="gn-alert__body"><span class="gn-alert__title">Você escolheu ' + rotulos[decisaoEmail] + ' no e-mail</span>' +
      '<span class="gn-alert__text">' + esc(instrucao) + '</span></div></div>';
    if (decisaoEmail === 'aprovar') document.querySelector('[data-decisao="aprovar"]').focus();
    else $('#f-comentario').focus();
  }
})();
