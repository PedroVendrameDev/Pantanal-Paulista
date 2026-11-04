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
| Cidades        | `#cidades`    | `cidades-quem-somos.css` |
| Info + mapas   | `#mapas`      | `cidades-quem-somos.css` |
| Eventos        | `#eventos`    | `header-hero.css`        |
| Quem somos     | `#quem-somos` | `cidades-quem-somos.css` |
| Contato        | `#contato`    | (a fazer)                |
| Rodapé         | `.site-footer`| (a fazer – Kauê)         |

## Observações para o time

- O reset global (`* { margin:0; padding:0; text-align:center }`) e a fonte
  Inter do código original de Cidades/Quem somos agora valem **só** dentro de
  `#cidades`, `#mapas` e `#quem-somos`, para não quebrar o cabeçalho e os Eventos.
- A seção `#mapas` fica escondida e só aparece quando o link do card aponta
  para `#mapa-<cidade>` (usa `:target`).
- Nomes de imagens foram renomeados sem espaços/maiúsculas
  (ex.: `Back bege.png` → `assets/img/fundos/back-bege.png`).

## Como abrir

Abra o `index.html` no navegador (ou use a extensão Live Server do VS Code).
