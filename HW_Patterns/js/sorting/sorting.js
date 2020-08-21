/* eslint-disable no-undef */
(($) => {
  class Posts {
    constructor() {
      this.apiLink = 'http://localhost:3000/api/list/';
      this.posts = new Map();
    }

    addPost(post) {
      if (post instanceof Post) {
        this.posts.set(post.id, post);
      } else {
        throw new Error('method addPost received data that does to the class Post!');
      }
    }

    addPosts(posts) {
      posts.forEach((item) => {
        const post = this.checkType(item);
        this.addPost(post);
      });
    }

    getAllPost(callback) {
      return fetch(this.apiLink)
        .then((response) => response.json())
        .then((data) => {
          callback(data);
        });
    }

    searchPostByAuthor(author) {
      const sortingPosts = new Map();
      this.posts.forEach((post) => {
        if (post.user.includes(author)) {
          sortingPosts.set(post.id, post);
        }
      });
      return sortingPosts;
    }

    showText(id) {
      return this.posts[id].description;
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
  }

  class Menu {
    constructor(selector) {
      this.$list = $(`${selector} .list`);
      this.$sublist = $(`${selector} .sublist`);
      this.items = new Set();
      this.callbackAuthor = () => {};
      this.callbackText = () => {};
    }

    createItem(text, data = text) {
      const item = `<li><button data-item="${data}">${text}</button></li>`;
      return item;
    }

    addItem(text) {
      this.items.add(text);
    }

    renderItems() {
      this.$list.empty();
      const fragment = document.createDocumentFragment();
      this.items.forEach((item) => {
        $(fragment).append(this.createItem(item));
      });
      this.$list.append(fragment);
      this.onClickAuthor();
    }

    onClickAuthor() {
      this.$list.find('button').click((event) => {
        this.sendChoice.call(this, event.target.dataset.item);
      });
    }

    onClickPost() {
      this.$sublist.find('button').click((event) => {
        this.sendSubChoice.call(this, event.target.dataset.item);
      });
    }

    showPostText(id) {
      const post = window.sorting.posts.get(id);
      $(window).Modal('open', {
        id: 'post',
        title: post.header,
        text: post.description,
        type: 'info',
        disableCancel: true,
      });
    }

    selectAuthor(text) {
      this.$list.find('button').removeClass('selected');
      this.$list.find(`button[data-item="${text}"]`).addClass('selected');
      this.showPostsNameByAuthor(text);
    }

    selectText(text) {
      this.$sublist.find('button').removeClass('selected');
      this.$sublist.find(`button[data-item="${text}"]`).addClass('selected');
      this.showPostText(text);
    }

    showPostsNameByAuthor(author) {
      const posts = window.sorting.searchPostByAuthor(author);
      const fragment = document.createDocumentFragment();

      posts.forEach((post, key) => {
        $(fragment).append(this.createItem(post.header, key));
      });
      this.$sublist.empty();
      this.$sublist.append(fragment);
      this.onClickPost();
    }

    sendChoice(item) {
      this.callbackAuthor(item);
    }
    sendSubChoice(item) {
      this.callbackText(item);
    }
  }

  class MenuMediator {
    constructor() {
      this.menus = new Set();
    }

    register(menu) {
      menu.callbackAuthor = (text) => {
        this.selectItem(text);
      };
      menu.callbackText = (text) => {
        this.selectSubItem(text);
      };
      this.menus.add(menu);
    }

    selectItem(text) {
      this.menus.forEach((menu) => {
        menu.selectAuthor(text);
      });
    }

    selectSubItem(text) {
      this.menus.forEach((menu) => {
        menu.selectText(text);
      });
    }
  }

  $(window).Modal('create', {
    id: 'post',
    title: '',
    text: '',
    type: 'info',
  });
  window.sorting = new Posts();
  window.sorting.getAllPost((data) => {
    window.sorting.addPosts(data);
  })
    .then(() => {
      const mediator = new MenuMediator();
      const horizontalMenu = new Menu('.authors__horizontal');
      const verticalMenu = new Menu('.authors__verticals');
      window.sorting.posts.forEach((item) => {
        const text = item.user;
        horizontalMenu.addItem(text);
        verticalMenu.addItem(text);
      });
      verticalMenu.renderItems();
      horizontalMenu.renderItems();

      mediator.register(horizontalMenu);
      mediator.register(verticalMenu);
    });
})(jQuery);
