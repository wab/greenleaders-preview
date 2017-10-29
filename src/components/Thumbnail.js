import React, { Component } from "react";
import client from "../client";
import styled from "styled-components";
import colors from "../utils/colors";
import globals from "../utils/globals";

const Figure = styled.figure`
  img {
    margin-bottom: 0;
  }
  figcaption {
    color: ${colors.grey.base};
    font-size: ${globals.sizes.xsmall};
    font-style: italic;
  }
`;

class Thumbnail extends Component {
  state = {
    ready: false,
    asset: {}
  };

  componentWillMount() {
    client.getAsset(this.props.imageId).then(asset =>
      this.setState({
        asset: asset,
        ready: true
      })
    );
  }
  render() {
    return (
      <Figure>
        {this.state.ready && (
          <img src={this.state.asset.fields.file.url} alt="" />
        )}
        {/* {caption && <figcaption>{caption}</figcaption>} */}
      </Figure>
    );
  }
}

export default Thumbnail;
