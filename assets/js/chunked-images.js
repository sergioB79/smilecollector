document.addEventListener('DOMContentLoaded', async () => {
  const images = [...document.querySelectorAll('img[data-chunk-base][data-chunk-count]')];

  for (const img of images) {
    const base = img.dataset.chunkBase;
    const count = Number(img.dataset.chunkCount);

    // Vitinho now has a normal image asset. Prefer it directly instead of
    // reconstructing the old temporary base64 chunks.
    if (base && base.endsWith('/vitinho')) {
      img.src = '../assets/lab/vitinho-route-215.jpg';
      img.removeAttribute('data-chunk-base');
      img.removeAttribute('data-chunk-count');
      continue;
    }

    const fallback = img.dataset.fallbackSrc || '';
    const useFallback = () => {
      if (!fallback) {
        img.alt += ' [imagem temporariamente indisponível]';
        return;
      }
      img.onerror = null;
      img.src = fallback;
      img.removeAttribute('data-chunk-base');
      img.removeAttribute('data-chunk-count');
    };

    try {
      const parts = await Promise.all(
        Array.from({ length: count }, (_, i) =>
          fetch(`${base}/${String(i + 1).padStart(2, '0')}.txt`).then(r => {
            if (!r.ok) throw new Error(`chunk ${i + 1}: ${r.status}`);
            return r.text();
          })
        )
      );

      img.onerror = useFallback;
      img.src = `data:image/webp;base64,${parts.join('').replace(/\s+/g, '')}`;
      img.removeAttribute('data-chunk-base');
      img.removeAttribute('data-chunk-count');
    } catch (err) {
      console.error('Smilecollector image reconstruction failed:', err);
      useFallback();
    }
  }
});