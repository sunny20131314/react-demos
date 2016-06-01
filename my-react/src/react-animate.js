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

var TodoList = React.createClass({
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
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    }.bind(this));
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup  transitionName="example" transitionAppear={true} >
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

ReactDOM.render(
  <TodoList />,
  document.getElementById('example')
);


/*
* TODO: 实现轮播图,机制不祥.
* */
var ImageCarousel = React.createClass({
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
      <div>
        <ReactCSSTransitionGroup transitionName="ImageCarousel">
          <div key={imgSrc[index]} onclick={this.handleNext}>
            <img src={imgSrc[index]} />
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var ImageCarousel1 = React.createClass({
  propTypes: {
    imageSrc: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div>
        <ReactCSSTransitionGroup  transitionName="carousel" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          <img src={this.props.imageSrc} key={this.props.imageSrc} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});


ReactDOM.render(
  <ImageCarousel1 imageSrc = '../../../img/img.png' />,
  document.getElementById('carousel')
);
