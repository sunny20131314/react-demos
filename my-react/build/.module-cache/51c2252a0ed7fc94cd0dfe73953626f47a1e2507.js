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

      //
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
    });
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
  render: function() {
    return (
      React.createElement("form", null, 
        React.createElement("input", {type: "text", placeholder: "Search...", value: this.props.filterText}), 
        React.createElement("p", null, 
          React.createElement("label", null, 
            React.createElement("input", {type: "checkbox", checked: this.props.inStockOnly}), 
            ' ', 
            "Only show products in stock"
          )
        )
      )
    );
  }
});

/*
* TODO: 
* */
var FilterableProductTable = React.createClass({displayName: "FilterableProductTable",
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(SearchBar, {
          filterText: this.state.filterText, 
          inStockOnly: this.state.inStockOnly}
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