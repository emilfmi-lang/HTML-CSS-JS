const btn = document.getElementById("loadBtn");
const gallery = document.getElementById("gallery");

btn.addEventListener("click", async () => {
  gallery.innerHTML = "Yüklənir...";

  try {
    // 30 şəkli alırıq
    const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=30");

    if (!res.ok) throw new Error("Şəkillər yüklənmədi");

    const data = await res.json();

    gallery.innerHTML = ""; // təmizlə

    // Hər şəkli ekrana əlavə et
    data.forEach(item => {
      const box = document.createElement("div");
      box.className = "photo-box";

      box.innerHTML = `
        <img src="${item.thumbnailUrl}" alt="car">
        <p><strong>ID:</strong> ${item.id}</p>
        <p>${item.title}</p>
      `;

      gallery.appendChild(box);
    });

  } catch (err) {
    gallery.innerHTML = `<p style="color:red;">Xəta: ${err.message}</p>`;
  }
});
