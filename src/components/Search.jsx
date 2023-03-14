import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import FallbackImg from "../assets/fallBack.png";
// Search Component
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Search Array Data
      search: [],
      message: false,
    };
  }
  // Search Handler
  searchHandler = (e) => {
    // Make Local Array
    let temp = [];
    let allData = JSON.parse(localStorage.getItem("myTodo"));
    if (e.target.value.length >= 2) {
      for (let i = 0; i < allData.length; i++) {
        if (
          allData[i].todo.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          temp.push(allData[i]);
          this.setState({ message: false });
        } else {
          this.setState({ message: true });
        }
      }
      this.setState({ search: temp });
    } else if (e.target.value.length === 0) {
      this.setState({ search: [] });
      this.setState({ message: false });
    }
  };
  render() {
    return (
      <div>
        <center>
          <InputGroup style={{ width: "70%" }} className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i class="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search Your Todos..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={this.searchHandler}
            />
          </InputGroup>
        </center>
        {/* Search Todo List */}
        {this.state.search.length !== 0 ? (
          <div className="todo__list">
            <h1 style={{ textAlign: "center" }}>Your Search Result</h1>
            <ListGroup>
              {this.state.search.map((val, index) => (
                <ListGroup.Item className="p-3 mb-3">
                  <span>
                    <span className="me-5">{index + 1}:</span>
                    {val.todo}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        ) : null}
        {/* Fall Back Image */}
        <center>
          {this.state.message === true && this.state.search.length === 0 ? (
            <>
              <img
                style={{ width: "80%" }}
                src={FallbackImg}
                alt="FallBackResult"
              />
              <hr></hr>
            </>
          ) : null}
        </center>
      </div>
    );
  }
}
