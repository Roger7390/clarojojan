document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('searchBar');
    const productsContainer = document.getElementById('productos');
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.closeBtn');

    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('producto');
            productDiv.setAttribute('data-name', product.nombre.toLowerCase());

            productDiv.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}">
                <h2>${product.nombre}</h2>
                <p>${product.descripcion}</p>
                <p>$${product.precio}</p>
                <button class="detailsBtn" data-id="${product.id}">Ver detalles</button>
            `;
            productsContainer.appendChild(productDiv);
        });

        addEventListeners();
    }

    function addEventListeners() {
        searchBar.addEventListener('keyup', function (e) {
            const searchString = e.target.value.toLowerCase();
            const products = document.querySelectorAll('.producto');
            products.forEach(product => {
                const productName = product.getAttribute('data-name');
                if (productName.includes(searchString)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });

        document.querySelectorAll('.detailsBtn').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                const product = productos.find(p => p.id == productId);
                document.getElementById('modalTitle').innerText = product.nombre;
                document.getElementById('modalImage').src = product.imagen;
                document.getElementById('modalDescription').innerText = product.descripcion;
                document.getElementById('modalPrice').innerText = `$${product.precio}`;
                modal.style.display = 'block';
            });
        });

        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function (e) {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    displayProducts(productos);
});
