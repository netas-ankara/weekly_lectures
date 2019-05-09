import React, { Component } from 'react';
import {  Segment, Label } from "semantic-ui-react";

class Home extends Component{
  constructor(props){
    super(props);
  }
    render(){
      return(
        <div>
            <Segment inverted>
                <span id='welcome'>Welcome to School System. You can select menu with above buttons.</span>
            </Segment>
        </div>
        );
    }
  }

export default Home;