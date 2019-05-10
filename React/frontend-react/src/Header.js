import React from "react";
import { Link } from "react-router-dom";
import { Label, Segment } from "semantic-ui-react";

function Header() {
  return (
    <div>
      <Segment inverted>
        <ul>
            <li>
              <Label as="a" basic color="blue">
                <Link to="/">HOME</Link>
              </Label>
            </li>
            <li>
              <Label as="a" basic color="blue">
                <Link to="/school">SCHOOL</Link>
              </Label>
            </li>
            <li>
              <Label as="a" basic color="blue">
                <Link to="/instructor">INSTRUCTOR</Link>
              </Label>
            </li>
            <li>
              <Label as="a" basic color="blue">
                <Link to="/student">STUDENT</Link>
              </Label>
            </li>
        </ul>
      </Segment>
    </div>
  );
}

export default Header;
