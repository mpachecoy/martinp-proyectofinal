let productos = [];
fetch('./js/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })
    .catch(error => console.error('Error al cargar JSON', error))


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos (productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML =`
            <img class="prodcuto-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="prodcuto-descripcion text-center">
                    <h3 class="producto-titulo fw-bold"> ${producto.titulo}</h3>
                    <p class="producto-precio"> $${producto.precio} </p>
                <button class="producto-agregar" id="${producto.id}">Agregar </button>
            </div> 
        `;

        contenedorProductos.append(div);
    })
    actualizarBotonesAgergar()
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
        boton.addEventListener("click",(e) => {

            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");

            if (e.currentTarget.id != "todos") {
                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else {
                cargarProductos(productos);
            }       
        })
    });

function actualizarBotonesAgergar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
    })
}

let productoEnCarrito;
const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS) {
    productoEnCarrito = JSON.parse(productosEnCarritoLS);;
    actualizarNumerito() 
} else {
    productoEnCarrito = [];
}

function agregarCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productoEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productoEnCarrito.findIndex(producto => producto.id === idBoton);
        productoEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productoEnCarrito.push(productoAgregado);
    }
    actualizarNumerito() 
    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));
}

function actualizarNumerito() {
    let numeroActulizado = productoEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = numeroActulizado;
}

