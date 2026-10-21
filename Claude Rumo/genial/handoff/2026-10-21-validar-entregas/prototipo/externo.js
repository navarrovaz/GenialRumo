/* Validação de entregas, versão externa (link seguro) — comportamento do protótipo (JS vanilla).
   Trechos que representam chamadas ao backend estão marcados com // SIMULAÇÃO. */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var estado = new URLSearchParams(location.search).get('estado') || 'padrao';

  var ICONES = {
    ok: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    alerta: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    mensagem: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v2"/><path d="M12 13h.01"/>',
    cadeado: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    relogio: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
  };
  function icone(nome, classe) {
    return '<svg class="gn-icon' + (classe ? ' ' + classe : '') + '" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONES[nome] + '</svg>';
  }
  function esc(texto) {
    var div = document.createElement('div');
    div.textContent = texto == null ? '' : String(texto);
    return div.innerHTML;
  }

  var DECISOES = {
    aprovar: { titulo: 'Aprovar esta entrega?', botao: 'Aprovar entrega', classe: 'gn-btn--primary', icone: 'ok', iconeClasse: '', resultado: 'Você aprovou a entrega' },
    ajustes: { titulo: 'Solicitar ajustes?', botao: 'Solicitar ajustes', classe: 'gn-btn--primary', icone: 'mensagem', iconeClasse: '', resultado: 'Você pediu ajustes' },
    recusar: { titulo: 'Recusar esta entrega?', botao: 'Recusar entrega', classe: 'gn-btn--danger', icone: 'alerta', iconeClasse: 'tela-dialog__icon--neg', resultado: 'Você recusou a entrega' }
  };

  /* ---------- Comentário e erro ---------- */
  var campoTexto = $('#f-comentario');
  campoTexto.addEventListener('input', function () {
    $('#f-comentario-cont').textContent = campoTexto.value.length + '/1000';
    limparErro();
  });
  function marcarErro(texto) {
    limparErro();
    var campo = document.querySelector('[data-campo="comentario"]');
    campo.classList.add('gn-field--error');
    $('#f-comentario-help').hidden = true;
    var erro = document.createElement('span');
    erro.className = 'gn-help';
    erro.id = 'f-comentario-erro';
    erro.innerHTML = icone('alerta', 'gn-icon--sm') + esc(texto);
    campo.querySelector('.gn-help-row').insertBefore(erro, campo.querySelector('.gn-counter'));
    campoTexto.setAttribute('aria-invalid', 'true');
    campoTexto.setAttribute('aria-describedby', 'f-comentario-erro');
    campoTexto.focus();
  }
  function limparErro() {
    var campo = document.querySelector('[data-campo="comentario"]');
    if (!campo.classList.contains('gn-field--error')) return;
    campo.classList.remove('gn-field--error');
    $('#f-comentario-erro').remove();
    $('#f-comentario-help').hidden = false;
    campoTexto.removeAttribute('aria-invalid');
    campoTexto.setAttribute('aria-describedby', 'f-comentario-help');
  }

  /* ---------- Decisão ---------- */
  var decisaoAtual = null;
  var dialogo = $('#dlg-confirmar');
  var focoAnterior = null;

  function decidir(decisao) {
    var comentario = campoTexto.value.trim();
    if (decisao === 'ajustes' && !comentario) { marcarErro('Escreva o que Ana precisa ajustar ou completar.'); return; }
    if (decisao === 'recusar' && !comentario) { marcarErro('Explique por que a entrega foi recusada. Ana vai ver a justificativa.'); return; }
    abrirDialogo(decisao, comentario);
  }
  function abrirDialogo(decisao, comentario) {
    var d = DECISOES[decisao];
    decisaoAtual = decisao;
    focoAnterior = document.activeElement;
    $('#dlg-t').textContent = d.titulo;
    $('#dlg-icone').className = 'gn-dialog__icon ' + d.iconeClasse;
    $('#dlg-icone').innerHTML = icone(d.icone);
    $('#dlg-texto').textContent = comentario;
    $('#dlg-corpo').hidden = !comentario;
    var botao = $('#btn-confirmar');
    botao.className = 'gn-btn ' + d.classe;
    botao.textContent = d.botao;
    dialogo.hidden = false;
    dialogo.querySelector('[data-fechar]').focus();
  }
  function fecharDialogo() {
    dialogo.hidden = true;
    if (focoAnterior) focoAnterior.focus();
  }
  document.querySelectorAll('[data-decisao]').forEach(function (b) {
    b.addEventListener('click', function () { decidir(b.getAttribute('data-decisao')); });
  });
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
  $('#btn-confirmar').addEventListener('click', function () {
    dialogo.hidden = true;
    // SIMULAÇÃO: grava a decisão (responsável = dono do link, data, comentário) e invalida o link.
    mostrarEstado('ok', '', DECISOES[decisaoAtual].resultado + '. Obrigado, Marcos.',
      'Ana Ribeiro vê a sua resposta no Genial. Este link não funciona mais; pode fechar a página.', '');
  });

  /* ---------- Estados que substituem a decisão ---------- */
  function mostrarEstado(iconeNome, classeIcone, titulo, texto, acao) {
    $('#area-decisao').hidden = true;
    var area = $('#area-estado');
    area.hidden = false;
    area.innerHTML = '<div class="gn-empty"><span class="gn-empty__icon ' + classeIcone + '">' + icone(iconeNome) + '</span>' +
      '<h1 class="gn-empty__title" tabindex="-1">' + esc(titulo) + '</h1><p class="gn-empty__text">' + esc(texto) + '</p>' +
      (acao ? '<div class="gn-empty__actions">' + acao + '</div>' : '') + '</div>';
    area.querySelector('h1').focus();
  }

  var acoes = {
    padrao: function () {},
    confirmar: function () { decidir('aprovar'); },
    'sem-comentario': function () { decidir('ajustes'); },
    decidida: function () {
      mostrarEstado('ok', '', 'Você aprovou a entrega. Obrigado, Marcos.',
        'Ana Ribeiro vê a sua resposta no Genial. Este link não funciona mais; pode fechar a página.', '');
    },
    'link-usado': function () {
      mostrarEstado('cadeado', 'gn-empty__icon--lock', 'Este link já foi usado',
        'A resposta sobre esta entrega foi registrada em 22/10. Se precisar mudar algo, fale com Ana Ribeiro.', '');
    },
    'link-expirado': function () {
      mostrarEstado('relogio', 'gn-empty__icon--lock', 'Este link expirou',
        'O prazo para responder terminou em 05/11. Se ainda quiser confirmar a entrega, fale com Ana Ribeiro.', '');
    },
    erro: function () {
      mostrarEstado('alerta', 'gn-empty__icon--lock', 'Não foi possível abrir a entrega',
        'O Genial não respondeu. O link continua valendo. Tente de novo em alguns instantes.',
        '<a class="gn-btn gn-btn--secondary" href="?estado=padrao">Tentar de novo</a>');
    }
  };
  (acoes[estado] || acoes.padrao)();

  /* ---------- Vindo do e-mail: ?decisao=<aprovar|ajustes|recusar> ----------
     O clique no e-mail só abre a página com a decisão escolhida; a resposta é confirmada aqui. */
  var decisaoEmail = new URLSearchParams(location.search).get('decisao');
  if (estado === 'padrao' && decisaoEmail && DECISOES[decisaoEmail]) {
    if (decisaoEmail === 'aprovar') {
      abrirDialogo('aprovar', '');
    } else {
      var rotulo = decisaoEmail === 'ajustes' ? 'Solicitar ajustes' : 'Recusar';
      $('#mensagens').innerHTML = '<div class="gn-alert gn-alert--info" role="status">' +
        '<svg class="gn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>' +
        '<div class="gn-alert__body"><span class="gn-alert__title">Você escolheu ' + rotulo + ' no e-mail</span>' +
        '<span class="gn-alert__text">Escreva o comentário para Ana no fim da página e clique em ' + rotulo + '.</span></div></div>';
      campoTexto.focus();
    }
  }
})();
