import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddTaxesModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'config',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Tax:event.target.Tax.value,
                CAS:event.target.CAS.value,
                CASS:event.target.CASS.value,
                Pass:event.target.Password.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert('Tax configuration was succesful!');
            this.props.onHide();
        },
        (error)=>{
            alert('Tax configuration failed!');
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
            Setup Taxes
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Tax">
                        <Form.Label>Tax %</Form.Label>
                        <Form.Control type="number" name="Tax" min="1" max="99" required 
                        placeholder="..."/>
                    </Form.Group>

                    <Form.Group controlId="CAS">
                        <Form.Label>CAS %</Form.Label>
                        <Form.Control type="number" name="CAS" min="1" max="99"required 
                        placeholder="..."/>
                    </Form.Group>

                    <Form.Group controlId="CASS">
                        <Form.Label>CASS %</Form.Label>
                        <Form.Control type="number" name="CASS" min="1" max="99" required 
                        placeholder="..."/>
                    </Form.Group>

                    <Form.Group controlId="Position">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="Password" required 
                        placeholder="..."/>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Button variant="dark" type="submit">
                            Insert Configuration
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