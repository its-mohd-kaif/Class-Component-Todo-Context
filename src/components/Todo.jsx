import React, { Component } from "react";
import { Button, Spinner } from "react-bootstrap";
import { todoContext } from "../context/TodoContext";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Search from "./Search";
// Add Todo Component
export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // State For Input Field
      input: "",
      // State For Alert Message
      message: "",
      // State For Theme
      theme: "",
    };
  }
  static contextType = todoContext;
  // After Render Page This Function Will Run And Fetch Api Data
  // And Store In Context State As Well As Localstorge
  componentDidMount() {
    const todos = this.context;
    fetch("https://dummyjson.com/todos")
      .then((response) => response.json())
      .then((data) => {
        todos.loader = false;
        if (JSON.parse(localStorage.getItem("myTodo")) !== null) {
          todos.todo = JSON.parse(localStorage.getItem("myTodo"));
        } else {
          todos.todo = data.todos;
        }
        localStorage.setItem("myTodo", JSON.stringify(todos.todo));
        this.setState({ input: "", theme: "Light" });
      });
  }
  // Input Handler Function
  inputHandler = (e) => {
    this.setState({ input: e.target.value });
  };
  // Add Todo Handler
  addHandler = () => {
    // Check Validation
    if (this.state.input === "") {
      this.setState({ message: "Blank Field Can Not be Added !!" });
    } else {
      let obj = {
        todo: this.state.input,
        id: Math.random() * 1000,
      };
      let tempArr = JSON.parse(localStorage.getItem("myTodo"));
      tempArr.unshift(obj);
      localStorage.setItem("myTodo", JSON.stringify(tempArr));
      this.setState({ message: "", input: "" });
    }
  };
  // Theme Handler
  themeHandler = (e) => {
    const theme = this.context;
    if (e.target.checked === true) {
      theme.theme = "Dark";
      this.setState({ theme: "Dark" });
    } else {
      theme.theme = "Light";
      this.setState({ theme: "Light" });
    }
  };

  render() {
    return (
      <section className={this.context.theme}>
        <div className="todo">
          <div className="d-flex justify-content-between">
            <h1 style={{ textAlign: "center" }}>Todos</h1>
            <div class="check-box">
              <input onChange={this.themeHandler} type="checkbox" />
              <br></br>
              <label>{this.context.theme} theme</label>
            </div>
          </div>
          {/* Input Add Todo Form */}
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Type New Todo..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={this.inputHandler}
              value={this.state.input}
            />
            <Button onClick={this.addHandler} variant="success">
              ADD
            </Button>
          </InputGroup>
          <hr></hr>
          {/* Alert Message */}
          {this.state.message !== "" ? (
            <Alert
              onClose={() => this.setState({ message: "" })}
              variant="danger"
              dismissible
            >
              <p>{this.state.message}</p>
            </Alert>
          ) : null}

          {/* Call Search Component */}
          <Search />

          {this.context.loader === true ? (
            // Display Loader
            <center>
              <Spinner animation="border" variant="primary" />
            </center>
          ) : (
            <div className="todo__list">
              {/* Display Todo List */}
              <h1 style={{ textAlign: "center" }}>All Todos</h1>
              <ListGroup>
                {JSON.parse(localStorage.getItem("myTodo")).map(
                  (val, index) => (
                    <ListGroup.Item className="p-3 mb-3">
                      <span>
                        <span className="me-5">{index + 1}:</span>
                        {val.todo}
                      </span>
                    </ListGroup.Item>
                  )
                )}
              </ListGroup>
            </div>
          )}
        </div>
      </section>
    );
  }
}
