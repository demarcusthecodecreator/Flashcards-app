import React from "react";

const AppBreadcrumb = (props) => {
  const itemsLength = props.breadcrumbItems.length;
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {props.breadcrumbItems.map((item, key) =>
          key + 1 === itemsLength ? (
            <li className="breadcrumb-item" key={key}>
              <a href={item.link}>{item.title}</a>
            </li>
          ) : (
            <li className="breadcrumb-item" key={key}>
              <a href={item.link}>{item.title}</a>
            </li>
          )
        )}
      </ol>
    </nav>
  );
};

export default AppBreadcrumb;
