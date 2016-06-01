/**
 * Created by sunzhimin on 16/5/26.
 * 组件的使用,
 * 顶层的相关方法: 是React上的方法
 * 组件方法: 在当前组件上调用
 *    移除组件(ReactDOM.unmountComponentAtNode)
 *    children
 *
 */

//  组件名必须大写, 而且必须有render方法,用于输出组件-组件类的实例-模板插入组件类时实例化,return方法只能有一个顶级标签
var HelloWorld = React.createClass({displayName: "HelloWorld",
  mixins: [React.addons.LinkedStateMixin],
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
      value: 'haha',
      message: 'db',
      booleanValue: true
    }
  },
  handleClick: function(){

    // 组件是否渲染完毕
    console.log(this.isMounted());   // true

    // 返回 children 当中的组件总数
    console.log( React.Children.count( this.props.children ));
    console.log(  this.props.children.length ); //数组或者字符串,余返回undefined

    // 返回仅有的一个child,否则报错
    console.log( React.Children.only( this.props.children ));

    // 转换为array
    console.log( React.Children.toArray( this.props.children ));

    // 判断是否是对象: 当只有一个子代的时候，this.props.children 将会变成一个单独的组件，而不是数组形式。
    // 这样就减少了数组的占用。
    console.log(Array.isArray(this.props.children)); // => false  如果是多个的元素: 数组

    console.log( this );
//      console.log( 'js show: ' + this.refs.myTextInputAA.value );
    //  ref 属性: 可以从组件获取真实 DOM 的节点 this.refs.[refName],注意只能在虚拟dom插入到文档之后才可以用这个属性,不然会报错.
    console.log( 'jq show: ' + this.refs.myTextInput.value );


    // 获取到dom的其他方法? 哪种情况适用?
    console.log( this.refs.myTextInput );
    console.log( this.refs.myTextInput );

    // 无法使用? 而且也每必要使用, 可能返回的数据已改,直接返回相应的dom元素
    //React.findDOMNode(this.refs.myTextInput).focus();
    //console.log(this.refs.myTextInput.getDOMNode());
    this.refs.myTextInput.focus();
  },
  changeLike: function(){
    console.log( this.state );
    this.setState({like: !this.state.like});
  },
  handleChange: function(event) {
    event.preventDefault(); // 会让radio/checkbox失效~~~
    console.log(event.target);
    // 把dom插入到页面中时, input的value是动态的, value属性 是没有的(所以获得的结果是null)
    console.log(event.target.value);
    // 只有组件还处于挂载状态下，才有setState从而更新视图的意义。
    this.setState({value: event.target.value});
//      event.target.setAttribute('value', event.target.value);
//      this.setState({value: event.target.getAttribute('value')});replaceState


    // 类似于 setState()，但是删除之前所有已存在的 state 键，这些键都不在 nextState 中。
    console.log( this.state );    // Object {like: false, value: "haha", message: "db", booleanValue: true}
    this.replaceState({value: event.target.value}, function(){
      console.log( this.state );  //Object {value: "haha"}
    });

  },
  render: function(){
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
        React.createElement("br", null), 

        React.createElement("span", {onClick: this.changeLike}, " like: ", this.state.like ? 'like' : 'haven\'t liked', " "), 
        React.createElement("br", null), 

        "'双向绑定: '", 
        React.createElement("input", {type: "text", valueLink: this.linkState('message')}), ";", this.state.message, 
        React.createElement("br", null), 

        React.createElement("input", {type: "text", ref: "myTextInput", value: this.state.value, onChange: this.handleChange}), 
        React.createElement("br", null), 

        React.createElement("input", {type: "button", value: "Focus the text input", onClick: this.handleClick}), 
        React.createElement("br", null), 

        React.createElement("textarea", {name: "description", defaultValue: "This is a \\n . 花椒粉卡萨"}), 
        React.createElement("br", null), 

        React.createElement("input", {type: "checkbox", checkedLink: this.linkState('booleanValue')}), "; ", '"'+ this.state.booleanValue + '"', 
        React.createElement("br", null), 

        React.createElement("div", {dangerouslySetInnerHTML: createMarkup()})

      )
    );
  }
});



console.log();
var data = '123';

var component1 = document.getElementsByClassName('component1')[0];
var reactRender =  ReactDOM.render(
  React.createElement(HelloWorld, {name: "sunny", old: "12", year: "2016", title: data, href: "/www/lib/react-demos/my_react/demo-label.html"}, 
    React.createElement("span", {key: "child1"}, "span 子节点")
  ),
  component1,
  function(){
    console.warn( this );
  }
);

//{__html:...} 背后的目的是表明它会被当成 "type/taint" 类型处理。
// 这种包裹对象，可以通过方法调用返回净化后的数据，随后这种标记过的数据可以被传递给 dangerouslySetInnerHTML。
function createMarkup() {
  return {__html: 'First &middot; Second'};
}


// 触控事件（onTouchCancel、onTouchEnd、onTouchMove、 onTouchStart）需要调用以下代码进行初始化：
//React.initializeTouchEvents(true);

//isValidElement 验证是否是一个有效的 ReactElement,不知道如何使用...
var element1 = React.createElement(HelloWorld);
var element2 = React.createElement(HelloWorld, null);
console.log( React.isValidElement(element1) );   // true
console.log( React.isValidElement(element2) );   // true
console.log( React.isValidElement(component1) );  // false
console.log( React.isValidElement(reactRender) );  // false


// findDOMNode 找到相应的dom节点
var renderDom = ReactDOM.findDOMNode(reactRender);// 获取相应组件的return的node
console.log( ReactDOM.findDOMNode(component1) );  // 获取容器的node
console.log( renderDom );
console.log( renderDom.querySelector('input') );


// 从 DOM 中移除已经挂载的 React 组件，清除相应的事件处理器和 state。
//如果在 container 内没有组件挂载，这个函数将什么都不做。
// 如果组件成功移除，则返回 true；如果没有组件被移除，则返回 false。
setTimeout(function() {
  console.log(ReactDOM.unmountComponentAtNode(component1));
}, 50000);
