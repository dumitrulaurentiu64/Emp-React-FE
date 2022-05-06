import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png"
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
        fetch(process.env.REACT_APP_API+'employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:null,
                Name:event.target.Name.value,
                Lastname:event.target.Lastname.value,
                Position:event.target.Position.value,
                Department:event.target.Department.value,
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
            alert('Failed');
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
        },
        (error)=>{
            alert('Failed');
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
            Add Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="Name" required 
                        placeholder="Name"/>
                    </Form.Group>

                    <Form.Group controlId="Lastname">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text" name="Lastname" required 
                        placeholder="Lastname"/>
                    </Form.Group>

                    <Form.Group controlId="Position">
                        <Form.Label>Position</Form.Label>
                        <Form.Control type="text" name="Position" required 
                        placeholder="Position"/>
                    </Form.Group>

                    <Form.Group controlId="Department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select">
                            {this.state.deps.map(dep=>
                                <option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                        </Form.Control>

                    </Form.Group>

                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>DateOfJoining</Form.Label>
                        <Form.Control
                        type="date"
                        name="DateOfJoining"
                        required
                        placeholder="DateOfJoining"/>
                    </Form.Group>

                    <Form.Group controlId="BaseSalary">
                        <Form.Label>BaseSalary</Form.Label>
                        <Form.Control type="number" name="BaseSalary" required 
                        placeholder="BaseSalary"/>
                    </Form.Group>

                    <Form.Group controlId="Increase">
                        <Form.Label>Increase</Form.Label>
                        <Form.Control type="number" name="Increase" required 
                        placeholder="Increase"/>
                    </Form.Group>

                    <Form.Group controlId="GrossPrizes">
                        <Form.Label>GrossPrizes</Form.Label>
                        <Form.Control type="number" name="GrossPrizes" required 
                        placeholder="GrossPrizes"/>
                    </Form.Group>

                    <Form.Group controlId="Deductions">
                        <Form.Label>Deductions</Form.Label>
                        <Form.Control type="number" name="Deductions" required 
                        placeholder="Deductions"/>
                    </Form.Group>

                    <br></br>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Employee
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}