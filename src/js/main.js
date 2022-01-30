import moment from 'moment';

let tours = [];
const wrapper = document.getElementById('wrapper');
const url = 'https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f';


const createRatingStars = (rating)=>{
  let ratingDiv = ``;
  if(!rating){
    Array.from({length: 5}, () => {
      ratingDiv += `<i class="far fa-star"></i>`;
    });
  }else{
    const isFloat = rating % 1 !== 0;
    const numberOfStars = isFloat ? Math.ceil(rating) : rating;

    Array.from({length: numberOfStars}, () => {
      ratingDiv += `<i class="fas fa-star"></i>`;
    });
    
    if (isFloat) {
      ratingDiv += `<i class="fas fa-star-half-alt"></i>`;
    }
  
    if (numberOfStars < 5) {
      const remainingStars = 5 - Math.ceil(rating);
      Array.from({length: remainingStars}, () => {
        ratingDiv += `<i class="far fa-star"></i>`;
      });
    } 
  }
  return ratingDiv;
}

const getList = (result, idx)=>{
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
  const newRating = createRatingStars(rating);

  let html = `
    <!-- left part -->
    <div class="item__left">
      <img src="${image}" alt="">
      <i class="far fa-heart item__left--like"></i>
    </div>
    <!-- middle part -->
    <div class="item__middle">
      <h2>${name}</h2>
      <div class="item__middle--rating-${idx}">
        ${newRating}
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

const toursLoop = (sortedTours) => {
  tours = sortedTours ? sortedTours : tours.sort((a, b)=>{
    var x = a.dates[0] && a.dates[0]["eur"];
    var y = b.dates[0] && b.dates[0]["eur"];
    return x>y ? -1 : x<y ? 1 : 0;
  });
  tours.map((result, idx)=> {
    const item = document.createElement('li');
    item.className = 'item';
    const html = getList(result, idx);
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

$(document).ready(function(){
  fetchData();
})


/* Events */
$('#filterBy').on('change', (e)=> {
  const val = e.target.value;
  const dateVal = moment(val).format('YYYY-MM');
  const filteredTours = [];
  tours.forEach(tour=> {
    const filtered = tour.dates.filter(date=> date.start.includes(dateVal));
    filtered.length > 0 && filteredTours.push(tour)
  });
  wrapper.innerHTML = "";
  toursLoop(filteredTours);
});

$('#sortBy').on('change', (e)=> {
  const val = e.target.value;
  let sortedTours = [];
  switch (val) {
    case "1":
      sortedTours = tours.sort((a, b)=>{
        var x = a.dates[0] && a.dates[0]["eur"]
        var y = b.dates[0] && b.dates[0]["eur"]
        return x>y ? -1 : x<y ? 1 : 0;
      });
      wrapper.innerHTML = "";
      toursLoop(sortedTours);
      break;
    case "2":
      sortedTours = tours.sort((a, b)=>{
        var x = a.dates[0] && a.dates[0]["eur"]
        var y = b.dates[0] && b.dates[0]["eur"]
        return x>y ? 1 : x<y ? -1 : 0;
      });
      wrapper.innerHTML = "";
      toursLoop(sortedTours);
      break;
    case "3":
      sortedTours = tours.sort((a, b)=>{
        return b.length - a.length
      });
      wrapper.innerHTML = "";
      toursLoop(sortedTours);
      break;
    case "4":
      sortedTours = tours.sort((a, b)=>{
        return a.length - b.length
      });
      wrapper.innerHTML = "";
      toursLoop(sortedTours);
      break;
  }
});
