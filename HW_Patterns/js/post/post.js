/* eslint-disable no-undef */
const fragment = document.createDocumentFragment();

function getReviewsItems(data) {
  const reviewsItems = document.createElement('div');
  reviewsItems.classList.add('reviews__items');
  const reviewsLine = document.createElement('div');
  reviewsLine.classList.add('reviews__line');
  data.reviews.forEach((item) => {
    const reviews = document.createElement('div');
    let more = '';
    if (item.description1 !== false) {
      more = `<span class="reviews__accordion-content">
                ${item.description1}
              </span>
              <div class="reviews__button-wrap">
                <label class="reviews__button" for="${item.id}">
                  <span class="reviews__readmore">Read more</span>
                  <span class="reviews__readless">Read less</span>
                </label>
              </div>`;
    }
    reviews.classList.add('reviews__item');
    reviews.innerHTML = `
                <div class="reviews__photo">
                  <img class="reviews__photo-image" src="${item.avatar}" alt="${item.user}" />
                </div>
                <div class="reviews__box">
                  <div class="reviews__box-header">
                    <div class="reviews__name">
                      ${item.user}
                    </div>
                    <div class="reviews__rating rating">
                      <span class="rating__star rating__star--full"></span>
                      <span class="rating__star"></span>
                      <span class="rating__star"></span>
                      <span class="rating__star"></span>
                      <span class="rating__star"></span>
                    </div>
                    <div class="reviews__time">
                      ${item.time}
                    </div>
                  </div>
                  <div class="reviews__text">
                    <input class="reviews__accordion-checkbox" type="checkbox" name="${item.id}" id="${item.id}" />
                      ${item.description}
                    ${more}
                  </div>
                </div>
              `;
    reviewsItems.appendChild(reviews);
  });
  reviewsItems.appendChild(reviewsLine);

  return reviewsItems;
}

function getReviews(data) {
  const reviewsBlock = document.createElement('div');
  reviewsBlock.classList.add('reviews');

  const reviewsMore = document.createElement('div');
  reviewsMore.classList.add('reviews__more');
  reviewsMore.innerHTML = `<a class="reviews__more-btn btn-inverse" href="#">${data.titles.reviews_btn}</a>`;

  const title = document.createElement('h2');
  title.classList.add('reviews__title');
  title.textContent = data.titles.reviews_title;

  reviewsBlock.appendChild(title);
  reviewsBlock.appendChild(getReviewsItems(data));
  reviewsBlock.appendChild(reviewsMore);
  return reviewsBlock;
}

function getArticleShare() {
  const articleShare = document.createElement('div');
  articleShare.classList.add('article__share');
  articleShare.innerHTML = `<div class="article__socials socials">
      <a class="socials__link" href="#" target="_blank" rel="noopener"><div class="socials__icon socials__icon--facebook"></div></a>
      <a class="socials__link" href="#" target="_blank" rel="noopener"><div class="socials__icon socials__icon--dribbble"></div></a>
      <a class="socials__link" href="#" target="_blank" rel="noopener"><div class="socials__icon socials__icon--instagram"></div></a>
    </div>
    <a class="article__like" href="#"></a>
    <span class="article__likes-number">75</span>`;
  return articleShare;
}

function getArticleDetails(post) {
  const details = document.createElement('div');
  details.classList.add('article__details');
  details.innerHTML = ` 
    <a class="article__user" href="#">
      <img class="article__user-image" src="${post.avatar}" alt="User photo"/>
    </a>
    <a class="article__user-name" href="#">${post.user}</a>
    <div class="post-info">
      <span class="post-info__date">${post.date}</span>
      <span class="post-info__divider"></span>
      <span class="post-info__read-time">${post.time}</span>
      <span class="post-info__divider"></span>
      <span class="post-info__comments">${post.comments}</span>
      <span class="rating">
        <span class="rating__star rating__star--full"></span>
        <span class="rating__star"></span>
        <span class="rating__star"></span>
        <span class="rating__star"></span>
        <span class="rating__star"></span>
      </span>
    </div>
  </div>`;
  return details;
}

