import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: props.currentSearch || '',
    };
  }
  render() {
    return (
      <div className="search-bar-container">
        <input
          id="search-query-input"
          placeholder={(this.props.currentSearch || 'Search the web')}
          value={this.state.searchQuery}
          onChange={({ target: { value } }) => this.setState({ searchQuery: value })}
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
  currentSearch: PropTypes.string,
  searchImages: PropTypes.func,
};

export default SearchBar;
