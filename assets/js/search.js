document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const posts = document.querySelectorAll(".post-item");

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();

    posts.forEach(post => {
      const title = post.querySelector("a").textContent.toLowerCase();
      const section = post.dataset.section.toLowerCase();

      if (title.includes(query) || section.includes(query)) {
        post.style.display = "";
      } else {
        post.style.display = "none";
      }
    });
  });
});
