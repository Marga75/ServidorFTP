// Leer y procesar el archivo XML
async function cargarProductos() {
  try {
    const response = await fetch("http://localhost:3000/productos");
    const productos = await response.json();

    const contenedor = document.getElementById("contenedor_productos");

    productos.forEach((producto) => {
      const id = producto.id[0];
      const nombre = producto.nombre[0];
      const precio = producto.precio[0];
      const descripcion = producto.descripcion[0];
      const imagen = producto.imagen[0];

      // Crear un bloque de producto
      const productoDiv = document.createElement("div");
      productoDiv.className = "producto";

      productoDiv.innerHTML = `
          <h2>${nombre}</h2>
          <img src="${imagen}" alt="${nombre}">
          <p class="precio">${precio}</p>
        `;

      //Ageregar evento clic al div de producto
      productoDiv.addEventListener("click", () => {
        mostrarPopUp(id, nombre, imagen, descripcion, precio);
      });

      // Añadir el producto al contenedor
      contenedor.appendChild(productoDiv);
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

//Mostrar el pop-up con la información del producto
function mostrarPopUp(id, nombre, imagen, descripcion, precio) {
  const popup = document.getElementById("popup");
  const contenidoPopup = document.getElementById("contenido_popup");

  // Mostrar el pop-up
  popup.style.display = "flex";

  // Agregar contenido al pop-up
  contenidoPopup.innerHTML = `
     <h2>${nombre}</h2>
     <img src="${imagen}" alt="${nombre}" style="width: 100%; height: auto;">
     <p>${descripcion}</p>
     <button class="añadir" data-id="${id}" data-nombre="${nombre}" data-precio="${precio}" data-imagen="${imagen}">Añadir al carrito</button>
   `;

  //Agregar evento al botón "Añadir al carrito"
  const añadirBoton = contenidoPopup.querySelector(".añadir");
  añadirBoton.addEventListener("click", () => {
    const producto = {
      id: añadirBoton.getAttribute("data-id"),
      nombre: añadirBoton.getAttribute("data-nombre"),
      precio: parseFloat(añadirBoton.getAttribute("data-precio")),
      imagen: añadirBoton.getAttribute("data-imagen"),
      cantidad: 1,
    };
    console.log("Añadiendo al carrito:", producto);

    //Cerrar el pop-up después de añadir
    popup.style.display = "none";
  });
}

//Cerrar el pop-up
document.getElementById("cerrar").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

// Llamar a la función para cargar los productos al inicio
cargarProductos();
