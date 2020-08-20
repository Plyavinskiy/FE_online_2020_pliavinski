/* eslint-disable no-unused-vars */
function getHeader(data) {
  const menuHtml = document.createElement('ul');
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
    if (item.active) {
      li.classList.add(`${item.active}`);
    }
    li.appendChild(a);
    menuHtml.appendChild(li);
  });
  const headerWrapper = document.createElement('section');
  headerWrapper.classList.add('hero');
  headerWrapper.setAttribute('id', 'home');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('container');

  const header = document.createElement('header');
  header.classList.add('header');
  header.setAttribute('id', 'top');
  header.innerHTML = `
        <div class="row">
          <div class="header__logo-wrap">
            <a class="header__logo" href="./index.html">
              ${data.header[0].logo}
            </a>
          </div>
          <div class="header__menu-wrap">
          <ul class="menu">
          ${menuHtml.innerHTML}
          </ul>
          </div>
        </div>`;
  headerContainer.appendChild(header);
  headerWrapper.appendChild(headerContainer);
  return headerWrapper;
}

function getFooter(footerJson) {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
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
              <strong class="footer__brand">${footerJson.brand}</strong>
          </div>
          <div class="footer__column">
              <div class="footer__copyright">${footerJson.copyright}</div>
          </div>
        </div>
      </div>
      <a class="footer__go-top btn-inverse" href="#top">Scroll to top</a>`;
  return footer;
}

function sidebarPosts(data) {
  const latestPosts = document.createElement('div');
  latestPosts.classList.add('latest-posts');

  const title = document.createElement('h2');
  title.setAttribute('class', 'latest-posts__title');
  title.textContent = data.titles.latest_title;
  latestPosts.appendChild(title);

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
  const latestMore = document.createElement('div');
  latestMore.classList.add('latest-posts__more');
  latestMore.innerHTML = `<a class="latest-posts__more-btn btn-inverse" href="#">${data.titles.latest_btn}</a>`;
  return latestPosts;
}

function getCategories(data) {
  const categories = document.createElement('div');
  categories.classList.add('categories');

  const title = document.createElement('h2');
  title.setAttribute('class', 'latest-categories__title');
  title.textContent = data.titles.categories_title;
  categories.appendChild(title);

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
  return categories;
}

function getTags(data) {
  const tags = document.createElement('div');
  tags.classList.add('tags');

  const title = document.createElement('h2');
  title.classList.add('tags__title');
  title.textContent = data.titles.title_tags;
  tags.appendChild(title);

  data.tags.forEach((item) => {
    const a = document.createElement('a');
    a.textContent = `${item.title}`;
    a.classList.add('tags__item', 'btn-inverse');
    a.setAttribute('href', `${item.link}`);
    tags.appendChild(a);
  });
  return tags;
}

function getArticleSidebar(data) {
  const sidebar = document.createElement('div');
  sidebar.classList.add('article__sidebar');
  sidebar.appendChild(sidebarPosts(data));
  sidebar.appendChild(getCategories(data));
  sidebar.appendChild(getTags(data));
  return sidebar;
}