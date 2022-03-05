import React,{Component} from 'react';
import {Button, Form} from 'react-bootstrap';

export class Register extends Component {

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'auth/register',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name:event.target.Name.value,
                Email:event.target.Email.value,
                Password:event.target.Password.value,
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

    render(){
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="Name" required 
                        placeholder="Name"/>
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="Email" required 
                        placeholder="Email"/>
                    </Form.Group>

                    <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        name="Password"
                        required
                        placeholder="Password"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }

   
}
export default Register;