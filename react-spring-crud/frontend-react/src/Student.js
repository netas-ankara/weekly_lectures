import React, { Component } from "react";
import { Button, Segment, Table, Label, FormGroup } from "semantic-ui-react";
import './index.css';


const API = `http://localhost:8080/api/student`;
const APISCHOOL = `http://localhost:8080/api/school`;

class Student extends Component {
  constructor(props) {
    super(props);
    this.handleChangeIN = this.handleChangeIN.bind(this);
    this.handleChangeIS = this.handleChangeIS.bind(this);
    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleChangeIC = this.handleChangeIC.bind(this);
    this.handleChangeIP = this.handleChangeIP.bind(this);
    this.handleChangeISchool = this.handleChangeISchool.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);


    this.state = {
      isLoading: false,
      students: [],
      schools : [],
      selectedStudent: [],
      addStudent: false
    };

    this.studentEdit = {
      studentName : '',
      studentSurname: '',
      studentCity: '',
      studentDistinct: '',
      studentPhone: '',
      studentSchool: ''
    };
  }

  async componentDidMount() {
    const response = await fetch(API, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    this.setState({ students: body, isLoading: false });

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

  //EDIT SCHOOL
  async handleClickEdit(studentId) {
    await fetch(`http://localhost:8080/api/school/${studentId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(async response => {
      this.setState({
        addSchool: false,
        selectedStudent: await response.json()
      });
    });
  }

  handleChangeIN = (e) => {
    this.studentEdit.studentName = e.target.value;
 
   }
   handleChangeIC= (e) => {
     this.studentEdit.studentCity = e.target.value;
 
   }
   handleChangeIP = (e) => {
     this.studentEdit.studentPhone = e.target.value;
   }

   handleChangeIS = (e) => {
    this.studentEdit.studentSurname = e.target.value;
  }

  handleChangeID = (e) => {
    this.studentEdit.studentDistinct = e.target.value;
  }

  handleChangeISchool = (e) => {
    this.studentEdit.studentSchool = e.target.value;
  }

  async onEdit(studentId){
    console.log(API + `/${studentId}`);
      const student = await (await fetch(API + `/${studentId}`)).json();
      this.studentEdit = student;
      console.log(this.studentEdit);
          
      document.getElementById("sname").value = this.studentEdit.studentName;
      document.getElementById("ssurname").value = this.studentEdit.studentSurname;
      document.getElementById("sphone").value = this.studentEdit.studentPhone;
      document.getElementById("scity").value = this.studentEdit.studentCity;
      document.getElementById("sdistinct").value = this.studentEdit.studentDistinct;

    }

  async onSubmit(e) {
    e.preventDefault();
    let body = "";
    let response = "";
    try {
      response = await fetch(API, {
        method: (this.studentEdit.studentId) ? "PUT" : "POST",
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify(this.studentEdit),
      });
    }catch(error){
      console.error(`Error is  : ` + error);
    }
    console.log(body);
window.location.reload();
  }

  //REMOVE STUDENT
  async remove(studentId) {
    await fetch(`http://localhost:8080/api/student/${studentId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      window.location.reload();
    });
  }

  render() {
    const { students } = this.state;
    return (
      <div>
        <form id='inputlar' onSubmit={this.onSubmit}>
          <FormGroup>
           <Segment inverted>
            <Table.Cell>
                <Table.Row> 
                        <Table.Cell>
                                <input type="text" id="sname" defaultValue={this.studentEdit.studentName} placeholder="Name" name="sn" onChange={this.handleChangeIN}/>
                        </Table.Cell>
                        <Table.Cell>
                                <input type="text" id="ssurname" defaultValue={this.studentEdit.studentSurname} placeholder="Surname" name="is" onChange={this.handleChangeIS}/>
                        </Table.Cell>
                        <Table.Cell>
                                <input type="text" id="sphone" defaultValue={this.studentEdit.studentPhone} placeholder="Phone" name="ib" onChange={this.handleChangeIP}/>
                        </Table.Cell>
                        <Table.Cell>
                                <input type="text" id="scity" defaultValue={this.studentEdit.studentCity} placeholder="City" name="ia" onChange={this.handleChangeIC}/>
                        </Table.Cell>
                        <Table.Cell>
                              <input type="text" id="sdistinct" defaultValue={this.studentEdit.studentDistinct} placeholder="Distinct" name="ip" onChange={this.handleChangeID}></input>
                        </Table.Cell>
                        <Table.Cell>
<select onChange={this.handleChangeISchool} id='sschool' name='isc'>
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
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>District</Table.HeaderCell>
              <Table.HeaderCell>School</Table.HeaderCell>
              <Table.HeaderCell>Settings</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {students.map(student => (
            <Table.Row id={student.studentId}>
              <Table.Cell>{student.studentName}</Table.Cell>
              <Table.Cell>{student.studentSurname}</Table.Cell>
              <Table.Cell>{student.studentPhone}</Table.Cell>
              <Table.Cell>{student.studentCity}</Table.Cell>
              <Table.Cell>{student.studentDistinct}</Table.Cell>
              <Table.Cell>{student.studentSchool}</Table.Cell>
              <Segment inverted>
                <Table.Cell>
                <Button type="button" inverted color="teal" onClick={() => {this.onEdit(student.studentId); }} > Edit </Button> 
                </Table.Cell>
                <Table.Cell>
                  <Button type="button" inverted color="red"
                    onClick={() => {  this.remove(student.studentId); }}  >
                     {" "}Delete{" "}
                  </Button>
                </Table.Cell>
              </Segment>
            </Table.Row>
          ))}
        </Table>
      </div>
    );
  }
}

export default Student;
