//必须引入react
//此处使用css文件，如果使用scss文件，会报异常；因为scss文件还要编译为css文件，然后再引入才可以
//scss文件编译为css文件后，一般都不和scss在一起，这样又不能实现模块化，所以直接使用css
import React, {Component} from 'react';
import style from './index.scss';
//var style = require('./index.scss');
//使用cssMoudles的模式必须在webpack中添加?modules才是使用cssModule的方式

class ScssModules extends Component{
   render(){
      return(
         <div className={style.normal}>
            测试
            <h1 className="title">global title</h1>
            <div className={style.composeClass}>
               composeClass
            </div>
            <div className={style.importOtherClass}>
               importOtherClass
            </div>
         </div>
      )
   }
}

export default ScssModules;