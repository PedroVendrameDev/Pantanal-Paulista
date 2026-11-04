/* ============================================================== */
/*  PARTE 1 – CABEÇALHO (já existia)                               */
/* ============================================================== */

/*
 * Comportamento do cabeçalho:
 * 1. sombra e altura menor ao rolar a página;
 * 2. menu de celular (abrir, fechar, tecla Esc);
 * 3. destaque do link da seção que está na tela.
 */
(function () {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const links = Array.from(document.querySelectorAll(".main-navigation__link"));
    const ids = links.map((link) => link.getAttribute("href").slice(1));

    // Marca um único link como "seção atual".
    function setActive(id) {
        links.forEach((link) => {
            if (link.getAttribute("href") === "#" + id) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    // 1. Estado de rolagem.
    function onScroll() {
        header.classList.toggle("is-scrolled", window.scrollY > 16);

        // No fim da página, a última seção pode nunca chegar ao meio da tela.
        const noFim = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
        if (noFim && ids.length) setActive(ids[ids.length - 1]);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // 2. Menu de celular.
    const toggle = header.querySelector(".menu-toggle");
    const nav = document.getElementById("menu-principal");

    if (toggle && nav) {
        const icon = toggle.querySelector(".menu-toggle__icon");

        function setOpen(open) {
            nav.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", String(open));
            if (icon) icon.textContent = open ? "close" : "menu";
        }

        toggle.addEventListener("click", () => {
            setOpen(toggle.getAttribute("aria-expanded") !== "true");
        });

        // Fecha o menu depois de escolher uma seção.
        nav.addEventListener("click", (event) => {
            if (event.target.closest("a")) setOpen(false);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
                setOpen(false);
                toggle.focus();
            }
        });

        // Se a tela aumentar, o painel aberto não deve ficar "preso".
        window.matchMedia("(min-width: 821px)").addEventListener("change", (event) => {
            if (event.matches) setOpen(false);
        });
    }

    // 3. Link ativo: a seção que cruza o meio da tela é a atual.
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );

        sections.forEach((section) => observer.observe(section));
    }
    
})();


/* ============================================================== */
/*  PARTE 2 – SEÇÃO EVENTOS (carrossel)                            */
/* ============================================================== */

/* ==========================================================
   SEÇÃO EVENTOS – carrossel infinito com informações no
   hover (mouse) e no toque (celular).

   Tudo está dentro de uma função, então nada aqui conflita
   com o js/header.js ou com os scripts do resto do grupo.
   ========================================================== */
(function () {
  'use strict';

  /* ========================================================
     1) AQUI VOCÊ EDITA OS EVENTOS
     - imagem: caminho da foto, a partir do index.html
               (ex.: "assets/img/eventos/pesca.jpg").
               Deixe "" para usar uma imagem genérica.
     - Pode adicionar, remover ou reordenar à vontade.
     - Os textos abaixo são só EXEMPLO: troque pelos reais.
     ======================================================== */
  const EVENTOS = [
    {
      categoria: 'Pesca',
      imagem: '',
      alt: 'Pescador em um rio ao pôr do sol',
      titulo: 'Torneio de Pesca Esportiva',
      data: '15 e 16 de agosto',
      local: 'Ilha Solteira – SP',
      descricao: 'Competição aberta a pescadores amadores e profissionais, com premiação por categoria.',
      link: '#eventos',
      textoLink: 'Saiba mais'
    },
    {
      categoria: 'Turismo',
      imagem: '',
      alt: 'Barco navegando pelo rio',
      titulo: 'Passeio de Barco pelo Rio',
      data: 'Todos os fins de semana',
      local: 'Castilho – SP',
      descricao: 'Roteiro guiado para conhecer a fauna, a flora e as paisagens da região.',
      link: '#eventos',
      textoLink: 'Saiba mais'
    },
    {
      categoria: 'Shows',
      imagem: '',
      alt: 'Palco de show com luzes',
      titulo: 'Festival de Música Regional',
      data: '05 de setembro',
      local: 'Andradina – SP',
      descricao: 'Uma noite com artistas da região, praça de alimentação e entrada gratuita.',
      link: '#eventos',
      textoLink: 'Saiba mais'
    }
  ];

  /* ========================================================
     2) DAQUI PRA BAIXO NÃO PRECISA MEXER
     ======================================================== */
  const secao  = document.getElementById('eventos');
  const trilho = document.getElementById('eventos-trilho');
  const botao  = document.getElementById('eventos-pausa');
  if (!secao || !trilho || !botao) return;   // seção não está na página

  const janela = trilho.parentElement;
  const VELOCIDADE = 50; // pixels por segundo

  /* imagem genérica (SVG embutido) quando "imagem" está vazia */
  function imagemGenerica(indice) {
    const cores = [['#163808', '#8fc79a'], ['#2f7d6d', '#a8dccf'], ['#3b7a2a', '#cfe3a0']];
    const par = cores[indice % cores.length];
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + par[1] + '"/>' +
      '<stop offset="1" stop-color="' + par[0] + '"/></linearGradient></defs>' +
      '<rect width="400" height="600" fill="url(#g)"/>' +
      '<path d="M0 430 Q100 380 200 430 T400 430 V600 H0Z" fill="#fff" opacity=".25"/>' +
      '<path d="M0 480 Q100 430 200 480 T400 480 V600 H0Z" fill="#fff" opacity=".25"/></svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto)  e.textContent = texto;
    return e;
  }

  function criarCard(ev, i) {
    const li    = el('li', 'eventos__item');
    const fig   = el('figure', 'evento');
    const midia = el('div', 'evento__midia');

    const gatilho = el('button', 'evento__gatilho');
    gatilho.type = 'button';
    gatilho.setAttribute('aria-expanded', 'false');
    gatilho.setAttribute('aria-label', ev.categoria + ': ' + ev.titulo + '. Ver detalhes');

    const img = el('img', 'evento__imagem');
    img.src = ev.imagem || imagemGenerica(i);
    img.alt = ev.alt || '';
    img.loading = 'lazy';
    gatilho.appendChild(img);

    const info = el('div', 'evento__info');
    info.appendChild(el('h3', 'evento__subtitulo', ev.titulo));

    const meta = el('p', 'evento__meta');
    meta.appendChild(document.createTextNode(ev.data));
    meta.appendChild(document.createElement('br'));
    meta.appendChild(document.createTextNode(ev.local));
    info.appendChild(meta);

    info.appendChild(el('p', 'evento__descricao', ev.descricao));

    const saiba = el('a', 'evento__saiba', ev.textoLink || 'Saiba mais');
    saiba.href = ev.link || '#';
    info.appendChild(saiba);

    midia.append(gatilho, info);
    fig.append(midia, el('figcaption', 'evento__nome', ev.categoria));
    li.appendChild(fig);
    return li;
  }

  EVENTOS.forEach(function (ev, i) { trilho.appendChild(criarCard(ev, i)); });
  const originais = Array.from(trilho.children);

  /* ---------- loop infinito ---------- */
  function copiar(lista) {
    lista.forEach(function (li) {
      const clone = li.cloneNode(true);
      clone.dataset.clone = 'true';
      clone.setAttribute('aria-hidden', 'true');   // leitor de tela ignora as cópias
      clone.querySelectorAll('a, button').forEach(function (x) { x.tabIndex = -1; });
      trilho.appendChild(clone);
    });
  }

  function montar() {
    fechar();
    trilho.querySelectorAll('[data-clone]').forEach(function (c) { c.remove(); });

    const larguraOriginais = originais.reduce(function (s, li) { return s + li.offsetWidth; }, 0);
    if (!larguraOriginais) return;

    const repeticoes = Math.max(1, Math.ceil(janela.offsetWidth / larguraOriginais));
    for (let i = 1; i < repeticoes; i++) copiar(originais);

    const bloco = Array.from(trilho.children);
    const distancia = bloco.reduce(function (s, li) { return s + li.offsetWidth; }, 0);
    copiar(bloco);   // segundo bloco: evita espaço vazio durante o movimento

    trilho.style.setProperty('--ev-distancia', distancia + 'px');
    trilho.style.setProperty('--ev-duracao', (distancia / VELOCIDADE) + 's');
  }

  /* ---------- abrir/fechar informações (toque ou clique) ---------- */
  function fechar() {
    trilho.querySelectorAll('.evento--aberto').forEach(function (c) { c.classList.remove('evento--aberto'); });
    trilho.querySelectorAll('.evento__gatilho').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  }

  function alternar(card) {
    const abrir = !card.classList.contains('evento--aberto');
    fechar();
    if (abrir) {
      card.classList.add('evento--aberto');
      card.querySelector('.evento__gatilho').setAttribute('aria-expanded', 'true');
    }
  }

  trilho.addEventListener('click', function (e) {
    const gatilho = e.target.closest('.evento__gatilho');
    if (gatilho) return alternar(gatilho.closest('.evento'));
    if (e.target.closest('.evento__info') && !e.target.closest('a')) fechar();
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.evento')) fechar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });

  /* ---------- pausa manual ---------- */
  botao.addEventListener('click', function () {
    const pausado = secao.classList.toggle('eventos--pausado');
    botao.setAttribute('aria-pressed', pausado);
    botao.textContent = pausado ? 'Retomar carrossel' : 'Pausar carrossel';
  });

  /* ---------- início e redimensionamento ---------- */
  let espera;
  window.addEventListener('resize', function () {
    clearTimeout(espera);
    espera = setTimeout(montar, 200);
  });
  montar();
})();