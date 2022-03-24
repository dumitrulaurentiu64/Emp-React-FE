import React,{Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import {Navigate} from 'react-router-dom';

export class Login extends Component {

    constructor(props){
        super(props);
        this.state={loggingState:false};
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'auth/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({
                Email:event.target.Email.value,
                Password:event.target.Password.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(this.state.loggingState);
            this.setState({loggingState: true});
            this.props.setLoggingState(true);
            console.log(this.state.loggingState);
            console.log(result);
        },
        (error)=>{
            console.log('Failed');
        })

    }   
        
    render(){
        console.log(this.state.loggingState);
        if (this.state.loggingState) {
            return <Navigate to="/"/>;
        }

        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>

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
                            Login
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        );  
    }

   
}
export default Login;