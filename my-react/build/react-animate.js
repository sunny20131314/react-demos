/**
 * Created by sunzhimin on 16/5/27.
 */


  /*
  * 动画:
  * ReactCSSTransitionGroup是基于ReactTransitionGroup的，
  * 在React组件进入或者离开DOM的时候，它是一种简单地执行CSS过渡和动画的方式。
  * 这个的灵感来自于优秀的ng-animate库。
  *
  *
  * */


/*
* 添加时:
*     在这个组件当中，当一个新的项被添加到ReactCSSTransitionGroup，
*     它将会被添加example-enter类，然后在下一时刻被添加example-enter-active CSS类。
*     这是一个基于transitionName prop的约定。
*
* 移除时:
*     当你尝试移除一项的时候，ReactCSSTransitionGroup保持该项在DOM里。
*     如果你正使用一个带有插件的未压缩的React构建版本，你将会看到一条警告：React期待一次动画或者过渡发生。
*     那是因为ReactCSSTransitionGroup保持你的DOM元素一直在页面上，直到动画完成。
*
* */

/*
* 需注意:
*     1. 一组动画必须要挂载了才能生效
*     2. 为了能够给它的子级应用过渡效果，ReactCSSTransitionGroup必须已经挂载到了DOM。
*     3. 新项被挂载到ReactCSSTransitionGroup里才可以,而不是ReactCSSTransitionGroup被挂载到新项
* */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({displayName: "TodoList",
  getInitialState: function() {
    return {items: ['hello', 'world', 'click', 'me']};
  },
  handleAdd: function() {
    var newItems = this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  },
  handleRemove: function(i) {
    console.log(i);
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({items: newItems}, function(){
      console.log( this.state );
    });
  },
  render: function() {
    var items = this.state.items.map(function(item, i) {
      return (
        React.createElement("div", {key: item, onClick: this.handleRemove.bind(this, i)}, 
          item
        )
      );
    }.bind(this));
    return (
      React.createElement("div", null, 
        React.createElement("button", {onClick: this.handleAdd}, "Add Item"), 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "example", transitionAppear: true}, 
          items
        )
      )
    );
  }
});

ReactDOM.render(
  React.createElement(TodoList, null),
  document.getElementById('example')
);


/*
* TODO: 实现轮播图,机制不祥.
* */
var ImageCarousel = React.createClass({displayName: "ImageCarousel",
  getInitialState: function() {
    return {
      imgSrc: [
        '../../../img/img.png',
        '../../../img/mk-one-bak.png',
        '../../../img/mk-two-bak.png',
        '../../../img/mk-three-bak.png'
      ],
      index: 0
    };
  },
  handleAdd: function() {
    var newItems = this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  },
  handleRemove: function(i) {
    console.log(i);
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({items: newItems}, function(){
      console.log( this.state );
    });
  },
  handleNext: function(){
    var index = this.state.index;
    var imgSrc = this.state.imgSrc;
    console.log( index );
    this.setState({index: index + 1});
  },
  render: function() {
    var index = this.state.index;
    var imgSrc = this.state.imgSrc;
    console.log( index );
    return (
      React.createElement("div", null, 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "ImageCarousel"}, 
          React.createElement("div", {key: imgSrc[index], onclick: this.handleNext}, 
            React.createElement("img", {src: imgSrc[index]})
          )
        )
      )
    );
  }
});

var ImageCarousel1 = React.createClass({displayName: "ImageCarousel1",
  propTypes: {
    imageSrc: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "carousel", transitionEnterTimeout: 500, transitionLeaveTimeout: 500}, 
          React.createElement("img", {src: this.props.imageSrc, key: this.props.imageSrc})
        )
      )
    );
  }
});


ReactDOM.render(
  React.createElement(ImageCarousel1, {imageSrc: "../../../img/img.png"}),
  document.getElementById('carousel')
);
