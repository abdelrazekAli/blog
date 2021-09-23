import React from "react";
import Head from "./blog/Head";
class NotFound extends React.Component {
  componentDidMount() {
    this.props.history.replace("/not-found");
  }
  render() {
    return (
      <div>
        <Head title="404 not found" />
      </div>
    );
  }
}

export default NotFound;
