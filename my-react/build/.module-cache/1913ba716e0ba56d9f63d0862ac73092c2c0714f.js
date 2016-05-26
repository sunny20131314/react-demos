/**
 * Created by sunzhimin on 16/5/26.
 */

var HelloWorld = React.createClass({displayName: "HelloWorld",
  render: function() {
    return (
      React.createElement("p", {style: styleP}, 
        "Hello, ", React.createElement("input", {type: "text", placeholder: "Your name here", style: styleInput}), "!" + ' ' +
        "It is ", this.props.date.toTimeString()
      )
    );
  }
});

// 样式
var style = {
  styleP: {
    fontSize: '36px'
  },
  styleInput: {
    width: '100px',
    height: '100px',
    borderColor: '#0a0'
  }
};

setInterval(function() {
  ReactDOM.render(
    React.createElement(HelloWorld, {date: new Date(), style: style}),
    document.getElementById('example')
  );
}, 100);
