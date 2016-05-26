/**
 * Created by sunzhimin on 16/5/26.
 */

var HelloWorld = React.createClass({
  render: function() {
    return (
      <p style={this.props.style.p}>
        Hello, <input type="text" placeholder="Your name here" style={this.props.style.input}/>!
        It is {this.props.date.toTimeString()}
      </p>
    );
  }
});

// 样式
var style = {
  p: {
    fontSize: '36px'
  },
  input: {
    width: '100px',
    height: '100px',
    borderColor: '#0a0'
  }
};

setInterval(function() {
  ReactDOM.render(
    <HelloWorld date={new Date()} style={style}/>,
    document.getElementById('example')
  );
}, 100);
