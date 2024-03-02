let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-prodcutos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEleminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector(".carrito-accion-vaciar");
const sumarSubtotal = document.querySelector("#total");
const botonComprar = document.querySelector(".carrito-accion-comprar")


function cargarProductoCarrito() {
    if(productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove('disabled');
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML ="";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement('div');
            div.classList.add("carrito-producto");
            div.innerHTML =`
                <img class="img-carrito" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-prodcuto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button id="${producto.id}" class="carrito-producto-eliminar"><i class="bi bi-trash3-fill"></i></button>
                </div> 
            `
            contenedorCarritoProductos.append(div);
        })
    
    } else {    
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoVacio.classList.remove("disabled");    
    }
    actualizarBotonesEliminar()
    sumaTotal()
}

cargarProductoCarrito()

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {
    let idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
    productosEnCarrito.splice(index,1);

    cargarProductoCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem(("productos-en-carrito"), JSON.stringify(productosEnCarrito));
    cargarProductoCarrito();
}

function sumaTotal() {
   const totalSuma = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalSuma}`
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem(("productos-en-carrito"), JSON.stringify(productosEnCarrito));
    contenedorCarritoComprado.classList.add("disabled");

    cargarProductoCarrito();

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    Swal.fire({
        title: "GRACIAS",
        text: "Esperamos que disfrutes tu compra.",
        imageUrl: "./img/1200x1200.png",
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: "Custom image"
      });
}


