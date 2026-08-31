
(function () {
  const pages = Array.from(document.querySelectorAll("[data-page]"));
  const buttons = Array.from(document.querySelectorAll("[data-open]"));

  function showPage(id, updateHash = true) {
    const target = pages.find((page) => page.dataset.page === id);
    if (!target) return;

    pages.forEach((page) => {
      const isActive = page === target;
      page.hidden = !isActive;
      page.classList.toggle("active", isActive);
    });

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (updateHash) {
      history.replaceState(null, "", id === "home" ? location.pathname : "#" + id);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.open);
    });
  });

  const initial = location.hash.replace("#", "");
  showPage(initial || "home", false);

  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#", "");
    showPage(id || "home", false);
  });
})();
