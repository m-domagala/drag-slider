const img1 = document.querySelector('.slider__image--1');
const img2 = document.querySelector('.slider__image--2');
const img3 = document.querySelector('.slider__image--3');
const handle = document.querySelector('.slider__handle');

const numberOfImages = 5;
let appHasStarted = false;
let lazyLoading = true;
let mainImgPath = [];
let img1Index = 1;
let img2Index = 2;
let img3Index = 3;

const updateImgIndex = () => {
 img1Index++;
 img2Index++;
 img3Index++;
 if (img1Index > numberOfImages) {
  img1Index = 1;
 }
 if (img2Index > numberOfImages) {
  img2Index = 1;
 }
 if (img3Index > numberOfImages) {
  img3Index = 1;
 }
};

const swapImgUrl = () => {
 mainImgPath.splice(-7, 1, img1Index.toString());
 img1.style.backgroundImage = mainImgPath.join('');
 mainImgPath.splice(-7, 1, img2Index.toString());
 img2.style.backgroundImage = mainImgPath.join('');
 if (!lazyLoading) {
  mainImgPath.splice(-7, 1, img3Index.toString());
  img3.style.backgroundImage = mainImgPath.join('');
 }
};

const swapPicture = () => {
 if (appHasStarted) {
  let imgSize = '';
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const url = [...window.getComputedStyle(img1).backgroundImage];

  if (vh >= vw) {
   imgSize = 'portrait';
  } else if (vw < 1023) {
   imgSize = 'small';
  } else if (vw >= 1023) {
   imgSize = 'large';
  }

  console.log(imgSize);

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
  if (!lazyLoading) {
   lazyLoading = true;
  }
 }
};

const startApp = () => {
 if (!appHasStarted) {
  appHasStarted = true;
 }
 if (lazyLoading) {
  lazyLoading = false;
 }
 updateImgIndex();
 swapPicture();
};

window.addEventListener('resize', swapPicture);
handle.addEventListener('click', startApp);
