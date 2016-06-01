/**
 * Created by sunzhimin on 16/5/27.
 */

var ClassOld = React.createClass({displayName: "ClassOld",
  getDefaultProps: function() {
    return {
      isImportant: true,
      isRead: false
    }
  },
  render: function() {
    var classString = 'message';
    if (this.props.isImportant) {
      classString += ' message-important';
    }
    if (this.props.isRead) {
      classString += ' message-read';
    }
    // 'message message-important message-read'
    return (
      React.createElement("div", {className: classString}, 
        "Great, I'll be there."
      )
    );
  }
});

ReactDOM.render(
  React.createElement(ClassOld, null),
  document.getElementById('example-old')
);

var cx = React.addons.classSet;
if( !cx ){
  cx = function(obj){
    var res = [];
    if ( typeof obj === 'object' ) {
      // 拼接属性
      for( var a in obj ){
        if( obj.hasOwnProperty(a) && obj[a]){
          res.push( a );
        }
      }
    }
    else if ( typeof obj === 'string' ) {
      // 拼接字符串
      res = Array.prototype.slice.apply( arguments );
    }
    return res.join( ' ' );
  }
}

console.log( React.addons );
console.log( React.addons.TestUtils );

var ClassOperator = React.createClass({displayName: "ClassOperator",
  getDefaultProps: function() {
    return {
      isImportant: true,
      isRead: true
    }
  },
  change: function () {
    console.log(1);
    this.props.isImportant = false;
  },
  render: function() {
    var classes = cx({
      'message': true,
      'message-important': this.props.isImportant,
      'message-read': this.props.isRead
    });
    // same final string, but much cleaner
    return (
      React.createElement("div", {className: classes, onclick: this.change}, 
        "Great, I'll be there."
      )
    );
  }
});

ReactDOM.render(
  React.createElement(ClassOperator, null),
  document.getElementById('example-class')
);
