/* Detalhe da entrega — comportamento do protótipo (JS vanilla).
   ENTREGAS simula o que o backend devolve para cada status; render() monta os blocos da tela.
   // SIMULAÇÃO: em produção, os dados vêm do modelo da view. */
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

  var estado = new URLSearchParams(location.search).get('estado') || 'avaliada';
  var main = document.getElementById('conteudo');

  /* ---------- Ícones (Lucide) ---------- */
  var ICONES = {
    pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    mensagem: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v2"/><path d="M12 13h.01"/>',
    alerta: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    relogio: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    ok: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    escudo: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    voltar: '<path d="m15 18-6-6 6-6"/>',
    arquivo: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    lixeira: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
    criterios: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
    busca: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    mais: '<path d="M5 12h14"/><path d="M12 5v14"/>'
  };
  function icone(nome, classe) {
    return '<svg class="gn-icon' + (classe ? ' ' + classe : '') + '" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONES[nome] + '</svg>';
  }
  function esc(texto) {
    var div = document.createElement('div');
    div.textContent = texto == null ? '' : String(texto);
    return div.innerHTML;
  }

  /* ---------- Avatares (cartela do design system; pessoa do cliente fica com iniciais) ---------- */
  function meuNumero() {
    try { var n = Number(localStorage.getItem('genial-avatar')); if (n >= 1 && n <= 12) return n; } catch (e) { /* sem armazenamento */ }
    return 2;
  }
  function avatarPessoa(p, classes) {
    if (!p.avatar) return '<span class="gn-avatar ' + classes + '" aria-hidden="true">' + esc(p.iniciais) + '</span>';
    return '<span class="gn-avatar gn-avatar--img ' + classes + '"><img src="design-system/assets/avatares/avatar-' + (p.avatar < 10 ? '0' : '') + p.avatar + '.svg" alt=""></span>';
  }

  /* ---------- Status (mapa do Badge no design system) ---------- */
  var STATUS = {
    'rascunho': ['neutral', 'pencil', 'Rascunho'],
    'aguardando-validacao': ['info', 'send', 'Aguardando validação'],
    'ajustes-solicitados': ['attention', 'mensagem', 'Ajustes solicitados'],
    'recusada': ['negative', 'alerta', 'Recusada'],
    'aguardando-avaliacao': ['info', 'relogio', 'Aguardando avaliação'],
    'avaliada': ['positive', 'ok', 'Avaliada'],
    'homologada': ['positive', 'escudo', 'Homologada'],
    'cancelada': ['neutral', 'x', 'Cancelada']
  };
  function badge(variante, nomeIcone, texto) {
    return '<span class="gn-badge gn-badge--' + variante + '">' + icone(nomeIcone) + esc(texto) + '</span>';
  }
  function badgeStatus(status) {
    var s = STATUS[status];
    return badge(s[0], s[1], s[2]);
  }

  /* ---------- Dados fictícios ---------- */
  var CRITERIOS = ['Impacto gerado', 'Complexidade e esforço', 'Iniciativa e proatividade', 'Evidências do resultado'];
  var PESOS = [40, 25, 20, 15];
  var CARLOS = { nome: 'Carlos Andrade', iniciais: 'CA', papel: 'Gestor da Rumo', avatar: 11 };
  var MARCOS = { nome: 'Marcos Teixeira', iniciais: 'MT', papel: 'Pessoa do cliente · validação por link' };

  var ENTREGAS = {
    'avaliada': {
      status: 'avaliada',
      titulo: 'Automatização do relatório de vendas',
      meta: 'Ciclo de outubro de 2026 · enviada em 08/10',
      conteudo: {
        descricao: 'Automatizei o processo de geração do relatório de vendas do cliente, que antes era montado à mão a partir de três planilhas.',
        tempo: '7 dias', origem: 'Foi uma iniciativa minha',
        resultado: 'Um relatório que levava 2 dias para ser produzido passou a ser gerado em aproximadamente 10 minutos. A equipe comercial recebe os números na segunda de manhã, e não mais na quarta.',
        evidencias: [['arquivo', 'email-agradecimento-gestor.pdf', 'Arquivo · 182 KB']]
      },
      avaliacao: {
        nota: '4,6', notas: [4.8, 4.2, 5.0, 4.0],
        situacao: badge('info', 'relogio', 'Em apuração até 06/11'),
        subtitulo: 'Avaliada em 10/10. Vira oficial depois da homologação do RH.',
        justificativa: 'A entrega gerou alto impacto operacional ao reduzir de 2 dias para 10 minutos o tempo de produção de um relatório usado toda semana. O resultado é mensurável, partiu de iniciativa própria e foi confirmado pelo gestor responsável.'
      },
      validacao: { pessoa: CARLOS, decisao: badge('positive', 'ok', 'Aprovada'), data: '09/10', comentario: 'Resultado confirmado. O time comercial já usa o relatório novo desde a semana passada.' },
      ciclo: { nome: 'Outubro de 2026', saldo: '11,9 pts', saldoNota: 'em apuração', contribuicao: '+4,6' },
      historico: [
        ['Sábado, 10 de outubro', [{ ia: true, texto: 'atribuiu a pontuação', diffs: [['add', '4,6']], hora: '02:10' }]],
        ['Sexta, 9 de outubro', [{ pessoa: CARLOS, texto: 'aprovou a entrega', hora: '10:15' }]],
        ['Quinta, 8 de outubro', [{ voce: true, texto: 'enviou para validação', diffs: [['note', 'Carlos Andrade']], hora: '14:20' }, { voce: true, texto: 'cadastrou a entrega', hora: '14:02' }]]
      ]
    },

    'rascunho': {
      status: 'rascunho',
      titulo: 'Script de limpeza de logs',
      meta: 'Ciclo de outubro de 2026 · salvo em 21/10',
      acoes: [['primary', 'Continuar cadastro', '../cadastrar-entrega/index.html?estado=rascunho', 'pencil'], ['excluir']],
      alerta: ['info', 'info', 'Esta entrega ainda não foi enviada', 'Complete os campos e envie para validação até 31/10 para que ela entre no ciclo de outubro.'],
      conteudo: { descricao: 'Criei um script que apaga logs antigos dos servidores de homologação.', tempo: '', origem: '', resultado: '', evidencias: [] },
      validacao: { pessoa: CARLOS, decisao: badge('neutral', 'pencil', 'Ainda não enviada'), data: '', comentario: '', nota: 'Ele recebe o e-mail de validação quando você enviar.' },
      historico: [['Quarta, 21 de outubro', [{ voce: true, texto: 'salvou o rascunho', hora: '09:40' }]]]
    },

    'aguardando-validacao': {
      status: 'aguardando-validacao',
      titulo: 'Treinamento de Git para a equipe do cliente',
      meta: 'Ciclo de outubro de 2026 · enviada em 20/10',
      acoes: [['primary', 'Editar entrega', '../cadastrar-entrega/index.html?estado=editar', 'pencil'], ['excluir']],
      alerta: ['info', 'relogio', 'Com Marcos Teixeira desde 20/10', 'Ele tem até 05/11 para decidir. Até lá, você pode editar ou excluir a entrega; o link de validação mostra sempre a versão mais recente.'],
      conteudo: {
        descricao: 'Preparei e conduzi um treinamento de Git em 3 encontros para a equipe de desenvolvimento do cliente, com exercícios no repositório do próprio projeto.',
        tempo: '2 semanas', origem: 'Foi uma iniciativa minha',
        resultado: 'Oito pessoas treinadas. Os conflitos de merge que travavam as entregas caíram de cerca de 6 para 1 por sprint.',
        evidencias: [['link', 'https://exemplo.com/material-treinamento-git', 'Link']]
      },
      validacao: { pessoa: MARCOS, decisao: badge('info', 'relogio', 'Aguardando decisão'), data: '', comentario: '', nota: 'E-mail com o link seguro enviado em 20/10.' },
      historico: [['Terça, 20 de outubro', [{ voce: true, texto: 'enviou para validação', diffs: [['note', 'Marcos Teixeira (cliente)']], hora: '17:05' }, { voce: true, texto: 'cadastrou a entrega', hora: '16:48' }]]]
    },

    'ajustes-solicitados': {
      status: 'ajustes-solicitados',
      titulo: 'Migração do servidor de testes',
      meta: 'Ciclo de outubro de 2026 · enviada em 16/10',
      acoes: [['primary', 'Ajustar entrega', '../cadastrar-entrega/index.html?estado=ajustes', 'pencil']],
      alerta: ['attention', 'mensagem', 'Carlos Andrade pediu ajustes', 'Ajuste e reenvie até 05/11 para que a entrega entre no ciclo de outubro. O comentário dele está em Validação.'],
      conteudo: {
        descricao: 'Migrei o ambiente de testes do cliente para um servidor novo, com os testes automatizados rodando a cada alteração.',
        tempo: '10 dias', origem: 'Foi uma demanda que recebi',
        resultado: 'Os testes ficaram mais rápidos.',
        evidencias: []
      },
      validacao: { pessoa: CARLOS, decisao: badge('attention', 'mensagem', 'Ajustes solicitados'), data: '19/10', comentario: 'Ficou bom, mas faltou o resultado: quanto tempo os testes levavam antes e depois da migração? Inclua também quem passou a usar o servidor novo.' },
      historico: [
        ['Segunda, 19 de outubro', [{ pessoa: CARLOS, texto: 'pediu ajustes', hora: '11:32' }]],
        ['Sexta, 16 de outubro', [{ voce: true, texto: 'enviou para validação', diffs: [['note', 'Carlos Andrade']], hora: '18:01' }]]
      ]
    },

    'aguardando-avaliacao': {
      status: 'aguardando-avaliacao',
      titulo: 'Monitoramento de filas com alertas',
      meta: 'Ciclo de outubro de 2026 · enviada em 16/10',
      pendenteAvaliacao: true,
      conteudo: {
        descricao: 'Configurei alertas para as filas de processamento de pedidos, avisando a equipe antes de a fila acumular.',
        tempo: '4 dias', origem: 'Foi uma iniciativa minha',
        resultado: 'Nas duas semanas seguintes, nenhum pedido ficou parado mais de 15 minutos. Antes, isso acontecia duas ou três vezes por semana.',
        evidencias: [['arquivo', 'painel-alertas.png', 'Arquivo · 420 KB']]
      },
      validacao: { pessoa: CARLOS, decisao: badge('positive', 'ok', 'Aprovada'), data: '18/10', comentario: '' },
      historico: [
        ['Domingo, 18 de outubro', [{ pessoa: CARLOS, texto: 'aprovou a entrega', hora: '20:12' }]],
        ['Sexta, 16 de outubro', [{ voce: true, texto: 'enviou para validação', diffs: [['note', 'Carlos Andrade']], hora: '09:30' }]]
      ]
    },

    'recusada': {
      status: 'recusada',
      titulo: 'Ajuste no layout do portal de pedidos',
      meta: 'Ciclo de outubro de 2026 · enviada em 12/10',
      alerta: ['negative', 'alerta', 'Carlos Andrade recusou esta entrega em 13/10', 'Entregas recusadas não contam pontos nem entram no ranking. A justificativa está em Validação.'],
      conteudo: {
        descricao: 'Ajustei o layout da tela de pedidos do portal do cliente para o novo padrão de cores.',
        tempo: '1 dia', origem: 'Foi uma demanda que recebi',
        resultado: 'A tela ficou no padrão novo.',
        evidencias: []
      },
      validacao: { pessoa: CARLOS, decisao: badge('negative', 'alerta', 'Recusada'), data: '13/10', comentario: 'Foi um ajuste de rotina previsto no contrato, sem resultado além do que foi pedido. Registre quando houver um ganho que dê para medir.' },
      historico: [
        ['Terça, 13 de outubro', [{ pessoa: CARLOS, texto: 'recusou a entrega', hora: '08:50' }]],
        ['Segunda, 12 de outubro', [{ voce: true, texto: 'enviou para validação', diffs: [['note', 'Carlos Andrade']], hora: '17:40' }]]
      ]
    },

    'homologada': {
      status: 'homologada',
      titulo: 'Painel de indicadores de atendimento',
      meta: 'Ciclo de setembro de 2026 · enviada em 15/09',
      conteudo: {
        descricao: 'Construí um painel com os indicadores de atendimento do cliente, atualizado a cada hora a partir do sistema de chamados.',
        tempo: '3 semanas', origem: 'Foi uma iniciativa minha',
        resultado: 'A coordenação deixou de montar o relatório semanal à mão (cerca de 6 horas por semana) e passou a agir no mesmo dia quando o tempo de resposta sobe.',
        evidencias: [['arquivo', 'print-painel-sem-dados-cliente.png', 'Arquivo · 610 KB'], ['arquivo', 'mensagem-coordenacao.pdf', 'Arquivo · 96 KB']]
      },
      avaliacao: {
        nota: '4,9', notas: [5.0, 4.8, 5.0, 4.6],
        situacao: badge('positive', 'escudo', 'Homologada em 09/10'),
        subtitulo: 'Avaliada em 17/09. Resultado oficial do ciclo de setembro.',
        justificativa: 'Alto impacto: eliminou cerca de 6 horas semanais de trabalho manual e deu à coordenação dados do mesmo dia. Entrega complexa, de iniciativa própria, com evidências claras e sem dados do cliente.'
      },
      validacao: { pessoa: CARLOS, decisao: badge('positive', 'ok', 'Aprovada'), data: '16/09', comentario: 'Painel em uso pela coordenação todos os dias.' },
      ciclo: { nome: 'Setembro de 2026', saldo: '13,0 pts', saldoNota: 'homologado', contribuicao: '+4,9' },
      historico: [
        ['Sexta, 9 de outubro', [{ rh: { nome: 'Juliana Prado', iniciais: 'JP', avatar: 12 }, texto: 'homologou o resultado de setembro', hora: '16:00' }]],
        ['Quinta, 17 de setembro', [{ ia: true, texto: 'atribuiu a pontuação', diffs: [['add', '4,9']], hora: '02:10' }]],
        ['Quarta, 16 de setembro', [{ pessoa: CARLOS, texto: 'aprovou a entrega', hora: '09:12' }]],
        ['Terça, 15 de setembro', [{ voce: true, texto: 'enviou para validação', diffs: [['note', 'Carlos Andrade']], hora: '18:33' }]]
      ]
    },

    'ajustada-rh': {
      status: 'homologada',
      titulo: 'Revisão do controle de acesso do sistema interno',
      meta: 'Ciclo de setembro de 2026 · enviada em 22/09',
      conteudo: {
        descricao: 'Revisei os perfis de acesso do sistema interno de pedidos e removi permissões que não eram mais usadas.',
        tempo: '5 dias', origem: 'Foi uma demanda que recebi',
        resultado: '214 permissões sem uso removidas. A auditoria de acesso do trimestre passou sem apontamentos.',
        evidencias: [['arquivo', 'resumo-revisao-acessos.pdf', 'Arquivo · 230 KB']]
      },
      avaliacao: {
        nota: '3,8', notaIa: '3,4', notas: [3.9, 3.8, 3.0, 4.6],
        situacao: badge('positive', 'escudo', 'Homologada em 09/10'),
        subtitulo: 'Avaliada em 24/09 e revisada pelo RH em 08/10.',
        justificativa: 'Entrega com resultado verificável e boa evidência. O impacto foi considerado restrito a uma área e a entrega partiu de uma demanda.',
        ajuste: { autor: 'Juliana Prado', data: '08/10', texto: 'O gestor confirmou que a revisão alcançou três áreas, não uma. Impacto ajustado de 2,9 para 3,9.' }
      },
      validacao: { pessoa: CARLOS, decisao: badge('positive', 'ok', 'Aprovada'), data: '23/09', comentario: '' },
      ciclo: { nome: 'Setembro de 2026', saldo: '13,0 pts', saldoNota: 'homologado', contribuicao: '+3,8' },
      historico: [
        ['Sexta, 9 de outubro', [{ rh: { nome: 'Juliana Prado', iniciais: 'JP', avatar: 12 }, texto: 'homologou o resultado de setembro', hora: '16:00' }]],
        ['Quinta, 8 de outubro', [{ rh: { nome: 'Juliana Prado', iniciais: 'JP', avatar: 12 }, texto: 'revisou a pontuação', diffs: [['remove', '3,4'], ['add', '3,8']], hora: '15:20' }]],
        ['Quinta, 24 de setembro', [{ ia: true, texto: 'atribuiu a pontuação', diffs: [['add', '3,4']], hora: '02:10' }]],
        ['Quarta, 23 de setembro', [{ pessoa: CARLOS, texto: 'aprovou a entrega', hora: '10:05' }]],
        ['Terça, 22 de setembro', [{ voce: true, texto: 'enviou para validação', diffs: [['note', 'Carlos Andrade']], hora: '17:12' }]]
      ]
    },

    'cancelada': {
      status: 'cancelada',
      titulo: 'Painel de atendimento (registro repetido)',
      meta: 'Ciclo de setembro de 2026 · enviada em 15/09',
      alerta: ['info', 'info', 'O RH cancelou esta entrega em 08/10', 'Ela repetia "Painel de indicadores de atendimento", que foi avaliada e homologada. Entregas canceladas não contam pontos; o histórico fica guardado.'],
      conteudo: {
        descricao: 'Construí um painel com os indicadores de atendimento do cliente.',
        tempo: '3 semanas', origem: 'Foi uma iniciativa minha',
        resultado: 'A coordenação passou a acompanhar o atendimento pelo painel.',
        evidencias: []
      },
      validacao: { pessoa: CARLOS, decisao: badge('neutral', 'x', 'Sem decisão'), data: '', comentario: '', nota: 'Cancelada antes da decisão do validador.' },
      historico: [
        ['Quinta, 8 de outubro', [{ rh: { nome: 'Juliana Prado', iniciais: 'JP', avatar: 12 }, texto: 'cancelou a entrega', diffs: [['note', 'Registro duplicado']], hora: '14:41' }]],
        ['Terça, 15 de setembro', [{ voce: true, texto: 'enviou para validação', diffs: [['note', 'Carlos Andrade']], hora: '18:35' }]]
      ]
    }
  };

  /* ---------- Blocos ---------- */
  function blocoCabecalho(e) {
    var acoes = (e.acoes || []).map(function (a) {
      if (a[0] === 'excluir') {
        return '<button class="gn-btn gn-btn--ghost tela-btn-excluir" type="button" id="btn-excluir">' + icone('lixeira') + 'Excluir entrega</button>';
      }
      return '<a class="gn-btn gn-btn--' + a[0] + '" href="' + a[2] + '">' + icone(a[3]) + esc(a[1]) + '</a>';
    }).join('');
    return '<div class="tela-voltar"><a class="gn-btn gn-btn--ghost gn-btn--sm" href="../minhas-entregas/index.html">' + icone('voltar', 'gn-icon--sm') + 'Minhas entregas</a></div>' +
      '<div class="gn-page__head">' +
        '<div class="tela-titulo"><div class="tela-titulo__linha"><h1 class="gn-page__title">' + esc(e.titulo) + '</h1>' + badgeStatus(e.status) + '</div>' +
        '<p class="gn-page__desc">' + esc(e.meta) + '</p></div>' +
        (acoes ? '<div class="gn-row tela-acoes">' + acoes + '</div>' : '') +
      '</div>';
  }

  function blocoAlerta(e) {
    if (!e.alerta) return '';
    var a = e.alerta;
    return '<div class="gn-alert gn-alert--' + a[0] + '" role="' + (a[0] === 'negative' ? 'alert' : 'status') + '">' + icone(a[1]) +
      '<div class="gn-alert__body"><span class="gn-alert__title">' + esc(a[2]) + '</span><span class="gn-alert__text">' + esc(a[3]) + '</span></div></div>';
  }

  function blocoAvaliacao(e) {
    if (e.pendenteAvaliacao) {
      return '<section class="gn-card" aria-labelledby="t-aval">' +
        '<div class="gn-card__header"><h2 class="gn-card__title" id="t-aval">Avaliação da IA</h2>' + badgeStatus('aguardando-avaliacao') + '</div>' +
        '<div class="gn-empty tela-empty-compacto"><span class="gn-empty__icon">' + icone('relogio') + '</span>' +
        '<h3 class="gn-empty__title">A pontuação ainda não saiu</h3>' +
        '<p class="gn-empty__text">A IA avalia as entregas aprovadas pelos critérios do ciclo. A pontuação aparece aqui até a apuração de 06/11.</p></div></section>';
    }
    var av = e.avaliacao;
    if (!av) return '';
    var criterios = CRITERIOS.map(function (nome, i) {
      var nota = av.notas[i];
      return '<li><div class="gn-meter__row"><span>' + esc(nome) + ' <span class="gn-muted">· peso ' + PESOS[i] + '%</span></span>' +
        '<span class="gn-meter__value">' + nota.toFixed(1).replace('.', ',') + '</span></div>' +
        '<div class="gn-progress" aria-hidden="true"><span style="width:' + Math.round(nota / 5 * 100) + '%"></span></div></li>';
    }).join('');
    var ajuste = av.ajuste
      ? '<div class="tela-ajuste" role="note"><div class="tela-ajuste__linha">' + badge('attention', 'pencil', 'Ajustada pelo RH') +
        '<span class="gn-diff gn-diff--remove">' + esc(av.notaIa) + '</span><span class="gn-diff gn-diff--add">' + esc(av.nota) + '</span></div>' +
        '<p class="tela-ajuste__texto"><b>' + esc(av.ajuste.autor) + '</b> (RH), em ' + esc(av.ajuste.data) + ': ' + esc(av.ajuste.texto) + '</p></div>'
      : '';
    return '<section class="gn-card" aria-labelledby="t-aval">' +
      '<div class="gn-card__header"><div><h2 class="gn-card__title" id="t-aval">Avaliação da IA</h2><p class="gn-card__subtitle">' + esc(av.subtitulo) + '</p></div>' + av.situacao + '</div>' +
      '<div class="gn-card__body tela-aval">' +
        '<div class="tela-nota"><span class="tela-nota__valor">' + esc(av.nota) + '</span><span class="tela-nota__escala">de 5</span>' +
          (av.notaIa ? '<span class="tela-nota__origem">Pontuação da IA: ' + esc(av.notaIa) + '</span>' : '<span class="tela-nota__origem">Média ponderada dos critérios</span>') + '</div>' +
        '<div class="tela-aval__detalhe">' + ajuste +
          '<h3 class="tela-subtitulo">Justificativa</h3><p class="tela-paragrafo">' + esc(av.justificativa) + '</p>' +
          '<h3 class="tela-subtitulo">Pontuação por critério</h3><ul class="gn-meters">' + criterios + '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="gn-card__footer tela-rodape-texto"><span class="gn-help">' + icone('info', 'gn-icon--sm') + 'Avaliação automática, com os mesmos critérios e pesos para todos. O RH pode revisar a pontuação antes da homologação.</span></div>' +
      '</section>';
  }

  function blocoConteudo(e) {
    var c = e.conteudo;
    function valor(v) { return v ? esc(v) : '<span class="gn-muted">Não preenchido</span>'; }
    var evid = c.evidencias.length
      ? '<ul class="gn-attach-list">' + c.evidencias.map(function (ev) {
          return '<li class="gn-attach">' + icone(ev[0] === 'link' ? 'link' : 'arquivo') +
            '<div class="gn-attach__text"><a class="gn-attach__name" href="#">' + esc(ev[1]) + '</a><span class="gn-attach__meta">' + esc(ev[2]) + '</span></div></li>';
        }).join('') + '</ul>'
      : '<span class="gn-muted">Nenhuma evidência anexada</span>';
    return '<section class="gn-card" aria-labelledby="t-conteudo">' +
      '<div class="gn-card__header"><h2 class="gn-card__title" id="t-conteudo">Sobre a entrega</h2></div>' +
      '<div class="gn-card__body"><dl class="tela-conteudo">' +
        '<div><dt>O que você entregou?</dt><dd>' + valor(c.descricao) + '</dd></div>' +
        '<div class="tela-conteudo__par"><div><dt>Em quanto tempo?</dt><dd>' + valor(c.tempo) + '</dd></div><div><dt>Como a entrega começou?</dt><dd>' + valor(c.origem) + '</dd></div></div>' +
        '<div><dt>Qual foi o resultado?</dt><dd>' + valor(c.resultado) + '</dd></div>' +
        '<div><dt>Evidências</dt><dd>' + evid + '</dd></div>' +
      '</dl></div></section>';
  }

  function blocoHistorico(e) {
    var linhas = e.historico.map(function (dia) {
      return '<li class="gn-log__day">' + esc(dia[0]) + '</li>' + dia[1].map(function (it) {
        var avatar, quem;
        if (it.ia) { avatar = '<span class="gn-avatar gn-avatar--sm tela-avatar-ia">' + icone('criterios', 'gn-icon--sm') + '</span>'; quem = '<b>Avaliação automática</b>'; }
        else if (it.rh) { avatar = avatarPessoa(it.rh, 'gn-avatar--sm'); quem = '<b>' + esc(it.rh.nome) + '</b> <span class="gn-badge gn-badge--attention tela-badge-papel">RH</span>'; }
        else if (it.voce) { avatar = avatarPessoa({ iniciais: 'AR', avatar: meuNumero() }, 'gn-avatar--sm'); quem = '<b>Você</b>'; }
        else { avatar = avatarPessoa(it.pessoa, 'gn-avatar--sm'); quem = '<b>' + esc(it.pessoa.nome) + '</b>'; }
        var diffs = (it.diffs || []).map(function (d) { return '<span class="gn-diff gn-diff--' + d[0] + '">' + esc(d[1]) + '</span>'; }).join('');
        return '<li class="gn-log__item">' + avatar + '<div class="gn-log__text"><span class="gn-log__who">' + quem + ' ' + esc(it.texto) + '</span>' +
          (diffs ? '<div class="gn-log__changes">' + diffs + '</div>' : '') + '</div><span class="gn-log__time">' + esc(it.hora) + '</span></li>';
      }).join('');
    }).join('');
    return '<section class="gn-card" aria-labelledby="t-hist">' +
      '<div class="gn-card__header"><h2 class="gn-card__title" id="t-hist">Histórico</h2></div>' +
      '<div class="gn-card__body tela-hist"><ol class="gn-log">' + linhas + '</ol></div></section>';
  }

  function blocoValidacao(e) {
    var v = e.validacao;
    var p = v.pessoa;
    return '<section class="gn-card" aria-labelledby="t-valid">' +
      '<div class="gn-card__header"><h2 class="gn-card__title" id="t-valid">Validação</h2></div>' +
      '<div class="gn-card__body gn-stack">' +
        '<div class="gn-user tela-validador">' + avatarPessoa(p, '') + '<div class="tela-min0"><div class="gn-user__name">' + esc(p.nome) + '</div><div class="gn-user__role">' + esc(p.papel) + '</div></div></div>' +
        '<dl class="tela-readouts"><div class="gn-readout"><dt>Decisão</dt><dd>' + v.decisao + '</dd></div>' +
          (v.data ? '<div class="gn-readout"><dt>Data</dt><dd class="gn-num">' + esc(v.data) + '</dd></div>' : '') + '</dl>' +
        (v.comentario ? '<figure class="tela-comentario"><blockquote>' + esc(v.comentario) + '</blockquote><figcaption>Comentário de ' + esc(p.nome) + '</figcaption></figure>' : '') +
        (v.nota ? '<p class="gn-help tela-sem-margem">' + esc(v.nota) + '</p>' : '') +
      '</div></section>';
  }

  function blocoCiclo(e) {
    var c = e.ciclo;
    if (!c) return '';
    return '<section class="gn-card" aria-labelledby="t-ciclo">' +
      '<div class="gn-card__header"><h2 class="gn-card__title" id="t-ciclo">No ciclo</h2></div>' +
      '<div class="gn-card__body"><dl class="tela-readouts tela-readouts--col">' +
        '<div class="gn-readout"><dt>Ciclo</dt><dd>' + esc(c.nome) + '</dd></div>' +
        '<div class="gn-readout"><dt>Esta entrega</dt><dd><span class="gn-delta gn-delta--pos">' + esc(c.contribuicao) + ' pts</span></dd></div>' +
        '<div class="gn-readout"><dt>Seu saldo do ciclo</dt><dd class="gn-num">' + esc(c.saldo) + ' <span class="gn-muted tela-peso-normal">(' + esc(c.saldoNota) + ')</span></dd></div>' +
      '</dl></div></section>';
  }

  function vazio(icon, classeIcone, titulo, texto, acao) {
    return '<div class="tela-voltar"><a class="gn-btn gn-btn--ghost gn-btn--sm" href="../minhas-entregas/index.html">' + icone('voltar', 'gn-icon--sm') + 'Minhas entregas</a></div>' +
      '<section class="gn-card"><div class="gn-empty"><span class="gn-empty__icon ' + classeIcone + '">' + icone(icon) + '</span>' +
      '<h1 class="gn-empty__title">' + esc(titulo) + '</h1><p class="gn-empty__text">' + esc(texto) + '</p>' +
      '<div class="gn-empty__actions">' + acao + '</div></div></section>';
  }

  function render() {
    if (estado === 'nao-encontrada') {
      main.innerHTML = vazio('busca', '', 'Entrega não encontrada', 'Ela pode ter sido excluída ou o link está incompleto. Suas entregas estão na lista.',
        '<a class="gn-btn gn-btn--primary" href="../minhas-entregas/index.html">Ver minhas entregas</a>');
      return;
    }
    if (estado === 'erro') {
      main.innerHTML = vazio('alerta', 'gn-empty__icon--lock', 'Não foi possível carregar a entrega', 'O Genial não respondeu. A entrega continua salva. Tente de novo em alguns instantes.',
        '<a class="gn-btn gn-btn--secondary" href="?estado=avaliada">Tentar de novo</a>');
      return;
    }
    var e = ENTREGAS[estado] || ENTREGAS.avaliada;
    document.title = e.titulo + ' — Genial';
    main.innerHTML = blocoCabecalho(e) + blocoAlerta(e) +
      '<div class="tela-grid"><div class="gn-stack tela-coluna">' + blocoAvaliacao(e) + blocoConteudo(e) + blocoHistorico(e) + '</div>' +
      '<aside class="gn-stack tela-coluna" aria-label="Validação e ciclo">' + blocoValidacao(e) + blocoCiclo(e) + '</aside></div>';
  }

  /* ---------- Diálogo de exclusão ---------- */
  var dialogo = document.getElementById('dlg-excluir');
  var focoAnterior = null;
  function fecharDialogo() {
    dialogo.hidden = true;
    if (focoAnterior) focoAnterior.focus();
  }
  main.addEventListener('click', function (ev) {
    var botao = ev.target.closest('#btn-excluir');
    if (!botao) return;
    focoAnterior = botao;
    dialogo.hidden = false;
    dialogo.querySelector('[data-fechar]').focus();
  });
  dialogo.querySelector('[data-fechar]').addEventListener('click', fecharDialogo);
  dialogo.addEventListener('click', function (ev) { if (ev.target === dialogo) fecharDialogo(); });
  dialogo.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { fecharDialogo(); return; }
    if (ev.key !== 'Tab') return;
    var focaveis = dialogo.querySelectorAll('button, a[href]');
    var primeiro = focaveis[0];
    var ultimo = focaveis[focaveis.length - 1];
    if (ev.shiftKey && document.activeElement === primeiro) { ev.preventDefault(); ultimo.focus(); }
    else if (!ev.shiftKey && document.activeElement === ultimo) { ev.preventDefault(); primeiro.focus(); }
  });
  // SIMULAÇÃO: "Excluir entrega" no diálogo exclui e volta para Minhas entregas.

  render();
})();
