import React, { Component } from "react";
import Todo from "./components/Todo";
import { todoContext } from "./context/TodoContext";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      loader: true,
      theme: "Light",
    };
  }
  render() {
    return (
      <div>
        {/* Pass State Value In Context Provider */}
        <todoContext.Provider value={this.state}>
          <Todo />
        </todoContext.Provider>
      </div>
    );
  }
}
