import React, { Fragment, useEffect, useState } from "react";
import quotesData from "./quotes.json";

function Home({ isLoggedIn }) {
    const [randomQuote, setRandomQuote] = useState(null);

    useEffect(() => {
        generateRandomQuote();
    }, []);

    function generateRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotesData.length);
        const quote = quotesData[randomIndex];
        setRandomQuote(quote);
    }
    return (
        <Fragment>
            {isLoggedIn ? (
                <Fragment>
                    <div>
                        {randomQuote ? (
                            <div className="quote-container">
                                <blockquote className="quote">
                                    <i>&ldquo;{randomQuote.q}&rdquo;</i>
                                </blockquote>{" "}
                                <br />
                                <p className="author">
                                    <b>&mdash; {randomQuote.a}</b>
                                </p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                        <div>
                            <h1>App Context</h1>
                            <center>
                                <p>
                                    Currently an excel file is used to share grades with the
                                    students. In order to modernize this process this web
                                    application has been created. Single Sign On for students /
                                    teachers / the administration is implemented to log in to the
                                    app and is redundant in terms of failures.
                                </p>
                            </center>
                        </div>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <h1>Goal of the App</h1>
                    <p>
                        This app has been designed in order to help the administration of a school
                        to share grades with students and teacher.
                    </p>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Home;
