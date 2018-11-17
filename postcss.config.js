const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    plugins: [
        postcssPresetEnv({
            browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
        }),
        require('cssnano')
    ]
};

//Here we are specifying what browsers we want autoprefixer to support
//and minifying the CSS output