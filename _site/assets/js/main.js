// Filter posts by section
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".post-card").forEach(card => {
      card.style.display = (section === "all" || card.dataset.section === section) ? "block" : "none";
    });
  });
});
