import React, { Fragment, useEffect, useState } from "react";
import LoginForm from "../render-components/Form/LogForm";

function Home({ isLoggedIn }) {
    const [quote, setQuote] = useState({});

    useEffect(() => {
        fetch("https://zenquotes.io/api/random")
            .then((response) => response.json())
            .then((data) => setQuote(data[0]))
            .catch((error) => console.error(error));
    }, []);

    return (
        <Fragment>
            {isLoggedIn ? (
                <Fragment>
                    <div>
                        <p>
                            <i>{quote.q}</i>, <b>{quote.a}</b>
                        </p>
                    </div>
                    <div>
                        <h1>App Context</h1>
                        <p></p>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <LoginForm></LoginForm>
                    <h1>Goal of the App</h1>
                    <p></p>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Home;
