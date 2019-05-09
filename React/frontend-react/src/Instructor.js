import React, {Component} from 'react';
import { Button, Segment, Table, Label } from "semantic-ui-react";
import {FormGroup} from "semantic-ui-react";
import './index.css';


const API = `http://localhost:8080/api/instructor`;
const APISCHOOL = `http://localhost:8080/api/school`;

class Instructor extends Component{
  
    constructor(props){
      super(props);
  
      this.toggleDiv = this.toggleDiv.bind(this);
      this.handleChangeIN = this.handleChangeIN.bind(this);
      this.handleChangeIS = this.handleChangeIS.bind(this);
      this.handleChangeIB = this.handleChangeIB.bind(this);
      this.handleChangeIA = this.handleChangeIA.bind(this);
      this.handleChangeIP = this.handleChangeIP.bind(this);
      this.handleChangeISchool = this.handleChangeISchool.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onEdit = this.onEdit.bind(this);



      this.state = {
          isLoading: false,
          addInstructor: false,
          instructors : [],
          schools: [],
          selectedInstructor: [],
          show: true          
      };

      this.instructorEdit = {
        instructorName : '',
        instructorSurname: '',
        instructorBranch: '',
        instructorAge: '',
        instructorPhone: '',
        instructorSchool: ''
      };
}

toggleDiv = () => {
  const {show} = this.state;
  this.setState({show : !show})
}
    //FETCH INSTRUCTORS
       async componentDidMount() {
          const response = await fetch(API,{
            method: 'GET',   
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'            }
          }, );
          console.log(response)

          const body = await response.json();
          this.setState({instructors: body, isLoading: false});

          const response2 = await fetch(APISCHOOL, {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          });
       
          console.log("school : " + response2);
      
          const body2 = await response2.json();
          this.setState({ schools: body2, isLoading: false, update: false });
        }

