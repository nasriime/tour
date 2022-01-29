$('#filterBy').on('change', (event)=> {
  console.log(event.target.value);
});

$('#sortBy').on('change', (event)=> {
  console.log(event.target.value);
});

const wrapper = document.getElementById('wrapper');
const url = 'https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f';


const getList = (result)=>{
  const { cities, dates, description, images, length, length_type, 
    name, operator_name, rating, reviews } = result;

  const destinations = cities.map(city=> city.name); 
  const showCities = destinations.slice(0,2);
  const moreCities = destinations.length > 2 ? ` +${destinations.length - 2} more` : ' ';
  const is_primary_image = images.filter(image=> image.is_primary === true);
  const image = is_primary_image.length > 0 && is_primary_image[0]['url'] ?
   is_primary_image[0]['url'] : "http://placehold.it/232x170";
  const first_availability = dates[0]["availability"];
  const last_availability = dates[dates.length-1]["availability"];
  
  let html = `
    <!-- left part -->
    <div class="item__left">
      <img src="${image}" alt="">
      <i class="far fa-heart item__left--like"></i>
    </div>
    <!-- middle part -->
    <div class="item__middle">
      <h2>${name}</h2>
      <div class="item__middle--rating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half-alt"></i>
        <i class="far fa-star"></i>
        <span>${reviews}</span>
        <span>reviews</span>
      </div>
      <blockquote class="item__middle--review">${description}</blockquote>
      <div class="item__middle--info">
        <div>
          <span class="item__middle--info-label">Destinations</span>
          <span>${showCities}${moreCities}</span>
        </div>
        <div>
          <span class="item__middle--info-label">starts/ends in</span>
          <span>london/london</span>
        </div>
        <div>
          <span class="item__middle--info-label">operator</span>
          <span>${operator_name}</span>
        </div>
      </div>
    </div>
    <!-- right part -->
    <div class="item__right">
      <div class="item__right--saving" style="display: ${dates[0]["discount"] ? "" : 'none'}">
        <div>-${dates[0]["discount"]}</div>
      </div>
      <div class="item__right--duration">
        <div class="item__right--days">
          <span>Duration</span>
          <span>${length} days</span>
        </div>
        <div class="item__right--price">
          <span>From</span>
          <span>€${dates[0]["eur"]}</span>
        </div>
      </div>
      <div class="item__right--period">
        <div class="item__right--availability-from">
          <h6>1 Nov 2019</h6>
          <h6>${first_availability}+ sapces left</h6>
        </div>
        <div class="item__right--availability-to">
          <h6>2 Nov 2019</h6>
          <h6>${last_availability}+ sapces left</h6>
        </div>
      </div>
      <button class="item__right--btn">
        <span>view tour</span><i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `;
  return html;
}

const fetchData = () => {
  fetch(url)
  .then((data)=> {
    return data.json()
  })
  .then(results=>{
    results.map((result)=> {
      const item = document.createElement('li');
      item.className = 'item';

      const html = getList(result);
      item.innerHTML = html;
      wrapper.append(item);
    });
  })
  .catch((error)=> {
    console.log(error);
  });
}

fetchData();
