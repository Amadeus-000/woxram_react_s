import React from "react";
import Pagination from "@mui/material/Pagination";
import { useLocation } from "react-router-dom";

const CustomPagination = ({ numberOfWorks }) => {
  const location = useLocation();

  const handleChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);

    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.location.href = newUrl;
  };

  const currentPage = new URLSearchParams(location.search).get("page") || 1;

  const pageCount=Math.ceil(numberOfWorks/50);

  return (
    <Pagination
      count={pageCount}
      page={parseInt(currentPage)}
      onChange={handleChange}
      variant="outlined"
      style={{ marginTop: "30px", marginBottom: "30px"}}
      sx={{
        transform: 'scale(0.8)',
        '& .MuiPagination-ul': {
          flexWrap: 'nowrap',
        },
      }}
    />
  );
};

export default CustomPagination;
