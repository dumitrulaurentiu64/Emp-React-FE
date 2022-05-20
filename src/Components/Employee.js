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
        const {emps, empid, empfirstname, emplastname, empposition, depmt, photofilename, doj, basesalary, increase, grossprizes, deductions}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div id="EmpDiv" >
                <Table className="mt-4 mx-4" striped bordered hover size ="sm" id="EmpTable">
                    <thead>
                        <tr>
                            { this.props.user.User_Role === 'admin' && <th>EmployeeId</th> }
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>DOJ</th>
                            { this.props.user.User_Role === 'admin' && <th>BaseSalary</th> }
                           { this.props.user.User_Role === 'admin' && <th>Increase</th> }
                           { this.props.user.User_Role === 'admin' && <th>GrossPrizes</th> }
                           { this.props.user.User_Role === 'admin' && <th>Deductions</th> }
                            { this.props.user.User_Role === 'admin' && <th>Options</th> }
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                                { this.props.user.User_Role === 'admin' && <td>{emp.EmployeeId}</td> }
                                <td>{emp.Firstname}</td>
                                <td>{emp.Lastname}</td>
                                <td>{emp.Position}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                { this.props.user.User_Role === 'admin' && <td>{emp.BaseSalary}</td> }
                                { this.props.user.User_Role === 'admin' && <td>{emp.Increase}</td> }
                                { this.props.user.User_Role === 'admin' && <td>{emp.GrossPrizes}</td> }
                                { this.props.user.User_Role === 'admin' && <td>{emp.Deductions}</td> }
                                { this.props.user.User_Role === 'admin' && <td>
<ButtonToolbar id="EmpOptions">
    <Button className="mr-2" variant="secondary"
    onClick={()=>this.setState({editModalShow:true,
        empid:emp.EmployeeId,empfirstname:emp.Firstname,emplastname:emp.Lastname, empposition:emp.Position,depmt:emp.Department,photofilename:emp.PhotoFileName,doj:emp.DateOfJoining,basesalary:emp.BaseSalary, increase:emp.Increase, grossprizes:emp.GrossPrizes, deductions:emp.Deductions})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.EmployeeId)}>
            Delete
        </Button>

        <EditEmpModal show={this.state.editModalShow}
        onHide={editModalClose}
        empid={empid}
        empfirstname={empfirstname}
        emplastname={emplastname}
        empposition={empposition}
        depmt={depmt}
        photofilename={photofilename}
        doj={doj}
        basesalary={basesalary}
        increase={increase}
        grossprizes={grossprizes}
        deductions={deductions}/>
</ButtonToolbar>

                                </td> }

                            </tr>)}
                    </tbody>

                </Table>

                { this.props.user.User_Role === 'admin' && <ButtonToolbar id="EmpAdd" >
                    <Button variant='dark'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee</Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose} />
                </ButtonToolbar> }
            </div>
        )
    }
}