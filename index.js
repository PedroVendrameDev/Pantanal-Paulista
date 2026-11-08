/* ==========================================================================
   INDEX.JS - ARQUIVO ÚNICO DE JAVASCRIPT DO SITE
   --------------------------------------------------------------------------
   JavaScript é o que dá "comportamento" à página (o HTML é a estrutura e o
   CSS é a aparência). Este arquivo tem três partes independentes, cada uma
   dentro de uma função que se executa sozinha "(function () { ... })();".
   Isso isola as variáveis de cada parte: uma não atrapalha a outra.

   SUMÁRIO
     1. Cabeçalho (sombra ao rolar, menu de celular, link ativo)
     2. Eventos (carrossel infinito) - AQUI se edita a lista de eventos
     3. Rodapé (ano do copyright)
   ========================================================================== */


/* ==========================================================================
   1. CABEÇALHO
   - sombra e altura menor ao rolar a página;
   - menu de celular (abrir, fechar, tecla Esc);
   - destaque do link da seção que está na tela.
   ========================================================================== */
(function () {
    // Procura o cabeçalho no HTML. Se não existir, encerra a função (return).
    const header = document.querySelector(".site-header");
    if (!header) return;

    // Todos os links do menu e a lista dos ids de seção para onde eles apontam.
    // Ex.: href="#cidades" -> .slice(1) tira o "#" -> "cidades".
    const links = Array.from(document.querySelectorAll(".main-navigation__link"));
    const ids = links.map((link) => link.getAttribute("href").slice(1));

    // Marca UM único link como "seção atual" (o CSS pinta de amarelo o que
    // tiver aria-current="location").
    function setActive(id) {
        links.forEach((link) => {
            if (link.getAttribute("href") === "#" + id) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    /* ----- 1.1 Estado de rolagem ----- */
    function onScroll() {
        // Depois de rolar 16px, adiciona a classe "is-scrolled" (cabeçalho
        // mais baixo e com sombra). Voltou ao topo? A classe é removida.
        header.classList.toggle("is-scrolled", window.scrollY > 16);

        // No fim da página, a última seção pode nunca chegar ao meio da tela.
        // Então, ao chegar no rodapé, o último link do menu fica ativo,
        // MAS só se a última seção do menu for mesmo a última da página.
        const noFim = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
        const ultimaSecao = document.querySelector("main > section:last-of-type");
        const ultimoId = ids[ids.length - 1];

        if (noFim && ultimaSecao && ultimaSecao.id === ultimoId) {
            setActive(ultimoId);
        }
    }

    onScroll(); // roda uma vez ao carregar (a página pode abrir já rolada)
    window.addEventListener("scroll", onScroll, { passive: true }); // "passive" = rolagem mais fluida

    /* ----- 1.2 Menu de celular ----- */
    const toggle = header.querySelector(".menu-toggle"); // botão "Menu"
    const nav = document.getElementById("menu-principal"); // painel do menu

    if (toggle && nav) {
        const icon = toggle.querySelector(".menu-toggle__icon");

        // Abre (open = true) ou fecha (open = false) o menu.
        function setOpen(open) {
            nav.classList.toggle("is-open", open); // o CSS mostra o painel com esta classe
            toggle.setAttribute("aria-expanded", String(open)); // avisa o leitor de tela
            if (icon) icon.textContent = open ? "close" : "menu"; // troca o ícone (X ou 3 linhas)
        }

        // Clicar no botão alterna entre aberto e fechado.
        toggle.addEventListener("click", () => {
            setOpen(toggle.getAttribute("aria-expanded") !== "true");
        });

        // Fecha o menu depois de escolher uma seção.
        nav.addEventListener("click", (event) => {
            if (event.target.closest("a")) setOpen(false);
        });

        // Tecla Esc fecha o menu e devolve o foco ao botão.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
                setOpen(false);
                toggle.focus();
            }
        });

        // Se a tela aumentar (ex.: girar o celular), o painel aberto não fica "preso".
        window.matchMedia("(min-width: 821px)").addEventListener("change", (event) => {
            if (event.matches) setOpen(false);
        });
    }

    /* ----- 1.3 Link ativo: a seção que cruza o meio da tela é a atual ----- */
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
        // O "observer" avisa quando uma seção entra na faixa do meio da tela.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-45% 0px -50% 0px" } // faixa fina no meio da tela
        );

        sections.forEach((section) => observer.observe(section));
    }
})();


