import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component{
    mounted = false;

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate() {
        //this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'employee/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
        this.refreshList();
    }
    render(){
        const {emps, empid, empname, depmt, photofilename, doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4 mx-4" striped bordered hover size ="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>DOJ</th>
                            <th>BaseSalary</th>
                            <th>Increase</th>
                            <th>GrossPrizes</th>
                            <th>Deductions</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.Name}</td>
                                <td>{emp.Lastname}</td>
                                <td>{emp.Position}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>{emp.BaseSalary}</td>
                                <td>{emp.Increase}</td>
                                <td>{emp.GrossPrizes}</td>
                                <td>{emp.Deductions}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        empid:emp.EmployeeId,empname:emp.Name,depmt:emp.Department,photofilename:emp.PhotoFileName,doj:emp.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.EmployeeId)}>
            Delete
        </Button>

        <EditEmpModal show={this.state.editModalShow}
        onHide={editModalClose}
        empid={empid}
        empname={empname}
        depmt={depmt}
        photofilename={photofilename}
        doj={doj}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee</Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
    
}