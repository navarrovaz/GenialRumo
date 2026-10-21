# Cartela de avatares

12 avatares ilustrados (`avatar-01.svg` a `avatar-12.svg`, 64×64, círculo) para identificar pessoas no Genial sem foto real. Pedido do dono do produto em 21/10/2026: "não foto real, vamos padronizar uma cartela de avatares para que as pessoas consigam mudar suas fotos e no ranking seja fácil de diferenciar".

- **Uso:** dentro de `gn-avatar gn-avatar--img` (componente Avatar). O SVG é decorativo quando o nome da pessoa está ao lado (`alt=""`); sozinho, `alt` com o nome da pessoa.
- **Escolha:** cada pessoa escolhe o próprio avatar (componente AvatarPicker). Enquanto não escolhe, recebe um da cartela automaticamente (aprovado em 21/10/2026; sugestão de regra: número de matrícula, módulo 12) e pode trocar quando quiser. Sem avatar, o Avatar mostra as iniciais.
- **Variedade:** tons de pele, cabelos, acessórios (óculos, lenço) e fundos diferentes, para que pessoas lado a lado no ranking se distingam pela imagem, não só pela cor.
- **Cores:** fundos e roupas usam valores dos tokens (`genial-100`, `genial-200`, `success-200`, `warning-200`, `danger-200`, `neutral-100`; `genial-600`, `genial-800`, `success-700`, `danger-600`, `warning-600`, `neutral-700`). Tons de pele e de cabelo são cores próprias da ilustração, como as do logo. Os arquivos são gerados por script; não edite cores à mão.
- **Novos avatares:** só pela cartela; nada de upload de foto (decisão do dono do produto).
