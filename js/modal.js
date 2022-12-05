(() => {
  const cls_backdrop_hidden = "backdrop--hidden";
  const cls_scroll_off = "scroll-off";

  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    body: document.querySelector("body"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", resetOrderingForm);

  logFormsData();

  ////////////////////////
  // Functions
  ////////////////////////

  function resetOrderingForm() {
    const { formOrdering } = document.forms;
    formOrdering.reset();
  }

  function toggleModal() {
    refs.modal.classList.toggle(cls_backdrop_hidden);
    refs.body.classList.toggle(cls_scroll_off);
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
