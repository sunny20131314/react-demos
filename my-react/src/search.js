/**
 * Created by sunzhimin on 16/5/31.
 */

  var ProductCategoryRow, ProductRow, ProductTable, SearchBar, FilterableProductTable;

ProductCategoryRow = React.createClass({
  render: function(){
    return (
      <tr>
        <th colSpan="2">
          {this.props.category}
        </th>
      </tr>
    );
  }
});

ProductRow = React.createClass({
  render: function(){
    return (
      <tr>
        <th>
          {
            this.props.stocked
              ? this.props.name
              : <span style={{color: 'red'}}> {this.props.name} </span>
          }
        </th>
        <th>
          {this.props.price}
        </th>
      </tr>
    );
  }
});

ProductTable = React.createClass({
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
          <ProductCategoryRow category={product.category} key={product.category}/>
        )
      }
      rows.push(
        <ProductRow name={product.name} price={product.price} stocked={product.stocked} key={product.name}/>
      );

      listName = product.category;
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

SearchBar = React.createClass({
  handleInput: function() {
    this.props.onChange(
      this.refs.filterText.value,
      this.refs.filterStock.checked
    );
  },
  render: function(){
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          ref="filterText"
          onChange={this.handleInput}
        />
        <p>
          <label>
            <input
              type="checkbox"
              placeholder="Search..."
              ref="filterStock"
              onChange={this.handleInput}
            />
            Only show products in stocks
          </label>
        </p>
      </form>
    );
  }
});

FilterableProductTable = React.createClass({
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
      <div>
        <SearchBar products={products} onChange={this.handleSearch}/>
        <ProductTable
          products={products}
          filterText={this.state.filterText}
          filterStock={this.state.filterStock}
        />
      </div>
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
  <FilterableProductTable products={PRODUCTS} />,
  mountDom
);