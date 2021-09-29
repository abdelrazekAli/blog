const Head = ({ title }) => {
  return (
    <div className="head d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-center">
        <h1 className="text-white display-2 mx-1">
          {title ? title : "Welcome to Our Blog"}
        </h1>
      </div>
    </div>
  );
};

export default Head;
