import React, { useEffect, useState } from "react";
import {Button, Form} from 'react-bootstrap';
import styled from 'styled-components';

const Config = (props) => {
    const [taxes, setTaxes] = useState([]);
    const [showSubmit, setShowSubmit] = React.useState(false);
    let passInput = React.createRef();

    useEffect(() => {
        fetch(process.env.REACT_APP_API+'config',{
            method:'GET',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setTaxes(data);
        });
    }, [])

    function handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'config',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Tax:event.target.Tax.value,
                CAS:event.target.CAS.value,
                CASS:event.target.CASS.value,
                Pass:"none"
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

    function handleClick(event) {
        console.log("Match started");
        console.log(taxes.Pass);
        console.log(passInput.current.value);
        if (taxes.Pass === passInput.current.value && showSubmit === false)
        {
            setShowSubmit(prev => !prev);
        } else if (showSubmit === true)
        {
            setShowSubmit(prev => !prev);
        }
    }

    return (
        <div>  
            <br />  <br /> <br />
            <Div id="configForm">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <br /> <br />
                    <Form.Label>Tax</Form.Label>
                    <Form.Control type="number" name="Tax" min="1" max="99" defaultValue={taxes.Tax} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="number" name="CAS" min="1" max="99" defaultValue={taxes.CAS} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="number" name="CASS" min="1" max="99" defaultValue={taxes.CASS} required/>
                </Form.Group>
                { showSubmit ? <Button variant="primary" type="submit">
                    Submit
                </Button> : null } 
            </Form>
            </Div>
            <Div2>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                <br />
                <div className="col-md-4">
                    <div className="p-3 py-4">
                        <Form.Label>Configuration Password</Form.Label>
                        {/* <input type="password" ref={passInput} name="password" placeholder="..." required /> */}
                        <Form.Control type="password" name="password" ref={passInput} placeholder="..." required/>


                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={handleClick}>Change Taxes</button>
                    </div>
                    </div>
                </div>
            </Div2>
        </div>
    );
}
export default Config;

const Div = styled.div`
width: 50%; float:left;
`;

const Div2 = styled.div`
width: 50%; float:right;
`;