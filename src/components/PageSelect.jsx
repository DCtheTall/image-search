import React from 'react';
import PropTypes from 'prop-types';
import '../styles/page-select.scss';

/**
 * PageSelect Stateless Functional Component
 * @param {Object} props Component props
 * @returns {String} HTML
 */
function PageSelect({ currentPage, setPage }) {
  return (
    <div className="page-select-container row">
      {!!currentPage && (
        <div className="col-xs-3">
          <button
            onClick={() => setPage(0)}
          >
            <i className="fa fa-chevron-left" />
            <i className="fa fa-chevron-left" />
          </button>
        </div>
      )}
      {!!currentPage && (
        <div className="col-xs-3">
          <button
            onClick={() => setPage(currentPage - 1)}
          >
            <i className="fa fa-chevron-left" />
          </button>
        </div>
      )}
      {!currentPage && <div className="col-xs-6 spacer" />}
      <div className="col-xs-3">
        {`Page ${currentPage + 1}`}
      </div>
      <div className="col-xs-3">
        <button
          onClick={() => setPage(currentPage + 1)}
        >
          <i className="fa fa-chevron-right" />
        </button>
      </div>
    </div>
  );
}
PageSelect.propTypes = {
  currentPage: PropTypes.number,
  setPage: PropTypes.func,
};

export default PageSelect;
