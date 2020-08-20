const fragment = document.createDocumentFragment();

fetch('./json/index.json')
  .then((response) => response.json())
  .then((data) => {
    data.header.forEach((item) => {
      headerLogo.innerHTML = `<a class="header__logo" href="#">${item.logo}</a>`;
      subtitleTitleHeader.innerHTML = `
        <h1 class="hero__title">
          ${item.title}
        </h1>
        <p class="hero__description">
          ${item.description}
        </p>
        <button class="hero__button">${item.btn1}</button>
        <button class="hero__button btn-inverse">${item.btn2}</button>
      `;
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
    data.map.forEach((item) => {
      map.innerHTML = `
        <div class="container">
          <div class="row">
            <div class="map__milestones">
              <h2 class="map__title">${item.title}</h2>
              <div class="map__steps">
                <div class="map__step">
                  <h3 class="map__step-header">${item.header_1}</h3>
                  <p class="map__step-description">
                    ${item.description_header1}
                  </p>
                </div>
                <div class="map__step">
                  <h3 class="map__step-header">${item.header_2}</h3>
                  <p class="map__step-description">
                    ${item.description_header2}
                  </p>
                </div>
                <div class="map__step">
                  <h3 class="map__step-header">${item.header_3}</h3>
                  <p class="map__step-description">
                    ${item.description_header3}
                  </p>
                </div>
              </div>
            </div>
            <div class="map__widget">
              <div class="map__panel">
                <div class="map__heading">
                  <div class="map__icon-contact"></div>
                  <div class="map-description">
                    ${item.description}
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row">
                    <div class="map__form">
                      <form class="form">
                        <label class="form__label" for="name">${item.label1}</label>
                        <input class="form__input" type="text" name="name" id="name" placeholder="${item.placeholder1}" />
                        <label class="form__label" for="email">${item.label2}</label>
                        <input class="form__input" type="email" name="email" id="email" placeholder="${item.placeholder2}" />
                        <div class="form__password">
                          <label class="form__label" for="password">
                            ${item.password}
                          </label>
                          <input class="form__input" type="password" name="password" id="password" placeholder="${item.placeholder3}" />
                          <input class="form__input-eye" type="checkbox" name="eye" id="eye" />
                          <label class="form__label-eye" for="eye">
                            <span class="form__label-eye-hide">hide</span>
                            <span class="form__label-eye-show">show</span>
                          </label>
                        </div>
                        <button class="form__btn" type="submit">
                          ${item.btn}
                        </button>
                        <p class="form__info">
                          ${item.form_info}
                          <a class="form__info-email" href="#">${item.label3}</a>
                        </p>
                      </form>
                    </div>
                    <div class="map__location">
                      <div class="row">
                        <img class="map__image" src="${item.map}" alt="map" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    data.contacts.forEach((item) => {
      contacts.innerHTML = `
        <div class="container">
          <h2 class="contacts__title">
          <span class="title-decoration">
            ${item.title}
          </span>
          </h2>
          <p class="contacts__description">
            ${item.description}
          </p>
          <div class="socials">
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
      `;
    });
    data.testimonialsSlider.forEach((item) => {
      testimonialsSlider.innerHTML = `
        <div class="row testimonials__content-wrap">
          <div class="testimonials__text-box">
            ${item.text}
            <div class="testimonials__name">Martin Oda</div>
            <div class="testimonials__position">Product desgner</div>
          </div>
          <div class="testimonials__image-box">
          <div class="row">
            <img
            class="testimonials__user"
            src="${item.slide}"
            alt="user"
            />
          </div>
          </div>
          <div class="testimonials__arrows">
          <button class="testimonials__arrow arrow arrow--left"></button>
          <button class="testimonials__arrow arrow arrow--right"></button>
          </div>
        </div>
      `;
    });
    data.testimonials.forEach((item) => {
      testimonialsTitle.innerHTML = `<span class="title-decoration">${item.title}</span>`;
    });
    data.portfolioSlider.forEach((item) => {
      const slide = document.createElement('div');
      slide.classList.add('portfolio__column');
      slide.innerHTML = `
        <div class="portfolio__item">
          <img class="portfolio__image" src="${item.slide}" alt="Post" />
          <div class="portfolio__item-text">
            <h3 class="portfolio__item-header">${item.header}</h3>
            <p class="portfolio__item-subheader">
              ${item.subheader}
            </p>
          </div>
          <div class="portfolio__item-nav">
            <a class="portfolio__item-link" href="#">
            <div
              class="portfolio__item-icon portfolio__item-icon--link"
            ></div>
            </a>
            <a class="portfolio__item-link" href="#">
            <div
              class="portfolio__item-icon portfolio__item-icon--zoom"
            ></div>
            </a>
          </div>
        </div>
      `;
      portfolioRow.appendChild(slide);
    });
    data.portfolioSlider2.forEach((item) => {
      const slide = document.createElement('div');
      slide.classList.add('portfolio__column');
      slide.innerHTML = `
        <div class="portfolio__item">
          <img class="portfolio__image" src="${item.slide}" alt="Post" />
          <div class="portfolio__item-text">
            <h3 class="portfolio__item-header">${item.header}</h3>
            <p class="portfolio__item-subheader">
              ${item.subheader}
            </p>
          </div>
          <div class="portfolio__item-nav">
            <a class="portfolio__item-link" href="#">
            <div
              class="portfolio__item-icon portfolio__item-icon--link"
            ></div>
            </a>
            <a class="portfolio__item-link" href="#">
            <div
              class="portfolio__item-icon portfolio__item-icon--zoom"
            ></div>
            </a>
          </div>
        </div>
      `;
      portfolioRow2.appendChild(slide);
    });
    data.portfolio.forEach((item) => {
      portfolioTitle.innerHTML = `<span class="title-decoration">${item.title}</span>`;
      portfolioSubtitle.textContent = `${item.subtitle}`;
    });
    data.about.forEach((item) => {
      aboutTitle.innerHTML = `<span class="title-decoration">${item.title}</span>`;
      aboutSubtitle.textContent = `${item.subtitle}`;
    });
    data.blog.forEach((item) => {
      blogTitle.innerHTML = `<span class="title-decoration">${item.title}</span>`;
      blogSubtitle.textContent = `${item.subtitle}`;
    });
    data.aboutNav.forEach((item) => {
      const a = document.createElement('a');
      function color() {
        const green = item.green ? 'green' : '';
        const blue = item.blue ? 'blue' : '';
        const red = item.red ? 'red' : '';
        return green + blue + red;
      }
      const typography = item.typography ? 'typography' : '';
      const iconset = item.iconset ? 'iconset' : '';
      const accurate = item.accurate ? 'accurate' : '';
      function side() {
        const right = item.right ? 'right' : '';
        const left = item.left ? 'left' : '';
        const side = left + right;
        return side;
      }

      const type = typography + iconset + accurate;
      a.setAttribute('class', `about__item about__item--${color()}`);
      a.setAttribute('href', '#');
      a.innerHTML = `
        <div class="about__white-corner white-corner white-corner--${side()}"></div>
        <div class="about__image about__image--${type}"></div>${item.title}
      `;
      aboutNav.appendChild(a);
    });
    data.videos.forEach((item) => {
      const aboutContent = document.createElement('div');
      aboutContent.classList.add('about__tab-content');
      aboutContent.innerHTML = `
        <div class="about__video">
          <video class="about__video-tag" controls="controls" poster="${item.videosrc}">
            <source src="mov_bbb.mp4" type="video/mp4" />
            <source src="mov_bbb.ogg" type="video/ogg" />
            Your browser does not support HTML5 video.
          </video>
          <div class="about__play-button"></div>
        </div>
      `;
      aboutRow.appendChild(aboutContent);
    });
    data.posts.forEach((item) => {
      const blogItem = document.createElement('div');
      blogItem.classList.add('blog__item');

      blogItem.innerHTML = `
        <a class="blog__image-link" href="./post.html">
          <img class="blog__image" src="${item.preview}" alt="post" />
        </a>
        <a class="blog__heading" href="./post.html">
          ${item.title}
        </a>
        <p class="blog__article-text">
          ${item.description}
        </p>
        <div class="post-info">
          <span class="post-info__date">${item.date}</span>
          <span class="post-info__divider"></span>
          <span class="post-info__read-time">${item.time}</span>
          <span class="post-info__divider"></span>
          <span class="post-info__comments">${item.comments}</span>
        </div>
      `;
      blogRow.appendChild(blogItem);
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

const subtitleTitleHeader = document.createElement('div');

const about = document.createElement('section');
about.classList.add('about');
about.setAttribute('id', 'about');

const aboutTitle = document.createElement('h2');
aboutTitle.classList.add('about__title');

const aboutSubtitle = document.createElement('p');
aboutSubtitle.classList.add('about__description');

const aboutContainer = document.createElement('div');
aboutContainer.classList.add('container');

const aboutRow = document.createElement('div');
aboutRow.classList.add('row');

const aboutNav = document.createElement('div');
aboutNav.classList.add('about__nav');

const blog = document.createElement('section');
blog.classList.add('blog');
blog.setAttribute('id', 'blog');

const blogTitle = document.createElement('h2');
blogTitle.classList.add('blog__title');

const blogSubtitle = document.createElement('p');
blogSubtitle.classList.add('blog__description');

const blogContainer = document.createElement('div');
blogContainer.classList.add('container');

const blogRow = document.createElement('div');
blogRow.classList.add('row');

const portfolio = document.createElement('section');
portfolio.classList.add('portfolio');
portfolio.setAttribute('id', 'portfolio');

const portfolioContainer = document.createElement('div');
portfolioContainer.classList.add('container');

const portfolioTitle = document.createElement('h2');
portfolioTitle.classList.add('portfolio__title');

const portfolioSubtitle = document.createElement('p');
portfolioSubtitle.classList.add('portfolio__description');

const portfolioRow = document.createElement('div');
portfolioRow.classList.add('row');

const portfolioArrows = document.createElement('div');
portfolioArrows.classList.add('portfolio__arrows');

const portfolioButton = document.createElement('button');
portfolioButton.classList.add('portfolio__button');
portfolioButton.classList.add('btn-inverse');
portfolioButton.textContent = 'See all works';

portfolioArrows.innerHTML = `
  <button class="portfolio__arrow arrow arrow--left"></button>
  <button class="portfolio__arrow arrow arrow--right"></button>
`;

const portfolio2 = document.createElement('section');
portfolio2.classList.add('portfolio');
portfolio2.setAttribute('id', 'portfolio2');

const portfolioContainer2 = document.createElement('div');
portfolioContainer2.classList.add('container');

const portfolioTitle2 = document.createElement('h2');
portfolioTitle2.classList.add('portfolio__title');

const portfolioSubtitle2 = document.createElement('p');
portfolioSubtitle2.classList.add('portfolio__description');

const portfolioRow2 = document.createElement('div');
portfolioRow2.classList.add('row');

const portfolioArrows2 = document.createElement('div');
portfolioArrows2.classList.add('portfolio__arrows');

const portfolioButton2 = document.createElement('button');
portfolioButton2.classList.add('portfolio__button');
portfolioButton2.classList.add('btn-inverse');
portfolioButton2.textContent = 'See all works';

portfolioArrows2.innerHTML = `
  <button class="portfolio__arrow arrow arrow--left"></button>
  <button class="portfolio__arrow arrow arrow--right"></button>
`;

const testimonials = document.createElement('section');
testimonials.classList.add('testimonials');

const testimonialsContainer = document.createElement('div');
testimonialsContainer.classList.add('container');

const testimonialsTitle = document.createElement('h2');
testimonialsTitle.classList.add('testimonials__title');

const testimonialsRow = document.createElement('div');
testimonialsRow.classList.add('row');

const testimonialsSize = document.createElement('div');
testimonialsSize.classList.add('testimonials__size');

const testimonialsSlider = document.createElement('div');
testimonialsSlider.classList.add('container-fluid');

const contacts = document.createElement('section');
contacts.classList.add('contacts');
contacts.setAttribute('id', 'contacts');

const map = document.createElement('section');
map.classList.add('map');
map.setAttribute('id', 'map');

const footer = document.createElement('footer');
footer.classList.add('footer');

menuWrapper.appendChild(headerMenu);
headerRow.appendChild(headerLogo);
headerRow.appendChild(menuWrapper);
header.appendChild(headerRow);
headerContainer.appendChild(header);
headerContainer.appendChild(subtitleTitleHeader);
headerWrapper.appendChild(headerContainer);

about.appendChild(aboutContainer);
aboutContainer.appendChild(aboutTitle);
aboutContainer.appendChild(aboutSubtitle);
aboutContainer.appendChild(aboutRow);
aboutRow.appendChild(aboutNav);

blogContainer.appendChild(blogTitle);
blogContainer.appendChild(blogSubtitle);
blogContainer.appendChild(blogRow);
blog.appendChild(blogContainer);

portfolioContainer.appendChild(portfolioTitle);
portfolioContainer.appendChild(portfolioSubtitle);
portfolioContainer.appendChild(portfolioRow);
portfolioContainer.appendChild(portfolioArrows);
portfolioContainer.appendChild(portfolioButton);
portfolio.appendChild(portfolioContainer);

portfolioContainer2.appendChild(portfolioTitle2);
portfolioContainer2.appendChild(portfolioSubtitle2);
portfolioContainer2.appendChild(portfolioRow2);
portfolioContainer2.appendChild(portfolioArrows2);
portfolioContainer2.appendChild(portfolioButton2);
portfolio2.appendChild(portfolioContainer2);

testimonialsSize.appendChild(testimonialsSlider);
testimonialsContainer.appendChild(testimonialsTitle);
testimonialsRow.appendChild(testimonialsSize);
testimonialsContainer.appendChild(testimonialsRow);
testimonials.appendChild(testimonialsContainer);

fragment.appendChild(headerWrapper);
fragment.appendChild(about);
fragment.appendChild(blog);
fragment.appendChild(portfolio);
fragment.appendChild(portfolio2);
fragment.appendChild(testimonials);
fragment.appendChild(contacts);
fragment.appendChild(map);
fragment.appendChild(footer);

document.body.appendChild(fragment);
