import React, { useEffect, useState } from "react";

function Home({ isLoggedIn }) {
  function Quote() {
    const [quote, setQuote] = useState({});

    useEffect(() => {
      fetch("https://zenquotes.io/api/random")
        .then((response) => response.json())
        .then((data) => setQuote(data[0]))
        .catch((error) => console.error(error));
    }, []);

    return quote;
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <p>
            <i>{/* Quote.quote.q */}</i>, <b>{/* Quote.quote.a */}</b>
          </p>
          <h1>App Context</h1>
          <p></p>
        </>
      ) : (
        <>
          <h1>Goal of the App</h1>
          <p></p>
        </>
      )}
    </>
  );
}

export default Home;
