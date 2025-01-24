// Leer y procesar el archivo XML
async function cargarProductos() {
    try {
        const response = await fetch("http://localhost:3000/productos");
        const productos = await response.json();

        const tableBody = document.getElementById("productosTabla").querySelector("tbody");

        productos.forEach(producto => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${producto.nombre[0]}</td>
                <td>${producto.precio[0]}</td>
                <td>${producto.descripcion[0]}</td>
                <td>${producto.imagen[0]}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

// Llamar a la función para cargar los productos al inicio
cargarProductos();