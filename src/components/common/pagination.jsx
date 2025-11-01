import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import './Pagination.css';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  const maxPagesToShow = 5; // Number of pages to show around the current page
  const pages = [];

  // Calculate the range of pages to display
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(pagesCount, startPage + maxPagesToShow - 1);

  // Adjust startPage if the range is too small
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Add page numbers to the array
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <li
        key={i}
        className={i === currentPage ? "page-item active" : "page-item"}
      >
        <a className="page-link" onClick={() => onPageChange(i)}>
          {i}
        </a>
      </li>
    );
  }

  // Add ellipsis if there are pages before the startPage
  if (startPage > 1) {
    pages.unshift(
      <li key="start-ellipsis" className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    );
  }

  // Add ellipsis if there are pages after the endPage
  if (endPage < pagesCount) {
    pages.push(
      <li key="end-ellipsis" className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    );
  }

  return (
    <nav>
      <ul className="pagination">
        {/* First Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a className="page-link" onClick={() => onPageChange(1)}>
            First
          </a>
        </li>

        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </a>
        </li>

        {/* Page Numbers */}
        {pages}

        {/* Next Button */}
        <li className={`page-item ${currentPage === pagesCount ? "disabled" : ""}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </a>
        </li>

        {/* Last Button */}
        <li className={`page-item ${currentPage === pagesCount ? "disabled" : ""}`}>
          <a className="page-link" onClick={() => onPageChange(pagesCount)}>
            Last
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
