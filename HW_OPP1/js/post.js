const fragment = document.createDocumentFragment();

fetch('./json/post.json')
  .then((response) => response.json())
  .then((data) => {
    data.tags.forEach((item) => {
      const a = document.createElement('a');
      a.textContent = `${item.title}`;
      a.classList.add('tags__item');
      a.classList.add('btn-inverse');
      a.setAttribute('href', `${item.link}`);
      tags.appendChild(a);
    });
    data.categories.forEach((item) => {
      const accordion = document.createElement('div');
      accordion.classList.add('accordion');

      accordion.innerHTML = `
        <input class="accordion__checkbox" type="checkbox" name="accordion" id="accordion${item.id}"/>
          <div class="accordion__header">
            ${item.header}
            <label class="accordion__toggle" for="accordion${item.id}"></label>
          </div>
          <div class="accordion__content">
            <a class="accordion__link" href="#">${item.title[0]}</a>
            <a class="accordion__link" href="#">${item.title[1]}</a>
            <a class="accordion__link" href="#">${item.title[2]}</a>
        </div>
      `;
      categories.appendChild(accordion);
    });
    data.sidebarPost.forEach((item) => {
      const latestItem = document.createElement('div');
      latestItem.classList.add('latest-posts__item');

      latestItem.innerHTML = `
        <div class="latest-posts__image-wrap">
          <img class="latest-posts__image" src="${item.preview}" alt="Post preview" />
        </div>
        <div class="latest-posts__description">
          <div class="latest-posts__item-header">
            ${item.title}
          </div>
          <div class="post-info">
            <span class="post-info__date">${item.date}</span>
            <span class="post-info__divider"></span>
            <span class="post-info__read-time">${item.time}</span>
            <span class="post-info__divider"></span>
            <span class="post-info__comments">${item.comments}</span>
          </div>
        </div>
      `;
      latestPosts.appendChild(latestItem);
    });
    data.reviews.forEach((item) => {
      const reviews = document.createElement('div');
      const more =
        item.description1 === false
          ? ''
          : `
          <span class="reviews__accordion-content">
            ${item.description1}
          </span>
          <div class="reviews__button-wrap">
            <label class="reviews__button" for="${item.id}">
              <span class="reviews__readmore">Read more</span>
              <span class="reviews__readless">Read less</span>
            </label>
          </div>
        `;
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
      reviews.appendChild(reviewsLine);
    });

    fetch(`http://localhost:3000/api/list/${window.location.search.substr(1).split('=')[1]}`)
      .then((response) => response.json())
      .then((data) => {
        containerTitle.textContent = data.header;
        if (data.video || data.picture || data.melody) {
          articleImage.innerHTML = `<img class="article__image" src="${data.preview}" alt="Article photo" />`;
        }
        if (data.melody) {
          articleAudio.innerHTML = `
          <source src="horse.ogg" type="audio/ogg" />
          <source src="horse.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
          `;
        } else {
          articleWrapp.removeChild(articleAudio);
        }
        containerUser.innerHTML = `<img class="article__user-image" src="${data.avatar}" alt="User photo" />`;
        containerUsername.textContent = `${data.user}`;
        containerUsername.setAttribute('href', '#');
        postInfo.innerHTML = `
        <span class="post-info__date">${data.date}</span>
        <span class="post-info__divider"></span>
        <span class="post-info__read-time">${data.time}</span>
        <span class="post-info__divider"></span>
        <span class="post-info__comments">${data.comments}</span>
        <span class="rating">
          <span class="rating__star rating__star--full"></span>
          <span class="rating__star"></span>
          <span class="rating__star"></span>
          <span class="rating__star"></span>
          <span class="rating__star"></span>
        </span>
      `;
        articleText.innerHTML = `<p class="article__paragraph">${data.description}</p>`;
      });
    latestTitle.textContent = `${data.titles.latest_title}`;
    reviewsMore.innerHTML = `<a class="reviews__more-btn btn-inverse" href="#">${data.titles.reviews_btn}</a>`;
    latestMore.innerHTML = `<a class="latest-posts__more-btn btn-inverse" href="#">${data.titles.latest_btn}</a>`;
    categoriesTitle.innerHTML = data.titles.categories_title;
    tagsTitle.innerHTML = data.titles.title_tags;
    reviewsTitle.textContent = data.titles.reviews_title;
    data.header.forEach((item) => {
      headerLogo.innerHTML = `<a class="header__logo" href="#">${item.logo}</a>`;
    });
    data.headerMenu.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.classList.add('menu__link');
      a.setAttribute('href', `${item.link}`);
      if (item.id) {
        a.setAttribute('id', `${item.id}`);
      }
      a.textContent = `${item.title}`;
      li.classList.add('menu__item');
      li.classList.add(`${item.active}`);
      li.appendChild(a);
      headerMenu.appendChild(li);
    });
    data.footer.forEach((item) => {
      footer.innerHTML = `
          <div class="container">
              <div class="row">
                  <div class="footer__column">
                      <div class="footer__socials socials">
                      <a class="socials__link" href="#" target="_blank" rel="noopener">
                          <div class="socials__icon socials__icon--facebook"></div>
                      </a>
                      <a class="socials__link" href="#" target="_blank" rel="noopener">
                          <div class="socials__icon socials__icon--instagram"></div>
                      </a>
                      <a class="socials__link" href="#" target="_blank" rel="noopener">
                          <div class="socials__icon socials__icon--dribbble"></div>
                      </a>
                      </div>
                  </div>
                  <div class="footer__column">
                      <strong class="footer__brand">${item.brand}</strong>
                  </div>
                  <div class="footer__column">
                      <div class="footer__copyright">${item.copyright}</div>
                  </div>
              </div>
          </div>
          <a class="footer__go-top btn-inverse" href="#top">Scroll to top</a>
      `;
    });
  });
