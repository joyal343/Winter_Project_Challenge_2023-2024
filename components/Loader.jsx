import React from "react";

const Loader = (props) => {
  return (<>
    {props.isLoading &&
      <div className={"fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50 "}>
        <div className={"w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin " }></div>
      </div>
    }
  </>);
};

export default Loader;