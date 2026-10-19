/* =========================================================================
   Samavatian — script.js
   محتوا را از siteData (config.js) می‌خواند و صفحه و انیمیشن‌ها را می‌سازد.
   ========================================================================= */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fa = (n) => Number(n).toLocaleString("fa-IR", { useGrouping: false });
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };

  const S = (d, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
  const icons = {
    website: S('<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M8 21h8M12 18v3"/>'),
    store: S('<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M10 20v-6h4v6"/>'),
    software: S('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>'),
    uiux: S('<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51z"/>'),
    wordpress: S('<circle cx="12" cy="12" r="9"/><path d="m6.4 8.4 2.9 7.5 1.7-4.3 2.4 5.8 3.8-9.7"/>'),
    speed: S('<path d="M12 2a10 10 0 1 0 10 10M12 2v4M12 12l5-3"/>'),
    brand: S('<path d="m12 3 2.9 5.9L21 10l-4.5 4.4 1.1 6.1-5.6-3-5.6 3 1.1-6.1L3 10l6.1-1.1L12 3Z"/>'),
    maintenance: S('<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v6h-6"/><path d="M12 7v5l3 2"/>'),
    mail: S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    phone: S('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>'),
    pin: S('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
    cart: S('<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/>'),
    calendar: S('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    check: S('<path d="m5 12 5 5L20 7"/>', 'stroke-width="3"'),
    clock: S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    plus: S('<path d="M12 5v14M5 12h14"/>', 'stroke-width="2.5"'),
    arrow: S('<path d="M19 12H5M12 19l-7-7 7-7"/>'),
    ext: S('<path d="M7 17 17 7M8 7h9v9"/>'),
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9L12 2.5Z"/></svg>',
  };

  /* ------------------------------------------------------------ render */
  function renderNav() {
    const nav = $("nav");
    siteData.nav.forEach((item, i) => {
      const a = el("a", i === 0 ? "active" : "", item.label);
      a.href = item.href;
      nav.appendChild(a);
    });
  }

  function renderHero() {
    const h = siteData.hero;
    $("heroBadge").append(h.badge);

    const words = (txt, cls, start) =>
      `<span class="${cls}">` +
      txt.split(" ").map((w, i) => `<span class="w"><span style="animation-delay:${(start + i * 0.09).toFixed(2)}s">${w}</span></span>`).join(" ") +
      "</span>";
    $("heroTitle").innerHTML = words(h.titleLine1, "l1", 0.25) + words(h.titleLine2, "l2", 0.6);

    $("heroDesc").textContent = h.description;

    const actions = $("heroActions");
    const p = el("a", "btn btn-primary btn-lg magnetic", `${h.ctaPrimary.label}${icons.arrow}`);
    p.href = h.ctaPrimary.href;
    const s = el("a", "btn btn-ghost btn-lg", h.ctaSecondary.label);
    s.href = h.ctaSecondary.href;
    actions.append(p, s);

    $("heroTrust").innerHTML = h.trust.map((t) => `<li>${icons.check}${t}</li>`).join("");

    $("heroStats").innerHTML = h.stats
      .map((st) => `<div class="stat"><b data-count="${st.number}" data-suffix="${st.suffix}">${fa(0)}${st.suffix}</b><span>${st.label}</span></div>`)
      .join("");
  }

  function renderMarquee() {
    const items = siteData.marquee.map((m) => `<span>${m}</span>`).join("");
    $("marquee").innerHTML = items + items;
  }

  function renderPortfolio() {
    $("pfTitle").textContent = siteData.portfolioIntro.title;
    $("pfText").textContent = siteData.portfolioIntro.text;

    const filters = [
      { id: "all", label: "همه" },
      { id: "site", label: "وب‌سایت" },
      { id: "store", label: "فروشگاه" },
      { id: "app", label: "سامانه و اپلیکیشن" },
    ];
    const fWrap = $("filters");
    filters.forEach((f, i) => {
      const b = el("button", i === 0 ? "active" : "", f.label);
      b.setAttribute("role", "tab");
      b.addEventListener("click", () => {
        fWrap.querySelectorAll("button").forEach((x) => x.classList.toggle("active", x === b));
        let n = 0;
        grid.querySelectorAll(".proj").forEach((c) => {
          const show = f.id === "all" || c.dataset.type === f.id;
          c.classList.toggle("hide", !show);
          c.classList.remove("pop");
          if (show) {
            c.style.animationDelay = `${n++ * 0.06}s`;
            void c.offsetWidth;
            c.classList.add("pop");
          }
        });
      });
      fWrap.appendChild(b);
    });

    const grid = $("portfolioGrid");
    siteData.portfolio.forEach((pr, i) => {
      const clickable = !!pr.link;
      const card = el(clickable ? "a" : "article", "proj reveal");
      card.dataset.type = pr.type || "site";
      card.style.setProperty("--d", `${(i % 3) * 0.1}s`);
      if (clickable) {
        card.href = pr.link;
        if (/^https?:\/\//i.test(pr.link)) { card.target = "_blank"; card.rel = "noopener noreferrer"; }
      }
      card.innerHTML = `
        <div class="proj-thumb">
          <img src="${pr.image}" alt="${pr.title}" loading="lazy">
          ${clickable ? `<span class="proj-open">مشاهده پروژه ${icons.ext}</span>` : ""}
        </div>
        <div class="proj-body">
          <span class="proj-cat">${pr.category}</span>
          <h3>${pr.title}</h3>
          <p>${pr.result}</p>
          <div class="proj-tags">${pr.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        </div>`;
      grid.appendChild(card);
    });
  }

  function renderServices() {
    const grid = $("servicesGrid");
    siteData.services.forEach((s, i) => {
      const c = el("div", "svc reveal");
      c.style.setProperty("--d", `${(i % 4) * 0.08}s`);
      c.innerHTML = `<div class="svc-ic">${icons[s.icon] || icons.website}</div><h3>${s.title}</h3><p>${s.text}</p>`;
      grid.appendChild(c);
    });
  }


  function renderAbout() {
    const a = siteData.about;
    $("aboutImg").src = a.photo;
    $("aboutTitle").textContent = a.title;
    $("aboutBody").textContent = a.text;
    $("aboutQuote").textContent = a.quote;
    $("aboutBadge").innerHTML = `<b>${a.badge.number}</b><span>${a.badge.label}</span>`;
    $("aboutPoints").innerHTML = a.points.map((p) => `<li>${p}</li>`).join("");
    $("skills").innerHTML = siteData.skills
      .map((s) => `<div><div class="skill-top"><span>${s.name}</span><em>${fa(s.value)}٪</em></div><div class="skill-bar"><i data-w="${s.value}"></i></div></div>`)
      .join("");
  }

  function renderProcess() {
    $("processList").innerHTML = siteData.process
      .map((p, i) => `<div class="step reveal" style="--d:${i * 0.12}s"><div class="step-n">${fa(i + 1)}</div><h3>${p.title}</h3><p>${p.text}</p></div>`)
      .join("");
  }

  function renderCta() {
    const c = siteData.cta;
    $("ctaTitle").textContent = c.title;
    $("ctaText").textContent = c.text;
    const b = $("ctaBtn");
    b.innerHTML = `${c.button}${icons.arrow}`;
    b.href = siteData.contact.whatsapp;
  }

  let tIdx = 0, tTimer = null;
  function renderTestimonials() {
    const T = siteData.testimonials;
    const track = $("testiTrack");
    const dots = $("testiDots");
    T.forEach((t, i) => {
      const c = el("figure", "testi-card");
      c.style.margin = 0;
      c.innerHTML = `
        <div class="testi-stars">${icons.star.repeat(5)}</div>
        <p>«${t.text}»</p>
        <div class="testi-person"><div class="testi-av">${t.name.trim().charAt(0)}</div><div><b>${t.name.trim()}</b><small>${t.role}</small></div></div>`;
      track.appendChild(c);
      const d = el("button", i === 0 ? "active" : "");
      d.setAttribute("aria-label", `نظر ${i + 1}`);
      d.addEventListener("click", () => { goTesti(i); autoTesti(); });
      dots.appendChild(d);
    });
    $("testiPrev").addEventListener("click", () => { goTesti(tIdx - 1); autoTesti(); });
    $("testiNext").addEventListener("click", () => { goTesti(tIdx + 1); autoTesti(); });
    $("testi").addEventListener("mouseenter", () => clearInterval(tTimer));
    $("testi").addEventListener("mouseleave", autoTesti);
  }
  function goTesti(i) {
    const n = siteData.testimonials.length;
    tIdx = (i + n) % n;
    $("testiTrack").style.transform = `translateX(${tIdx * 100}%)`;
    document.querySelectorAll("#testiDots button").forEach((d, k) => d.classList.toggle("active", k === tIdx));
  }
  function autoTesti() {
    clearInterval(tTimer);
    if (reduceMotion) return;
    tTimer = setInterval(() => goTesti(tIdx + 1), 6000);
  }

  function renderFaq() {
    const list = $("faqList");
    siteData.faq.forEach((f, i) => {
      const item = el("div", "faq-item reveal");
      item.style.setProperty("--d", `${i * 0.07}s`);
      item.innerHTML = `
        <button class="faq-q" aria-expanded="false"><span>${f.q}</span><span class="pm">${icons.plus}</span></button>
        <div class="faq-a"><div><p>${f.a}</p></div></div>`;
      const btn = item.querySelector(".faq-q");
      btn.addEventListener("click", () => {
        const open = !item.classList.contains("open");
        list.querySelectorAll(".faq-item").forEach((x) => {
          x.classList.remove("open");
          x.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        });
        if (open) { item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
      });
      list.appendChild(item);
    });
    list.firstElementChild.classList.add("open");
    list.firstElementChild.querySelector(".faq-q").setAttribute("aria-expanded", "true");
  }

  function renderContact() {
    const c = siteData.contact;
    $("ctTitle").textContent = c.title;
    $("ctText").textContent = c.text;
    $("contactRows").innerHTML = `
      <a class="crow" href="tel:${c.phoneIntl}"><span class="ic">${icons.phone}</span><div><small>تماس تلفنی</small><b>${c.phone}</b></div></a>
      ${c.email ? `<a class="crow" href="mailto:${c.email}"><span class="ic">${icons.mail}</span><div><small>ایمیل</small><b>${c.email}</b></div></a>` : ""}
      `;
    $("socials").innerHTML = c.socials.map((s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer">${s.label}</a>`).join("");

    const chips = (id, arr) => {
      const w = $(id);
      arr.forEach((t) => {
        const b = el("button", "", t);
        b.type = "button";
        b.addEventListener("click", () => {
          const was = b.classList.contains("active");
          w.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
          if (!was) b.classList.add("active");
        });
        w.appendChild(b);
      });
    };
    chips("typeChips", c.types);

    const form = $("contactForm");
    const hint = $("formHint");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      [form.name, form.phone].forEach((i) => i.classList.toggle("invalid", !i.value.trim()));
      if (!name || !phone) {
        hint.textContent = "لطفاً نام و شماره تماس را وارد کنید.";
        hint.classList.add("err");
        return;
      }
      hint.classList.remove("err");
      const type = document.querySelector("#typeChips .active")?.textContent || "—";
      const text =
        `سلام، من ${name} هستم.\nشماره تماس: ${phone}\nنوع پروژه: ${type}\n\n${form.message.value.trim()}`;
      hint.textContent = "در حال انتقال به واتساپ…";
      window.open(`https://wa.me/${c.phoneIntl.replace("+", "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });
  }

  function renderFooter() {
    $("footerText").textContent = siteData.footer.text;
    $("fab").href = siteData.contact.whatsapp;
  }

  /* ------------------------------------------------------------ hero effects */
  function heroToasts() {
    const wrap = $("heroToasts");
    const list = siteData.hero.toasts;
    if (!wrap || !list.length) return;
    let i = 0;
    const push = () => {
      const t = list[i++ % list.length];
      const n = el("div", "toast", `<span class="ic">${icons[t.icon] || icons.mail}</span><div><b>${t.title}</b><small>${t.sub}</small></div>`);
      wrap.appendChild(n);
      while (wrap.children.length > 2) wrap.firstElementChild.remove();
      setTimeout(() => { n.classList.add("out"); setTimeout(() => n.remove(), 500); }, 4200);
    };
    setTimeout(() => { push(); setInterval(push, 3600); }, 2400);
  }

  function mockCounter() {
    const n = $("mockNum");
    if (!n) return;
    const start = performance.now() + 1500, dur = 1800, target = 128;
    const tick = (now) => {
      const p = Math.min(Math.max((now - start) / dur, 0), 1);
      n.textContent = `${fa(Math.round((1 - Math.pow(1 - p, 3)) * target))}٪+`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function tilt() {
    const vis = $("heroVisual"), card = $("tilt");
    if (!vis || reduceMotion || window.matchMedia("(hover: none)").matches) return;
    vis.addEventListener("mousemove", (e) => {
      const r = vis.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${(-x * 10).toFixed(2)}deg) rotateX(${(y * 8).toFixed(2)}deg)`;
    });
    vis.addEventListener("mouseleave", () => (card.style.transform = ""));
  }

  function particles() {
    const cv = $("particles");
    if (!cv || reduceMotion) return;
    const ctx = cv.getContext("2d");
    let w, h, pts = [], raf, visible = true;
    const mouse = { x: -999, y: -999 };
    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, (w * h) / 16000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.6,
      }));
    };
    const draw = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = "rgba(156,196,255,.75)"; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 12000) {
            ctx.strokeStyle = `rgba(78,150,255,${(1 - d / 12000) * 0.28})`;
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        const mx = p.x - mouse.x, my = p.y - mouse.y, md = mx * mx + my * my;
        if (md < 20000) {
          ctx.strokeStyle = `rgba(255,255,255,${(1 - md / 20000) * 0.35})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    cv.parentElement.parentElement.addEventListener("mousemove", (e) => {
      const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) { cancelAnimationFrame(raf); draw(); }
    }).observe(cv);
    draw();
  }

  /* ------------------------------------------------------------ behavior */
  function headerAndProgress() {
    const header = $("siteHeader"), bar = $("progress"), fab = $("fab");
    const on = () => {
      const y = window.scrollY;
      header.classList.toggle("scrolled", y > 30);
      fab.classList.toggle("show", y > 500);
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
  }

  function mobileNav() {
    const btn = $("navToggle"), nav = $("nav"), header = $("siteHeader");
    const set = (open) => {
      nav.classList.toggle("open", open);
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      if (open) header.classList.add("scrolled");
      else if (window.scrollY <= 30) header.classList.remove("scrolled");
    };
    btn.addEventListener("click", (e) => { e.stopPropagation(); set(!nav.classList.contains("open")); });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => set(false)));
    document.addEventListener("click", (e) => { if (!header.contains(e.target)) set(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
    window.addEventListener("resize", () => { if (innerWidth > 980) set(false); });
  }

  function activeNav() {
    const links = [...document.querySelectorAll("#nav a")];
    const map = new Map();
    links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")); if (s) map.set(s, l); });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l === map.get(en.target)));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, s) => io.observe(s));
  }

  function reveal() {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
  }

  function counters() {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const n = en.target, target = +n.dataset.count, suf = n.dataset.suffix || "";
        const t0 = performance.now(), dur = 1800;
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          n.textContent = fa(Math.round((1 - Math.pow(1 - p, 4)) * target)) + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(n);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll("[data-count]").forEach((n) => io.observe(n));
  }

  function skillBars() {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.querySelectorAll("i[data-w]").forEach((b, i) => setTimeout(() => (b.style.width = b.dataset.w + "%"), i * 120));
        obs.unobserve(en.target);
      });
    }, { threshold: 0.3 });
    io.observe($("skills"));
  }

  function initMagnetic(root = document) {
    if (reduceMotion || window.matchMedia("(hover: none)").matches) return;
    root.querySelectorAll(".magnetic").forEach((b) => {
      if (b._mag) return;
      b._mag = true;
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 14}px, ${((e.clientY - r.top) / r.height - 0.5) * 10 - 2}px)`;
      });
      b.addEventListener("mouseleave", () => (b.style.transform = ""));
    });
  }

  function cursorGlow() {
    const g = $("cursorGlow");
    if (!g || window.matchMedia("(hover: none)").matches || reduceMotion) return;
    let tx = 0, ty = 0, x = 0, y = 0, started = false;
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!started) { started = true; x = tx; y = ty; g.classList.add("on"); loop(); }
    });
    const loop = () => {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      g.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    };
  }

  /* ------------------------------------------------------------ init */
  function init() {
    document.title = "محمدحسین سماواتیان | طراح و توسعه‌دهنده وب‌سایت و اپلیکیشن";
    renderNav();
    renderHero();
    renderMarquee();
    renderPortfolio();
    renderServices();
    renderAbout();
    renderProcess();
    renderCta();
    renderTestimonials();
    renderFaq();
    renderContact();
    renderFooter();

    headerAndProgress();
    mobileNav();
    activeNav();
    reveal();
    counters();
    skillBars();
    initMagnetic();
    cursorGlow();
    tilt();
    particles();
    heroToasts();
    mockCounter();
    goTesti(0);
    autoTesti();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
