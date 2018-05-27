import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';

/**Counter Reducer and Store **/
const counter = (state = 0, action) => {
  switch (action.type){
    case "INCREMENT":
     return state + 1;
    case "DECREMENT":
      return state -1;
    default:
      return state;
  }
}

console.log(React.version);

// const store = createStore(counter); 


/* Todos Reducer */

const todo = (state, action) =>{
	switch (action.type){
		case "ADD_TODO":
			return {
				id: action.id,
				text: action.text,
				completed: false
			}
		case "TOGGLE_TODO":
		   if(state.id !== action.id){
				return state;
		    }

			return {
				...state,
				completed: !state.completed
			}
	}
}

const visibilityFilter = (state = "SHOW_ALL", action) => {
	switch (action.type){
		case "SET_VISIBILITY_FILTER":
			return action.filter;
		default:
			return state;
	}
}

const todos = (state = [], action) =>{
	switch (action.type){
		case "ADD_TODO":
			return [
			...state,
			  todo(undefined, action)
			];
		case "TOGGLE_TODO":
			return state.map(t => todo(t, action));
		default:
			return state;
	}
}

const todoApp = combineReducers({
	todos,
	visibilityFilter
});

const store = createStore(todoApp); 

/*Without using combineReducers*/
// const todoApp = (state,  action) => {
// 	return {
// 		todos: todos(state.todos, action),
// 		visibilityFilter: (state.visibilityFilter, action)
// 	}
// }


// const Counter = ({value, onIncrement, onDecrement}) => (
// 	<div>
// 		<h1>{store.getState()}</h1>
// 		<button onClick={onIncrement}>+</button>
// 		<button onClick={onDecrement}>-</button>
// 	</div>
// );

/*Counter View*/
// const render = () =>{
// 		ReactDOM.render(
// 			<Counter 
// 				value={store.getState()}
// 				onIncrement={()=> store.dispatch({type: "INCREMENT"})}
// 				onDecrement={()=> store.dispatch({type: "DECREMENT"})}
// 				/>,
// 			document.getElementById('root')
// 		)
// 	}

const getVisibiltyFilter = (todos, filter) =>{
	switch (filter){
		case "SHOW_ALL":
			return todos;
		case "SHOW_ACTIVE":
			return todos.filter( t => !t.completed);
		case "SHOW_COMPLETED":
			return todos.filter( t => t.completed);
	}
}


const Link = ({active, children, onClick}) =>{
	
	if(active){
			return <span>{children}</span>;
	}

	return (
		<a href='#' onClick={e =>{
			e.preventDefault();
			onClick();
		  }}
		  >
			{children}
		   </a>
	)
}

const mapStateToFilterLinkProps = (state, ownProps) => {
	return {
		active: ownProps.filter === state.visibilityFilter
	}
}

const mapDispatchToFilterLinkProps = ( dispatch, props) =>{
	return {
		onClick: ()=>{
				dispatch({
					type: "SET_VISIBILITY_FILTER",
					filter: props.filter
				})}
	}
}

const FilterLink = connect(
	mapStateToFilterLinkProps,
	mapDispatchToFilterLinkProps
)(Link);

// class FilterLink extends Component{
// 	componentDidMount(){
// 		const { store } = this.context;
// 		this.unsubscribe = store.subscribe(() =>
// 			 this.forceUpdate()
// 		);
// 	}
// 	componentWillUnmount(){
// 		this.unsubscribe();
// 	}
// 	render(){
// 		const props = this.props;
// 		const { store } = this.context;
// 		const state = store.getState();
// 		return (
// 			<Link active={props.filter === state.visibilityFilter} onClick={()=>{
// 				store.dispatch({
// 					type: "SET_VISIBILITY_FILTER",
// 					filter: props.filter
// 				})
// 			  }
// 			}> {props.children} </Link>
//  		)
// 	}
// }
// FilterLink.contextTypes = {
// 	store: PropTypes.object
// }

// const Footer = ({visibilityFilter, onFilterClick}) => (
// 			<p>
// 				Show: {''} <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter} onClick={onFilterClick}>All</FilterLink> 
// 					  {''} <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter} onClick={onFilterClick}>Active</FilterLink>
// 					  {''} <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter} onClick={onFilterClick}>Completed</FilterLink>
// 			</p>

// );

/* Refactored Footer */

const Footer = () => (
			<p>
				Show: {''} <FilterLink filter="SHOW_ALL">All</FilterLink> 
					  {''} <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
					  {''} <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
			</p>

)


const Todo = ({onClick, completed, text}) =>(
	<li onClick={onClick} style={{textDecoration:completed ? 'line-through' : 'none'}}> {text} </li>
);	

const TodoList = ({todos, onTodoClick}) => (
	<ul>
		{ todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />) }
	</ul>
)

let AddTodo = ({ dispatch }) =>{
	let input;
	return(
		<div>
		<input ref={node =>{
					input = node;
				}} />
				<button onClick={()=>{
					dispatch({
						type: "ADD_TODO",
						text: input.value,
						id: nextTodoId++
					});
					input.value = "";
				}}> Add Todo</button>
		</div>
	)
}

AddTodo = connect()(AddTodo);

const mapStateToTodoListProps = (state) => {
	return {
		todos: getVisibiltyFilter(state.todos, state.visibilityFilter)
	}
}

const mapDispatchToTodoListProps = (dispatch) => {
	return {
		onTodoClick: (id) => dispatch({ type: "TOGGLE_TODO", id })
	}
}

const VisibleTodoList = connect(
	mapStateToTodoListProps,
	mapDispatchToTodoListProps
)(TodoList);

/***class VisibleTodoList extends Component{
	componentDidMount(){
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() =>
			 this.forceUpdate()
		);
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render(){
		const props = this.props;
		const { store } = this.context;
		const state = store.getState();
		return (
			<TodoList todos={ getVisibiltyFilter(state.todos, state.visibilityFilter)}
							 onTodoClick={ id => store.dispatch({ type: "TOGGLE_TODO", id }) } />
 		)
	}
}
VisibleTodoList.contextTypes = {
	store: PropTypes.object
}  ***/

let nextTodoId = 0;
const TodoApp = () =>(
			<div>
				<AddTodo />
				<VisibleTodoList />
				<Footer />
			</div>
		)

TodoApp.defaultProps = {
	todos: []
}

// class Provider extends Component{
// 	getChildContext(){
// 		return {
// 			store: this.props.store
// 		}
// 	}
// 	render(){
// 		return this.props.children;
// 	}
// }
// Provider.childContextTypes = {
// 	store: PropTypes.object
// }

ReactDOM.render(
	<Provider store={createStore(todoApp)}>
		<TodoApp />
	</Provider>,
	document.getElementById("root")
)


// store.subscribe(render);
// render();
 // ReactDOM.render(<App />, document.getElementById('root'));
 // registerServiceWorker();
