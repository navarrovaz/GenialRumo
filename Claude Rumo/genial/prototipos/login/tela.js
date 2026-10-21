/* Entrar — comportamento do protótipo (JS vanilla). Usa a sessão simulada de ../_comum/sessao.js.
   SIMULAÇÃO: no Genial, a autenticação é a do sistema; senha nunca é conferida nem guardada no navegador. */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var sessao = window.GenialSessao;
  var params = new URLSearchParams(location.search);
  var form = $('#form-login');
  var email = $('#f-email');
  var senha = $('#f-senha');
  var mensagens = $('#mensagens');
  var btnEntrar = $('#btn-entrar');
  var rotuloEntrar = btnEntrar.innerHTML;

  var ALERTA = '<svg class="gn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';
  var OK = '<svg class="gn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';
  var INFO = '<svg class="gn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';

  function mensagem(tipo, titulo, texto) {
    var icone = tipo === 'negative' ? ALERTA : (tipo === 'positive' ? OK : INFO);
    mensagens.innerHTML = '<div class="gn-alert gn-alert--' + tipo + '" role="' + (tipo === 'negative' ? 'alert' : 'status') + '">' + icone +
      '<div class="gn-alert__body"><span class="gn-alert__title">' + titulo + '</span>' + (texto ? '<span class="gn-alert__text">' + texto + '</span>' : '') + '</div></div>';
  }
  function erroCampo(input, texto) {
    var campo = input.closest('.gn-field');
    campo.classList.add('gn-field--error');
    var e = document.createElement('span');
    e.className = 'gn-help'; e.setAttribute('data-erro', ''); e.id = input.id + '-erro';
    e.innerHTML = ALERTA.replace('class="gn-icon"', 'class="gn-icon gn-icon--sm"') + texto;
    campo.appendChild(e);
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', e.id);
  }
  function limpar() {
    mensagens.innerHTML = '';
    document.querySelectorAll('.gn-field--error').forEach(function (c) { c.classList.remove('gn-field--error'); });
    document.querySelectorAll('[data-erro]').forEach(function (e) { e.remove(); });
    [email, senha].forEach(function (i) { i.removeAttribute('aria-invalid'); i.removeAttribute('aria-describedby'); });
  }
  function carregando(sim) {
    btnEntrar.disabled = sim;
    btnEntrar.innerHTML = sim ? '<span class="gn-spinner" aria-hidden="true"></span><span>Entrando…</span>' : rotuloEntrar;
  }

  /* Mostrar e esconder a senha */
  $('#btn-ver').addEventListener('click', function () {
    var mostrar = senha.type === 'password';
    senha.type = mostrar ? 'text' : 'password';
    this.textContent = mostrar ? 'Esconder' : 'Mostrar';
    this.setAttribute('aria-pressed', String(mostrar));
  });

  /* Para onde ir depois de entrar: a tela pedida, se a conta puder abri-la; senão, a página inicial do perfil */
  function destino(conta) {
    var voltar = params.get('voltar');
    if (voltar && voltar.charAt(0) === '/' && voltar.indexOf('//') !== 0) return voltar;
    return sessao.inicio(conta);
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    limpar();
    var faltando = false;
    if (!email.value.trim()) { erroCampo(email, 'Informe seu e-mail.'); faltando = true; }
    if (!senha.value) { erroCampo(senha, 'Informe sua senha.'); faltando = true; }
    if (faltando) { (email.value.trim() ? senha : email).focus(); return; }
    carregando(true);
    // SIMULAÇÃO: confere a conta de teste no navegador.
    setTimeout(function () {
      var conta = sessao.entrar(email.value, senha.value);
      if (!conta) {
        carregando(false);
        mensagem('negative', 'E-mail ou senha incorretos', 'Confira os dados e tente de novo.');
        senha.value = '';
        senha.focus();
        return;
      }
      location.href = destino(conta);
    }, 500);
  });

  /* Mensagens que vêm do fluxo */
  if (params.get('saiu') === '1') mensagem('positive', 'Você saiu da conta', 'Entre de novo com a mesma conta ou com outra.');
  else if (params.get('voltar')) mensagem('info', 'Entre para continuar', 'Essa tela é só para quem está logado.');

  /* Já logado: oferece seguir com a conta atual */
  var atual = sessao.atual();
  if (atual && !params.get('estado')) {
    mensagem('info', 'Você já está logado como ' + atual.nome, '<a href="' + sessao.inicio(atual) + '">Continuar como ' + atual.nome + '</a> ou entre com outra conta.');
  }

  /* Estados do protótipo */
  var estado = params.get('estado');
  if (estado === 'erro') { email.value = 'ana.ribeiro@teste.com'; mensagem('negative', 'E-mail ou senha incorretos', 'Confira os dados e tente de novo.'); }
  if (estado === 'campos-vazios') form.requestSubmit();
  if (estado === 'entrando') { email.value = 'rh@teste.com'; senha.value = '123'; carregando(true); }
  if (!estado) email.focus();
})();
