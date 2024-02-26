const urlApi = 'https://jsonplaceholder.typicode.com/users';
const listaUsuarios = document.querySelector('#lista-usuarios');

fetch(urlApi)
    .then(resp => resp.json())
    .then((data) => {
      data.forEach(usuario =>{
        const li = document.createElement('li');
        li.innerHTML = usuario.name + '<br> Telefono: ' + usuario.phone 
        listaUsuarios.append(li);
      });
    })