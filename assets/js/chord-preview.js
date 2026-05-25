// document.addEventListener("DOMContentLoaded", () => {

//   // Create one floating preview container
//   const preview = document.createElement("div");
//   preview.style.position = "absolute";
//   preview.style.width = "140px";
//   preview.style.padding = "6px";
//   preview.style.background = "#0b0d12";
//   preview.style.border = "1px solid #5cc8ff";
//   preview.style.borderRadius = "8px";
//   preview.style.boxShadow = "0 10px 25px rgba(0,0,0,0.6)";
//   preview.style.display = "none";
//   preview.style.zIndex = "9999";

//   const img = document.createElement("img");
//   img.style.width = "100%";
//   img.style.height = "auto";
//   img.style.display = "block";

//   preview.appendChild(img);
//   document.body.appendChild(preview);

//   const chords = document.querySelectorAll(".chord-inline");
//   let activeChord = null; // track which chord is open

//   const showPreview = (chord) => {
//     const chordName = chord.dataset.chord;
//     if (!chordName) return;

//     const encoded = encodeURIComponent(chordName);
//     img.src = `/mypiano/assets/guitar-chords/${encoded}.jpg`;

//     const rect = chord.getBoundingClientRect();
//     const top = rect.top + window.scrollY - preview.offsetHeight - 10;
//     const left =
//       rect.left +
//       window.scrollX +
//       rect.width / 2 -
//       preview.offsetWidth / 2;

//     preview.style.top = `${Math.max(top, 10)}px`;
//     preview.style.left = `${Math.max(left, 10)}px`;
//     preview.style.display = "block";

//     activeChord = chord;
//   };

//   const hidePreview = () => {
//     preview.style.display = "none";
//     activeChord = null;
//   };

//   chords.forEach(chord => {

//     // Desktop hover
//     chord.addEventListener("mouseenter", () => {
//       showPreview(chord);
//     });

//     chord.addEventListener("mouseleave", () => {
//       hidePreview();
//     });

//     // Mobile + click logic (FIXED)
//     chord.addEventListener("click", (e) => {
//       e.stopPropagation();

//       if (activeChord === chord) {
//         // Same chord tapped again → close
//         hidePreview();
//       } else {
//         // Different chord tapped → switch immediately
//         showPreview(chord);
//       }
//     });
//   });

//   // Close only when clicking outside chords
//   document.addEventListener("click", () => {
//     hidePreview();
//   });

// });
