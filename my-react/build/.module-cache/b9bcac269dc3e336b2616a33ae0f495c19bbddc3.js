/**
 * Created by sunzhimin on 16/5/26.
 */

  /*
  * Mounting：已插入真实 DOM
   Updating：正在被重新渲染
   Unmounting：已移出真实 DOM*/
  /*
  * React 为每个状态都提供了两种处理函数，
  * will 函数在进入状态之前调用，
  * did 函数在进入状态之后调用，三种状态共计五种处理函数(componentWillUnmount)。
  *
  *
  * componentWillMount()
   componentDidMount()
   componentWillUpdate(object nextProps, object nextState)
   componentDidUpdate(object prevProps, object prevState)
   componentWillUnmount()
  *
  * componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
  * shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
  * */

var Lifecycle = React.createClass({displayName: "Lifecycle",

  render: function() {
    return (
      React.createElement("div", null, 
        "hello!!"
      )
    )
  }

});

var myData = {bar: 'drinks'};

ReactDOM.render(
  React.createElement(Lifecycle, {data: myData}),
  document.getElementById('component')
);


