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
  });

const container = document.createElement('div');
container.classList.add('container');

const section = document.createElement('section');
section.classList.add('blog');
section.setAttribute('id', 'home');

const title = document.createElement('div');
title.classList.add('blog__title');

const searchAuthor = document.createElement('div');
searchAuthor.classList.add('search');
searchAuthor.innerHTML = `
  <input id="searchAuthorInput" class="search__input" type="text" placeholder="Search by author" />
  <button id="searchAuthorButton" class="search__btn" type="submit"></button>
`;
const searchPost = document.createElement('div');
searchPost.classList.add('search');
searchPost.innerHTML = `
  <input id="searchTitleInput" class="search__input" type="text" placeholder="Search by Post Title" />
  <button id="searchTitleButton" class="search__btn" type="submit"></button>
`;

const headerWrapper = document.createElement('section');
headerWrapper.classList.add('hero');

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
container.appendChild(searchAuthor);
container.appendChild(searchPost);

menuWrapper.appendChild(headerMenu);
headerRow.appendChild(headerLogo);
headerRow.appendChild(menuWrapper);
header.appendChild(headerRow);
headerContainer.appendChild(header);
headerWrapper.appendChild(headerContainer);

section.appendChild(container);
section.appendChild(readMore);

fragment.appendChild(headerWrapper);
fragment.appendChild(section);
fragment.appendChild(footer);

document.body.appendChild(fragment);
