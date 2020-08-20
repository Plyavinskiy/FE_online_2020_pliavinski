function Slider(selector) {
  this.selector = selector;

  this.getItemMin = () => {
    let indexItem = 0;
    this.items.forEach((item, index) => {
      if (item.position < this.items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  };

  this.getItemMax = () => {
    let indexItem = 0;
    this.items.forEach((item, index) => {
      if (item.position > this.items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  };

  this.getMin = () => {
    return this.items[this.getItemMin()].position;
  };

  this.getMax = () => {
    return this.items[this.getItemMax()].position;
  };

  this.next = () => {
    let nextItem;
    this.positionLeftItem++;
    if ((this.positionLeftItem + this.wrapperWidth / this.itemWidth - 1) > this.getMax()) {
      nextItem = this.getItemMin();
      this.items[nextItem].position = this.getMax() + 1;
      this.items[nextItem].transform += this.items.length * 100;
      this.items[nextItem].item.style.transform = `translateX(${this.items[nextItem].transform}%)`;
    }
    this.transform -= this.step;
    this.wrapper.style.transform = `translateX(${this.transform}%)`;
  };

  this.previous = () => {
    let nextItem;
    this.positionLeftItem--;
    if (this.positionLeftItem < this.getMin()) {
      nextItem = this.getItemMax();
      this.items[nextItem].position = this.getMin() - 1;
      this.items[nextItem].transform -= this.items.length * 100;
      this.items[nextItem].item.style.transform = `translateX(${this.items[nextItem].transform}%)`;
    }
    this.transform += this.step;
    this.wrapper.style.transform = `translateX(${this.transform}%)`;
  };

  this.postConstructor = () => {
    this.wrapper = document.querySelector(`${this.selector} > div > div.row`);
    this.sliderItems = document.querySelectorAll(`${this.selector} .portfolio__column`);
    this.previousButton = document.querySelector(`${this.selector} .portfolio__arrows .arrow--left`);
    this.nextButton = document.querySelector(`${this.selector} .portfolio__arrows .arrow--right`);
    this.wrapperWidth = parseFloat(getComputedStyle(this.wrapper).width);
    this.itemWidth = parseFloat(getComputedStyle(this.sliderItems[0]).width);
    this.positionLeftItem = 0;
    this.transform = 0;
    this.step = this.itemWidth / this.wrapperWidth * 100;
    this.items = [];
    this.isPaused = false;
    this.interval = 3000;
    this.swipeCoords = 0;
  };

  this.init = () => {
    this.postConstructor();
    const self = this;
    document.querySelectorAll('.portfolio__image').forEach((element) => {
      element.setAttribute('draggable', false);
    });
    this.wrapper.classList.add('slider__wrapper');
    this.sliderItems.forEach((item, index) => {
      self.items.push({
        item,
        position: index,
        transform: 0,
      });
      item.addEventListener('mouseleave', () => {
        self.isPaused = false;
      });
      item.addEventListener('mouseenter', () => {
        self.isPaused = true;
      });

      item.addEventListener('mousedown', (event) => {
        self.swipeCoords = event.clientX;
      });

      item.addEventListener('mouseup', () => {
        if (event.clientX > self.swipeCoords) {
          self.previous();
        } else if (event.clientX < self.swipeCoords) {
          self.next();
        }
      });
    });
    this.previousButton.addEventListener('mouseleave', () => {
      self.isPaused = false;
    });
    this.previousButton.addEventListener('mouseenter', () => {
      self.isPaused = true;
    });
    this.nextButton.addEventListener('mouseleave', () => {
      self.isPaused = false;
    });
    this.nextButton.addEventListener('mouseenter', () => {
      self.isPaused = true;
    });

    this.nextButton.addEventListener('click', () => {
      this.next('click');
    });
    this.previousButton.addEventListener('click', () => {
      this.previous('click');
    });
  };

  this.start = () => {
    this.init();
    const self = this;
    (function loopStart() {
      if (!self.isPaused) {
        self.next('auto');
      }
      setTimeout(loopStart, self.interval);
    })();
  };
}

function SliderOne(selector) {
  Slider.call(this, selector);
  const speechSynthesis = window.speechSynthesis;

  const parentNext = this.next;
  this.next = () => {
    parentNext.call(this);
    speechSynthesis.cancel();
    const utterThis = new SpeechSynthesisUtterance('Next slide!');
    speechSynthesis.speak(utterThis);
  };

  const parentPrevious = this.previous;
  this.previous = () => {
    parentPrevious.call(this);
    speechSynthesis.cancel();
    const utterThis = new SpeechSynthesisUtterance('Previous slide!');
    speechSynthesis.speak(utterThis);
  };
}

function SliderTwo(selector) {
  Slider.call(this, selector);

  function changePositionBar() {
    let position = this.positionLeftItem % this.items.length;
    if (position <= -1) {
      position = this.items.length + position;
    }
    const items = document.querySelectorAll('#status__bar .status__bar__control');
    items.forEach((element, index) => {
      element.classList.remove('selected');
      if (index === position) {
        element.classList.add('selected');
      }
    });
  }

  const parentNext = this.next;
  this.next = () => {
    parentNext.call(this);
    changePositionBar.call(this);
  };

  const parentPrevious = this.previous;
  this.previous = () => {
    parentPrevious.call(this);
    changePositionBar.call(this);
  };

  const parentPostConstructor = this.postConstructor;
  this.postConstructor = () => {
    parentPostConstructor.call(this);
    this.statusBar = document.getElementById('status__bar');
  };

  const parentInit = this.init;
  this.init = () => {
    parentInit.call(this);
    const self = this;
    this.statusBar.addEventListener('mouseleave', () => {
      self.isPaused = false;
    });
    this.statusBar.addEventListener('mouseenter', () => {
      self.isPaused = true;
    });
  };

  function changePosition(id) {
    const position = this.positionLeftItem % this.items.length;
    if (id > position) {
      for (let index = 0; index < (id - position); index++) {
        this.next();
      }
    }
    if (id < position) {
      for (let index = 0; index < (position - id); index++) {
        this.previous();
      }
    }
  }

  function createStatusBar() {
    const elementPosition = document.querySelector('#portfolio2 .portfolio__arrow.arrow.arrow--left');
    let liItems = '';
    const items = document.querySelectorAll('#portfolio2 .portfolio__column');
    for (let i = 0; i < items.length; i++) {
      liItems += `<li class="status__bar__control" data-id="${i}"></li>`;
    }
    const html = `<div id="status__bar" class="slider__status" style="display: inline-block;">
                  <ul id="bar__list" class="bar__list" style="list-style: none;">${liItems}</ul>
                </div>`;
    elementPosition.insertAdjacentHTML('afterend', html);
  }

  function onEventStatusBar() {
    const items = document.querySelectorAll('.status__bar__control');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        changePosition.call(this, item.dataset.id);
      });
    });
  }
  const parentStart = this.start;
  this.start = () => {
    createStatusBar();
    parentStart.call(this);
    onEventStatusBar.call(this);
  };
}

const sliderInstanceOne = new SliderOne('#portfolio');
const sliderInstanceTwo = new SliderTwo('#portfolio2');

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    sliderInstanceOne.start();
    sliderInstanceTwo.start();
  }, 500);
});
