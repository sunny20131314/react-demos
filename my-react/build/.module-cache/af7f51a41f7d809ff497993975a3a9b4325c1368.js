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
  * 挂载:
  * getInitialState() : 在组件被挂载之前调用,返回初始的state数据。
  * componentWillMount()
  * componentDidMount()
   componentWillUpdate(object nextProps, object nextState)
   componentDidUpdate(object prevProps, object prevState)
   componentWillUnmount()
  *
  * componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
  * shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
  * */

var Lifecycle = React.createClass({displayName: "Lifecycle",
  getInitialState: function(){
    return {
      opacity: 1
    }
  },

  statics: {
  //静态对象允许您定义可以在组件类上调用静态方法
    customMethod: function(foo) {
      console.log(this);
      return foo === 'bar';
    }
  },

  componentWillReceiveProps: function(nextProps) {
  // 当一个组件接收新的props时调用。不会触发componentWillReceiveProps。
  // 当一个container多次插入不同的dom时--(其余情况不详), 尽管props可能没有改变,组件也会机会检验新的props和采取相应的行动。
  // 由于引用是三重相等的，如果该值已更改，则不告诉我们。唯一可行的办法是创建数据的深拷贝，然后再做一个深入的比较——但这可以是昂贵的大数据结构（特别是有周期）。
  // 即使componentWillReceiveProps被调用,也不能说明props改变了!
  // 即props改变导致触发componentWillReceiveProps,但是反过来却不是!
    console.log( 'componentWillReceiveProps' );

//      this.setState({
//        name: 'hello'
//      });
    console.log( this.state.name );
  },

  shouldComponentUpdate: function(nextProps, nextState) {
  // 假如shouldComponentUpdate 返回false,那么将完全跳过到下一个状态的变化。
  // 此外，componentwillupdate和componentdidupdate不会执行。
  // 默认返回true
  // 如果性能是一个瓶颈，特别是数十个或数百个组件，使用shouldcomponentupdate加快应用程序。
  // 当state改变时,会触发该函数.
    console.log( 'shouldComponentUpdate' );
    return nextProps.name === this.props.name;
  },

  componentWillUnmount: function(){
  // 立即调用前一个组件卸载从DOM。
  // 在该方法中执行任何必要的清理，如无效计时器或清理在componentDidMount中创建的任何DOM元素。

    console.log( 'componentWillUnmount' );
  },

  componentWillUpdate: function(){
  // 在这里不可以使用 this.setState() 方法,如果要使用相应props/state变化的话, 在componentWillReceiveProps中使用
    console.log( 'componentWillUpdate' );   //3
  },

  componentDidUpdate: function(){
    console.log( 'componentDidUpdate' );   //5
  },

  componentWillMount: function(){
    console.log( 'componentWillMount' );  //0
    this.setState({
      opacity: 1
    });
  },

  componentDidMount: function () {
    console.log( 'componentDidMount' ); // 2
  // Mounting：已插入真实 DOM
  // 不用原来的 setInterval,且自己写了个循环~~ 逐渐递增到1,再组件递减到0,循环往复
    var self = this;

    function increase() {
      var opacity = self.state.opacity;
      opacity += .05;
      self.setState({
        opacity: opacity
      });
      // <1 就 ++ , > 1 就--
      if (opacity <= 1) {
        setTimeout(increase, 100);
      } else if (opacity > 1) {
        setTimeout(decrease, 100);
      }
    }

    function decrease() {
      var opacity = self.state.opacity;
      opacity -= .05;
      self.setState({
        opacity: opacity
      });
      // 只要 > 0 就--. < 0 就 ++
      if (opacity > 0) {
        setTimeout(decrease, 100);
      } else if (opacity <= 0) {
        setTimeout(increase, 100);
      }
    }

    !function () {
      var opacity = self.state.opacity;
      if (opacity >= 1) {
        decrease();
      }
      if (opacity <= 0) {
        increase();
      }
    }();
  },

  handleChange: function(event){
    this.setState({
      value: event.target.value
    })
  },

  render: function() {
    console.log( this.state.opacity ); // 1, 4
    return (
      React.createElement("div", {style: {opacity: this.state.opacity}}, 
        "Hello! opacity: ", this.state.opacity, " ", this.props.name, 
       React.createElement("input", {type: "text", ref: "myTextInput", value: this.state.value, onChange: this.handleChange})
      )
    )
  }

});

console.log(Lifecycle.customMethod('bar') + '  end');

var myData = {bar: 'drinks'};

ReactDOM.render(
  React.createElement(Lifecycle, {data: myData}),
  document.getElementById('component')
);

