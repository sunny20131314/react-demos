/**
 * Created by sunzhimin on 16/5/31.
 * todoList
 */

var Todo = React.createClass({displayName: "Todo",
  render: function() {
    return React.createElement("div", {onClick: this.props.onClick}, this.props.title);
  },

  //this component will be accessed by the parent through the `ref` attribute
  animate: function() {
    console.log('Pretend %s is animating', this.props.title);
  }
});

var Todos = React.createClass({displayName: "Todos",
  getInitialState: function() {
    return {items: ['Apple', 'Banana', 'Cranberry']};
  },

  handleClick: function(index) {
    var items = this.state.items.filter(function(item, i) {
      return index !== i;
    });
    this.setState({items: items}, function() {
      if (items.length === 1) {
        this.refs.item0.animate();
      }
    }.bind(this));
  },

  render: function() {
    return (
      React.createElement("div", null, 
        this.state.items.map(function(item, i) {
          var boundClick = this.handleClick.bind(this, i);
          return (
            React.createElement(Todo, {onClick: boundClick, key: i, title: item, ref: 'item' + i})
          );
        }, this)
      )
    );
  }
});

var mountNode = document.getElementById('container');
ReactDOM.render(
  React.createElement(Todos, null),
  mountNode
);
