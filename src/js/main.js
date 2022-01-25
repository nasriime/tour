$('#hideBtn').click(function() {
  console.log('Hello world');
});
const list = document.createDocumentFragment();
const ul = document.getElementById('offers');

var fetchData = () => {
  fetch('https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f')
  .then((data)=> {
    return data.json()
  })
  .then(results=>{
    results.map(function(result) {
      let li = document.createElement('li');
      let name = document.createElement('h2');
      let operator_name = document.createElement('span');

      name.innerHTML = `${result.name}`;
      operator_name.innerHTML = `${result.operator_name}`;

      li.appendChild(name);
      li.appendChild(operator_name);
      list.appendChild(li);
    });
    ul.appendChild(list);
  })
  .catch((error)=> {
    console.log(error);
  });
}

fetchData();
