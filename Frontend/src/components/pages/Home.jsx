import React, { useEffect, useState } from "react";

function Home({ isLoggedIn }) {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    fetch("https://zenquotes.io/api/random")
      .then((response) => response.json())
      .then((data) => setQuote(data[0]))
      .catch((error) => console.error(error));
  }, []);
  console.log(quote);
  return (
    <>
      {isLoggedIn ? (
        <>
          <div>
            <p>
              <i>{quote.q}</i>, <b>{quote.a}</b>
            </p>
          </div>
          <div>
            <h1>App Context</h1>
            <p></p>
          </div>
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
