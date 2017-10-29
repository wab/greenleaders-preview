import React, { Component } from "react";
import client from "../client";
import { ThemeProvider } from "styled-components";

class RubWrapper extends Component {
  state = {
    ready: false,
    rubrique: {}
  };

  componentWillMount() {
    client.getEntry(this.props.rubriqueId).then(rubrique =>
      this.setState({
        rubrique: rubrique,
        ready: true
      })
    );
  }
  render() {
    return this.state.ready ? (
      <ThemeProvider theme={{ rubrique: this.state.rubrique.fields.slug }}>
        {this.props.children}
      </ThemeProvider>
    ) : null;
  }
}

export default RubWrapper;
