const fragment = document.createDocumentFragment();

fetch('./json/blog.json')
  .then((response) => response.json())
  .then((data) => {
    data.page.forEach((item) => {
      title.innerHTML = `
          <span class="title-decoration">${item.title}</span>
      `;
    });
    data.btnMore.forEach((item) => {
      readMore.innerHTML = `
          <button class="blog__more">${item.title}</button>
      `;
    });
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
    fetch('http://localhost:3000/api/list/')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          const post = document.createElement('article');
          function condition1() {
            const video = item.video ? 'video' : '';
            const melody = item.melody ? 'melody' : '';
            const picture = item.picture ? 'picture' : '';
            const text = item.text ? 'text' : '';
            const classes = video + melody + picture + text;
            return {video, melody, picture, text, classes};
          }
          const {video, melody, picture, text, classes} = condition1();
          window.console.log(text);
          function condition2() {
            const postPreview =
            video || picture || melody
              ? `
            <a class="post__preview" href="./post.html">
                <video
                class="post__video"
                poster="${item.preview}"
                >
                    <source src="mov_bbb.mp4" type="video/mp4" />
                    <source src="mov_bbb.ogg" type="video/ogg" />
                    Your browser does not support HTML5 video.
                </video>
                <div class="post__preview-play-button"></div>
            </a>
          `
              : '';
            const audio = item.melody
              ? `
            <audio class="post__audio" controls="controls">
              <source src="horse.ogg" type="audio/ogg" />
              <source src="horse.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
              </audio>
            <br />
            `
              : '';
            return {postPreview, audio};
          }
          const {postPreview, audio} = condition2();
          function condition3() {
            const postVideo = item.video ? 'class="post__video-container"' : '';
            const postMelody = item.melody ? 'class="post__audio-container"' : '';
            const postPicture = item.picture ? 'class="post__picture-container"' : '';
            const postText = item.text ? '' : 'class="post__description-container"';
            return {postVideo, postMelody, postPicture, postText};
          }
          const {postVideo, postMelody, postPicture, postText} = condition3();
          post.classList.add('post');
          post.classList.add(`post--${classes}`);
          post.innerHTML = `
                <div ${item.text ? '' : 'class="row"'}>
                    <div 
                    ${postVideo}
                    ${postMelody}
                    ${postPicture}
                    >
                    ${postPreview}
                    </div>
                    <div ${postText}>
                        <div class="post__content">
                            <div class="post__details">
                            <a class="post__user" href="#">
                                <img
                                class="post__user-image"
                                src="${item.avatar}"
                                alt="User photo"
                                />
                            </a>
                            <a class="post__user-name" href="#">${item.user}</a>
                            <div class="post-info">
                                <span class="post-info__date">${item.date}</span>
                                <span class="post-info__divider"></span>
                                <span class="post-info__read-time">${item.time}</span>
                                <span class="post-info__divider"></span>
                                <span class="post-info__comments">${item.comments}</span>
                                <span class="rating">
                                <span class="rating__star rating__star--full"></span>
                                <span class="rating__star rating__star--full"></span>
                                <span class="rating__star rating__star--half"></span>
                                <span class="rating__star"></span>
                                <span class="rating__star"></span>
                                </span>
                            </div>
                            </div>
                            <h2 class="post__header">
                                ${item.header}
                            </h2>
                            <div class="post__text">
                                ${audio}
                                ${item.description}
                            </div>
                            <a class="post__button btn-inverse" href="./post.html?id=${item.id}"
                            >Read more</a
                            >
                        </div>
                    </div>
                </div>
            `;
          container.appendChild(post);
          container.appendChild(readMore);
        });
      });
  });

const container = document.createElement('div');
container.classList.add('container');

const section = document.createElement('section');
section.classList.add('blog');
section.setAttribute('id', 'home');

const title = document.createElement('div');
title.classList.add('blog__title');

const search = document.createElement('div');
search.classList.add('search');
search.innerHTML = `
  <input class="search__input" type="text" placeholder="Search by author" />
  <button class="search__btn" type="submit"></button>
`;

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

const readMore = document.createElement('div');
readMore.classList.add('blog__more-wrap');
readMore.style.marginBottom = '67px';

const footer = document.createElement('footer');
footer.classList.add('footer');

container.appendChild(title);
container.appendChild(search);

menuWrapper.appendChild(headerMenu);
headerRow.appendChild(headerLogo);
headerRow.appendChild(menuWrapper);
header.appendChild(headerRow);
headerContainer.appendChild(header);
headerWrapper.appendChild(headerContainer);

section.appendChild(container);

fragment.appendChild(headerWrapper);
fragment.appendChild(section);
fragment.appendChild(footer);

document.body.appendChild(fragment);
