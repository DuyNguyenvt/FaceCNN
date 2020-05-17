/* eslint-disable import/no-webpack-loader-syntax */
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!themes/scss/_variable.scss');

export default theme;
