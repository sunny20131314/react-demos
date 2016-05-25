// <input type='text' value='hello'/> 这种情况下,会导致input框是readonly,值不可更改.要么绑定onchange事件,要么设置defaultValue属性

var app = React.createElement(Nav, {color: "blue"}, React.createElement(Profile, null, "click"));

ReactDOM.render(
  React.createElement("h1", null, " 哈哈  ", React.createElement("br", null), 
    React.createElement("input", {type: "text", defaultValue: "hello"}), " ", React.createElement("br", null), 
    React.createElement("input", {type: "text", value: "hello"})
  ),
  document.getElementById('example-label')
);

var arr1 = [
  React.createElement("span", {key: "span1"}, "span1"), React.createElement("span", {key: "span2"}, "span2")
];

var arr2 = ['amy', 'sunny'];

// map arr1
ReactDOM.render(
  React.createElement("div", {onclick: "console.log(1);"}, 
    
      arr1.map( function( name, index ){
      console.log( name );
      console.log( index );
      return React.createElement("div", {key: 'index' + index, onclick: "console.log(2);"}, " ", name, " , ", 'index' + index, " ,这是我加入的语句") ;
      })
    
  ),
  document.getElementById('example-arr1')
);

// 直接解析数组,交给react了
ReactDOM.render(
  React.createElement("div", null, " ", arr1, " ", arr2),
  document.getElementById('example-arr2')
);