const headerWrapper = document.createElement('section');
headerWrapper.classList.add('hero');
headerWrapper.setAttribute('id', 'home');

const headerContainer = document.createElement('div');
headerContainer.classList.add('container');

const headerRow = document.createElement('div');
headerRow.classList.add('row');

const header = document.createElement('header');
header.classList.add('header');
header.setAttribute('id', 'top');

const headerLogo = document.createElement('div');
headerLogo.classList.add('header__logo-wrap');

const menuWrapper = document.createElement('div');
menuWrapper.classList.add('header__menu-wrap');

const headerMenu = document.createElement('ul');
headerMenu.classList.add('menu');

const container = document.createElement('div');
container.classList.add('container');

const article = document.createElement('article');
article.classList.add('article');

const articleWrapp = document.createElement('div');
articleWrapp.classList.add('article__wrap');

const containerTitle = document.createElement('h1');
containerTitle.classList.add('article__title');

const containerDetails = document.createElement('div');
containerDetails.classList.add('article__details');

const containerUser = document.createElement('a');
containerUser.classList.add('article__user');
containerUser.setAttribute('href', '#');

const containerUsername = document.createElement('a');
containerUsername.classList.add('article__user-name');

const postInfo = document.createElement('div');
postInfo.classList.add('post-info');

const containerRow = document.createElement('div');
containerRow.classList.add('row');

const articleImage = document.createElement('div');
articleImage.classList.add('article__image-wrap');

const articleText = document.createElement('div');
articleText.classList.add('article__text');

const articleShare = document.createElement('div');
articleShare.classList.add('article__share');
articleShare.innerHTML = `
    <div class="article__socials socials">
      <a class="socials__link" href="#" target="_blank" rel="noopener">
        <div class="socials__icon socials__icon--facebook"></div>
      </a>
      <a class="socials__link" href="#" target="_blank" rel="noopener">
        <div class="socials__icon socials__icon--dribbble"></div>
      </a>
      <a class="socials__link" href="#" target="_blank" rel="noopener">
        <div class="socials__icon socials__icon--instagram"></div>
      </a>
    </div>
    <a class="article__like" href="#"></a>
    <span class="article__likes-number">75</span>
  `;

const reviews = document.createElement('div');
reviews.classList.add('reviews');

const reviewsTitle = document.createElement('h2');
reviewsTitle.classList.add('reviews__title');

const reviewsItems = document.createElement('div');
reviewsItems.classList.add('reviews__items');

const reviewsMore = document.createElement('div');
reviewsMore.classList.add('reviews__more');

const articleSidebar = document.createElement('div');
articleSidebar.classList.add('article__sidebar');

const articleAudio = document.createElement('audio');
articleAudio.classList.add('article__audio');
articleAudio.setAttribute('controls', 'controls');

const latestPosts = document.createElement('div');
latestPosts.classList.add('latest-posts');

const latestTitle = document.createElement('h2');
latestTitle.classList.add('latest-posts__title');

const latestMore = document.createElement('div');
latestMore.classList.add('latest-posts__more');

const categories = document.createElement('div');
categories.classList.add('categories');

const categoriesTitle = document.createElement('h2');
categoriesTitle.classList.add('categories__title');

const tags = document.createElement('div');
tags.classList.add('tags');

const tagsTitle = document.createElement('h2');
tagsTitle.classList.add('tags__title');

const reviewsLine = document.createElement('div');
reviewsLine.classList.add('reviews__line');

const footer = document.createElement('footer');
footer.classList.add('footer');

menuWrapper.appendChild(headerMenu);
headerRow.appendChild(headerLogo);
headerRow.appendChild(menuWrapper);
header.appendChild(headerRow);
headerContainer.appendChild(header);
headerWrapper.appendChild(headerContainer);

reviews.appendChild(reviewsTitle);
reviews.appendChild(reviewsItems);
reviews.appendChild(reviewsMore);

containerDetails.appendChild(containerUsername);
containerDetails.appendChild(postInfo);

articleWrapp.appendChild(articleImage);
articleWrapp.appendChild(articleAudio);
articleWrapp.appendChild(articleText);
articleWrapp.appendChild(articleShare);
articleWrapp.appendChild(reviews);

containerRow.appendChild(articleWrapp);
containerRow.appendChild(articleSidebar);

article.appendChild(containerTitle);
article.appendChild(containerUser);
article.appendChild(containerDetails);
article.appendChild(containerRow);
container.appendChild(article);

tags.appendChild(tagsTitle);

latestPosts.appendChild(latestTitle);

categories.appendChild(categoriesTitle);

articleSidebar.appendChild(latestPosts);
articleSidebar.appendChild(categories);
articleSidebar.appendChild(tags);

fragment.appendChild(headerWrapper);
fragment.appendChild(container);
fragment.appendChild(footer);

document.body.appendChild(fragment);
