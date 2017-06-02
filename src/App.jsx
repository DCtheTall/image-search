import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Promise from 'bluebird';
import {
  ImageResult,
  PageSelect,
  SearchBar,
} from './components';
import './styles/app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: '',
      currentPage: 0,
      error: false,
      imgSources: [],
      searching: false,
    }
    this.getImgSources = this.getImgSources.bind(this);
    this.getImageThumbnails = this.getImageThumbnails.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  getImgSources(query) {
    Promise.promisify(this.setState).call(this, { currentSearch: query, error: false, searching: true, imgSources: [] })
      .then(() => axios.get(`/api/imagesearch/${query}?offset=${10 * this.state.currentPage}`))
      .then((json) => {
        if (Array.isArray(json.data)) {
          this.setState({
            imgSources: json.data,
            searching: false,
            currentPage: query === this.state.currentSearch ? this.state.currentPage : 0,
          });
        } else {
          console.log(json);
          this.setState({ searching: false, error: true });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ searching: false, error: true });
      });
  }

  getImageThumbnails() {
    return this.state.imgSources.map(({ name, thumbnail, url }, i) => (
      <ImageResult
        key={i}
        name={name}
        thumbnail={thumbnail}
        url={url}
      />
    ))
  }

  setPage(value) {
    console.log(value);
    Promise.promisify(this.setState).call(this, { currentPage: value })
      .then(() => this.getImgSources(this.state.currentSearch));
  }

  render() {
    return (
      <div className="app-container container">
        <SearchBar
          currentSearch={this.state.currentSearch}
          searchImages={this.getImgSources}
        />
        {this.state.error && (
          <div className="error">
            Oops, something went wrong...
          </div>
        )}
        {this.state.searching && (
          <div className="spinner">
            <i className="fa fa-refresh fa-spin" />
          </div>
        )}
        {Boolean(this.state.imgSources.length) && (
          <div>
            <div className="row image-results">
              {this.getImageThumbnails()}
            </div>
            <PageSelect
              currentPage={this.state.currentPage}
              setPage={this.setPage}
            />
          </div>
        )}
      </div>
    )
  }
}

ReactDOM.render(
  (<App />),
  document.getElementById('entry-point')
);
