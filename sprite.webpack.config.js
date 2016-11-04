var webpack = require('webpack');
var path = require('path');
var SpritesmithPlugin = require('webpack-spritesmith');
var templateFunction = function (data) {
    var shared = '.ui-ico { background-image: url(I) }'
        .replace('I', data.sprites[0].image);

    var perSprite = data.sprites.map(function (sprite) {
        return '.ui-ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
            .replace('N', sprite.name)
            .replace('W', sprite.width)
            .replace('H', sprite.height)
            .replace('X', sprite.offset_x)
            .replace('Y', sprite.offset_y);
    }).join('\n');

    return shared + '\n' + perSprite;
}

module.exports = [{
    name: "sprite",
    plugins: [
        //合并图片
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/images/icon'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/sprites/sprite.png'),
                css: [
                    [path.resolve(__dirname, 'src/sprites/sprite.css'), {
                        format: 'function_based_template'
                    }]
                ]

            },
            apiOptions: {
                cssImageRef: "sprite.png"
            },
            spritesmithOptions: {
                padding: 20
            },
            //自定义模板
            customTemplates: {
                'function_based_template': templateFunction
            },
        })
    ]
}]