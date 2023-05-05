const traerPizzas = url => axios.get(url).then(res => {mostrarPizzas(res.data)})

const mostrarPizzas = pizzas => {
    const divPizzas = document.getElementById("divPizzas");
    divPizzas.innerHTML = "";
    pizzas.forEach(pizza => {
        const unaPizza = document.createElement("div");
        unaPizza.setAttribute("class", "col mb-5");
        unaPizza.innerHTML = `
        <div class="card h-100">
            <img class="card-img-top" src="favicon.png" alt="..." />
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">${pizza.Nombre}</h5>
                    <p class="precio">$${pizza.Importe}</p>
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" data-bs-toggle="modal" data-bs-target="#verDetalles" onclick="verDetalles(${pizza.Id})">Ver detalles</a></div>
            </div>
        </div>
        `;
        divPizzas.appendChild(unaPizza);
    });
    if(divPizzas.innerHTML == "")
    {
        divPizzas.innerHTML = `<p class="text-center">No se encontraron resultados</p>`;
    }
}

const traerTodo = () => traerPizzas("http://localhost:3000/pizza");

const filtrarPizzas = (pizzas, busqueda) => mostrarPizzas(pizzas.filter(pizza => pizza.Nombre.toLowerCase().includes(busqueda.toLowerCase())));

document.getElementById("buscar").onclick = (e) =>
{
    e.preventDefault();
    let inpBusqueda = document.getElementById("busqueda");
    if(inpBusqueda.value != "")
    {
        axios.get("http://localhost:3000/pizza").then(res => {filtrarPizzas(res.data, inpBusqueda.value);})
    }
}

const verDetalles = id =>
{
    let url = "http://localhost:3000/pizza/" + id;
    axios.get(url)
        .then(res => {
            document.getElementById("pTitulo").innerHTML = res.data.Nombre;
            document.getElementById("pPrecio").innerHTML = "$" + res.data.Importe;
            document.getElementById("pDescri").innerHTML = "Descripción: " + res.data.Descripcion;
            document.getElementById("pGluten").innerHTML = res.data.LibreGluten?`<img class="sintacc" src="sintacc.jpg"><small class="text-muted">Sin TACC</small>`:"";
        })
}

traerTodo();