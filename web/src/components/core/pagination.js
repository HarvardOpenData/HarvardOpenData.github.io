/** @jsx jsx */
import { jsx, Button } from "theme-ui";
import Link from "./link";
import theme from "../../styles/theme";

const Pagination = ({ prefix, pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  if (numPages < 2) {
    return <div></div>;
  }

  return (
    <div className="pagination" style={{ textAlign: "center" }}>
      {!isFirst && (
        <Link to={`${prefix}/${prevPage}`} rel="prev">
          <b>{`← Previous `}</b>
        </Link>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <Button
          color="text"
          bg="white"
          sx={{
            border: theme => i+1 === currentPage && `1px solid ${theme.colors.text}`,
            ":hover": {
              bg: "container",
            }
          }}
          to={`${prefix}/${i === 0 ? "" : i + 1}`}
        >
          <Link
            key={`pagination-number${i + 1}`}
            to={`${prefix}/${i === 0 ? "" : i + 1}`}
          >
            <b>{`${i + 1}`}</b>
          </Link>
        </Button>
      ))}
      {!isLast && (
        <Link to={`${prefix}/${nextPage}`} rel="next">
          <b>{` Next →`}</b>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
