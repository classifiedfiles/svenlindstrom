
(() => {
  const pages = [...document.querySelectorAll('[data-page]')];
  const openers = [...document.querySelectorAll('[data-open]')];
  const tabs = [...document.querySelectorAll('.tab')];
  const menuButton = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  function showPage(id, updateHash = true) {
    const target = pages.find(page => page.dataset.page === id);
    if (!target) return;

    pages.forEach(page => {
      const active = page === target;
      page.hidden = !active;
      page.classList.toggle('active', active);
    });

    tabs.forEach(tab => {
      const active = tab.dataset.open === id;
      tab.classList.toggle('active', active);
      if (active) tab.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
    });

    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded','false');

    window.scrollTo({top:0, left:0, behavior:'auto'});

    if (updateHash) {
      history.replaceState(null,'', id === 'home' ? location.pathname : '#' + id);
    }
  }

  openers.forEach(button => {
    button.addEventListener('click', () => showPage(button.dataset.open));
  });

  menuButton.addEventListener('click', () => {
    const willOpen = mobileMenu.hidden;
    mobileMenu.hidden = !willOpen;
    menuButton.setAttribute('aria-expanded', String(willOpen));
  });

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1) || 'home';
    showPage(id, false);
  });

  let touchStartX = null;
  let touchStartY = null;

  document.addEventListener('touchstart', e => {
    if (!e.touches[0]) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, {passive:true});

  document.addEventListener('touchend', e => {
    if (touchStartX === null || !e.changedTouches[0]) return;

    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      const order = ['home','profile','story','military','links','rules'];
      const current = pages.find(page => !page.hidden)?.dataset.page || 'home';
      const index = order.indexOf(current);
      const nextIndex = dx < 0 ? index + 1 : index - 1;
      if (nextIndex >= 0 && nextIndex < order.length) showPage(order[nextIndex]);
    }

    touchStartX = null;
    touchStartY = null;
  }, {passive:true});

  const initial = location.hash.slice(1);
  showPage(initial || 'home', false);
})();
