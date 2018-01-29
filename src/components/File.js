import React, { Component } from "react";
import Icon from "./Icon";
import client from "../client";
import styled from "styled-components";
import globals from "../utils/globals";
import { link } from "../utils/mixins";

const FileLink = styled.div`
  margin: ${globals.spaces.base};
  margin-left: 0;

  a {
    ${link};
  }

`;

class File extends Component {
  state = {
    ready: false,
    document: {}
  };

  componentWillMount() {
    client.getAsset(this.props.documentId).then(document =>
      this.setState({
        document: document,
        ready: true
      })
    );
  }
  render() {
    return (
      <div>
        {this.state.ready && (
          <FileLink>
            <a
              href={this.state.document.fields.file.url}
              title={this.state.document.fields.description}
              target="_blank"
            >
              <Icon icon="download" /> Télécharger la pièce jointe
            </a>
          </FileLink>
        )}
      </div>
    );
  }
}

export default File;
