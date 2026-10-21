# ConfirmDialog

Diálogo que confirma uma ação que não pode ser desfeita pelo próprio usuário, mostrando o que será afetado.

**O consumidor fornece:** pergunta-título com o objeto ("Enviar outubro para o RH?"), consequência em uma frase, resumo dos números afetados, pendências, e os rótulos das duas ações.

- Use para: Enviar mês para o RH, Excluir marcação, Excluir afastamento. Não use para salvar ou cancelar edições comuns.
- O botão de confirmação repete o verbo do título ("Enviar para o RH", "Excluir marcação"); nunca "OK" ou "Sim". Ação destrutiva usa `gn-btn--danger`.
- O botão de saída diz o que acontece ("Revisar", "Manter marcação") e fica à esquerda do primário.
- Pendências aparecem dentro do diálogo como Alert `attention`; se impedirem o envio, desabilite o primário com o motivo visível.
- Fundo `overlay-scrim`, `radius-xl`, `shadow-lg`, largura máxima 480px. Fecha com Esc e devolve o foco ao botão que o abriu.
- Não use `confirm()` do navegador.
