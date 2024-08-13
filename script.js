
// Segunda entrega CoderHouse JavaScript - Comisión 62030
// Jose Alejandro Palacios  



class Producto {
    static contador = 0; // Variable estática para contar las instancias
  
    constructor(nombre, referencia, precio, imagen) {
      this.nombre = nombre;
      this.referencia = referencia;
      this.precio = precio;
      this.imagen = imagen;
      Producto.contador++; 
    }
  }
  
  // Crear productos
  const productos = [
    new Producto("Patito verde", "REF001", 10, "1.jpg"),
    new Producto("Patito mora", "REF002", 20, "2.jpg"),
    new Producto("Patito azul", "REF003", 30, "3.jpg"),
    new Producto("Patito rojo", "REF004", 40, "4.jpg"),
    new Producto("Patito limon", "REF005", 50, "5.jpg"),
    new Producto("Patito gris", "REF006", 60, "6.jpg")
  ];
  
  // Mostrar productos en el HTML
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    const productElement = document.getElementById(`product${i + 1}`);
    productElement.innerHTML = `<H2>${producto.nombre}</h2>  <img src="images/${producto.imagen}"  width="100" height="100"> <br>  ${producto.referencia} <br> <strong>$${producto.precio}</strong> <br><br><button class="button button2" onclick="agregarAlCarrito(${producto.precio}, productos[${i}])">Agregar al carrito</button>`;
  }

const botonVaciar = document.getElementById("vaciarCarritoBtn");
botonVaciar.addEventListener("click", vaciarCarrito);

// Función para agregar al carrito
function agregarAlCarrito(precio, producto) {
    let carrito = localStorage.getItem('carrito') ? parseInt(localStorage.getItem('carrito')) : 0;
    carrito += precio;
    localStorage.setItem('carrito', carrito);
    document.getElementById('totalCarrito').innerHTML = `Total: $${carrito}`;
  
// Realizar seguimiento del número de veces que se agrega el producto
    let cantidadProducto = localStorage.getItem(`${producto.referencia}`) ? parseInt(localStorage.getItem(`${producto.referencia}`)) : 0;
    cantidadProducto++;
    localStorage.setItem(`${producto.referencia}`, cantidadProducto);
    document.getElementById(`total${producto.referencia}`).innerHTML = `Unidades ${producto.nombre}: ${cantidadProducto}`;
}

function actualizarTotalCarrito() {
    let carrito = localStorage.getItem('carrito') ? parseInt(localStorage.getItem('carrito')) : 0;
    document.getElementById('totalCarrito').innerHTML = `Total: $${carrito}`;
    document.getElementById(`pagoCompletado`).innerHTML = ``;

// Actualizar las unidades de cada producto
    for (let i = 1; i <= Producto.contador; i++) {    
        let referencia = `REF00${i}`;
        let cantidadProducto = localStorage.getItem(referencia) ? parseInt(localStorage.getItem(referencia)) : 0;
        document.getElementById(`totalREF00${i}`).innerHTML = `${producto.nombre}: ${cantidadProducto}`;
    }
}
function vaciarCarrito() {
    localStorage.setItem('carrito', '0');
    for (let i = 1; i <= Producto.contador; i++) { 
        let referencia = `REF00${i}`;
        localStorage.setItem(referencia, '0'); // Reiniciar contador de cada producto
        document.getElementById(`total${referencia}`).innerHTML = ``; // Actualizar visualización del contador de cada producto
    }
    actualizarTotalCarrito(); // Actualizar el total del carrito y las unidades de cada producto
    
    
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let numeroConfirmacion = getRandomInt(99999999999);

const compraCompleta = document.getElementById("pagar");
compraCompleta.addEventListener("click", confirmarCompra);

function confirmarCompra(){
  document.getElementById(`pagoCompletado`).innerHTML = `<br><br><img src="images/pay.png" width="50px" class="imagen"><h3>Pago Confirmado</h3><h4>Número de confirmación<br>${numeroConfirmacion}</h4><br><img src="images/gracias.png" width="50px">`;
}





// Llamar a la función para actualizar el total al cargar la página
window.onload = actualizarTotalCarrito;