# Site Região Turística Pantanal Paulista

Site estático (HTML, CSS e JavaScript puro). Abra o `index.html` no navegador.

## Estrutura

```
index.html   página única, com comentários explicando cada seção
style.css    todos os estilos, com sumário numerado no topo
index.js     menu, link ativo, carrossel de Eventos e ano do rodapé
img/         todas as imagens (sem subpastas)
```

## Seções (ordem no `index.html`) e onde está o estilo

| Seção        | id            | Seção do `style.css`        |
| ------------ | ------------- | --------------------------- |
| Cabeçalho    | `.site-header`| 3. Cabeçalho e menu         |
| Hero         | `#inicio`     | 4. Hero (100% da tela)      |
| Quem somos   | `#quem-somos` | 5. Quem somos               |
| Cidades      | `#cidades`    | 6. Cidades                  |
| Info + mapa  | `#mapas`      | 7. Informações da cidade    |
| Eventos      | `#eventos`    | 8. Eventos                  |
| Rodapé       | `.site-footer`| 9. Rodapé                   |

Cores, fontes e medidas do site todo ficam na seção 1 do `style.css` (variáveis em `:root`).

## Manutenção rápida

- **Novo evento:** edite a lista `EVENTOS` no `index.js` (seção 2.1) e coloque a arte em `img/`.
- **Nova cidade:** copie um card em `#cidades` e um bloco `<article class="mapa-cidade">` em `#mapas`, trocando o `id`.
- **Redes sociais do rodapé:** `https://www.instagram.com/rtpantanal/`, `https://www.facebook.com/rtpantanalpaulista/`, e-mail `rtpantanalpaulista@gmail.com`.