/* ==========================================================================
   2. EVENTOS - carrossel infinito
   Informações aparecem no hover (mouse) e no toque (celular).
   ========================================================================== */
(function () {
    "use strict"; // modo estrito: o navegador avisa de erros comuns de código

    /* ----------------------------------------------------------------------
       2.1 AQUI VOCÊ EDITA OS EVENTOS
       Cada evento é um bloco { ... } com estes campos:
         categoria: etiqueta mostrada abaixo do card (ex.: "Pesca esportiva")
         imagem:    caminho da foto (ex.: "img/evento-x.jpg"). Vazio ("")
                    usa uma imagem genérica verde.
         alt:       descrição da foto para leitores de tela
         titulo:    título que aparece sobre a foto
         data:      data e horário
         local:     cidade/lugar
         descricao: texto curto (aparece cortado em 6 linhas)
         link:      endereço do botão (post de origem no Instagram)
         textoLink: texto do botão
       Para ADICIONAR: copie um bloco inteiro, cole depois da vírgula e troque
       os textos. Para REMOVER: apague o bloco. A ordem aqui é a ordem na tela.
       ---------------------------------------------------------------------- */
    const EVENTOS = [
        {
            categoria: "Pesca esportiva",
            imagem: "img/evento-tucunasud.jpg",
            alt: "Arte de divulgação do 3º Torneio de Pesca TucunaSud 2026, em Sud Mennucci",
            titulo: "3º TucunaSud 2026",
            data: "21 de novembro • largada às 7h30",
            local: "Sud Mennucci – SP",
            descricao:
                "Torneio de pesca ao tucunaré nos Quiosques Recanto das Águas, com competição feminina, troféus, prêmios em dinheiro e sorteios. Inscrição: R$ 350 até 20/11.",
            link: "https://www.instagram.com/visitesudmennucci/p/DfZi_dhpbbb/",
            textoLink: "Ver no Instagram",
        },
        {
            categoria: "Piracema",
            imagem: "img/evento-piracema.jpg",
            alt: "Arte da campanha Período de Piracema, de 1º de novembro a 28 de fevereiro",
            titulo: "Período de Piracema",
            data: "1º de novembro a 28 de fevereiro",
            local: "Toda a Região Pantanal Paulista",
            descricao:
                "Fase de reprodução dos peixes: a pesca fica sujeita às restrições da lei ambiental. Turistas e pescadores devem respeitar as regras e preservar os rios.",
            link: "https://www.instagram.com/rtpantanal/p/DfIV8imhkKg/",
            textoLink: "Ver no Instagram",
        },
        {
            categoria: "Feira",
            imagem: "img/evento-feira-valparaiso.jpg",
            alt: 'Arte da Feira Itinerante Benedito da Silva "Dito Pipoqueiro", em Valparaíso',
            titulo: "Feira Itinerante Dito Pipoqueiro",
            data: "Domingo, 18 de outubro • 7h às 13h",
            local: "Praça Oscar de Arruda – Valparaíso",
            descricao:
                "Hortifrúti, alimentação, artesanato e produtos diversos, levando os feirantes para mais perto da população.",
            link: "https://www.instagram.com/cultura_esporte_vp/p/Dej3A-2jj_7/",
            textoLink: "Ver no Instagram",
        },
        {
            categoria: "Turismo",
            imagem: "img/evento-camara-tecnica.jpg",
            alt: "Representantes dos municípios na reunião da Câmara Técnica de Turismo",
            titulo: "Câmara Técnica de Turismo",
            data: "7 de outubro",
            local: "Região Turística Pantanal Paulista",
            descricao:
                "Representantes dos municípios discutiram a participação em feiras e eventos, o site oficial da região e o Plano Regional de Turismo.",
            link: "https://www.instagram.com/rtpantanal/p/DeNKpFwvY9O/",
            textoLink: "Ver no Instagram",
        },
        {
            categoria: "Concurso",
            imagem: "img/evento-miss-mister.jpg",
            alt: "Arte do Miss & Mister Turismo Sud Mennucci 2026",
            titulo: "Miss & Mister Turismo 2026",
            data: "Inscrições de 6 a 14 de outubro",
            local: "Sud Mennucci – SP",
            descricao:
                "Concurso para jovens de 16 a 26 anos de Sud Mennucci ou Bandeirantes D’Oeste, que celebra a beleza e o turismo da cidade.",
            link: "https://www.instagram.com/visitesudmennucci/p/DeK99U-J8yt/",
            textoLink: "Ver no Instagram",
        },
    ];

    /* ----------------------------------------------------------------------
       2.2 DAQUI PRA BAIXO NÃO PRECISA MEXER
       ---------------------------------------------------------------------- */

    // Elementos do HTML que o carrossel usa.
    const secao = document.getElementById("eventos"); // a seção inteira
    const trilho = document.getElementById("eventos-trilho"); // a fila de cards (<ul>)
    const botao = document.getElementById("eventos-pausa"); // botão "Pausar carrossel"
    if (!secao || !trilho || !botao) return; // se algum não existir, encerra

    const janela = trilho.parentElement; // a "janela" que recorta o trilho
    const VELOCIDADE = 50; // velocidade do carrossel, em pixels por segundo

    // Cria uma imagem genérica (SVG embutido) quando "imagem" está vazia.
    function imagemGenerica(indice) {
        const cores = [
            ["#163808", "#8fc79a"],
            ["#2f7d6d", "#a8dccf"],
            ["#3b7a2a", "#cfe3a0"],
        ];
        const par = cores[indice % cores.length]; // alterna entre as 3 combinações
        const svg =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">' +
            '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' +
            par[1] +
            '"/>' +
            '<stop offset="1" stop-color="' +
            par[0] +
            '"/></linearGradient></defs>' +
            '<rect width="700" height="1500" fill="url(#g)"/>' +
            '<path d="M0 430 Q100 380 200 430 T400 430 V600 H0Z" fill="#fff" opacity=".25"/>' +
            '<path d="M0 480 Q100 430 200 480 T400 480 V600 H0Z" fill="#fff" opacity=".25"/></svg>';
        return "data:image/svg+xml," + encodeURIComponent(svg);
    }

    // Atalho para criar um elemento HTML: el("p", "classe", "texto").
    function el(tag, classe, texto) {
        const e = document.createElement(tag);
        if (classe) e.className = classe;
        if (texto) e.textContent = texto;
        return e;
    }

    // Monta o card de UM evento (ev) na posição i da lista.
    function criarCard(ev, i) {
        const li = el("li", "eventos__item");
        const fig = el("figure", "evento");
        const midia = el("div", "evento__midia");

        // Botão que envolve a foto (clicável no toque e no teclado).
        const gatilho = el("button", "evento__gatilho");
        gatilho.type = "button";
        gatilho.setAttribute("aria-expanded", "false");
        gatilho.setAttribute("aria-label", ev.categoria + ": " + ev.titulo + ". Ver detalhes");

        // Foto do evento.
        const img = el("img", "evento__imagem");
        img.src = ev.imagem || imagemGenerica(i);
        img.alt = ev.alt || "";
        img.loading = "lazy"; // só baixa quando estiver perto da tela
        gatilho.appendChild(img);

        // Painel de informações (aparece sobre a foto).
        const info = el("div", "evento__info");
        info.appendChild(el("h3", "evento__subtitulo", ev.titulo));

        // Data e local, um embaixo do outro (separados por <br>).
        const meta = el("p", "evento__meta");
        meta.appendChild(document.createTextNode(ev.data));
        meta.appendChild(document.createElement("br"));
        meta.appendChild(document.createTextNode(ev.local));
        info.appendChild(meta);

        info.appendChild(el("p", "evento__descricao", ev.descricao));

        // Botão com o link do evento. Links externos abrem em nova aba.
        const saiba = el("a", "evento__saiba", ev.textoLink || "Saiba mais");
        saiba.href = ev.link || "#";
        if (/^https?:/.test(saiba.href) && saiba.origin !== location.origin) {
            saiba.target = "_blank";
            saiba.rel = "noopener noreferrer"; // segurança ao abrir nova aba
        }
        info.appendChild(saiba);

        // Junta as peças: foto + painel dentro da mídia; mídia + legenda no card.
        midia.append(gatilho, info);
        fig.append(midia, el("figcaption", "evento__nome", ev.categoria));
        li.appendChild(fig);
        return li;
    }

    // Cria os cards originais e guarda a lista deles.
    EVENTOS.forEach(function (ev, i) {
        trilho.appendChild(criarCard(ev, i));
    });
    const originais = Array.from(trilho.children);

    /* ----- 2.3 Loop infinito -----
       Para o carrossel nunca ficar com espaço vazio, os cards são
       copiados (clones) até cobrir a janela, e depois o bloco inteiro é
       duplicado. A animação do CSS anda exatamente a largura de UM bloco e
       recomeça: o olho não percebe a emenda. */

    // Copia uma lista de cards para o fim do trilho (as cópias são "decorativas").
    function copiar(lista) {
        lista.forEach(function (li) {
            const clone = li.cloneNode(true);
            clone.dataset.clone = "true"; // marca como cópia (para remover depois)
            clone.setAttribute("aria-hidden", "true"); // leitor de tela ignora as cópias
            clone.querySelectorAll("a, button").forEach(function (x) {
                x.tabIndex = -1; // a tecla Tab pula as cópias
            });
            trilho.appendChild(clone);
        });
    }

    // (Re)monta o trilho e calcula a distância e a duração da animação.
    function montar() {
        fechar();
        trilho.querySelectorAll("[data-clone]").forEach(function (c) {
            c.remove(); // apaga cópias antigas
        });

        // Largura somada dos cards originais.
        const larguraOriginais = originais.reduce(function (soma, li) {
            return soma + li.offsetWidth;
        }, 0);
        if (!larguraOriginais) return;

        // Quantas vezes repetir os originais para cobrir a janela.
        const repeticoes = Math.max(1, Math.ceil(janela.offsetWidth / larguraOriginais));
        for (let i = 1; i < repeticoes; i++) copiar(originais);

        // Distância percorrida = largura de um bloco completo.
        const bloco = Array.from(trilho.children);
        const distancia = bloco.reduce(function (soma, li) {
            return soma + li.offsetWidth;
        }, 0);
        copiar(bloco); // segundo bloco: evita espaço vazio durante o movimento

        // Entrega os números ao CSS (variáveis --ev-distancia e --ev-duracao).
        trilho.style.setProperty("--ev-distancia", distancia + "px");
        trilho.style.setProperty("--ev-duracao", distancia / VELOCIDADE + "s");
    }

    /* ----- 2.4 Abrir/fechar as informações (toque ou clique) ----- */

    // Fecha todos os cards abertos.
    function fechar() {
        trilho.querySelectorAll(".evento--aberto").forEach(function (c) {
            c.classList.remove("evento--aberto");
        });
        trilho.querySelectorAll(".evento__gatilho").forEach(function (b) {
            b.setAttribute("aria-expanded", "false");
        });
    }

    // Abre o card clicado (ou fecha, se já estava aberto).
    function alternar(card) {
        const abrir = !card.classList.contains("evento--aberto");
        fechar();
        if (abrir) {
            card.classList.add("evento--aberto");
            card.querySelector(".evento__gatilho").setAttribute("aria-expanded", "true");
        }
    }

    // Clique dentro do trilho: na foto abre/fecha; no painel (fora do link) fecha.
    trilho.addEventListener("click", function (e) {
        const gatilho = e.target.closest(".evento__gatilho");
        if (gatilho) return alternar(gatilho.closest(".evento"));
        if (e.target.closest(".evento__info") && !e.target.closest("a")) fechar();
    });

    // Clicar fora de qualquer card, ou apertar Esc, fecha tudo.
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".evento")) fechar();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") fechar();
    });

    /* ----- 2.5 Pausa manual ----- */
    botao.addEventListener("click", function () {
        // A classe "eventos--pausado" faz o CSS parar a animação.
        const pausado = secao.classList.toggle("eventos--pausado");
        botao.setAttribute("aria-pressed", pausado);
        botao.textContent = pausado ? "Retomar carrossel" : "Pausar carrossel";
    });

    /* ----- 2.6 Início e redimensionamento ----- */
    let espera; // guarda o "relógio" do atraso
    window.addEventListener("resize", function () {
        // Só remonta 200ms depois que a pessoa parar de redimensionar a janela.
        clearTimeout(espera);
        espera = setTimeout(montar, 200);
    });
    montar(); // monta o carrossel pela primeira vez
})();


/* ==========================================================================
   3. RODAPÉ
   Mantém o ano do copyright sempre atual (no HTML fica 2026 como reserva).
   ========================================================================== */
(function () {
    const ano = document.getElementById("rodape-ano");
    if (ano) ano.textContent = new Date().getFullYear();
})();
