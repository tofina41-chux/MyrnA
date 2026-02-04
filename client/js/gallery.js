async function loadArtworks() {
    const res = await fetch("http://localhost:5000/api/artworks");
    const artworks = await res.json();

    const gallery = document.getElementById("gallery");

    artworks.forEach(art => {
        gallery.innerHTML += `
            <div class="bg-white p-4 rounded shadow">
                <img src="${art.image}"
                     class="w-full h-64 object-cover rounded">

                <h3 class="text-xl mt-3 font-semibold">
                    ${art.title}
                </h3>

                <p class="text-gray-600">
                    ${art.description}
                </p>
            </div>
        `;
    });
}

loadArtworks();
