import React from "react";
import FetchNotes from "./FetchNotes";
import AddNotes from "./AddNotes";
import Alert from "./Alert";

const Home = () => {
  return (
    <>
      <Alert/>
      <AddNotes/>
      <FetchNotes/>
    </>
  );

};

export default Home;
