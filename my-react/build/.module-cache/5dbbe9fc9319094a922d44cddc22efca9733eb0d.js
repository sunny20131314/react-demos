/**
 * Created by sunzhimin on 16/5/26.
 * mixins
 */


/*
* mixin:
*    如果一个组件使用了多个 mixin，并且有多个 mixin 定义了同样的生命周期方法
*   （如：多个 mixin 都需要在组件销毁时做资源清理操作），所有这些生命周期方法都保证会被执行到。
*    方法执行顺序是：首先按 mixin 引入顺序执行 mixin 里方法，最后执行组件内定义的方法。
*
* */


var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var TickTock = React.createClass({displayName: "TickTock",
  mixins: [SetIntervalMixin], // 引用 mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // 调用 mixin 的方法
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    //console.log(this);
    //console.log(this.setInterval);
    //console.log(this.intervals);
    return (
      React.createElement("p", null, 
        "React has been running for ", this.state.seconds, " seconds."
      )
    );
  }
});

ReactDOM.render(
  React.createElement(TickTock, null),
  document.getElementById('mixins')
);