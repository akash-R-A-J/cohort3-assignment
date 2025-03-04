import React, { Component } from "react";

class ClassCounter extends Component {
  // states variables / attributes
  state = { count: 0 };

  // functions
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // for rendering
  render() {
    return (
      <div>
        {/* both components are wrapped inside the error-boundary*/}
        <ErrorBoundary>
          <Card />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <p>Count: {this.state.count}</p>
          <button onClick={this.increment}>Increment</button>
        </ErrorBoundary>
      </div>
    );
  }
}

// uses of Error boundary
function Card() {
  throw new Error("Error while rendering");
}

// can be used as a blackbox
// error-boundary -> errors can be displayed within the child without affecting parents, it will not propagate to the parents
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error caught: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ClassCounter;
