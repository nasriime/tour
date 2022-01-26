$('#hideBtn').click(function() {
  console.log('Hello world');
});
const wrapper = document.getElementById('offers');
const url = 'https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f';

var fetchData = () => {
  fetch(url)
  .then((data)=> {
    return data.json()
  })
  .then(results=>{
    results.map(function(result) {
      const { cities, dates, description, images, length, length_type, 
        name, operator_name, rating, reviews } = result;
      const is_primary_image = images.filter(image=> image.is_primary === true);
      const container = document.createElement('div');
      container.className = 'list-item';

      let html = "";
      html += '<div id="" class="">';
      html += '<div class="">';
      html += '<ul class="">';
      html += `<img src="${is_primary_image.length > 0 ? is_primary_image[0]['url'] : ""}">`;
      html += `<li class="">${name} <a href="javascript:void(0)"> <span class=""></span> </a> </li>`;
      html += '</ul></div></div></div>';
  
      container.innerHTML = html;
      wrapper.append(container);
    });
  })
  .catch((error)=> {
    console.log(error);
  });
}

fetchData();
