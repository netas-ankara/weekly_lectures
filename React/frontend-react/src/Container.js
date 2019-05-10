import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

 
import Home from './Home'
import School from './School';
import Instructor from "./Instructor";
import Student from './Student';

function Container() {
  return (
    <div>
       <TransitionGroup>
        <CSSTransition  timeout={{ enter: 300, exit: 300 }}>
        <section className="route-section">
            <Switch >
                <Route exact path="/" component={() => <Home></Home>} />
                <Route exact path="/home" component={() => <Home></Home>} />
                <Route exact path="/school" component={() => <School></School>} />
                <Route exact path="/school/:schoolId" component={() => <School></School>} />
                <Route exact path="/instructor" component={() => <Instructor></Instructor>} />
                <Route exact path="/student" component={() => <Student></Student>} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}



export default withRouter(Container);
