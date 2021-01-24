import React from "react";
import PropTypes from "prop-types";

const DataBody = ({data}) => (
    <div className="navigation-header">
        {data}
    </div>
)

DataBody.propTypes = {
    // TODO update to object since this is what it will be in future.
  data: PropTypes.string.isRequired,

}
export default DataBody;