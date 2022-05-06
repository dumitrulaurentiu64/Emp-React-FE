import React, { useEffect, useState } from "react";
import { useForm } from "react-cool-form";
import {Form} from 'react-bootstrap';
import styled from 'styled-components';

const Home = () => {
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
        <Div>
            <form onSubmit={handleSubmit} noValidate id="config">
                <div>
                    <Form.Label>Tax</Form.Label>
                    <input type="number" name="Tax" defaultValue={taxes.Tax} required />
                </div>
                <div>
                    <Form.Label>CAS</Form.Label>
                    <input type="number" name="CAS" defaultValue={taxes.CAS} required />
                </div>
                <div>
                    <Form.Label>CASS</Form.Label>
                    <input type="number" name="CASS" defaultValue={taxes.CASS} required />
                </div>
                { showSubmit ? <input type="submit" /> : null } 
            </form>
        </Div>
        <Div2>
            <div className="col-md-4">
                <div className="p-3 py-5">
                <Form.Label>Password required</Form.Label>
                <input type="password" ref={passInput} name="password" placeholder="..." required />
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={handleClick}>Change Taxes</button>
                </div>
                </div>
            </div>
        </Div2>
    </div>
    );

}
export default Home;

const Div = styled.div`
width: 50%; float:left;
`;

const Div2 = styled.div`
width: 50%; float:right;
`;