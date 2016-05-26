/**
 * Created by sunny on 16/5/25.
 * http://reactjs.cn/react/docs/thinking-in-react.html
 */
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
        React.createElement("input", {type: "text", placeholder: "Search..."}), 
        React.createElement("p", null, 
          React.createElement("label", null, 
            React.createElement("input", {type: "checkbox"}), 
            ' ', 
            "Only show products in stock"
          )
        )
      )
    );
  }
});

var FilterableProductTable = React.createClass({displayName: "FilterableProductTable",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(SearchBar, null), 
        React.createElement(ProductTable, {products: this.props.products})
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