// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux';

// const counter = (state = 0, action) => {
//   switch (action.type){
//     case "INCREMENT":
//      return state + 1;
//     case "DECREMENT":
//       return state -1;
//     default:
//       return state;
//   }
// }

// const store = createStore(counter);

// class CounterComponent extends Component{
// 	componentWillReceiveProps(prev){
// 		console.log(prev);
// 	}
//     onDecrement(){
// 	  console.log("Inside DECREMENT");
// 	  store.dispatch({
// 	    type: "DECREMENT"
// 	  });
//   	}
//   	onIncrement(){
//       console.log("Inside INCREMENT");
//       store.dispatch({
//         type: "INCREMENT"
//       });
//   	}
// 	render(){
// 		return(
// 			<div>
// 				<h1> {store.getStae()} </h1>
// 				<button onClick={this.onIncrement}>+</button>
// 				<button onClick={this.onDecrement}>-</button>
// 			</div>
// 		);
// 	}
// }

// store.subscribe(
// 	ReactDOM.render(<CounterComponent />, document.getElementById('root'));
// 	);

// export default CounterComponent;