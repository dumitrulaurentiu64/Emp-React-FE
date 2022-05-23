import React,{Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import {Navigate} from 'react-router-dom';
import {AddEmpModal} from './AddEmpModal';
import {AddTaxesModal} from './AddTaxesModal';

export class Login extends Component {

    constructor(props){
        super(props);
        this.state={loggingState:false, firstStartup:false, addModalShow:false, addTaxesModalShow:false};
    }

    isFirstStartup(){
        fetch(process.env.REACT_APP_API+'employee/FirstStartup',{
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.setState({firstStartup:result});
        });
    }

    componentDidMount(){
        this.isFirstStartup();
    }

    async fetchUser() {
        const response = await fetch(process.env.REACT_APP_API+'auth/user',{
            method:'GET',
            headers:{'Content-Type':'application/json'},
            credentials: 'include'
            });

        const content = await response.json();
        if(content.title !== 'Unauthorized')
        {
            this.props.user.Id = content.Id;
            this.props.user.User_Role = content.User_Role;
            this.props.user.Email = content.Email;
            this.props.user.Name = content.Firstname;
            this.props.setLoggingState(true);
            
        }
    };

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
            this.setState({loggingState: true});
            this.fetchUser();
        },
        (error)=>{
            console.log('Failed');
        })
    }   
  
    render(){

        if (this.state.loggingState) {
            return <Navigate to="/profile"/>;
        }

        if (this.state.firstStartup === false) {
            return (
                <div className="d-grid gap-2" id="login">
                    <h1>Authentication</h1>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <br />
                        <Form.Text className="text-muted">
                            Use a local account for authentication. <br /> 
                        </Form.Text>
                        <br />
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
                        <br />
                        <Form.Group>
                            <Button variant="dark" type="submit" id="LoginBtn">
                                Login
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            );  
        } else {
            let addModalClose=()=>this.setState({addModalShow:false});
            let addTaxesModalClose=()=>this.setState({addTaxesModalShow:false});
            return (
                <div className="d-grid gap-2" id="initialConfig">
                    <h1>Initial Configuration</h1>
                    <br />
                    <Form.Text className="text-muted">
                        Before using the application an initial configuration is needed. <br /> 
                        The initial configuration consists in adding the first admin user of the application and setting the salary taxes values.
                    </Form.Text>
                    <br />
                    <Button variant='dark' size="lg"
                        onClick={()=>this.setState({addModalShow:true})}>
                    Add Admin User
                    </Button>
                    <br />
                    <Form.Text className="text-muted">
                        Take extra caution when adding the values. <br />
                        If you did insert the wrong values, no worries! You can easily change them after logging in.
                    </Form.Text>
                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose} />
                    <br />
                    <Button variant='dark' size="lg"
                        onClick={()=>this.setState({addTaxesModalShow:true})}>
                    Configure Taxes
                    </Button>
                    <br />
                    <Form.Text className="text-muted">
                        If the two steps above were finalized, the application is all set and done. <br />
                        Congratulations!
                    </Form.Text>
                    <AddTaxesModal show={this.state.addTaxesModalShow}
                    onHide={addTaxesModalClose}/>
                    <br />
                    <Button variant='dark' size="lg"
                        onClick={refreshPage}>
                    Initial Setup Done
                    </Button>

                </div>
            );
        }
        
    }
}
export default Login;

function refreshPage() {
    window.location.reload(false);
}