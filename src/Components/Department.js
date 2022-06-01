import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';

export class Department extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(prevState) {
        //this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm('Are you sure you want to delete this department??')){
            fetch(process.env.REACT_APP_API+'department/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
        this.refreshList();
    }
    render(){
        const {deps, depid,depname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div id="DepDiv">
                <Table className="mt-4 mx-4" striped bordered hover size ="sm" id="DepTable">
                    <thead>
                        <tr>
                            <th>Cod Departament</th>
                            <th>Nume Departament</th>
                            { this.props.user.UserRole === 'admin' && <th>Opțiuni</th> }
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                { this.props.user.UserRole === 'admin' && <td>
<ButtonToolbar id="DepOptions">
    <Button className="mr-2" variant="secondary"
    onClick={()=>this.setState({editModalShow:true,
        depid:dep.DepartmentId,depname:dep.DepartmentName})}>
            Modifică
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteDep(dep.DepartmentId)}>
            Șterge
        </Button>

        <EditDepModal show={this.state.editModalShow}
        onHide={editModalClose}
        depid={depid}
        depname={depname}/>
</ButtonToolbar>

                                </td> }

                            </tr>)}
                    </tbody>

                </Table>

                { this.props.user.UserRole === 'admin' && <ButtonToolbar id="DepAdd">
                    <Button variant='dark'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Adaugă Departament</Button>

                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar> }
            </div>
        )
    }
    
}