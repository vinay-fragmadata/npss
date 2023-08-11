import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Breadcrumbs as BreadCrumbs } from "@mui/material";
import Link from "@mui/material/Link";
import { APP_ROUTES_BREADCRUMBS } from "../../configs/routes";

import "./style.css";

const Breadcrumbs = ({ match }: { match: string }) => {
  const navigate = useNavigate();

  const breadCrumb = APP_ROUTES_BREADCRUMBS[match];

  /**
   * @description Redirecting to respective page
   *
   * @param {String} url
   */
  const goToRoute = (url: string) => {
    if (url) navigate(url);
  };

  return (
    <div role="presentation">
      <BreadCrumbs aria-label="breadcrumb">
        {breadCrumb.map(({ url, name }, index) => {
          if (url) {
            return (
              <Link
                underline="hover"
                key={`${name}-${index}`}
                color="inherit"
                onClick={() => goToRoute(url)}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  className="breadcrumb-text-regular"
                  color="text.secondary"
                  sx={{ cursor: "pointer" }}
                >
                  {name}
                </Typography>
              </Link>
            );
          }
          return (
            <Typography
              className="breadcrumb-text-medium"
              key={`${name}-${index}`}
              color="text.primary"
              sx={{ cursor: "default" }}
            >
              {name}
            </Typography>
          );
        })}
      </BreadCrumbs>
    </div>
  );
};
export default Breadcrumbs;
