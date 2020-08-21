/* eslint-disable no-unused-vars */
class Post {
  constructor(post) {
    this.id = post._id;
    this.user = post.user;
    this.time = post.time;
    this.date = post.date;
    this.avatar = post.avatar;
    this.comments = post.comments;
    this.header = post.header;
    this.description = post.description;
    this.rating = post.rating;
    this.type = post.type;
    this.quote = post.quote;
  }
  getRating() {
    let rating = '<span class="rating">';
    for (let index = 1; index <= 5; index++) {
      if (this.rating >= index) {
        rating += '<span class="rating__star rating__star--full"></span>';
      } else if (this.rating + 0.5 >= index) {
        rating += '<span class="rating__star rating__star--half"></span>';
      } else {
        rating += '<span class="rating__star"></span>';
      }
    }
    rating += '</span>';
    return rating;
  }
  getPostDetails() {
    const details = `
          <div class="post__details">
              <a class="post__user" href="#">
              <img class="post__user-image" src="${this.avatar || './img/blog/user.png'}" alt="User photo">
              </a>
              <a class="post__user-name" href="/post.html?id=${this.id}">${this.user}</a>
              ${this.getPostInfo()}
          </div>`;
    return details;
  }

  getPostInfo() {
    const postInfo = `
            <div class="post-info">
                    <span class="post-info__date">${this.date}</span>
                    <span class="post-info__divider"></span>
                    <span class="post-info__read-time">${this.time}</span>
                    <span class="post-info__divider"></span>
                    <span class="post-info__comments">${this.comments}</span>
                    ${this.getRating()}
                  </div>`;
    return postInfo;
  }
  getPostHeader() {
    const header = `<h2 class="post__header">${this.header}</h2>`;
    return header;
  }
  getPostText() {
    const text = `<div class="post__text">${this.description.substr(0, 128)} …</div>`;
    return text;
  }

  getButtons() {
    let buttons = `<a class="post__button btn-inverse" href="./post.html?id=${this.id}">Read more</a>`;
    buttons += `<button class="post__button btn-inverse" onclick="
    $(window).Modal('open', {
      id: 'blogModalMain',
      title:'Delete post',
      text:'Are you sure you want to delete this post?',
      type:'info', 
      callback: window.blog.DeletePostById, 
      data: '${this.id}'
    })
    ">Delete Post</button>`;

    buttons += `<button class="post__button btn-inverse" onclick="
    window.blog.EditPost('${this.id}')
    ">Edit Post</button>`;
    return buttons;
  }
  getDescriptionContainer() {
    const description = `
                 <div class="post__description-container">
                  <div class="post__content">
                    ${this.getPostDetails()}
                    ${this.getPostHeader()}
                    ${this.getPostText()}
                    ${this.getButtons()}
                  </div>
                </div>`;
    return description;
  }
  getHtml() {
    const post = document.createElement('article');
    post.setAttribute('class', 'post');
    post.dataset.id = this.id;
    post.innerHTML = '<div class="row"></div>';
    return post;
  }
}

class VideoPost extends Post {
  constructor(post) {
    super(post);
    this.preview = post.preview;
  }
  getVideoContainer() {
    const video = `<div class="post__video-container">
          <a class="post__preview" href="./post.html?id=${this.id}">
            <video class="post__video" poster="${this.preview}">
              <!-- TODO add source -->
              <source src="${this.videoSourceMp4 || 'mov_bbb.mp4'}" type="video/mp4">
              <source src="${this.videoSourceOgg || 'mov_bbb.ogg'}" type="video/ogg">
              Your browser does not support HTML5 video.
            </video>
            <div class="post__preview-play-button"></div>
          </a>
        </div>`;
    return video;
  }
  getHtml() {
    const post = super.getHtml();
    post.className += ' post--video';
    post.querySelector('.row').insertAdjacentHTML('beforeend', this.getVideoContainer() + this.getDescriptionContainer());
    return post;
  }
}

class AudioPost extends Post {
  constructor(post) {
    super(post);
    this.preview = post.preview;
  }
  getAudioContainer() {
    const audio = `
          <div class="post__audio-container">
              <a class="post__preview" href="./post.html?id=${this.id}">
                <img class="post__preview-image" src="${this.preview}" alt="Post preview"/>
                <div class="post__preview-play-button"></div>
              </a>
          </div>`;
    return audio;
  }
  getPostText() {
    const text = `
          <div class="post__text">
              <audio class="post__audio" controls="controls">
              <!-- TODO add source -->
                  <source src="${this.videoSourceOgg || 'horse.ogg'}" type="audio/ogg"/>
                  <source src="${this.videoSourceMp3 || 'horse.mp3'}" type="audio/mpeg"/>
                  Your browser does not support the audio element.
              </audio>
              <br>
              ${this.description.substr(0, 128)} …
          </div>`;
    return text;
  }
  getDescriptionContainer() {
    const description = `<div class="post__description-container">
              <div class="post__content">
                <div class="post__details">
                  <a class="post__user" href="#">
                    <img class="post__user-image" src="${this.avatar || './img/blog/user.png'}" alt="User photo">
                  </a>
                  <a class="post__user-name" href="/post.html?id=${this.id}">${this.user}</a>
                  ${this.getPostInfo()}
                </div>
                ${this.getPostHeader()}
                ${this.getPostText()}
                ${this.getButtons()}
              </div>
            </div>`;
    return description;
  }
  getHtml() {
    const post = super.getHtml();
    post.className += ' post--melody';
    post.querySelector('.row').insertAdjacentHTML('beforeend', this.getAudioContainer() + this.getDescriptionContainer());
    return post;
  }
}

class PicturePost extends Post {
  constructor(post) {
    super(post);
    this.preview = post.preview;
  }
  getPictureContainer() {
    const picture = `
              <div class="post__picture-container">
                  <a class="post__preview" href="./post.html?id=${this.id}">
                    <img class="post__preview-image" src="${this.preview}" alt="Post preview"/>
                    <div class="post__preview-play-button"></div>
                  </a>
              </div>`;
    return picture;
  }
  getHtml() {
    const post = super.getHtml();
    post.className += ' post--picture';
    post.querySelector('.row').insertAdjacentHTML('beforeend', this.getPictureContainer() + this.getDescriptionContainer());
    return post;
  }
}

class TextPost extends Post {
  getHtml() {
    const post = super.getHtml();
    post.className += ' post--text';
    const content = post.querySelector('.row');
    content.className = 'post__content';
    content.insertAdjacentHTML('beforeend', this.getPostDetails() + this.getPostHeader() + this.getPostText() + this.getButtons());
    return post;
  }
}
