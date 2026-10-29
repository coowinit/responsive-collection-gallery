/* #s01: navigation controls only; card layout remains CSS-only. */
(() => {
  const root = document.querySelector('#s01');
  if (!root) return;
  const list = root.querySelector('.tags');
  const prev = root.querySelector('.tags-prev');
  const next = root.querySelector('.tags-next');
  if (!list || !prev || !next) return;

  const EDGE = 3;
  function update() {
    const maxScroll = Math.max(0, list.scrollWidth - list.clientWidth);
    prev.hidden = maxScroll <= EDGE || list.scrollLeft <= EDGE;
    next.hidden = maxScroll <= EDGE || list.scrollLeft >= maxScroll - EDGE;
  }

  function move(direction) {
    const step = Math.max(150, Math.round(list.clientWidth * 0.75));
    const maxScroll = Math.max(0, list.scrollWidth - list.clientWidth);
    const target = Math.min(maxScroll, Math.max(0, list.scrollLeft + step * direction));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollTo({ left: target, behavior: reduced ? 'instant' : 'smooth' });
  }

  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  list.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(update);
    observer.observe(list);
  }
  update();
})();
