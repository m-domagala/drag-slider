## General

Responsive picture slider created as my first portfolio project

## Technologies

JavaScript, CSS, SASS, SCSS, HTML, NPM, Webpack, Babel, Git

## Methods

RWD, Mobile First, BEM

## Example

https://m-domagala.github.io/drag-slider/

## License

ISC

## NPM commands

- npm i - install dependencies
- npm start - run webpack dev server in 'production' mode on default 'localhost:8080' server (change mode to 'development' in 'webpack.config.js' file if necessary)
- npm run build - create production build directory (docs)

## How to use with other pictures

#### Supported file formats:

- jpg, png, svg, gif

#### Each picture must be in three sizes (one file for each size):

- 'p' for portrait
- 's' for small landscape
- 'l' for large landscape

#### Number of pictures and file names

- minimum number of pictures is 3
- 3 pictures means 9 files named as: p1, s1, l1, p2, s2, l2, p3, s3, l3
- 9 pictures means 27 files named as: p1, s1, l1, ..., p9, s9, l9

#### Replace pictures in 'src/images' directory and name them as in the example above

#### If the number of pictures is different than default 5, change 'numberOfImages' variable in 'src/js/slider.js' file
