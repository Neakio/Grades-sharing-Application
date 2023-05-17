import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


class Menu ({ userRole, isLoggedIn }) {
    const isAdmin = userRole.startsWith("Administrator");
    const isTeacher = userRole === "Teacher";
    const isReferent = userRole.endsWith("Referent");


    render() {
      var visibility = "hide";
   
      if (this.props.menuVisibility) {
        visibility = "show";
      }
   
      return (
        <Container>
            {isLoggedIn ? (
                <nav id="flyoutMenu">
                    <Row>
                        <Link to="/">
                            <Button>Home</Button>
                        </Link>
                    </Row>
                    {isAdmin ? (
                        <Row>
                            <Link to="/users">
                                <Button>Users</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {isAdmin || isTeacher ? (
                        <Row>
                            <Link to="/classes">
                                <Button>Classes</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {isAdmin ? (
                        <Row>
                            <Link to="/modules">
                                <Button>Modules</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {isAdmin ? (
                        <Row>
                            <Link to="/courses">
                                <Button>Courses</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {!isAdmin || isReferent ? (
                        <Row>
                            <Link to="/grades">
                                <Button>Grades</Button>
                            </Link>
                        </Row>
                    ) : null}
                </nav>
            ) : null}
        </Container>
      );
    }
  }
   
  export default Menu;



  import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./index.module.css";

const SlidingMenu = props => {
  const { isOpen, onChange,  userRole, isLoggedIn} = props;
  const isAdmin = userRole.startsWith("Administrator");
  const isTeacher = userRole === "Teacher";
  const isReferent = userRole.endsWith("Referent");

  const onClickHandler = () => {
    onChange(!isOpen);
  };

  return (
    <div className={styles.wrapper}>
      {/* Hamburger icon */}
      <div
        onClick={onClickHandler}
        className={cx(styles.hamburger, { [styles.active]: !isOpen })}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* sliding menu */}
      <div className={cx(styles.menu, { [styles.active]: !isOpen })}>
      <Container>
            {isLoggedIn ? (
                <nav id="flyoutMenu">
                    <Row>
                        <Link to="/">
                            <Button>Home</Button>
                        </Link>
                    </Row>
                    {isAdmin ? (
                        <Row>
                            <Link to="/users">
                                <Button>Users</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {isAdmin || isTeacher ? (
                        <Row>
                            <Link to="/classes">
                                <Button>Classes</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {isAdmin ? (
                        <Row>
                            <Link to="/modules">
                                <Button>Modules</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {isAdmin ? (
                        <Row>
                            <Link to="/courses">
                                <Button>Courses</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {!isAdmin || isReferent ? (
                        <Row>
                            <Link to="/grades">
                                <Button>Grades</Button>
                            </Link>
                        </Row>
                    ) : null}
                </nav>
            ) : null}
        </Container>
      </div>
    </div>
  );
};

SlidingMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

SlidingMenu.defaultProps = {
  isOpen: false
};

export default SlidingMenu;