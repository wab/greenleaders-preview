import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import client from "./client";
import moment from "moment";
import typography from "./utils/typography";
import { Page, Row, Column } from "hedron";
import Thumbnail from "./components/Thumbnail";
import SectionTitle from "./components/SectionTitle";
import RubWrapper from "./components/RubWrapper";
import styled, { css } from "styled-components";
import colors, { rubriqueColor } from "./utils/colors";
import globals from "./utils/globals";
import { noBullet, position, link } from "./utils/mixins";
import mascotte from "./assets/images/mascotte.png";
import "moment/locale/fr";
moment.locale("fr");
typography.injectStyles();

const ArticleHeader = styled.header`
  margin-bottom: 65px;
  time {
    color: ${rubriqueColor};
    font-size: ${globals.sizes.small};
    text-transform: uppercase;
  }
  h1 {
    font-size: ${globals.sizes.large};
    margin-bottom: 8px;
    line-height: 1.2em;
  }

  h2 {
    color: ${colors.grey.base};
    font-size: ${globals.sizes.medium};
    line-height: 1.2em;
  }
`;

const Speech = styled.div`
  position: relative;
  @media (min-width: 1024px) {
    &:after {
      display: block;
      content: "";
      width: 113px;
      height: 181px;
      background-image: url(${mascotte});
      ${position(0, "-150px")};
    }
  }
`;

const Blockquote = styled.blockquote`
  margin: 1.5em 10px;
  position: relative;
  font-style: italic;
  font-weight: 300;
  &:before,
  &:after {
    color: ${rubriqueColor};
    font-size: ${globals.sizes.xlarge};
    font-weight: bold;
    font-style: normal;
    line-height: 1;
    font-family: Merriweather;
    opacity: 0.1;
    position: absolute;
    top: 0;
  }

  &:before {
    content: "“";
    left: -3rem;
  }
  &:after {
    content: "”";
    right: -2rem;
  }
`;

const includeListStyle = css`
  ul {
    ${noBullet("0 0 0 16px")};

    li {
      position: relative;
      &:before {
        display: inline-block;
        content: "";
        width: 8px;
        height: 8px;
        background-color: ${rubriqueColor};
        margin-left: -16px;
        margin-right: 8px;
      }
    }
  }
`;

const Summary = styled.section`
  font-size: ${globals.sizes.small};

  h1,
  h2,
  h3 {
    font-size: 1.2em;
    line-height: 1.5;
  }

  a {
    ${link};
  }

  ${includeListStyle};
`;

const Main = styled.main`
  h2,
  h3 {
    line-height: 1.2;
  }

  ${includeListStyle};

  a {
    ${link};
  }

  ol {
    ${noBullet(0)};
    li {
      padding-top: 3.5rem;
      position: relative;

      strong {
        color: ${rubriqueColor};
        display: block;
        font-weight: 400;
        text-transform: uppercase;
      }

      &:before {
        color: ${rubriqueColor};
        display: block;
        line-height: 1;
        font-size: ${globals.sizes.xlarge};
        font-family: ${globals.fonts.default};
        font-weight: 300;
        opacity: 0.2;
        position: absolute;
        top: 0;
        left: 0;
      }

      &:nth-child(1) {
        &:before {
          content: "1";
        }
      }
      &:nth-child(2) {
        &:before {
          content: "2";
        }
      }
      &:nth-child(3) {
        &:before {
          content: "3";
        }
      }
      &:nth-child(4) {
        &:before {
          content: "4";
        }
      }
    }
  }
`;

class Post extends Component {
  state = {
    ready: false,
    post: {}
  };

  componentWillMount() {
    client.getEntry(this.props.match.params.id).then(entry =>
      this.setState({
        post: entry,
        ready: true
      })
    );
  }
  renderPost = () => {
    const { createdAt } = this.state.post.sys || null;
    const {
      title,
      subtitle,
      rubrique,
      thumbnail,
      summary,
      main,
      speech,
      moreInfoUrl
    } = this.state.post.fields;

    return (
      <RubWrapper rubriqueId={rubrique.sys.id || null}>
        <div>
          <Page fluid>
            <article>
              <Row divisions={24}>
                <Column lg={5} lgShift={3} md={6} mdShift={1}>
                  {thumbnail && <Thumbnail imageId={thumbnail.sys.id} />}
                  {summary && (
                    <Summary>
                      <SectionTitle>en bref</SectionTitle>
                      <ReactMarkdown source={summary} />
                      <a href={moreInfoUrl}>En savoir plus</a>
                    </Summary>
                  )}
                </Column>
                <Column lg={12} mdShift={1} md={15}>
                  <ArticleHeader>
                    <time dateTime={createdAt}>
                      le {moment(createdAt).format("ll")}
                    </time>
                    <h1>{title}</h1>
                    <h2>{subtitle}</h2>
                  </ArticleHeader>
                  {main && (
                    <Main>
                      <SectionTitle>in concreto</SectionTitle>
                      <ReactMarkdown source={main} />
                    </Main>
                  )}

                  {speech && (
                    <Speech>
                      <SectionTitle>Discours</SectionTitle>
                      <Blockquote>
                        <ReactMarkdown source={speech} />
                      </Blockquote>
                    </Speech>
                  )}
                </Column>
              </Row>
            </article>
          </Page>
        </div>
      </RubWrapper>
    );
  };
  render() {
    // const { createdAt } = this.state.post.site;
    if (!this.state.ready) return "en chargement ...";

    return this.renderPost();
  }
}

const App = () => (
  <Router>
    <Route path="/:id" component={Post} />
  </Router>
);

export default App;
