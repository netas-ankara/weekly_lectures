import React, { Component } from "react";
import { Button, Segment, Table, Label, FormGroup} from "semantic-ui-react";
import './index.css';


const API = `http://localhost:8080/api/school`;

class School extends Component {
  constructor(props) {
    super(props);
    this.handleChangeSN = this.handleChangeSN.bind(this);
    this.handleChangeSA = this.handleChangeSA.bind(this);
    this.handleChangeSP = this.handleChangeSP.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);


    this.state = {
      isLoading: true,
      selected: false,
      addSchool: false,
      schools: [],
      selectedSchool: [],
      // to add school
      schoolId : '',
      schoolName : '' , //school Name
      schoolAddress : '' , //school Address
      schoolPhone : ''   //school Phone
    };

    this.schoolEdit = {
      schoolName : '',
      schoolAddress: '',
      schoolPhone: '',
      schoolId: ''
    };

  }

  //FETCH SCHOOLS
  async componentDidMount() {
    const response = await fetch(API, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
 
    console.log(response);

    const body = await response.json();
    this.setState({ schools: body, isLoading: false, update: false });
  }


  //REMOVE SCHOOL
  async remove(schoolId) {
    console.log(schoolId + ` is deleted. `);
    await fetch(`http://localhost:8080/api/school/${schoolId}`, {
      method: "DELETE",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      window.location.reload();
    });
  }

  //  ADD SCHOOL 

  handleChangeSN = (e) => {
   this.schoolEdit.schoolName = e.target.value;

  }
  handleChangeSA = (e) => {
    this.schoolEdit.schoolAddress = e.target.value;

  }
  handleChangeSP = (e) => {
    this.schoolEdit.schoolPhone = e.target.value;
  }

  async onEdit(schoolId){
    console.log(API + `/${schoolId}`);
      const school = await (await fetch(API + `/${schoolId}`)).json();
      this.schoolEdit = school;
      console.log(this.schoolEdit);
          
      document.getElementById("sname").value = this.schoolEdit.schoolName;
      document.getElementById("sad").value = this.schoolEdit.schoolAddress;
      document.getElementById("sphone").value = this.schoolEdit.schoolPhone;

    }

  async onSubmit(e) {
    e.preventDefault();
    let body = "";
    let response = "";
    try {
      response = await fetch(API, {
        method: (this.schoolEdit.schoolId) ? "PUT" : "POST",
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify(this.schoolEdit),
      });
    }catch(error){
      console.error(`Error is  : ` + error);
    }
window.location.reload();
  }

  render() {
    const { schools } = this.state;
    return (
      <div>
        <form id='inputlar' onSubmit={this.onSubmit}>
          <FormGroup>
           <Segment inverted>
            <Table.Cell>
                <Table.Row> 
                        <Table.Cell>
                                <input type="text" id="sname" defaultValue={this.schoolEdit.schoolName} placeholder="School Name" name="sn" onChange={this.handleChangeSN}/>
                        </Table.Cell>
                        <Table.Cell>
                              <input type="text" id="sad" defaultValue={this.state.schoolAddress} placeholder="School Address" name="sa" onChange={this.handleChangeSA}></input>
                        </Table.Cell>
                        <Table.Cell>
                              <input type="text" id="sphone" defaultValue={this.state.schoolPhone} placeholder="School Phone" name="sp" onChange={this.handleChangeSP}></input>
                        </Table.Cell>
                              <Button inverted type="submit" color="yellow" onSubmit={this.onSubmit} > Save </Button>
                              <Label as="a" basic color="blue"> SCHOOLS </Label>
                  </Table.Row>
            </Table.Cell>
          </Segment>
        </FormGroup>
      </form>
        <Table ui selectable inverted table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Settings</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {schools.map(school => (
            <Table.Row id={school.schoolId}>
              <Table.Cell>{school.schoolName}</Table.Cell>
              <Table.Cell>{school.schoolAddress}</Table.Cell>
              <Table.Cell>{school.schoolPhone}</Table.Cell>
              <Segment inverted>
                 <Table.Cell>
                    <Button type="button" inverted color="teal" onClick={() => {this.onEdit(school.schoolId); }} > Edit </Button> 
                 </Table.Cell>
                <Table.Cell>
                  <Button type="button" inverted  color="red" onClick={() => { this.remove(school.schoolId); }} > Delete </Button>                    
                </Table.Cell>
              </Segment>
            </Table.Row>
          ))}
        </Table>
      </div>
    );
  }
}

export default School;
