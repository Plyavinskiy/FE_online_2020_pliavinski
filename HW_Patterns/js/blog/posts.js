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
    if (this.posts.size === 0) {
      const message = document.createElement('h3');
      message.setAttribute('class','blog__more-wrap');
      message.innerText = 'There are no articles here, you can add new by clicking the button above "Add new post"';
      fragment.appendChild(message);
    }
    this.parentNode.appendChild(fragment);
  }
  DeleteAllPosts() {
    fetch('http://localhost:3000/api/list/', {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        window.blog.posts = new Map();
        $('article.post').remove();
        $(window).Modal('open', {
          id: 'blogModalMain',
          title: 'Success',
          text: 'Posts was removed!',
          type: 'success',
          disableCancel: true,
        });
      });
  }

  ConfirmDelete() {
    $(window).Modal('open', {
      id: 'blogModalMain',
      title: 'Delete All Post',
      text: 'Are you sure you want to delete ALL posts?',
      type: 'info',
      callback: window.blog.DeleteAllPosts,
    });
  }
  DeletePostById(id) {
    fetch(`http://localhost:3000/api/list/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        res.json();
      })
      .then(() => {
        window.blog.posts.delete(Number(id));
        $(`article[data-id="${id}"]`).remove();
        $(window).Modal('open', {
          id: 'blogModalMain',
          title: 'Success',
          text: 'Post was removed!',
          type: 'success',
          disableCancel: true,
        });
      });
  }

  EditPost(id) {
    $('#form').trigger('reset');
    const post = this.posts.get(id);
    $('#_id').val(id);
    $('#form [name=type]').val(post.type);
    $('#form [name=header]').val(post.header);
    $('#form [name=user]').val(post.user);
    $('#form [name=date]').val(post.date);
    $('#form [name=time]').val(parseInt(post.time));
    $('#form [name=rating]').val(post.rating);
    $('#form [name=description]').val(post.description);
    $('#form [name=quote]').val(post.quote);
    const modalForm = document.getElementById('modalForm');
    modalForm.style.display = 'block';
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
    switch (item.type) {
      case 'text':
        post = new TextPost(item);
        break;
      case 'video':
        post = new VideoPost(item);
        break;
      case 'melody':
        post = new AudioPost(item);
        break;
      case 'picture':
        post = new PicturePost(item);
        break;
      default:
        post = new TextPost(item);
        break;
    }
    return post;
  }

  loadCashe(data) {
    const posts = JSON.parse(localStorage.getItem('cashedPosts'));
    if (posts && posts.length) {
      data.forEach((item) => {
        console.log(item);
        posts.forEach((id) => {
          const post = this.checkType(item);
          if (post.id === id) {
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
window.blog = new Posts(parentNode, 'valid');

window.blog.getAllPost((data) => {
  if (window.blog.loadCashe(data)) {
    window.blog.renderPosts();
  } else {
    window.blog.addPosts(data);
    window.blog.renderPosts();
  }
});

const buttonSearchByAuthor = document.getElementById('searchAuthorButton');
buttonSearchByAuthor.addEventListener('click', () => {
  window.blog.searchPostByAuthor(document.getElementById('searchAuthorInput').value);
});

const buttonSearchByTitle = document.getElementById('searchTitleButton');
buttonSearchByTitle.addEventListener('click', () => {
  window.blog.searchPostByTitle(document.getElementById('searchTitleInput').value);
});
