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

var ClassOldEx = ReactDOM.render(
  React.createElement(ClassOld, null),
  document.getElementById('example-old')
);


//React.initializeTouchEvents(true);
console.log( ClassOldEx );
console.log( React.addons.TestUtils );

