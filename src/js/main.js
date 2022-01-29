import moment from 'moment';

let tours = [];

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
  const first_availability = dates[0] && dates[0]["availability"] && dates[0]["availability"];
  const last_availability = dates[dates.length-1] && dates[dates.length-1]["availability"] && dates[dates.length-1]["availability"];
  const start_Date = moment(dates[0] && dates[0]["start"]).format('D MMM YYYY');
  const end_Date = moment(dates[dates.length - 1] && dates[dates.length - 1]["start"]).format('D MMM YYYY');

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
      <blockquote class="item__middle--review">${description.slice(0,100)}...</blockquote>
      <div class="item__middle--info">
        <div>
          <span class="item__middle--info-label">Destinations</span>
          <span>${showCities}${moreCities}</span>
        </div>
        <div>
          <span class="item__middle--info-label">starts/ends in</span>
          <span>${cities[0]["name"]}/${cities[cities.length-1]["name"]}</span>
        </div>
        <div>
          <span class="item__middle--info-label">operator</span>
          <span>${operator_name}</span>
        </div>
      </div>
    </div>
    <!-- right part -->
    <div class="item__right">
      <div 
        class="item__right--saving" 
        style="display: ${dates[0] && dates[0]["discount"] ? "" : 'none'}">
        <div>-${dates[0] && dates[0]["discount"]}</div>
      </div>
      <div class="item__right--duration">
        <div class="item__right--days">
          <span>Duration</span>
          <span>${length} days</span>
        </div>
        <div class="item__right--price">
          <span>From</span>
          <span>€${dates[0] && dates[0]["eur"] || 1}</span>
        </div>
      </div>
      <div class="item__right--period">
        <div class="item__right--availability-from">
          <h6>${start_Date}</h6>
          <h6>${first_availability}+ sapces left</h6>
        </div>
        <div class="item__right--availability-to">
          <h6>${end_Date}</h6>
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

const toursLoop =()=>{
  tours.map((result)=> {
    const item = document.createElement('li');
    item.className = 'item';
    const html = getList(result);
    item.innerHTML = html;
    wrapper.append(item);
  });
}

const fetchData = () => {
  fetch(url)
  .then((data)=> {
    return data.json()
  })
  .then(results=>{
    tours = results;
    toursLoop();
  })
  .catch((error)=> {
    console.log(error);
  });
}

fetchData();


/* Events */
$('#filterBy').on('change', (event)=> {
  console.log(event.target.value);
});

$('#sortBy').on('change', (event)=> {
  console.log(event.target.value);
  const val = event.target.value;
  switch (val) {
    case "1":
      tours = tours.sort((a, b)=>{
        return a.dates[0] && a.dates[0]["eur"] && a.dates[0]["eur"] - b.dates[0] && b.dates[0]["eur"] && b.dates[0]["eur"] 
      });
      console.log('tours', tours)
      toursLoop();
      break;
    case "2":
      tours = tours.sort((a, b)=>{
        return b.dates[0] && b.dates[0]["eur"] && b.dates[0]["eur"] - a.dates[0] && a.dates[0]["eur"] && a.dates[0]["eur"]
      });
      toursLoop();
      break;
  }
});
