document.addEventListener("DOMContentLoaded", () => {

  // Create one floating preview container
  const preview = document.createElement("div");
  preview.style.position = "absolute";
  preview.style.width = "140px";
  preview.style.padding = "6px";
  preview.style.background = "#0b0d12";
  preview.style.border = "1px solid #5cc8ff";
  preview.style.borderRadius = "8px";
  preview.style.boxShadow = "0 10px 25px rgba(0,0,0,0.6)";
  preview.style.display = "none";
  preview.style.zIndex = "9999";

  const img = document.createElement("img");
  img.style.width = "100%";
  img.style.height = "auto";
  img.style.display = "block";

  preview.appendChild(img);
  document.body.appendChild(preview);

  const chords = document.querySelectorAll(".chord-inline");

  chords.forEach(chord => {

    const showPreview = () => {
      const chordName = chord.dataset.chord;
      if (!chordName) return;

      // IMPORTANT:
      // - encodeURIComponent handles A# → A%23
      // - extension is .jpg (your images)
      const encoded = encodeURIComponent(chordName);
      img.src = `/mypiano/assets/guitar-chords/${encoded}.jpg`;

      preview.style.display = "block";

      const rect = chord.getBoundingClientRect();
      const top = rect.top + window.scrollY - preview.offsetHeight - 10;
      const left =
        rect.left +
        window.scrollX +
        rect.width / 2 -
        preview.offsetWidth / 2;

      preview.style.top = `${Math.max(top, 10)}px`;
      preview.style.left = `${Math.max(left, 10)}px`;
    };

    const hidePreview = () => {
      preview.style.display = "none";
    };

    // Desktop hover
    chord.addEventListener("mouseenter", showPreview);
    chord.addEventListener("mouseleave", hidePreview);

    // Mobile + click support
    chord.addEventListener("click", (e) => {
      e.stopPropagation();
      if (preview.style.display === "block") {
        hidePreview();
      } else {
        showPreview();
      }
    });
  });

  // Hide when clicking anywhere else
  document.addEventListener("click", () => {
    preview.style.display = "none";
  });

});
