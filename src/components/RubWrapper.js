import React, { Component } from "react";
import client from "../client";
import { ThemeProvider } from "styled-components";

class RubWrapper extends Component {
  state = {
    ready: false,
    rubrique: {
      fields: {
        slug: null
      }
    }
  };

  componentWillMount() {
    !!this.props.rubriqueId &&
      client.getEntry(this.props.rubriqueId).then(rubrique =>
        this.setState({
          rubrique: rubrique,
          ready: true
        })
      );
  }
  render() {
    return (
      <ThemeProvider theme={{ rubrique: this.props.hasRubrique ? this.state.rubrique.fields.slug : 'default' }}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}

export default RubWrapper;
