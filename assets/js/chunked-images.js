document.addEventListener('DOMContentLoaded', async () => {
  const images = [...document.querySelectorAll('img[data-chunk-base][data-chunk-count]')];
  for (const img of images) {
    try {
      const base = img.dataset.chunkBase;
      const count = Number(img.dataset.chunkCount);
      const parts = await Promise.all(
        Array.from({ length: count }, (_, i) =>
          fetch(`${base}/${String(i + 1).padStart(2, '0')}.txt`).then(r => {
            if (!r.ok) throw new Error(`chunk ${i + 1}: ${r.status}`);
            return r.text();
          })
        )
      );
      img.src = `data:image/webp;base64,${parts.join('')}`;
      img.removeAttribute('data-chunk-base');
      img.removeAttribute('data-chunk-count');
    } catch (err) {
      console.error('Smilecollector image reconstruction failed:', err);
      img.alt += ' [imagem temporariamente indisponível]';
    }
  }
});
