/* Sessão simulada dos protótipos (JS vanilla).
   SIMULAÇÃO: no Genial, o login, a senha e o controle de acesso são os que o sistema já tem (esp. 3.2).
   Nada aqui vai para produção: as contas são de teste e a "sessão" fica só no navegador.

   Cada página declara quem pode abri-la em <html data-perfil="...">:
     colaborador · rh · gestor · publico (sem login, como o link seguro do cliente)
   Sem sessão, a página manda para o login. Com sessão de outro perfil, manda para a página inicial do perfil. */
(function () {
  'use strict';

  var CONTAS = [
    { email: 'ana.ribeiro@teste.com', senha: '123@', nome: 'Ana Ribeiro', papel: 'Colaboradora', perfil: 'colaborador', avatar: 2,
      inicio: 'reconhecimento/visao-geral/index.html' },
    { email: 'rh@teste.com', senha: '123', nome: 'RH Admin', papel: 'RH · Administração', perfil: 'rh', iniciais: 'RH',
      inicio: 'reconhecimento/admin-ciclos/index.html' },
    { email: 'carlos.andrade@teste.com', senha: '123', nome: 'Carlos Andrade', papel: 'Gestor', perfil: 'gestor', avatar: 11,
      inicio: 'reconhecimento/validar-entregas/index.html' }
  ];
  var CHAVE = 'genial-sessao';

  var script = document.currentScript;
  var raiz = script ? script.src.replace(/_comum\/sessao\.js.*$/, '') : '';

  function ler() {
    try {
      var email = localStorage.getItem(CHAVE);
      return CONTAS.filter(function (c) { return c.email === email; })[0] || null;
    } catch (e) { return null; }
  }
  function gravar(conta) {
    try {
      if (conta) localStorage.setItem(CHAVE, conta.email); else localStorage.removeItem(CHAVE);
    } catch (e) { /* sem armazenamento: a sessão não se mantém entre páginas */ }
  }

  var api = {
    raiz: raiz,
    atual: ler,
    contas: CONTAS.map(function (c) { return { email: c.email, nome: c.nome, papel: c.papel }; }),
    entrar: function (email, senha) {
      var e = String(email || '').trim().toLowerCase();
      var conta = CONTAS.filter(function (c) { return c.email === e && c.senha === senha; })[0] || null;
      if (conta) gravar(conta);
      return conta;
    },
    sair: function () {
      gravar(null);
      location.href = raiz + 'login/index.html?saiu=1';
    },
    inicio: function (conta) { return raiz + conta.inicio; },
    podeAbrir: function (conta, perfil) { return perfil === 'publico' || (conta && conta.perfil === perfil); }
  };
  window.GenialSessao = api;

  /* ---------- Proteção da página ---------- */
  var perfilPagina = document.documentElement.getAttribute('data-perfil');
  var conta = ler();
  if (perfilPagina && perfilPagina !== 'publico') {
    if (!conta) {
      location.replace(raiz + 'login/index.html?voltar=' + encodeURIComponent(location.pathname + location.search));
      return;
    }
    if (conta.perfil !== perfilPagina) {
      location.replace(api.inicio(conta) + '?sem-acesso=1');
      return;
    }
  }
  if (!conta || perfilPagina === 'publico' || !perfilPagina) return;

  /* ---------- Conta logada no menu e na barra superior ---------- */
  var SVG = '<svg class="gn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
  var SAIR = SVG + '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>';
  var INFO = SVG + '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';

  function avatarConta(classes) {
    if (conta.iniciais) return '<span class="gn-avatar gn-avatar--rh ' + classes + '" aria-hidden="true">' + conta.iniciais + '</span>';
    var n = conta.avatar;
    // A troca de avatar dos protótipos é só a da Ana (Visão geral).
    if (conta.perfil === 'colaborador') {
      try { var salvo = Number(localStorage.getItem('genial-avatar')); if (salvo >= 1 && salvo <= 12) n = salvo; } catch (e) { /* sem armazenamento */ }
    }
    return '<span class="gn-avatar gn-avatar--img ' + classes + '"><img src="' + raiz + '../docs/design-system/assets/avatares/avatar-' + (n < 10 ? '0' : '') + n + '.svg" alt=""></span>';
  }

  var estilo = document.createElement('style');
  estilo.textContent =
    '.gn-sessao{position:relative}' +
    '.gn-sessao__botao{display:grid;place-items:center;padding:0;border:0;border-radius:var(--radius-full);background:transparent;cursor:pointer}' +
    '.gn-sessao__menu{position:absolute;right:0;top:calc(100% + var(--space-2));z-index:30;min-width:260px;padding:var(--space-2);border:1px solid var(--border-default);border-radius:var(--radius-lg);background:var(--bg-surface);box-shadow:var(--shadow-lg)}' +
    '.gn-sessao__quem{display:flex;align-items:center;gap:var(--space-3);padding:var(--space-2) var(--space-2) var(--space-3);border-bottom:1px solid var(--border-subtle);margin-bottom:var(--space-2)}' +
    '.gn-sessao__nome{font:600 14px/20px var(--font-sans);color:var(--text-strong)}' +
    '.gn-sessao__dado{font:500 12px/16px var(--font-sans);color:var(--text-muted)}' +
    '.gn-sessao__sair{display:flex;align-items:center;gap:var(--space-2);width:100%;height:var(--control-md);padding:0 var(--space-2);border:0;border-radius:var(--radius-md);background:transparent;color:var(--text-strong);font:600 14px/20px var(--font-sans);text-align:left;cursor:pointer}' +
    '.gn-sessao__sair:hover{background:var(--bg-sunken)}' +
    '.gn-sessao-rodape{display:flex;align-items:center;gap:var(--space-2)}' +
    '.gn-sessao-rodape .gn-user{flex:1;min-width:0}' +
    '.gn-sessao-aviso{margin-bottom:var(--space-2)}';
  document.head.appendChild(estilo);

  function decorar() {
    // Menu lateral: nome, papel, avatar e botão Sair
    var usuario = document.querySelector('.gn-sidebar__footer .gn-user');
    if (usuario) {
      var av = usuario.querySelector('.gn-avatar');
      if (av) av.outerHTML = avatarConta('');
      var nome = usuario.querySelector('.gn-user__name');
      var papel = usuario.querySelector('.gn-user__role');
      if (nome) nome.textContent = conta.nome;
      if (papel) papel.textContent = conta.papel;
      var rodape = document.createElement('div');
      rodape.className = 'gn-sessao-rodape';
      usuario.parentNode.insertBefore(rodape, usuario);
      rodape.appendChild(usuario);
      var sair = document.createElement('button');
      sair.type = 'button';
      sair.className = 'gn-iconbtn';
      sair.setAttribute('aria-label', 'Sair da conta');
      sair.title = 'Sair da conta';
      sair.innerHTML = SAIR;
      sair.addEventListener('click', api.sair);
      rodape.appendChild(sair);
    }

    // Barra superior: avatar vira o menu da conta
    var acoes = document.querySelector('.gn-topbar__actions');
    var avTopo = acoes && acoes.querySelector(':scope > .gn-avatar');
    if (acoes && avTopo) {
      var caixa = document.createElement('div');
      caixa.className = 'gn-sessao';
      caixa.innerHTML =
        '<button class="gn-sessao__botao" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="menu-conta" aria-label="Sua conta: ' + conta.nome + '">' + avatarConta('gn-avatar--sm') + '</button>' +
        '<div class="gn-sessao__menu" id="menu-conta" hidden>' +
          '<div class="gn-sessao__quem">' + avatarConta('') + '<div><div class="gn-sessao__nome">' + conta.nome + '</div>' +
          '<div class="gn-sessao__dado">' + conta.email + '</div><div class="gn-sessao__dado">' + conta.papel + '</div></div></div>' +
          '<button class="gn-sessao__sair" type="button" data-sair>' + SAIR + 'Sair e trocar de conta</button></div>';
      acoes.replaceChild(caixa, avTopo);
      var botao = caixa.querySelector('.gn-sessao__botao');
      var menu = caixa.querySelector('.gn-sessao__menu');
      function fechar() { menu.hidden = true; botao.setAttribute('aria-expanded', 'false'); }
      botao.addEventListener('click', function () {
        var abrir = menu.hidden;
        menu.hidden = !abrir;
        botao.setAttribute('aria-expanded', String(abrir));
        if (abrir) menu.querySelector('[data-sair]').focus();
      });
      menu.querySelector('[data-sair]').addEventListener('click', api.sair);
      document.addEventListener('click', function (ev) { if (!caixa.contains(ev.target)) fechar(); });
      document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !menu.hidden) { fechar(); botao.focus(); } });
    }

    // Aviso quando a pessoa tentou abrir uma tela de outro perfil
    if (/[?&]sem-acesso=1/.test(location.search)) {
      var pagina = document.querySelector('.gn-page');
      if (pagina) {
        var aviso = document.createElement('div');
        aviso.className = 'gn-alert gn-alert--info gn-sessao-aviso';
        aviso.setAttribute('role', 'status');
        aviso.innerHTML = INFO + '<div class="gn-alert__body"><span class="gn-alert__title">Essa tela não faz parte do seu perfil</span>' +
          '<span class="gn-alert__text">Você entrou como ' + conta.nome + ' (' + conta.papel + '). Para ver a outra tela, saia e entre com a conta que tem acesso.</span></div>';
        pagina.insertBefore(aviso, pagina.firstChild);
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decorar); else decorar();
})();
