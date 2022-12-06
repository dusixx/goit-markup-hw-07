(() => {
  const cls_backdrop_hidden = "backdrop--hidden";
  const cls_scroll_off = "scroll-off";

  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    body: document.querySelector("body"),
    root: document.documentElement,
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", resetOrderingForm);

  logFormsData();

  ////////////////////////
  // Functions
  ////////////////////////

  function getVar(varName) {
    return refs.root.style.getPropertyValue(varName);
  }

  function setVar(varName, val) {
    refs.root.style.setProperty(varName, val);
  }

  function toggleModal() {
    refs.modal.classList.toggle(cls_backdrop_hidden);

    const modalIsShown = !refs.modal.classList.contains(cls_backdrop_hidden);
    toggleScroll(modalIsShown);
  }

  function toggleScroll(scrollOff) {
    if (scrollOff) {
      // запоминаем текущую позицию скрола
      setVar("--scroll-top", window.pageYOffset);
      refs.body.classList.add(cls_scroll_off);
      //
    } else {
      refs.body.classList.remove(cls_scroll_off);
      // перекрываем smooth, иначе сработает на закрытие модалки
      refs.root.style.scrollBehavior = "auto";
      window.scrollTo({ top: getVar("--scroll-top") });
      refs.root.style.removeProperty("scroll-behavior");
    }
  }

  function resetOrderingForm() {
    const { formOrdering } = document.forms;
    formOrdering.reset();
  }

  function logFormsData() {
    const forms = Array.from(document.forms);
    forms.forEach(form => form.addEventListener("submit", logData));

    function logData(e) {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);

      console.log(`${form.name}\n${"-".repeat(20)}`);
      formData.forEach((value, name) => console.log(`\t${name}: ${value}`));

      form.reset();
      // close modal
      refs.modal.classList.add(cls_backdrop_hidden);
    }
  }
})();