    //EDIT INSTRUCTORS	
    async handleClickEditInstructors(instructorId){
      console.log(instructorId + " instructor ID");
      
      const response = await fetch(API+{instructorId} ,{
        method:'GET',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }},  ).then(() => {
        const body =  response.json();
        this.setState({selectedInstructor:body, addInstructor: true });
      });
      console.log(response + "response")
    };

    //REMOVE INSTRUCTOR
	 async removeInstructor(instructorId) {
    console.log(instructorId + " is deleted.");
         await fetch(`http://localhost:8080/api/instructor/${instructorId}` , {
           method: 'DELETE',
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
         }).then(() => {
           window.location.reload();
         });
   }

   handleChangeIN = (e) => {
    this.instructorEdit.instructorName = e.target.value;
 
   }
   handleChangeIA = (e) => {
     this.instructorEdit.instructorAge = e.target.value;
 
   }
   handleChangeIP = (e) => {
     this.instructorEdit.instructorPhone = e.target.value;
   }

   handleChangeIS = (e) => {
    this.instructorEdit.instructorSurname = e.target.value;
  }

  handleChangeIB = (e) => {
    this.instructorEdit.instructorBranch = e.target.value;
  }

  handleChangeISchool = (e) => {
    this.instructorEdit.instructorSchoolName = e.target.value;
  }

  async onEdit(instructorId){
    console.log(API + `/${instructorId}`);
      const instructor = await (await fetch(API + `/${instructorId}`)).json();
      this.instructorEdit = instructor;
      console.log(this.instructorEdit);
          
      document.getElementById("iname").value = this.instructorEdit.instructorName;
      document.getElementById("isurname").value = this.instructorEdit.instructorSurname;
      document.getElementById("iphone").value = this.instructorEdit.instructorPhone;
      document.getElementById("iage").value = this.instructorEdit.instructorAge;
      document.getElementById("ibranch").value = this.instructorEdit.instructorBranch;

    }

  async onSubmit(e) {
    e.preventDefault();
    let body = "";
    let response = "";
    try {
      response = await fetch(API, {
        method: (this.instructorEdit.instructorId) ? "PUT" : "POST",
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify(this.instructorEdit),
      });
    }catch(error){
      console.error(`Error is  : ` + error);
    }
    console.log(body);
window.location.reload();
  }

   addInstructorBox(){
    return(
      <form>
        <label htmlFor="instructorName">Name</label>
        <input id="instructorName" name="schoolName" type="text" />"  

          
        <label htmlFor="instructorSurname">Surname</label>
        <input id="instructorSurname" name="schoolSurname" type="text" />
        {/*  */}
        <label htmlFor="instructorBranch">Branch</label>
        <input id="instructorBranch" name="instructorBranch" type="text" />
              
        <label htmlFor="instructorAge">Age</label>
        <input id="instructorAge" name="instructorAge" type="text" />
        
        <label htmlFor="instructorPhone">Phone</label>
        <input id="instructorPhone" name="instructorPhone" type="text" />	 
            

        <label htmlFor="instructorSchoolName">School Name</label>
        <input id="instructorSchoolName" name="instructorSchoolName" type="text" />	 
      
     <button>Send data!</button>
    </form>
    );
  }


    


    render(){
      const {instructors} = this.state;
      return(
        <div>
          <form id='inputlar' onSubmit={this.onSubmit}>
          <FormGroup>
           <Segment inverted>
            <Table.Cell>
                <Table.Row> 
                        <Table.Cell>
                                <input type="text" id="iname" defaultValue={this.instructorEdit.instructorName} placeholder="Name" name="sn" onChange={this.handleChangeIN}/>
                        </Table.Cell>
                        <Table.Cell>
                                <input type="text" id="isurname" defaultValue={this.instructorEdit.instructorSurname} placeholder="Surname" name="is" onChange={this.handleChangeIS}/>
                        </Table.Cell>
                        <Table.Cell>
                                <input type="text" id="ibranch" defaultValue={this.instructorEdit.instructorBranch} placeholder="Branch" name="ib" onChange={this.handleChangeIB}/>
                        </Table.Cell>
                        <Table.Cell>
                                <input type="text" id="iage" defaultValue={this.instructorEdit.instructorAge} placeholder="Age" name="ia" onChange={this.handleChangeIA}/>
                        </Table.Cell>
                        <Table.Cell>
                              <input type="text" pattern="(\+389)[\-]\d{3}[\-]\d{3}" id="iphone" defaultValue={this.instructorEdit.instructorPhone} placeholder="Phone" name="ip" onChange={this.handleChangeIP}></input>
                        </Table.Cell>
                        <Table.Cell>
<select onChange={this.handleChangeISchool} id='ischool' name='isc'>
<option value='0'>Select School</option>
{this.state.schools.map(school => 
  <option id={school.schoolName} value={school.schoolName}>{school.schoolName}</option> )}
  </select>              
         </Table.Cell>
                              <Button inverted type="submit" color="yellow" onSubmit={this.onSubmit} > Save </Button>
                              <Label as="a" basic color="blue"> SCHOOLS </Label>
                  </Table.Row>
            </Table.Cell>
          </Segment>
        </FormGroup>
      </form>
        <Table inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Surname</Table.HeaderCell>
              <Table.HeaderCell>Branch</Table.HeaderCell>
              <Table.HeaderCell>Age</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>School</Table.HeaderCell>
              <Table.HeaderCell>Settings</Table.HeaderCell>
            </Table.Row>
           </Table.Header>
              {instructors.map(instructor =>
               <Table.Row id={instructor.instructorId}>
                  <Table.Cell>{instructor.instructorName} </Table.Cell>
                  <Table.Cell>{instructor.instructorSurname} </Table.Cell>
                  <Table.Cell>{instructor.instructorBranch}</Table.Cell>
                  <Table.Cell>{instructor.instructorAge}</Table.Cell>
                  <Table.Cell>{instructor.instructorPhone}</Table.Cell>
                  <Table.Cell>{instructor.instructorSchoolName}</Table.Cell>
              <Segment inverted>
              <Table.Cell>
                    <Button type="button" inverted color="teal" onClick={() => {this.onEdit(instructor.instructorId); }} > Edit </Button> 
                 </Table.Cell>
                <Table.Cell>
                  <Button type="button" inverted color="red"
                    onClick={() => { this.removeInstructor(instructor.instructorId); }}> Delete</Button>
                </Table.Cell>
              </Segment>
            </Table.Row>
              )}
      </Table>
    </div>
      );
    }
}



export default Instructor;