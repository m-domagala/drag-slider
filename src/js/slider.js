const divider = document.querySelector('.slider__divider');
const handle = document.querySelector('.slider__handle');
const images = [...document.querySelectorAll('.slider__image')];
const slider = document.querySelector('.slider');

let appHasStarted = false;
let dragging = false;
const imgIndex = [1, 2, 3];
let imgSize;
let moveDestination = 'forward';
let onTheEdge = false;
let percentage;

const swapImgUrl = (url) => {
 images.forEach((image, index) => {
  url.splice(-7, 1, imgIndex[index].toString());
  image.style.backgroundImage = url.join('');
 });
};

const setImgSize = () => {
 const vh = window.innerHeight;
 const vw = window.innerWidth;
 if (vh >= vw) {
  imgSize = 'portrait';
 } else if (vw < 1023) {
  imgSize = 'small';
 } else if (vw >= 1023) {
  imgSize = 'large';
 }
};

const swapPicture = () => {
 const url = [...window.getComputedStyle(images[0]).backgroundImage];
 setImgSize();
 if (imgSize === 'portrait') {
  url.splice(-8, 1, 'p');
 } else if (imgSize === 'small') {
  url.splice(-8, 1, 's');
 } else if (imgSize === 'large') {
  url.splice(-8, 1, 'l');
 }
 swapImgUrl(url);
};

const updateImgIndex = () => {
 const numberOfImages = 5;
 imgIndex[2]++;
 if (moveDestination === 'backward') {
  imgIndex[0] += 2;
 } else if (moveDestination === 'forward') {
  imgIndex[1] += 2;
 }
 if (imgIndex[0] > numberOfImages) {
  if (imgIndex[0] === numberOfImages + 1) {
   imgIndex[0] = 1;
  } else if (imgIndex[0] === numberOfImages + 2) {
   imgIndex[0] = 2;
  }
 }
 if (imgIndex[1] > numberOfImages) {
  if (imgIndex[1] === numberOfImages + 1) {
   imgIndex[1] = 1;
  } else if (imgIndex[1] === numberOfImages + 2) {
   imgIndex[1] = 2;
  }
 }
 if (imgIndex[2] > numberOfImages) {
  imgIndex[2] = 1;
 }
};

const setMoveDestination = (percentage) => {
 if (moveDestination === 'forward' && percentage === 100) {
  moveDestination = 'backward';
  onTheEdge = true;
 } else if (moveDestination === 'backward' && percentage === 0) {
  moveDestination = 'forward';
  onTheEdge = true;
 }
};

const getOffset = (client, sliderSize, sliderOffset) => {
 const offset = client - sliderOffset;
 if (offset < 0) {
  return 0;
 } else if (offset > sliderSize) {
  return sliderSize;
 } else {
  return offset;
 }
};

const move = (clientY, clientX) => {
 if (!appHasStarted) {
  appHasStarted = true;
 }
 if (!imgSize) {
  setImgSize();
 }
 if (imgSize === 'portrait') {
  const sliderHeight = slider.offsetHeight;
  const sliderOffsetTop = slider.offsetTop;
  const fixedOffset = getOffset(clientY, sliderHeight, sliderOffsetTop);
  percentage = (fixedOffset / sliderHeight) * 100;
  divider.style.top = `${percentage}%`;
  images[0].style.transform = `translateY(${percentage}%)`;
 } else if (imgSize === 'small' || imgSize === 'large') {
  const sliderWidth = slider.offsetWidth;
  const sliderOffsetLeft = slider.offsetLeft;
  const fixedOffset = getOffset(clientX, sliderWidth, sliderOffsetLeft);
  percentage = (fixedOffset / sliderWidth) * 100;
  divider.style.left = `${percentage}%`;
  images[0].style.transform = `translateX(${percentage}%)`;
 }
 setMoveDestination(percentage);
 if (onTheEdge) {
  onTheEdge = false;
  updateImgIndex();
  swapPicture();
 }
};

const resize = () => {
 if (appHasStarted) {
  swapPicture();
  const dividerTop = window.getComputedStyle(divider).top;
  const dividerLeft = window.getComputedStyle(divider).left;
  if ((dividerTop !== '0px' && imgSize === 'small') || (dividerTop !== '0px' && imgSize === 'large')) {
   divider.style.top = '0px';
   divider.style.left = `${percentage}%`;
   images[0].style.transform = `translateX(${percentage}%)`;
  }
  if (dividerLeft !== '0px' && imgSize === 'portrait') {
   divider.style.left = '0px';
   divider.style.top = `${percentage}%`;
   images[0].style.transform = `translateY(${percentage}%)`;
  }
 }
};

handle.addEventListener('mousedown', () => {
 dragging = true;
});
window.addEventListener('mouseup', () => {
 dragging = false;
});
window.addEventListener('mousemove', (e) => {
 if (dragging) {
  move(e.clientY, e.clientX);
 }
});

handle.addEventListener('touchstart', () => {
 dragging = true;
});
window.addEventListener('touchend', () => {
 dragging = false;
});
window.addEventListener('touchmove', (e) => {
 if (dragging) {
  move(e.touches[0].clientY, e.touches[0].clientX);
 }
});

window.addEventListener('resize', resize);
