/* Minhas entregas — comportamento do protótipo (JS vanilla).
   Trechos marcados com // SIMULAÇÃO representam chamadas ao backend do Genial Web. */
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
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var estado = new URLSearchParams(location.search).get('estado') || 'padrao';
  var mensagens = $('#mensagens');
  var cicloAtual = '2026-10';
  var grupoAtual = 'todas';

  // SIMULAÇÃO: indicadores calculados pelo backend para cada ciclo.
  var INDICADORES = {
    '2026-10': {
      saldoRotulo: 'Saldo de outubro', saldo: '11,9 pts', saldoMeta: '3 entregas avaliadas · em apuração até 06/11',
      aprovadas: '4', aprovadasMeta: 'No ciclo · usado no desempate do ranking',
      pendentes: '2', pendentesMeta: '1 com o validador · 1 aguardando avaliação',
      alertaAjustes: true
    },
    '2026-09': {
      saldoRotulo: 'Saldo de setembro', saldo: '13,0 pts', saldoMeta: '3 entregas homologadas em 09/10',
      aprovadas: '3', aprovadasMeta: 'No ciclo · usado no desempate do ranking',
      pendentes: '0', pendentesMeta: 'Ciclo encerrado',
      alertaAjustes: false
    }
  };

  function escapar(texto) {
    var div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }

  /* ---------- Mensagens ---------- */
  function mostrarMensagem(tipo, titulo, texto) {
    var icone = tipo === 'positive'
      ? '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'
      : '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>';
    mensagens.innerHTML = '<div class="gn-alert gn-alert--' + tipo + '" role="status">' +
      '<svg class="gn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + icone + '</svg>' +
      '<div class="gn-alert__body"><span class="gn-alert__title">' + escapar(titulo) + '</span>' +
      (texto ? '<span class="gn-alert__text">' + escapar(texto) + '</span>' : '') + '</div></div>';
  }

  /* ---------- Ciclo e filtros ---------- */
  function linhasDoCiclo() {
    return $$('#linhas tr').filter(function (tr) { return tr.getAttribute('data-ciclo') === cicloAtual; });
  }

  function atualizarIndicadores() {
    var d = INDICADORES[cicloAtual];
    $('#stat-saldo-rotulo').textContent = d.saldoRotulo;
    $('#stat-saldo').textContent = d.saldo;
    $('#stat-saldo-meta').textContent = d.saldoMeta;
    $('#stat-aprovadas').textContent = d.aprovadas;
    $('#stat-aprovadas-meta').textContent = d.aprovadasMeta;
    $('#stat-pendentes').textContent = d.pendentes;
    $('#stat-pendentes-meta').textContent = d.pendentesMeta;
    $('#alerta-ajustes').hidden = !d.alertaAjustes;
  }

  function atualizarContagens() {
    var linhas = linhasDoCiclo();
    $$('[data-contagem]').forEach(function (el) {
      var grupo = el.getAttribute('data-contagem');
      var n = grupo === 'todas' ? linhas.length : linhas.filter(function (tr) { return tr.getAttribute('data-grupo') === grupo; }).length;
      el.textContent = n;
    });
  }

  function aplicarFiltro() {
    var visiveis = 0;
    $$('#linhas tr').forEach(function (tr) {
      var mostrar = tr.getAttribute('data-ciclo') === cicloAtual &&
        (grupoAtual === 'todas' || tr.getAttribute('data-grupo') === grupoAtual);
      tr.hidden = !mostrar;
      if (mostrar) visiveis++;
    });
    $$('[data-grupo][aria-pressed]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-grupo') === grupoAtual));
    });
    var vazio = visiveis === 0;
    $('#tabela-wrap').hidden = vazio;
    $('#rodape-lista').hidden = vazio;
    $('#area-filtro-vazio').hidden = !vazio;
  }

  function selecionarCiclo(ciclo) {
    cicloAtual = ciclo;
    grupoAtual = 'todas';
    atualizarIndicadores();
    atualizarContagens();
    aplicarFiltro();
  }

  $('#f-ciclo').addEventListener('change', function (e) { selecionarCiclo(e.target.value); });
  $$('[data-grupo][aria-pressed]').forEach(function (b) {
    b.addEventListener('click', function () {
      grupoAtual = b.getAttribute('data-grupo');
      aplicarFiltro();
    });
  });
  $('#btn-limpar-filtro').addEventListener('click', function () {
    grupoAtual = 'todas';
    aplicarFiltro();
    $('[data-grupo="todas"]').focus();
  });

  /* ---------- Exclusão ---------- */
  var dialogo = $('#dlg-excluir');
  var linhaAlvo = null;
  var focoAnterior = null;

  function abrirDialogo(botao) {
    linhaAlvo = botao.closest('tr');
    focoAnterior = botao;
    $('#dlg-excluir-nome').textContent = '"' + linhaAlvo.querySelector('.tela-entrega__titulo').textContent + '"';
    dialogo.hidden = false;
    dialogo.querySelector('[data-fechar]').focus();
  }
  function fecharDialogo() {
    dialogo.hidden = true;
    if (focoAnterior) focoAnterior.focus();
  }
  function excluir(linha) {
    var titulo = linha.querySelector('.tela-entrega__titulo').textContent;
    // SIMULAÇÃO: excluir a entrega. Se estava aguardando validação, o link enviado ao validador deixa de valer.
    linha.remove();
    atualizarContagens();
    aplicarFiltro();
    mostrarMensagem('positive', 'Entrega excluída', '"' + titulo + '" saiu da sua lista.');
    mensagens.focus();
  }

  $$('[data-excluir]').forEach(function (b) {
    b.addEventListener('click', function () { abrirDialogo(b); });
  });
  dialogo.querySelector('[data-fechar]').addEventListener('click', fecharDialogo);
  dialogo.addEventListener('click', function (e) { if (e.target === dialogo) fecharDialogo(); });
  dialogo.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { fecharDialogo(); return; }
    if (e.key !== 'Tab') return;
    var focaveis = dialogo.querySelectorAll('button');
    var primeiro = focaveis[0];
    var ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  });
  $('#btn-excluir-confirmar').addEventListener('click', function () {
    dialogo.hidden = true;
    excluir(linhaAlvo);
  });

  /* ---------- Estados do protótipo ---------- */
  var acoes = {
    padrao: function () {},
    'ciclo-anterior': function () {
      $('#f-ciclo').value = '2026-09';
      selecionarCiclo('2026-09');
    },
    'filtro-vazio': function () {
      $('#f-ciclo').value = '2026-09';
      selecionarCiclo('2026-09');
      grupoAtual = 'voce';
      aplicarFiltro();
    },
    vazio: function () {
      $('#area-lista').hidden = true;
      $('#btn-cadastrar').hidden = true;
      $('#area-vazio').hidden = false;
    },
    carregando: function () {
      $('#linhas').hidden = true;
      $('#linhas-carregando').hidden = false;
      $('#alerta-ajustes').hidden = true;
      $('#rodape-lista').hidden = true;
      $$('.gn-stat__value, .gn-stat__meta').forEach(function (el) {
        el.innerHTML = '<span class="tela-esqueleto tela-esqueleto--sm"></span>';
      });
      $$('[data-contagem]').forEach(function (el) { el.textContent = ''; });
    },
    erro: function () {
      $('#area-lista').hidden = true;
      $('#area-erro').hidden = false;
    },
    excluida: function () {
      excluir($('#linhas tr[data-grupo="voce"]'));
    },
    'sem-permissao': function () {
      $('#area-lista').hidden = true;
      $('#btn-cadastrar').hidden = true;
      $('#area-sem-permissao').hidden = false;
    }
  };

  atualizarIndicadores();
  atualizarContagens();
  aplicarFiltro();
  (acoes[estado] || acoes.padrao)();
})();
