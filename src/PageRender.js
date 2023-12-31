import React from "react";
import { useParams } from "react-router-dom";
import reg from "./pages/register";
import NotFound from "./components/NotFound";
import { useSelector } from "react-redux";

const generatePage = (pageName) => {
  const component = () => require(`./pages/${pageName}`).default;
  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);
  if (auth.token) {
    let pageName = "";
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
    console.log(pageName);

    return generatePage(pageName);
  }
};

export default PageRender;
