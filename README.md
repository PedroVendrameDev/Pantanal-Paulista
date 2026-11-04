# site-pantanal-paulista

Site Web para o grupo Pantanal Paulista (Região Turística Pantanal Paulista).

## Estrutura

```
index.html               página única com todas as seções
header-hero.css          cabeçalho, hero e carrossel de Eventos
cidades-quem-somos.css   Cidades, mapas/informações e Quem somos
index.js                 menu, link ativo e carrossel de Eventos
assets/img/
├── banner.png           imagem do hero
├── cidades/             fotos dos cards das cidades
├── fundos/              fundos bege/branco (só back-bege.png está em uso)
└── quem-somos/          foto da seção Quem somos
```

## Seções (ordem no `index.html`)

| Seção          | id            | Estilo                   |
| -------------- | ------------- | ------------------------ |
| Hero           | `#inicio`     | `header-hero.css`        |
| Quem somos     | `#quem-somos` | `cidades-quem-somos.css` |
| Cidades        | `#cidades`    | `cidades-quem-somos.css` |
| Info + mapas   | `#mapas`      | `cidades-quem-somos.css` |
| Eventos        | `#eventos`    | `header-hero.css`        |
| Contato        | `#contato`    | (a fazer, fora do menu)  |
| Rodapé         | `.site-footer`| (a fazer – Kauê)         |

Menu: Início, Quem somos, Cidades, Eventos (mesma ordem da página).

## Padrões do site (editar em um lugar só)

No `:root` do `header-hero.css`:

- `--fonte-principal`: fonte do site inteiro (hoje Outfit).
- `--titulo-*`: tamanho, peso, inclinação, espaçamento e cor de todos os títulos de seção.
- Fundo bege: classe `.content-section` (vale para toda seção abaixo do hero).

## Observações para o time

- Todo o código tem comentários explicando o que cada propriedade faz e o que
  acontece se for alterada.
- O reset global (`* { margin:0; padding:0; text-align:center }`) e a fonte
  Inter do código original de Cidades/Quem somos agora valem **só** dentro de
  `#cidades`, `#mapas` e `#quem-somos`, para não quebrar o cabeçalho e os Eventos.
- A seção `#mapas` fica escondida e só aparece quando o link do card aponta
  para `#mapa-<cidade>` (usa `:target`).
- Nomes de imagens foram renomeados sem espaços/maiúsculas
  (ex.: `Back bege.png` → `assets/img/fundos/back-bege.png`).

## Como abrir

Abra o `index.html` no navegador (ou use a extensão Live Server do VS Code).
