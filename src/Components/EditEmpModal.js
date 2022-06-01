import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee/'+event.target.UserRole.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:event.target.EmployeeId.value,
                Firstname:event.target.Firstname.value,
                Lastname:event.target.Lastname.value,
                Position:event.target.Position.value,
                DepartmentId:event.target.DepartmentId.value,
                DateOfJoining:event.target.DateOfJoining.value,
                PhotoFileName:this.photofilename,
                BaseSalary:event.target.BaseSalary.value,
                Increase:event.target.Increase.value,
                GrossPrizes:event.target.GrossPrizes.value,
                Deductions:event.target.Deductions.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Operațiunea nu a avut loc cu success.');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
            document.getElementById("img").src = this.imagesrc;
        },
        (error)=>{
            alert('Operațiunea nu a avut loc cu success.');
        })
        
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Modifică Angajat
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={this.handleSubmit}>    
            <Row>
                <Col sm={6}>
                    <Form.Group controlId="EmployeeId">
                        <Form.Label>Cod Angajat</Form.Label>
                        <Form.Control type="text" name="EmployeeId" required 
                        placeholder="EmployeeId"
                        disabled
                        defaultValue={this.props.empid}/>
                    </Form.Group>

                    <Form.Group controlId="Firstname">
                        <Form.Label>Prenume</Form.Label>
                        <Form.Control type="text" name="Firstname" required 
                        placeholder="Firstname"
                        defaultValue={this.props.empfirstname}/>
                    </Form.Group>

                    <Form.Group controlId="Lastname">
                        <Form.Label>Nume</Form.Label>
                        <Form.Control type="text" name="Lastname" required 
                        placeholder="Lastname"
                        defaultValue={this.props.emplastname}/>
                    </Form.Group>

                    <Form.Group controlId="Position">
                        <Form.Label>Funcție</Form.Label>
                        <Form.Control type="text" name="Position" required 
                        placeholder="Position"
                        defaultValue={this.props.empposition}/>
                    </Form.Group>

                    <Form.Group controlId="DepartmentId">
                        <Form.Label>Departament</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.depmt}>
                        {this.state.deps.map(dep=>
                            <option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>Data Aderării</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfJoining"
                        required
                        placeholder="DateOfJoining"
                        defaultValue={this.props.doj}
                        />
                    </Form.Group>

                    <Form.Group controlId="BaseSalary">
                        <Form.Label>Salar Bază</Form.Label>
                        <Form.Control type="number" name="BaseSalary" required 
                        placeholder="BaseSalary"
                        defaultValue={this.props.basesalary}/>
                    </Form.Group>

                    <Form.Group controlId="Increase">
                        <Form.Label>Spor</Form.Label>
                        <Form.Control type="number" name="Increase" required 
                        placeholder="Increase"
                        defaultValue={this.props.increase}/>
                    </Form.Group>

                    <Form.Group controlId="GrossPrizes">
                        <Form.Label>Premii Brute</Form.Label>
                        <Form.Control type="number" name="GrossPrizes" required 
                        placeholder="GrossPrizes"
                        defaultValue={this.props.grossprizes}/>
                    </Form.Group>

                    <Form.Group controlId="Deductions">
                        <Form.Label>Rețineri</Form.Label>
                        <Form.Control type="number" name="Deductions" required 
                        placeholder="Deductions"
                        defaultValue={this.props.deductions}/>
                    </Form.Group>

                    <br></br>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Actualizează Angajat
                        </Button>
                    </Form.Group>
                    
                </Col>

                <Col sm={6}>
                    <Image width="220px" height="220px" 
                    src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename} id="img"/>
                    <input onChange={this.handleFileSelected} type="File"/>
                    <br /> <br />
                    <Form.Label>Rol Utilizator</Form.Label>
                    <Form.Control as="select" name="UserRole" required defaultValue='admin' className="form-control form-control-sm">
                        <option>administrator</option>
                        <option>angajat</option>
                    </Form.Control>
                </Col>
            </Row>
        </Form>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Închide</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}