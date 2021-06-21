const divider = document.querySelector('.slider__divider');
const handle = document.querySelector('.slider__handle');
const img1 = document.querySelector('.slider__image--1');
const img2 = document.querySelector('.slider__image--2');
const img3 = document.querySelector('.slider__image--3');
const slider = document.querySelector('.slider');

const numberOfImages = 5;

let appHasStarted = false;
let moveDestination = 'forward';
let dragging = false;
let img1Index = 1;
let img2Index = 2;
let img3Index = 3;
let imgSize;
let mainImgPath = [];
let onTheEdge = false;
let percentage;

const updateImgIndex = () => {
 img3Index++;
 if (moveDestination === 'backward') {
  img1Index += 2;
 } else if (moveDestination === 'forward') {
  img2Index += 2;
 }

 if (img1Index > numberOfImages) {
  if (img1Index === numberOfImages + 1) {
   img1Index = 1;
  } else if (img1Index === numberOfImages + 2) {
   img1Index = 2;
  }
 }
 if (img2Index > numberOfImages) {
  if (img2Index === numberOfImages + 1) {
   img2Index = 1;
  } else if (img2Index === numberOfImages + 2) {
   img2Index = 2;
  }
 }
 if (img3Index > numberOfImages) {
  img3Index = 1;
 }
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

const swapImgUrl = () => {
 mainImgPath.splice(-7, 1, img1Index.toString());
 img1.style.backgroundImage = mainImgPath.join('');
 mainImgPath.splice(-7, 1, img2Index.toString());
 img2.style.backgroundImage = mainImgPath.join('');
 mainImgPath.splice(-7, 1, img3Index.toString());
 img3.style.backgroundImage = mainImgPath.join('');
};

const swapPicture = () => {
 const url = [...window.getComputedStyle(img1).backgroundImage];
 setImgSize();

 if (imgSize === 'portrait') {
  url.splice(-8, 1, 'p');
  mainImgPath = url;
 } else if (imgSize === 'small') {
  url.splice(-8, 1, 's');
  mainImgPath = url;
 } else if (imgSize === 'large') {
  url.splice(-8, 1, 'l');
  mainImgPath = url;
 }
 swapImgUrl();
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
  img1.style.transform = `translateY(${percentage}%)`;
 } else if (imgSize === 'small' || imgSize === 'large') {
  const sliderWidth = slider.offsetWidth;
  const sliderOffsetLeft = slider.offsetLeft;
  const fixedOffset = getOffset(clientX, sliderWidth, sliderOffsetLeft);
  percentage = (fixedOffset / sliderWidth) * 100;
  divider.style.left = `${percentage}%`;
  img1.style.transform = `translateX(${percentage}%)`;
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
   img1.style.transform = `translateX(${percentage}%)`;
  }
  if (dividerLeft !== '0px' && imgSize === 'portrait') {
   divider.style.left = '0px';
   divider.style.top = `${percentage}%`;
   img1.style.transform = `translateY(${percentage}%)`;
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
