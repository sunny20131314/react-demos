/**
 * Created by sunzhimin on 16/5/26.
 */

//  组件名必须大写, 而且必须有render方法,用于输出组件-组件类的实例-模板插入组件类时实例化,return方法只能有一个顶级标签
var HelloWorld = React.createClass({displayName: "HelloWorld",

//    PropTypes 告诉 React，这个 title 属性是必须的，而且它的值必须是字符串。
//    children: React.PropTypes.element.isRequired, 组件中的子节点中当只有一个子节点时才可以通过检测
//    组件包含的两个核心概念: props, state
//    props: 组件的配置属性，在组件内部是不变的，只是在调用这个组件的时候传入不同的属性（比如这里的 name）来定制显示这个组件。
  propTypes: {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
  },

  // getDefaultProps 方法可以用来设置组件属性的默认值。
  // title属性不存在时, getDefaultProps 会起效.
  //           存在时,但没有赋值, title是对应的一个boolean -- true
  //           存在时且赋值, title是对应的是该值
  getDefaultProps : function () {
    return {
      title : 'Hello World',
      children: React.createElement("span", {key: "child2"}, "default 子节点")
    };
  },
  getInitialState: function(){
    return {
      like: false,
      value: 'haha'
    }
  },
  handleClick: function(){
    console.log( this );
//      console.log( 'js show: ' + this.refs.myTextInputAA.value );
    //  ref 属性: 可以从组件获取真实 DOM 的节点 this.refs.[refName],注意只能在虚拟dom插入到文档之后才可以用这个属性,不然会报错.
    console.log( 'jq show: ' + $(this.refs.myTextInput).val() );

    // 无法使用?
    //React.findDOMNode(this.refs.myTextInput).focus();
    this.refs.myTextInput.focus();
  },
  changeLike: function(){
    console.log( this.state );
    this.setState({like: !this.state.like});
  },
  handleChange: function(event){
    event.preventDefault(); // 会让radio/checkbox失效~~~
    console.log( event.target );
    // 把dom插入到页面中时, input的value是动态的, value属性 是没有的(所以获得的结果是null)
    console.log( event.target.getAttribute('value') );
    // 只有组件还处于挂载状态下，才有setState从而更新视图的意义。
    this.setState({value: event.target.value.substr(0, 140)});
//      event.target.setAttribute('value', event.target.value);
//      this.setState({value: event.target.getAttribute('value')});
  },
  render: function(){
    console.log( this );
//      console.log( this.props.children );
//      console.log( this.props.title );
    return (
      React.createElement("div", {className: "component", htmlFor: "component"}, 
        "'这是组件HelloWorld'", 
        React.createElement("br", null), 
        this.props.name, " ", this.props.children, 
        React.createElement("br", null), 
        React.createElement("ol", null, 
          
            // {this.props.children} 表示组件的所有子节点,其余props对象的属性与组件的属性一一对应
            // <li>{name.props.children}</li> 获得的是当前这个变量的children
            //写下遍历children, 用react自带的方法~~~
            React.Children.map( this.props.children, function(name){
              //          return <li>{name.props.children}</li>
              return React.createElement("li", null, name)
            })
          
        ), 
        
          // {...this.props}可以复制组件中的属性,直接传递给组件的html元素.偷懒的好方法~~~ 收了,注意:只有属性可以用
          // <a {...this.props}> √ {this.props.children}</a>
        
        React.createElement("a", React.__spread({},  this.props), " √ ", this.props.children, " "), 

        React.createElement("span", {onClick: this.changeLike}, " like: ", this.state.like ? 'like' : 'haven\'t liked', " "), 

        React.createElement("input", {type: "text", ref: "myTextInput", value: this.state.value, onChange: this.handleChange}), 

        React.createElement("input", {type: "button", value: "Focus the text input", onClick: this.handleClick})
      )
    );
  }
});

var data = '123';

ReactDOM.render(
  React.createElement(HelloWorld, {name: "sunny", old: "12", year: "2016", title: data, href: "/www/lib/react-demos/my_react/demo-label.html"}, 
    React.createElement("span", {key: "child1"}, "span 子节点")
  ),
  document.getElementsByClassName('component1')[0],
  function(){
    console.warn( this.refs );
  }
);