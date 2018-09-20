import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * 使用context进行组件间的传递
 * 在最外层的父组件上定义childContextTypes
 * 在使用context的子（/孙子...）组件上定义contextTypes
 * 这样可以通过context来获取属性，不用通过props一层一层的往下传了
 */

class Index extends Component{

   static childContextTypes = {
      themeColor: PropTypes.string
   }

   constructor(){
      super();
      this.state = {
         themeColor: 'red'
      }
   }

   getChildContext(){
      return {
         themeColor: this.state.themeColor
      }
   }

   changeColor = () => {
      let arr = ['red', 'blue', 'skyblue', 'yellow', 'pink', 'purple'];
      let random = Math.floor(Math.random() * 6);
      this.setState({
         themeColor: arr[random]
      })
   }

   render(){
      return(
         <div>
            <Header />
            <Main />
            <button onClick={this.changeColor}>点我改变颜色</button>
         </div>
      )
   }
}
//子组件
class Header extends Component{
   render(){
      return(
         <div>
            <h2>This is header</h2>
            <Title />
         </div>
      )
   }
}

class Main extends Component{
   render(){
      return(
         <div>
            <h2>This is content</h2>
            <Content />
         </div>
      )
   }
}
//孙子组件
class Title extends Component{

   static contextTypes = {
      themeColor: PropTypes.string
   }

   render(){
      return(
         <h1 style={{color: this.context.themeColor}}>React.js小书标题</h1>
      )
   }
}

class Content extends Component{
   render(){
      return(
         <h2>React.js小书内容</h2>
      )
   }
}

ReactDOM.render(<Index />, document.getElementById('higher-component'));