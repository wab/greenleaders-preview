import React, { Component } from "react";
import _ from "lodash";
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
    const rubrique = this.state.ready ? this.state.rubrique.fields : null;
    return (
      <ThemeProvider theme={{ rubrique: this.state.rubrique.fields.slug }}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}

export default RubWrapper;
