/**
 * Created by sunzhimin on 16/5/26.
 */

var HelloWorld = React.createClass({displayName: "HelloWorld",
  render: function() {
    return (
      React.createElement("p", null, 
        "Hello, ", React.createElement("input", {type: "text", placeholder: "Your name here"}), "!" + ' ' +
        "It is ", this.props.date
      )
    );
  }
});

// 样式
var styleP = {
  fontSize: '36px'
};
var styleInput = {
  width: '100px',
  height: '100px',
  borderColor: '#0a0'
};

var a = 0;
setInterval(function() {
  ReactDOM.render(
    React.createElement(HelloWorld, {date: a++}),
    document.getElementById('example')
  );
}, 500);
