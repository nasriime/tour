$('#hideBtn').click(function() {
  console.log('Hello world');
});
const wrapper = document.getElementById('wrapper');
const url = 'https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f';


const getList = (result)=>{
  const { cities, dates, description, images, length, length_type, 
    name, operator_name, rating, reviews } = result;
  const is_primary_image = images.filter(image=> image.is_primary === true);
  let html = `
    <!-- left part -->
    <div class="item__left">
      <img src="${is_primary_image.length > 0 ? is_primary_image[0]['url'] : ""}" alt="">
      <i class="far fa-heart item__left--like"></i>
    </div>
    <!-- middle part -->
    <div class="item__middle">
      <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, magnam.</h2>
      <div class="item__middle--rating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <span>2</span>
        <span>reviews</span>
      </div>
      <blockquote class="item__middle--review">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, quos!
      </blockquote>
      <div class="item__middle--info">
        <div>
          <span class="item__middle--info-label">Destinations</span>
          <span>Rome</span>
        </div>
        <div>
          <span class="item__middle--info-label">starts/ends in</span>
          <span>london/london</span>
        </div>
        <div>
          <span class="item__middle--info-label">operator</span>
          <span>expat explore travel</span>
        </div>
      </div>
    </div>
    <!-- right part -->
    <div class="item__right">
      <div class="item__right--saving">
        <div>-15%</div>
      </div>
      <div class="item__right--duration">
        <div class="item__right--days">
          <span>Duration</span>
          <span>7 days</span>
        </div>
        <div class="item__right--price">
          <span>From</span>
          <span>2,134</span>
        </div>
      </div>
      <div class="item__right--period">
        <div class="item__right--availability-from">
          <h6>1 Nov 2019</h6>
          <h6>10+ sapces left</h6>
        </div>
        <div class="item__right--availability-to">
          <h6>2 Nov 2019</h6>
          <h6>10+ sapces left</h6>
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
