const btnCarrito = document.getElementById("btn-carrito");
const carritoPopup = document.getElementById("carrito-popup");
const listaCarrito = document.getElementById("lista-carrito");
const carrito = [];

//Funció para alternar la visibilidad del pop-up
btnCarrito.addEventListener("click", () => {
  carritoPopup.style.display =
    carritoPopup.style.display === "block" ? "none" : "block";
});

//Función para añadir un producto al carrito
function agregarProducto(producto) {
  const productoExistente = carrito.find((p) => p.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push(producto);
  }

  actualizarCarrito();
}

//Función para actualizar la lista del carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="carrito-item">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div class="item-info">
            <p>${producto.nombre}</p>
            <p>${producto.precio}€ x ${producto.cantidad}</p>
          </div>
          <button onclick="eliminarProducto(${index})" class="borrar-item">X</button>
        </div>
        `;
        listaCarrito.appendChild(li);
  });

  if(carrito.length === 0){
    listaCarrito.innerHTML = "<li>Tu carrito está vacío</li>";
  }
}

//Función para eliminar un producto del carrito
function eliminarProducto(index){
    carrito.splice(index, 1);
    actualizarCarrito();
}