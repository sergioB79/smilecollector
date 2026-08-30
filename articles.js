(function () {
  const esc = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function badgeClass(tag) {
    const t = tag.toLowerCase();
    if (t.includes("verified")) return "verified";
    if (t.includes("lab-made")) return "made";
    if (t.includes("consequ")) return "mixed";
    return "warning";
  }

  function formatDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
  }

  function renderArticle(article, prefix, compact) {
    const tags = (article.tags || []).map(tag =>
      `<span class="archive-badge ${badgeClass(tag)}">${esc(tag)}</span>`
    ).join("");
    const canon = compact ? "" : `<p class="archive-seed"><strong>CANON SEED:</strong> ${esc(article.canon_seed || "")}</p>`;
    const subjects = compact || !(article.subjects || []).length ? "" :
      `<p class="archive-subjects">SUBJECTS: ${article.subjects.map(esc).join(" · ")}</p>`;

    return `<article class="archive-card">
      <div class="archive-topline">${esc(article.type)} #${esc(article.number)} <span>${formatDate(article.date)}</span></div>
      <h3>${esc(article.title)}</h3>
      <p class="archive-subtitle">${esc(article.subtitle || "")}</p>
      <div class="archive-badges">${tags}<span class="archive-badge warning">${esc(article.status || "STATUS: UNKNOWN")}</span></div>
      <p>${esc(article.excerpt || "")}</p>
      ${canon}${subjects}
      <a class="archive-open" href="${esc(prefix + article.url)}">ABRIR DOSSIER →</a>
    </article>`;
  }

  async function populate(container) {
    const prefix = container.dataset.prefix || "";
    const limit = Number(container.dataset.limit || 0);
    const compact = container.dataset.compact === "true";
    const dataUrl = prefix + "lab/articles.json";

    try {
      const response = await fetch(dataUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      let list = [...(data.articles || [])].sort((a, b) => String(b.date).localeCompare(String(a.date)));
      if (limit > 0) list = list.slice(0, limit);
      container.innerHTML = list.length
        ? list.map(article => renderArticle(article, prefix, compact)).join("")
        : `<p class="archive-empty">Ainda não há dossiers. O que, estatisticamente, não deve durar.</p>`;
    } catch (err) {
      container.innerHTML = `<div class="archive-error"><strong>Arquivo temporariamente inacessível.</strong><br>O Lab provavelmente desligou alguma coisa. Em GitHub Pages isto é lido de <code>lab/articles.json</code>.</div>`;
      console.error("Smilecollector article registry:", err);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-article-registry]").forEach(populate);
  });
})();
