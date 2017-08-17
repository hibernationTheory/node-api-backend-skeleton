class ToDoItem extends React.Component {
	constructor(props) {
		super(props);

    this.handleClick = this.handleClick.bind(this);
	}

  handleClick() {
    this.props.deleteItem(this.props.id);
  }

	render() {
		return (
			<li>
        <div>{this.props.text}</div>
        <div><button onClick={this.handleClick}>Delete</button></div>
      </li>
		);
	}
}

class ToDoApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todo: [],
      inputValue: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
	}

  getToDoItems() {
    return fetch('http://localhost:8080/api/todos')
      .then((response) => response.json())
      .then((todos) => {
        return todos;
      });
  }

  componentDidMount() {
    this.getToDoItems()
      .then((todos) => {
        this.setState({
          todo: todos,
        });
      });
  }

  deleteItem(id) {
    axios.delete(`http://localhost:8080/api/todos/${id}`)
      .then((response) => {
        this.getToDoItems()
          .then((todos) => {
            this.setState({
              todo: todos,
            });
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

	handleChange(event) {
		this.setState({
      inputValue: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

    axios.post("http://localhost:8080/api/todos", {
        text: this.state.inputValue,
      })
      .then((response) => {
        this.getToDoItems()
          .then((todos) => {
            this.setState({
              todo: todos,
              inputValue: ''
            });
          });
      })
      .catch(function (error) {
        console.log(error);
      });
	}

	render() {
		const toDoItems = this.state.todo.map((item) => {
			return (
        <ToDoItem
          key={item.id}
          text={item.text}
          id={item.id}
          deleteItem={this.deleteItem}
        />);
		});

		return (
			<div className="app">
				<h1>To Do App</h1>
				<ul>
					{toDoItems}
				</ul>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleChange} value={this.state.inputValue}/>
					<button>Submit</button>
				</form>
			</div>
		);
	}
}

ReactDOM.render(
  <ToDoApp />,
  document.getElementById('root')
);
