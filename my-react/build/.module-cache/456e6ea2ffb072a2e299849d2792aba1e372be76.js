/**
 * Created by sunny on 16/5/25.
 * http://reactjs.cn/react/docs/thinking-in-react.html
 * 构建一个可筛选且显示相关信息的小组件
 */


/*
* 构建应用:
* 1. 在简单的应用中，通常情况下从上至下的方式更加简单；
* 2. 在大型的项目中，从下至上的方式更加简单，这样也可以在构建的同时写 `测试代码`。
* */

/*
*  React 中数据是沿着组件树从上到下单向流动的。
*  React 提供了一个叫做 ReactLink 的插件来使其和双向数据绑定一样方便
*  */



var ProductCategoryRow = React.createClass({displayName: "ProductCategoryRow",
  render: function() {
    return (React.createElement("tr", null, React.createElement("th", {colSpan: "2"}, this.props.category)));
  }
});

var ProductRow = React.createClass({displayName: "ProductRow",
  render: function() {
    var name = this.props.product.stocked
      ? this.props.product.name
      : React.createElement("span", {style: {color: 'red'}}, 
        this.props.product.name
      );
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, name), 
        React.createElement("td", null, this.props.product.price)
      )
    );
  }
});

var ProductTable = React.createClass({displayName: "ProductTable",
  render: function() {
    var rows = [];
    var lastCategory = null;

    this.props.products.forEach(function(product) {

      // 进行一个筛选的过程---根据父元素传过来的: filterText 及 inStockOnly 而定,
      // 假设前端获取到了所有数据(于node.js 或者后端配合, 在发往前端前把数据导进来--减少了ajax请求--但仅适合数据不是特别多,且仅适于无隐患数据),在前端进行筛选
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }

      // 为每个 分类（ category ） 添加一列表头
      // (不一定按顺序来, 给没有添加过列表头的添加, 那么可能每个类没有放在一块?
      // 恩,好像不太可能,后端找数据也会有一定的规则)
      if (product.category !== lastCategory) {
        rows.push(React.createElement(ProductCategoryRow, {category: product.category, key: product.category}));
      }
      rows.push(React.createElement(ProductRow, {product: product, key: product.name}));
      lastCategory = product.category;

      // 绑定this, 传参数?
    }.bind(this));
    return (
      React.createElement("table", null, 
        React.createElement("thead", null, 
        React.createElement("tr", null, 
          React.createElement("th", null, "Name"), 
          React.createElement("th", null, "Price")
        )
        ), 
        React.createElement("tbody", null, rows)
      )
    );
  }
});

var SearchBar = React.createClass({displayName: "SearchBar",
  handleChange: function() {
    // 这个this的指向? ——> 当前的这个组件
    this.props.User(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
  render: function() {
    return (
      React.createElement("form", null, 
        React.createElement("input", {
          type: "text", 
          placeholder: "Search...", 
          value: this.props.filterText, 
          ref: "filterTextInput", 
          onChange: this.handleChange}
        ), 
        React.createElement("p", null, 
          React.createElement("label", null, 
            React.createElement("input", {
              type: "checkbox", 
              checked: this.props.inStockOnly, 
              ref: "inStockOnlyInput", 
              onChange: this.handleChange}
            ), 
            ' ', 
            "Only show products in stock"
          )
        )
      )
    );
  }
});

/*
* TODO: 肯定还要给绑定在 SearchBar 中 搜索值: filterText 及 inStockOnly 选择, 组件是自上而下的,那么绑定变化应该是根组件???
*       那么改变了是通过根组件捕获, 但是在子组件变化了如何提醒父元素?事件 change???
*
*       在父组件上: 相应标签绑定触发父组件事件,  以props的形式传递 ——>反向数据流
*
* TODO: 为什么在子组件的props上绑定相应的function(传递参数)就可以触发父元素上的function???
*       ——> 其实是触发的事件啦,子组件上触发onchange事件, 执行handleChange函数, onUserInput被触发(怎么做到的,是触发事件???)
* */

var FilterableProductTable = React.createClass({displayName: "FilterableProductTable",
  // 反映应用的初始化状态
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    console.log( this );
    return (
      React.createElement("div", null, 
        React.createElement(SearchBar, {
          filterText: this.state.filterText, 
          inStockOnly: this.state.inStockOnly, 
          //User={this.handleUserInput}
          User: 
            function(filterText, inStockOnly) {
              console.log( this );
              this.setState({
                filterText: filterText,
                inStockOnly: inStockOnly
              });
            }.bind(this)
          }
        ), 
        React.createElement(ProductTable, {
          products: this.props.products, 
          filterText: this.state.filterText, 
          inStockOnly: this.state.inStockOnly}
        )
      )
    );
  }
});


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  React.createElement(FilterableProductTable, {products: PRODUCTS}),
  document.getElementById('container')
);