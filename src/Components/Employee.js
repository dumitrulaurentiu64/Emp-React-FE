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
        if(window.confirm('Ești sigur că vrei să ștergi acest angajat?')){
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
                            { this.props.user.UserRole === 'admin' && <th>Cod Angajat</th> }
                            <th>Prenume</th>
                            <th>Nume</th>
                            <th>Funcție</th>
                            <th>Departament</th>
                            <th>Data Aderării</th>
                            { this.props.user.UserRole === 'admin' && <th>Salar Bază</th> }
                           { this.props.user.UserRole === 'admin' && <th>Spor</th> }
                           { this.props.user.UserRole === 'admin' && <th>Premii Brute</th> }
                           { this.props.user.UserRole === 'admin' && <th>Rețineri</th> }
                            { this.props.user.UserRole === 'admin' && <th>Opțiuni</th> }
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                                { this.props.user.UserRole === 'admin' && <td>{emp.EmployeeId}</td> }
                                <td>{emp.Firstname}</td>
                                <td>{emp.Lastname}</td>
                                <td>{emp.Position}</td>
                                <td>{emp.DepartmentId}</td>
                                <td>{emp.DateOfJoining}</td>
                                { this.props.user.UserRole === 'admin' && <td>{emp.BaseSalary}</td> }
                                { this.props.user.UserRole === 'admin' && <td>{emp.Increase}</td> }
                                { this.props.user.UserRole === 'admin' && <td>{emp.GrossPrizes}</td> }
                                { this.props.user.UserRole === 'admin' && <td>{emp.Deductions}</td> }
                                { this.props.user.UserRole === 'admin' && <td>
<ButtonToolbar id="EmpOptions">
    <Button className="mr-2" variant="secondary"
    onClick={()=>this.setState({editModalShow:true,
        empid:emp.EmployeeId,empfirstname:emp.Firstname,emplastname:emp.Lastname, empposition:emp.Position,depmt:emp.DepartmentId,photofilename:emp.PhotoFileName,doj:emp.DateOfJoining,basesalary:emp.BaseSalary, increase:emp.Increase, grossprizes:emp.GrossPrizes, deductions:emp.Deductions})}>
            Modifică
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.EmployeeId)}>
            Șterge
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

                { this.props.user.UserRole === 'admin' && <ButtonToolbar id="EmpAdd" >
                    <Button variant='dark'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Adaugă Angajat</Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose} />
                </ButtonToolbar> }
            </div>
        )
    }
}