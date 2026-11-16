# Site Região Turística Pantanal Paulista

Site estático (HTML, CSS e JavaScript puro). Abra o `index.html` no navegador, sem instalar nada.

## Arquivos

```
index.html    página inicial (banner, quem somos, atalhos, eventos)
cidades.html  busca + cartões das 12 cidades + guia completo de cada uma
peixes.html   bacias hidrográficas e guia das espécies
admin.html    área administrativa (login e painel de edição)
style.css     TODOS os estilos (cores, tamanhos, fontes), com sumário numerado no topo
index.js      TODO o comportamento (menu, carrossel, busca, painel admin)
img/          todas as imagens (img/peixes/ guarda as fotos dos peixes)
```

Cada arquivo começa com um **SUMÁRIO** em comentário e usa faixas `=====` para marcar onde
cada seção começa. Nos HTMLs também há `FIM:` marcando onde cada seção termina.
Use Ctrl+F com o nome da seção para ir direto até ela.

## Como os nomes foram escolhidos

Todos os nomes de `class` e `id` estão em português e seguem o padrão **bloco__elemento--variação**:

- `cabecalho`, `cabecalho__marca`, `cabecalho__marca-nome` → o cabeçalho e suas partes;
- `especie`, `especie__nome`, `especie__selo--alerta` → o cartão de peixe, uma parte dele e uma variação;
- `#titulo-cidades`, `#caixa-login`, `#formulario-edicao` → ids (nomes únicos usados por links e pelo `index.js`).

Se renomear algo, troque **nos três lugares**: HTML, `style.css` e `index.js`.

## Seções do `style.css`

| Nº | Seção                          | Onde aparece                          |
| -- | ------------------------------ | ------------------------------------- |
| 1  | Variáveis                      | cores, fontes e medidas do site todo  |
| 2  | Base                           | reset, fundo bege, títulos            |
| 3  | Cabeçalho e menu               | todas as páginas                      |
| 4  | Banner                         | primeira tela do index                |
| 5  | Quem somos                     | index (texto, foto, cartões e atalhos)|
| 6  | Cidades                        | cartões com foto                      |
| 7  | Informações da cidade          | guia + mapa                           |
| 8  | Eventos                        | carrossel do index                    |
| 9  | Página de cidades              | busca e guia                          |
| 10 | Página de peixes               | bacias e espécies                     |
| 11 | Área administrativa            | login e painel                        |
| 12 | Rodapé                         | todas as páginas                      |
| 13 | Menos movimento                | acessibilidade                        |

## Manutenção rápida

- **Trocar cor ou fonte do site todo:** `style.css`, seção 1 (variáveis em `:root`).
- **Novo evento:** `index.js`, seção 2.1, lista `EVENTOS` (copie um bloco) e coloque a arte em `img/`.
- **Nova cidade:** em `cidades.html`, copie um cartão de `#grade-cidades` e um `<article class="mapa-cidade">` de `#mapas`, trocando os ids (`guia-...`, `descricao-...`); acrescente o nome na lista `CIDADES` do `index.js`.
- **Novo peixe:** em `peixes.html`, copie um `<li class="especie">`; a foto fica em `img/peixes/<id>.jpg`.
- **Usuário e senha do admin:** `index.js`, seção 5 (`USUARIO` e `SENHA`). Atenção: ficam visíveis no arquivo, não são segurança de verdade.
- **Redes sociais do rodapé:** `https://www.instagram.com/rtpantanal/`, `https://www.facebook.com/rtpantanalpaulista/`, e-mail `rtpantanalpaulista@gmail.com`.
