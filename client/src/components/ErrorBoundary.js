import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  componentDidCatch(error, info) {
    console.log(`error: ${error}`);
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>
            Oops, something went wrong!
            {' '}
            {this.state.error.toString()}
          </p>
          {/* <p>
            Where it occured:
            {this.state.info.componentStack}
          </p> */}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
