import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Page = props => {
  const { itemsCount, pageSize, currPage, onPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(p => (
          <li
            key={p}
            className={p === currPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPage(p)}>
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Page.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  onPage: PropTypes.func.isRequired
};

export default Page;
