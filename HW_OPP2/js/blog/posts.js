/* eslint-disable no-undef */
class Posts {
  constructor(parentNode, popupId, posts = []) {
    this.apiLink = 'http://localhost:3000/api/list/';
    this.parentNode = parentNode;
    this.posts = new Map();
    this.popup = document.getElementById(popupId);
    if (Array.isArray(posts)) {
      posts.forEach((post) => {
        this.addPost(post);
      });
    }
  }

  addPost(post) {
    if (post instanceof Post) {
      this.posts.set(post.id, post);
    } else {
      throw new Error('method addPost received data that does to the class Post!');
    }
  }

  renderPosts() {
    const fragment = new DocumentFragment();
    this.posts.forEach((post) => {
      fragment.appendChild(post.getHtml());
    });
    const articles = this.parentNode.querySelectorAll('article');
    const cloneArticles = [];
    articles.forEach((currentValue) => {
      cloneArticles.push(currentValue.cloneNode(true));
    });
    cloneArticles.forEach((currentValue, index) => {
      this.parentNode.removeChild(articles[index]);
    });

    this.parentNode.appendChild(fragment);
  }

  addPosts(posts) {
    posts.forEach((item) => {
      const post = this.checkType(item);
      this.addPost(post);
    });
  }
  getAllPost(callback) {
    fetch(this.apiLink)
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      });
  }
  popupOpen() {
    const modalForm = document.getElementById('modalForm');
    const modalContent = document.getElementsByClassName('modal-content')[0];
    const closeSearch = document.getElementById('closeSearch');
    const validSearch = document.getElementById('validSearch');
    modalContent.style.display = 'none';
    validSearch.style.display = 'block';
    modalForm.style.display = 'block';
    closeSearch.onclick = function () {
      modalForm.style.display = 'none';
      modalContent.style.display = 'block';
      validSearch.style.display = 'none';
    };
  }
  searchPostByAuthor(author) {
    this.getAllPost((data) => {
      this.addPosts(data);
      const sortingPosts = new Map();
      this.posts.forEach((post) => {
        if (post.user.toLowerCase().includes(author.toLowerCase())) {
          sortingPosts.set(post.id, post);
        }
      });
      if (sortingPosts.size === 0) {
        this.popupOpen();
      } else {
        this.posts = sortingPosts;
        this.renderPosts();
        this.saveCashe();
      }
    });
  }
  searchPostByTitle(title) {
    this.getAllPost((data) => {
      this.addPosts(data);
      const sortingPosts = new Map();
      this.posts.forEach((post) => {
        if (post.header.toLowerCase().includes(title.toLowerCase())) {
          sortingPosts.set(post.id, post);
        }
      });
      if (sortingPosts.size === 0) {
        this.popupOpen();
      } else {
        this.posts = sortingPosts;
        this.renderPosts();
        this.saveCashe();
      }
    });
  }
  checkType(item) {
    let post = null;
    if (item.video) {
      post = new VideoPost(item);
    } else if (item.melody) {
      post = new AudioPost(item);
    } else if (item.picture) {
      post = new PicturePost(item);
    } else if (item.text) {
      post = new TextPost(item);
    }
    return post;
  }

  loadCashe(data) {
    const posts = JSON.parse(localStorage.getItem('cashedPosts'));
    if (posts && posts.length) {
      data.forEach((item) => {
        posts.forEach((id) => {
          if (item.id === id) {
            const post = this.checkType(item);
            this.posts.set(post.id, post);
          }
        });
      });
      return true;
    }
    return false;
  }
  saveCashe() {
    localStorage.setItem('cashedPosts', JSON.stringify([...this.posts.keys()]));
  }
}

const parentNode = document.querySelector('#home > .container');
const blog = new Posts(parentNode, 'valid');

blog.getAllPost((data) => {
  if (blog.loadCashe(data)) {
    blog.renderPosts();
  } else {
    blog.addPosts(data);
    blog.renderPosts();
  }
});

const buttonSearchByAuthor = document.getElementById('searchAuthorButton');
buttonSearchByAuthor.addEventListener('click', () => {
  blog.searchPostByAuthor(document.getElementById('searchAuthorInput').value);
});

const buttonSearchByTitle = document.getElementById('searchTitleButton');
buttonSearchByTitle.addEventListener('click', () => {
  blog.searchPostByTitle(document.getElementById('searchTitleInput').value);
});
