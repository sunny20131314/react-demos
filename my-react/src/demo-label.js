// <input type='text' value='hello'/> 这种情况下,会导致input框是readonly,值不可更改.要么绑定onchange事件,要么设置defaultValue属性

ReactDOM.render(
  <h1> 哈哈  <br/>
    <input type='text' defaultValue='hello'/> <br/>
    <input type='text' value='hello'/>
  </h1>,
  document.getElementById('example-label')
);

var arr1 = [
  <span key="span1">span1</span>, <span key="span2">span2</span>
];

var arr2 = ['amy', 'sunny'];

// map arr1
ReactDOM.render(
  <div onclick="console.log(1);">
    {
      arr1.map( function( name, index ){
      console.log( name );
      console.log( index );
      return <div key={'index' + index } onclick="console.log(2);"> {name} , {'index' + index } ,这是我加入的语句</div> ;
      })
    }
  </div>,
  document.getElementById('example-arr1')
);

// 直接解析数组,交给react了
ReactDOM.render(
  <div>{arr1} {arr2}</div>,
  document.getElementById('example-arr2')
);
