import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class ChangePassModal extends Component{
    constructor(props){
        super(props); 
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'auth/changepass',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Email:this.props.email,
                OldPassword:event.target.oldPassword.value,
                NewPassword:event.target.newPassword.value
            })

        })
        .then(res=>res.json())
        .then((result)=>{
            console.log('Great success!');
        },
        (error)=>{
            console.log('Failed');
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
            Change Password
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="oldPassword">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                        type="password"
                        name="oldPassword"
                        required
                        placeholder="..."/>
                    </Form.Group>

                    <Form.Group controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                        type="password"
                        name="newPassword"
                        required
                        placeholder="..."/>
                    </Form.Group>

                    <Form.Group controlId="repNewPassword">
                        <Form.Label>Repeat New Password</Form.Label>
                        <Form.Control
                        type="password"
                        name="repNewPassword"
                        required
                        placeholder="..."/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Change Password
                        </Button>
                    </Form.Group>
                </Form>
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