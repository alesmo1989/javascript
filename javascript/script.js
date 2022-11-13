const contenedorStock = document.getElementById('contenedorStock')
const carritoDeCompras = document.getElementById('carritoDeCompras')
const botonVaciar = document.getElementById('vaciarCarrito')
const ordenar = document.getElementById("ordenarCarrito");
const total = document.getElementById('total')
contenedorStock.classList.add('row')

let carrito = []

document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

//Problema: vacía la tabla pero el carrito sigue cargado al cargar mas elementos
botonVaciar.addEventListener('click', () =>{
    carrito = []
    console.log(carrito)
    actualizarCarrito()
    swal("Carrito vaciado");
})

//Problema: no funciona botón ordenar
ordenar.onclick = () => {
    carrito.sort((actual,siguiente) => {
        return actual.producto.nombre.localeCompare(siguiente.producto.nombre); 
    })
    actualizarCarrito();
};

stock.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('col-lg-3', 'col-md-6', 'col-sm-12', 'contenedorImagenGaleria', 'text-center')
    div.innerHTML=`
    <img src=${producto.imagen} alt="Galeria imagen" >
              <div class="nombreProducto">
                <h5>${producto.nombre}</h5>
              </div>
              <div class="precioProducto">
                <h5>$ ${producto.precio}</h5>
              </div>
              <div class="botonAgregar">
                <button id="agregar ${producto.id}">Agregar</button>
              </div>
    `
    contenedorStock.appendChild(div)
    const boton = document.getElementById(`agregar ${producto.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })

})

const agregarAlCarrito = (prodId) =>{
    const existe = carrito.some (prod => prod.id ===prodId)
    if (existe){
        const prod = carrito.map(prod => {
            if (prod.id === prodId){
                prod.cantidad++
                console.log(carrito)

            }
        })
    } else{
        const item = stock.find((prod) => prod.id === prodId)
        carrito.push(item)
        console.log(carrito)
    }
    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) =>{
    const item = carrito.find((prod)=> prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito(); 
}

const actualizarCarrito = () =>{
    console.log(carrito)
    const tabla = document.getElementById("items");
    tabla.innerHTML = "";
    carrito.forEach((producto) => {
        tabla.innerHTML += `<tr>
                                <th>${producto.nombre}</th>
                                <th>$ ${producto.precio}</th>
                                <th>${producto.tipoMascota}</th>
                                <th>${producto.cantidad}</th>
                                <th><button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar">Eliminar</button></th>
                           </tr>`
    localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    total.innerText = '$ ' + carrito.reduce((acc, prod) => (acc + prod.precio)*prod.cantidad, 0)
}

fetch(`./javascript/ejemploStockFetch.json`)
 .then((response) => {
    return response.text();
 })
 .then((data) => {
    data = JSON.parse(data);
    console.log(data);

 })


