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
*  React 中数据是沿着组件树从上到下单向流动的。--数据是指props,state?
*  React 提供了一个叫做 ReactLink 的插件来使其和双向数据绑定一样方便
*  */

/*
* state 与 props
* 大部分组件的工作应该是从 props 里取数据并渲染出来。
* 但是，有时需要对用户输入、服务器请求或者时间变化等作出响应，这时才需要使用 State。
* */


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
* 事件代理 ：
* React 实际并没有把事件处理器绑定到节点本身。
* 当 React 启动的时候，它在最外层使用唯一一个事件监听器处理所有事件。
* 当组件被加载和卸载时，只是在内部映射里添加或删除事件处理器。
* 当事件触发，React 根据映射来决定如何分发。当映射里处理器时，会当作空操作处理。
*
* */



/*
* 绑定事件:
* TODO: 肯定还要给绑定在 SearchBar 中 搜索值: filterText 及 inStockOnly 选择, 组件是自上而下的,那么绑定变化应该是根组件???
*       那么改变了是通过根组件捕获, 但是在子组件变化了如何提醒父元素?事件 change???
*
*       在父组件上: 相应标签绑定触发父组件事件,  以props的形式传递 ——>反向数据流
*
* TODO: 为什么在子组件的props上绑定相应的function(传递参数)就可以触发父元素上的function???
*       ——> 其实是触发的事件啦,子组件上触发onchange事件, 执行handleChange函数, onUserInput被触发(怎么做到的,是触发事件???)
*
*       ——> 看这里解释 http://reactjs.cn/react/docs/interactivity-and-dynamic-uis.html
*       ——> React 里只需把事件处理器（event handler）以骆峰命名（camelCased）形式当作组件的 props 传入即可，就像使用普通 HTML 那样。
*       ——> 如果需要在手机或平板等触摸设备上使用 React，需要调用 React.initializeTouchEvents(true); 启用触摸事件处理。
*
*
* */


/*
 * 拥有者: 从属关系是 React 特有的!
 * 如果组件 Y 在 render() 方法是创建了组件 X，那么 Y 就拥有 X。
 * 这里 FilterableProductTable 拥有 SearchBar & ProductTable 的实例.
 * 上面讲过，组件不能修改自身的 props - 它们总是与它们拥有者设置的保持一致。这是保持用户界面一致性的关键性原则。
 *
 *
 * React 里，数据通过上面介绍过的 props 从拥有者流向归属者。这就是高效的单向数据绑定(one-way data binding)：拥有者通过它的 props 或 state 计算出一些值，并把这些值绑定到它们拥有的组件的 props 上。因为这个过程会递归地调用，所以数据变化会自动在所有被使用的地方自动反映出来。
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
    return (
      React.createElement("div", null, 
        React.createElement(SearchBar, {
          filterText: this.state.filterText, 
          inStockOnly: this.state.inStockOnly, 
          User: this.handleUserInput}
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


ReactDOM.render(
  React.createElement(FilterableProductTable, {products: PRODUCTS}),
  document.getElementById('container')
);

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
