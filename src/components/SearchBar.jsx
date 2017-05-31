import React from 'react';
import PropTypes from 'prop-types';
import '../styles/search-bar.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: props.currentSearch || '',
    };
    this.onEnterPress = this.onEnterPress.bind(this);
  }

  onEnterPress(event) {
    const keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode === 13) this.searchImages(this.state.searchQuery);
  }

  render() {
    return (
      <div className={`search-bar-container ${this.props.currentSearch ? 'search-bar-container-active' : ''}`}>
        <input
          id="search-query-input"
          placeholder={(this.props.currentSearch || 'Search the web for images')}
          value={this.state.searchQuery}
          onChange={({ target: { value } }) => this.setState({ searchQuery: value })}
          onKeyDown={this.onEnterPress}
        />
        {this.state.searchQuery
          && this.state.searchQuery !== this.props.currentSearch
          && (
          <button
            onClick={() => this.props.searchImages(this.state.searchQuery)}
          >
            <i className="fa fa-search" />
          </button>
        )}
      </div>
    );
  }
}

SearchBar.propTypes = {
  clearSearch: PropTypes.func,
  currentSearch: PropTypes.string,
  searchImages: PropTypes.func,
};

export default SearchBar;
