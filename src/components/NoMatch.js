import React from "react";
import {useLocation} from "react-router-dom";

export default function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        404 - page <code>{location.pathname} not found!</code>
      </h3>
    </div>
  );
}