function getDefaultData(json) {
  const data = `<div class="article__image-wrap">
    <img class="article__image" src="${json.preview}" alt="Article photo"/>
  </div>
  <audio class="article__audio" controls="controls">
    <source src="horse.ogg" type="audio/ogg"/>
    <source src="horse.mp3" type="audio/mpeg"/>
    Your browser does not support the audio element.
  </audio>
  <div class="article__text">
    <p class="article__paragraph">${json.paragraph1}</p>
    <p class="article__paragraph">${json.paragraph2}</p>
    <p class="article__paragraph">${json.paragraph3}</p>
    <h2 class="article__subheader">${json.subheader}</h2>
    <p class="article__paragraph">${json.paragraph4}</p>
    <p class="article__paragraph">${json.paragraph5}</p>
    <p class="article__paragraph">${json.paragraph6}</p>
    <h2 class="article__subheader">${json.subheader1}</h2>
    <p class="article__paragraph">${json.paragraph7}</p>
  </div>`;
  return document.createRange().createContextualFragment(data);
}

function getData(json) {
  let data = '';

  switch (json.type) {
    case 'video':
    case 'picture':
      data += `<div class="article__image-wrap"><img class="article__image" src="${json.preview}" alt="Article photo"/></div>`;
      break;
    case 'melody':
      data += `<div class="article__image-wrap"><img class="article__image" src="${json.preview}" alt="Article photo"/></div>
      <audio class="article__audio" controls="controls">
      <source src="horse.ogg" type="audio/ogg"/>
      <source src="horse.mp3" type="audio/mpeg"/>
      Your browser does not support the audio element.
    </audio>`;
      break;
  }
  data += `
  <div class="article__text">
    <p class="article__paragraph">${json.description}</p>
  </div>`;
  return document.createRange().createContextualFragment(data);
}

function getWrapRow(data, post = data.post[0]) {
  const wrap = document.createElement('div');
  wrap.classList.add('article__wrap');
  wrap.appendChild(getDefaultData(post));
  wrap.appendChild(getArticleShare());
  wrap.appendChild(getReviews(data));
  return wrap;
}

function getContainerRow(data) {
  const containerRow = document.createElement('div');
  containerRow.classList.add('row');
  containerRow.appendChild(getWrapRow(data));
  containerRow.appendChild(getArticleSidebar(data));
  return containerRow;
}

function getMainDefault(data) {
  const main = document.createElement('div');
  main.classList.add('container');
  const article = document.createElement('article');
  article.classList.add('article');
  const title = document.createElement('h2');
  title.classList.add('article__title');
  title.textContent = data.post[0].header;
  article.appendChild(title);
  article.appendChild(getArticleDetails(data.post[0]));
  article.appendChild(getContainerRow(data));
  main.appendChild(article);
  return main;
}

const isDownloadApi = window.location.search.substr(1).split('=')[1];

fetch('./json/post.json')
  .then((response) => response.json())
  .then((data) => {
    fragment.appendChild(getHeader(data));
    if (isDownloadApi) {
      const main = document.createElement('div');
      main.classList.add('container');
      const article = document.createElement('article');
      article.classList.add('article');
      main.appendChild(article);
      fragment.appendChild(main);
      fragment.appendChild(getFooter(data.footer));
      document.body.appendChild(fragment);
      fetch(`http://localhost:3000/api/list/${window.location.search.substr(1).split('=')[1]}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error(`Request rejected with status ${response.status}`);
          }
        })
        .then((post) => {
          const article = document.body.querySelector('article.article');
          article.insertAdjacentHTML('beforeend', `<h2 class="article__title">${post.header}</h2>`);
          article.appendChild(getArticleDetails(post));

          const containerRow = document.createElement('div');
          containerRow.classList.add('row');

          const wrap = document.createElement('div');
          wrap.classList.add('article__wrap');
          wrap.appendChild(getData(post));
          wrap.appendChild(getArticleShare());
          wrap.appendChild(getReviews(data));

          containerRow.appendChild(wrap);
          containerRow.appendChild(getArticleSidebar(data));

          article.appendChild(containerRow);
        })
        .catch(() => {
          // TODO error
        });
    } else {
      fragment.appendChild(getMainDefault(data));
      fragment.appendChild(getFooter(data.footer));
      document.body.appendChild(fragment);
    }
  });
