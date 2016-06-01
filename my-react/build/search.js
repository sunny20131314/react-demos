/**
 * Created by sunzhimin on 16/5/31.
 */

  var ProductCategoryRow, ProductRow, ProductTable, SearchBar, FilterableProductTable;

ProductCategoryRow = React.createClass({displayName: "ProductCategoryRow",
  render: function(){
    return (
      React.createElement("tr", null, 
        React.createElement("th", {colSpan: "2"}, 
          this.props.category
        )
      )
    );
  }
});

ProductRow = React.createClass({displayName: "ProductRow",
  render: function(){
    return (
      React.createElement("tr", null, 
        React.createElement("th", null, 
          
            this.props.stocked
              ? this.props.name
              : React.createElement("span", {style: {color: 'red'}}, " ", this.props.name, " ")
          
        ), 
        React.createElement("th", null, 
          this.props.price
        )
      )
    );
  }
});

ProductTable = React.createClass({displayName: "ProductTable",
  render: function () {
    var listName = '', rows = [];
    console.log( this.props.filterText );
    console.log( this.props.filterStock );

    this.props.products.forEach( function(product, index){

      // 当来自仓库为真时 -> 仅显示有货: stocked: true,
      // 搜索的内容查询不到时
      if ( (!product.stocked && this.props.filterStock) || product.name.indexOf(this.props.filterText) === -1 ){
        console.log('break');
        return;
      }

      if ( product.category !== listName ){
        rows.push(
          React.createElement(ProductCategoryRow, {category: product.category, key: product.category})
        )
      }
      rows.push(
        React.createElement(ProductRow, {name: product.name, price: product.price, stocked: product.stocked, key: product.name})
      );

      listName = product.category;
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

SearchBar = React.createClass({displayName: "SearchBar",
  handleInput: function() {
    this.props.onChange(
      this.refs.filterText.value,
      this.refs.filterStock.checked
    );
  },
  render: function(){
    return (
      React.createElement("form", null, 
        React.createElement("input", {
          type: "text", 
          placeholder: "Search...", 
          ref: "filterText", 
          onChange: this.handleInput}
        ), 
        React.createElement("p", null, 
          React.createElement("label", null, 
            React.createElement("input", {
              type: "checkbox", 
              placeholder: "Search...", 
              ref: "filterStock", 
              onChange: this.handleInput}
            ), 
            "Only show products in stocks"
          )
        )
      )
    );
  }
});

FilterableProductTable = React.createClass({displayName: "FilterableProductTable",
  getInitialState: function(){
    return {
      filterText: '',
      filterStock: false
    };
  },
  handleSearch: function(filterText, filterStock){
    //console.log( filterText );
    //console.log( filterStock );
    this.setState({
      filterText: filterText,
      filterStock: filterStock
    })
  },
  render: function(){
    var products = this.props.products;
    return (
      React.createElement("div", null, 
        React.createElement(SearchBar, {products: products, onChange: this.handleSearch}), 
        React.createElement(ProductTable, {
          products: products, 
          filterText: this.state.filterText, 
          filterStock: this.state.filterStock}
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

var mountDom = document.getElementById( 'container' );
ReactDOM.render(
  React.createElement(FilterableProductTable, {products: PRODUCTS}),
  mountDom
);