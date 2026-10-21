# E-mail de solicitação de validação — integração

- **Exceção ao design system:** e-mail usa HTML em tabelas, estilos inline e os valores dos tokens escritos por extenso (decisão 003, Proposta). A lista de tokens usados está no comentário do topo de cada modelo; não use outras cores.
- **Modelo no servidor:** transforme `index.html` e `cliente.html` em templates (Razor, RazorEngine ou o mecanismo de e-mail que o Genial já usa) e troque os dados de exemplo pelas variáveis da especificação. Remova o comentário do topo antes de enviar.
- **Texto puro:** envie `multipart/alternative` com a versão de `texto.txt`.
- **Logo:** troque o caminho relativo por uma URL pública e absoluta (HTTPS). Não embuta em base64 (Outlook e Gmail bloqueiam).
- **Links:** absolutos, com HTTPS. Gestor: rota autenticada do Genial. Cliente: rota pública com o token de uso único. Os parâmetros `decisao=` só pré-selecionam a decisão na página.
- **Escapar conteúdo:** título e resultado vêm do colaborador; escape HTML antes de montar o e-mail.
- **Cortar o resultado** em 280 caracteres no último espaço, com "…".
- **Disparo:** no envio e no reenvio da entrega (não ao salvar alterações). Registrar o envio no histórico da entrega (auditoria).
- **Remetente e serviço de envio:** definidos pela TI (seção 11.2 da especificação).
