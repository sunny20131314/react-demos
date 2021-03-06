/**
 * Created by sunzhimin on 16/5/26.
 * mixins
 */

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
    console.log(this);
    console.log(this.setInterval);
    console.log(this.intervals);
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