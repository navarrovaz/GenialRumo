/* Cadastrar entrega — comportamento do protótipo (JS vanilla).
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
  var form = $('#form-entrega');
  var mensagens = $('#mensagens');
  var listaEvidencias = $('#lista-evidencias');
  var estado = new URLSearchParams(location.search).get('estado') || 'padrao';

  var ICONES = {
    alerta: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    ok: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    enviar: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    salvar: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
    mensagem: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v2"/><path d="M12 13h.01"/>',
    arquivo: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    remover: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
  };
  function icone(nome, classe) {
    return '<svg class="gn-icon' + (classe ? ' ' + classe : '') + '" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONES[nome] + '</svg>';
  }
  function escapar(texto) {
    var div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }

  /* ---------- Contadores de caracteres ---------- */
  ['titulo', 'descricao', 'resultado'].forEach(function (campo) {
    var input = $('#f-' + campo);
    var cont = $('#f-' + campo + '-cont');
    var atualizar = function () { cont.textContent = input.value.length + '/' + input.maxLength; };
    input.addEventListener('input', atualizar);
    input._atualizarContador = atualizar;
  });
  function atualizarContadores() {
    ['titulo', 'descricao', 'resultado'].forEach(function (c) { $('#f-' + c)._atualizarContador(); });
  }

  /* ---------- Quem pode confirmar ---------- */
  function atualizarValidador() {
    var externo = form.tipoValidador.value === 'externo';
    $('#bloco-gestor').hidden = externo;
    $('#bloco-externo').hidden = !externo;
  }
  Array.prototype.forEach.call(form.tipoValidador, function (r) { r.addEventListener('change', atualizarValidador); });

  /* ---------- Entrega parecida (HIPÓTESE Q-duplicidade) ---------- */
  function verificarDuplicada() {
    // SIMULAÇÃO: o backend compara o título com as entregas do colaborador no ciclo.
    var titulo = $('#f-titulo').value.toLowerCase();
    $('#alerta-duplicada').hidden = !(titulo.indexOf('relatório de vendas') >= 0 || titulo.indexOf('relatorio de vendas') >= 0);
  }
  $('#f-titulo').addEventListener('blur', verificarDuplicada);

  /* ---------- Evidências ---------- */
  function adicionarEvidencia(tipo, nome, meta) {
    var li = document.createElement('li');
    li.className = 'gn-attach';
    li.innerHTML = icone(tipo === 'link' ? 'link' : 'arquivo') +
      '<div class="gn-attach__text"><span class="gn-attach__name">' + escapar(nome) + '</span>' +
      '<span class="gn-attach__meta">' + escapar(meta) + '</span></div>' +
      '<button class="gn-btn gn-btn--ghost gn-btn--icon gn-btn--sm" type="button" aria-label="Remover ' + escapar(nome) + '">' + icone('remover', 'gn-icon--sm') + '</button>';
    li.querySelector('button').addEventListener('click', function () {
      li.remove();
      $('#btn-arquivo').focus();
    });
    listaEvidencias.appendChild(li);
  }
  function tamanho(bytes) {
    if (bytes < 1024 * 1024) return Math.max(1, Math.round(bytes / 1024)) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1).replace('.', ',') + ' MB';
  }
  $('#btn-arquivo').addEventListener('click', function () { $('#f-arquivo').click(); });
  $('#f-arquivo').addEventListener('change', function (e) {
    Array.prototype.forEach.call(e.target.files, function (f) {
      if (f.size > 10 * 1024 * 1024) {
        mostrarMensagem('negative', 'O arquivo ' + f.name + ' tem mais de 10 MB', 'Reduza o tamanho ou envie um link para o arquivo.');
        return;
      }
      // SIMULAÇÃO: upload do arquivo para o servidor.
      adicionarEvidencia('arquivo', f.name, 'Arquivo · ' + tamanho(f.size));
    });
    e.target.value = '';
  });

  var btnLink = $('#btn-link');
  btnLink.addEventListener('click', function () {
    var abrir = $('#bloco-link').hidden;
    $('#bloco-link').hidden = !abrir;
    btnLink.setAttribute('aria-expanded', String(abrir));
    if (abrir) $('#f-link').focus();
  });
  function incluirLink() {
    var input = $('#f-link');
    var campo = $('#bloco-link');
    var valor = input.value.trim();
    limparErro(campo);
    if (!/^https?:\/\/\S+\.\S+/.test(valor)) {
      marcarErro(campo, input, 'Use um endereço completo, começando com https://');
      input.focus();
      return;
    }
    adicionarEvidencia('link', valor, 'Link');
    input.value = '';
    campo.hidden = true;
    btnLink.setAttribute('aria-expanded', 'false');
    btnLink.focus();
  }
  $('#btn-link-adicionar').addEventListener('click', incluirLink);
  $('#f-link').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); incluirLink(); }
  });

  /* ---------- Erros de campo ---------- */
  function marcarErro(campo, alvo, texto) {
    campo.classList.add('gn-field--error');
    var help = campo.querySelector('.gn-help:not([data-erro])');
    if (help) help.hidden = true;
    var erro = document.createElement('span');
    erro.className = 'gn-help';
    erro.setAttribute('data-erro', '');
    erro.id = 'erro-' + (campo.getAttribute('data-campo') || 'campo');
    erro.innerHTML = icone('alerta', 'gn-icon--sm') + escapar(texto);
    var linhaAjuda = campo.querySelector('.gn-help-row');
    if (linhaAjuda) linhaAjuda.insertBefore(erro, linhaAjuda.firstChild); else campo.appendChild(erro);
    var alvos = alvo ? [alvo] : campo.querySelectorAll('input');
    Array.prototype.forEach.call(alvos, function (el) {
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('data-describedby-original', el.getAttribute('aria-describedby') || '');
      el.setAttribute('aria-describedby', erro.id);
    });
  }
  function limparErro(campo) {
    campo.classList.remove('gn-field--error');
    var erro = campo.querySelector('[data-erro]');
    if (erro) erro.remove();
    var help = campo.querySelector('.gn-help[hidden]');
    if (help) help.hidden = false;
    Array.prototype.forEach.call(campo.querySelectorAll('[aria-invalid]'), function (el) {
      el.removeAttribute('aria-invalid');
      var original = el.getAttribute('data-describedby-original');
      if (original) el.setAttribute('aria-describedby', original); else el.removeAttribute('aria-describedby');
      el.removeAttribute('data-describedby-original');
    });
  }
  function limparErros() {
    Array.prototype.forEach.call(form.querySelectorAll('.gn-field--error'), limparErro);
  }
  // Ao corrigir, o erro do campo some.
  form.addEventListener('input', function (e) {
    var campo = e.target.closest('[data-campo]');
    if (campo && campo.classList.contains('gn-field--error')) limparErro(campo);
  });

  function validar(paraEnvio) {
    limparErros();
    var erros = [];
    function exigir(seletorCampo, alvo, ok, texto) {
      if (ok) return;
      var campo = form.querySelector('[data-campo="' + seletorCampo + '"]');
      marcarErro(campo, alvo, texto);
      erros.push({ alvo: alvo || campo.querySelector('input'), texto: texto });
    }
    var titulo = $('#f-titulo');
    exigir('titulo', titulo, titulo.value.trim() !== '', 'Escreva um título para a entrega.');
    if (paraEnvio) {
      var descricao = $('#f-descricao');
      var tempo = $('#f-tempo');
      var resultado = $('#f-resultado');
      exigir('descricao', descricao, descricao.value.trim() !== '', 'Conte o que você entregou.');
      exigir('tempo', tempo, Number(tempo.value) >= 1, 'Informe o tempo, por exemplo 7 dias.');
      exigir('origem', null, !!form.origem.value, 'Escolha se foi uma iniciativa sua ou uma demanda.');
      exigir('resultado', resultado, resultado.value.trim() !== '', 'Conte qual foi o resultado.');
      if (form.tipoValidador.value === 'externo') {
        var nome = $('#f-externo-nome');
        var email = $('#f-externo-email');
        exigir('externoNome', nome, nome.value.trim() !== '', 'Informe o nome de quem vai confirmar.');
        exigir('externoEmail', email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), 'Use um e-mail válido, como nome@cliente.com.br.');
      }
    }
    return erros;
  }

  /* ---------- Mensagens da página ---------- */
  function mostrarMensagem(tipo, titulo, texto, itens) {
    var icon = tipo === 'positive' ? 'ok' : tipo === 'info' ? 'info' : 'alerta';
    var lista = '';
    if (itens && itens.length) {
      lista = '<ul class="tela-erros">' + itens.map(function (i) {
        return '<li><a href="#' + i.alvo.id + '">' + escapar(i.texto) + '</a></li>';
      }).join('') + '</ul>';
    }
    mensagens.innerHTML = '<div class="gn-alert gn-alert--' + tipo + '" role="' + (tipo === 'negative' ? 'alert' : 'status') + '">' +
      icone(icon) + '<div class="gn-alert__body"><span class="gn-alert__title">' + escapar(titulo) + '</span>' +
      (texto ? '<span class="gn-alert__text">' + escapar(texto) + '</span>' : '') + lista + '</div></div>';
    Array.prototype.forEach.call(mensagens.querySelectorAll('a[href^="#"]'), function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var alvo = document.getElementById(a.getAttribute('href').slice(1));
        if (alvo) alvo.focus();
      });
    });
  }
  function limparMensagem() { mensagens.innerHTML = ''; }

  /* ---------- Rascunho ---------- */
  function horaAgora() {
    var d = new Date();
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  function marcarComoRascunho() {
    $('#badge-rascunho').hidden = false;
    $('#btn-excluir').hidden = false;
  }
  $('#btn-rascunho').addEventListener('click', function () {
    var erros = validar(false);
    if (erros.length) {
      mostrarMensagem('negative', 'Escreva um título para salvar o rascunho', 'Os outros campos podem ficar para depois.');
      erros[0].alvo.focus();
      return;
    }
    // SIMULAÇÃO: salvar rascunho.
    marcarComoRascunho();
    mostrarMensagem('positive', 'Rascunho salvo às ' + horaAgora(), 'Ele fica em Minhas entregas até você enviar para validação.');
    mensagens.focus();
  });

  /* ---------- Envio ---------- */
  var btnEnviar = $('#btn-enviar');
  function definirEnviando(ativo) {
    btnEnviar.disabled = ativo;
    btnEnviar.innerHTML = ativo
      ? '<span class="gn-spinner" aria-hidden="true"></span><span>Enviando…</span>'
      : btnEnviar._rotulo;
    $('#btn-rascunho').disabled = ativo;
  }
  btnEnviar._rotulo = btnEnviar.innerHTML;

  function nomeValidador() {
    if (form.tipoValidador.value === 'externo') return $('#f-externo-nome').value.trim();
    var opcao = $('#f-gestor').selectedOptions[0];
    return opcao.textContent.replace(' (seu gestor)', '');
  }
  function mostrarEnviada() {
    $('#enviada-validador').textContent = nomeValidador() || 'Carlos Andrade';
    $('#enviada-titulo').textContent = '"' + ($('#f-titulo').value.trim() || 'Automatização do relatório de vendas') + '"';
    if (modo === 'editar') {
      $('#t-enviada').textContent = 'Alterações salvas';
      $('#area-enviada .gn-empty__text').textContent = nomeValidador() + ' vê a versão nova no mesmo link de validação. Você pode editar de novo até a decisão.';
    }
    limparMensagem();
    $('#area-form').hidden = true;
    $('#area-enviada').hidden = false;
    $('#t-enviada').focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var erros = validar(true);
    if (erros.length) {
      mostrarMensagem('negative', erros.length === 1 ? 'Revise 1 campo antes de enviar' : 'Revise ' + erros.length + ' campos antes de enviar', '', erros);
      mensagens.focus();
      return;
    }
    limparMensagem();
    definirEnviando(true);
    // SIMULAÇÃO: envio. Cria a entrega como "Aguardando validação" e dispara o e-mail ao validador.
    setTimeout(function () {
      definirEnviando(false);
      if (estado === 'erro-envio') {
        marcarComoRascunho();
        mostrarMensagem('negative', 'Não foi possível enviar a entrega', 'O Genial não respondeu. Seus dados ficaram salvos como rascunho. Tente enviar de novo em alguns minutos.');
        mensagens.focus();
        return;
      }
      mostrarEnviada();
    }, 1200);
  });

  /* ---------- Diálogo de exclusão ---------- */
  var dialogo = $('#dlg-excluir');
  var focoAnterior = null;
  function abrirDialogo() {
    focoAnterior = document.activeElement;
    dialogo.hidden = false;
    dialogo.querySelector('[data-fechar]').focus();
  }
  function fecharDialogo() {
    dialogo.hidden = true;
    if (focoAnterior) focoAnterior.focus();
  }
  $('#btn-excluir').addEventListener('click', abrirDialogo);
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
    // SIMULAÇÃO: excluir rascunho e voltar para Minhas entregas.
    dialogo.hidden = true;
    form.reset();
    listaEvidencias.innerHTML = '';
    atualizarContadores();
    atualizarValidador();
    $('#badge-rascunho').hidden = true;
    $('#btn-excluir').hidden = true;
    mostrarMensagem('positive', 'Rascunho excluído', '');
    mensagens.focus();
  });

  /* ---------- Estados do protótipo ---------- */
  function preencherExemplo() {
    // Exemplo fictício da especificação (5.2).
    $('#f-titulo').value = 'Automatização do relatório de vendas';
    $('#f-descricao').value = 'Automatizei o processo de geração do relatório de vendas do cliente, que antes era montado à mão a partir de três planilhas.';
    $('#f-tempo').value = '7';
    $('#f-tempo-unidade').value = 'dias';
    form.origem.value = 'iniciativa';
    $('#f-resultado').value = 'Um relatório que levava 2 dias para ser produzido passou a ser gerado em aproximadamente 10 minutos. A equipe comercial recebe os números na segunda de manhã, e não mais na quarta.';
    adicionarEvidencia('arquivo', 'email-agradecimento-gestor.pdf', 'Arquivo · 182 KB');
  }

  /* ---------- Edição (vem de Minhas entregas ou do detalhe da entrega) ---------- */
  var modo = 'novo';
  function prepararEdicao(m) {
    modo = m;
    // A tela pertence a Minhas entregas quando edita uma entrega existente.
    $$('.gn-nav-item[aria-current]').forEach(function (a) { a.removeAttribute('aria-current'); });
    $('.gn-nav-item[href*="minhas-entregas"]').setAttribute('aria-current', 'page');
    $('#btn-rascunho').hidden = true;
    $('.gn-page__desc').textContent = m === 'editar'
      ? 'Altere o que precisar. O validador vê sempre a versão mais recente.'
      : 'Complete o que o gestor pediu e reenvie para validação.';
    var badgeStatus = $('#badge-rascunho');
    badgeStatus.hidden = false;
    var rotulo;
    if (m === 'editar') {
      // SIMULAÇÃO: dados da entrega "Treinamento de Git para a equipe do cliente", aguardando validação.
      $('#titulo-pagina').textContent = 'Editar entrega';
      $('.gn-breadcrumb [aria-current]').textContent = 'Editar entrega';
      $('#f-titulo').value = 'Treinamento de Git para a equipe do cliente';
      $('#f-descricao').value = 'Preparei e conduzi um treinamento de Git em 3 encontros para a equipe de desenvolvimento do cliente, com exercícios no repositório do próprio projeto.';
      $('#f-tempo').value = '2';
      $('#f-tempo-unidade').value = 'semanas';
      form.origem.value = 'iniciativa';
      $('#f-resultado').value = 'Oito pessoas treinadas. Os conflitos de merge que travavam as entregas caíram de cerca de 6 para 1 por sprint.';
      form.tipoValidador.value = 'externo';
      $('#f-externo-nome').value = 'Marcos Teixeira';
      $('#f-externo-email').value = 'marcos.teixeira@cliente-exemplo.com.br';
      adicionarEvidencia('link', 'https://exemplo.com/material-treinamento-git', 'Link');
      badgeStatus.className = 'gn-badge gn-badge--info';
      badgeStatus.innerHTML = icone('enviar') + 'Aguardando validação';
      mostrarMensagem('info', 'Marcos Teixeira ainda não decidiu', 'Você pode editar até ele decidir. Ao salvar, o link de validação passa a mostrar a versão nova.');
      rotulo = icone('salvar') + '<span>Salvar alterações</span>';
    } else {
      // SIMULAÇÃO: dados da entrega "Migração do servidor de testes", com ajustes solicitados.
      $('#titulo-pagina').textContent = 'Ajustar entrega';
      $('.gn-breadcrumb [aria-current]').textContent = 'Ajustar entrega';
      $('#f-titulo').value = 'Migração do servidor de testes';
      $('#f-descricao').value = 'Migrei o ambiente de testes do cliente para um servidor novo, com os testes automatizados rodando a cada alteração.';
      $('#f-tempo').value = '10';
      $('#f-tempo-unidade').value = 'dias';
      form.origem.value = 'demanda';
      $('#f-resultado').value = 'Os testes ficaram mais rápidos.';
      badgeStatus.className = 'gn-badge gn-badge--attention';
      badgeStatus.innerHTML = icone('mensagem') + 'Ajustes solicitados';
      var comentario = document.createElement('div');
      comentario.className = 'gn-alert gn-alert--attention';
      comentario.setAttribute('role', 'note');
      comentario.innerHTML = icone('mensagem') + '<div class="gn-alert__body"><span class="gn-alert__title">Carlos Andrade pediu ajustes em 19/10</span>' +
        '<span class="gn-alert__text">"Ficou bom, mas faltou o resultado: quanto tempo os testes levavam antes e depois da migração? Inclua também quem passou a usar o servidor novo."</span>' +
        '<span class="gn-alert__text">Ajuste e reenvie até 05/11 para entrar no ciclo de outubro.</span></div>';
      $('.tela-form').insertBefore(comentario, $('.tela-form').firstChild);
      rotulo = icone('enviar') + '<span>Reenviar para validação</span>';
    }
    btnEnviar.innerHTML = rotulo;
    btnEnviar._rotulo = rotulo;
  }

  var acoes = {
    editar: function () { prepararEdicao('editar'); },
    ajustes: function () { prepararEdicao('ajustes'); },
    padrao: function () {},
    preenchido: preencherExemplo,
    rascunho: function () {
      $('#f-titulo').value = 'Automatização do relatório de vendas';
      $('#f-descricao').value = 'Automatizei o processo de geração do relatório de vendas do cliente.';
      document.getElementById('titulo-pagina').textContent = 'Editar rascunho';
      marcarComoRascunho();
      mostrarMensagem('info', 'Rascunho salvo em 14/10 às 18:12', 'Complete os campos e envie para validação até 31/10.');
    },
    'erro-validacao': function () {
      $('#f-titulo').value = 'Automatização do relatório de vendas';
      var erros = validar(true);
      mostrarMensagem('negative', 'Revise ' + erros.length + ' campos antes de enviar', '', erros);
    },
    duplicada: function () {
      $('#f-titulo').value = 'Relatório de vendas automático';
      verificarDuplicada();
    },
    externo: function () {
      preencherExemplo();
      form.tipoValidador.value = 'externo';
      $('#f-externo-nome').value = 'Marcos Teixeira';
      $('#f-externo-email').value = 'marcos.teixeira@cliente-exemplo.com.br';
    },
    enviando: function () {
      preencherExemplo();
      definirEnviando(true);
    },
    enviada: function () {
      preencherExemplo();
      mostrarEnviada();
    },
    'erro-envio': function () {
      preencherExemplo();
      marcarComoRascunho();
      mostrarMensagem('negative', 'Não foi possível enviar a entrega', 'O Genial não respondeu. Seus dados ficaram salvos como rascunho. Tente enviar de novo em alguns minutos.');
    },
    'sem-permissao': function () {
      $('#area-form').hidden = true;
      $('#area-sem-permissao').hidden = false;
    }
  };
  (acoes[estado] || acoes.padrao)();
  atualizarContadores();
  atualizarValidador();
})();
