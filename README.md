# reactLearn
记录 深入react技术栈  学习点滴

#CSS Modules
1.css编译：{
                test: /\.css$/,
                //CSS-loader's default hash algorithm is [hash:base64]
                //loader: 'style-loader!css-loader?modules'
                loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
            }
2.scss编译：{
                    loader: 'sass-loader',
                    options: {
                       sourceMap: true,
                    }
                }
3.postcss编译：{
                    //使用postcss解析，不用sass解析
                   loader: 'postcss-loader',
                   options: {
                       sourceMap: true,
                       config: {
                          path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                       }
                   }
                }
