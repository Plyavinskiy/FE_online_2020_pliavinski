class Slider {
  constructor(selectors) {
    this.wrapper = document.querySelector(selectors.wrapperSelector);
    this.sliderItems = document.querySelectorAll(selectors.itemsSelector);
    this.previousButton = document.querySelector(selectors.leftArrowSelector);
    this.nextButton = document.querySelector(selectors.rightArrowSelector);
    this.wrapperWidth = parseFloat(getComputedStyle(this.wrapper).width);
    this.itemWidth = parseFloat(getComputedStyle(this.sliderItems[0]).width);
    this.positionLeftItem = 0;
    this.transform = 0;
    this.step = this.itemWidth / this.wrapperWidth * 100;
    this.items = [];
    this.isPaused = false;
    this.interval = 3000;
    this.swipeCoords = 0;
  }

  getItemMin() {
    let indexItem = 0;
    this.items.forEach((item, index) => {
      if (item.position < this.items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  }

  getItemMax() {
    let indexItem = 0;
    this.items.forEach((item, index) => {
      if (item.position > this.items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  }

  getMin() {
    return this.items[this.getItemMin()].position;
  }

  getMax() {
    return this.items[this.getItemMax()].position;
  }

  next() {
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
  }

  previous() {
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
  }

  init() {
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
      this.next(self);
    });
    this.previousButton.addEventListener('click', () => {
      this.previous(self);
    });
  }

  start() {
    const self = this;
    (function loopStart() {
      if (!self.isPaused) {
        self.next();
      }
      setTimeout(loopStart, self.interval);
    })();
  }
}

const selectors = {
  wrapperSelector: '#portfolio > div > div.row',
  itemsSelector: '#portfolio .portfolio__column',
  leftArrowSelector: '#portfolio .portfolio__arrows .arrow--left',
  rightArrowSelector: '#portfolio .portfolio__arrows .arrow--right',
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const slider = new Slider(selectors);
    slider.init();
    slider.start();
  }, 500);
});
