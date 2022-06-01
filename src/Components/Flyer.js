import styled from 'styled-components';
import {Card} from 'react-bootstrap';

export default function Flyer(props){
    return (
    <div id="flyer-content">   
        <Div>
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={process.env.REACT_APP_PHOTOPATH+'Payroll.png'}/>
            <Card.Body>
                <Card.Title>Payroll</Card.Title>
                <Card.Text>
                    To view the payroll report for this month 
                    click on the button below.
                </Card.Text>
                <a  className="btn btn-success" href={process.env.REACT_APP_API+'Payroll/'+props.user.Id} target="_blank" rel="noreferrer">Print</a>
            </Card.Body>
            </Card>
        </Div>

        <Div2>
        { props.user.UserRole === 'admin' && 
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={process.env.REACT_APP_PHOTOPATH+'EmpReport.png'}/>
            <Card.Body>
                <Card.Title>Employees Report</Card.Title>
                <Card.Text>
                    To view the report for all the employees this month
                    click on the button below.
                </Card.Text>
                { props.user.UserRole === 'admin' && <a  className="btn btn-success" href={process.env.REACT_APP_API+'Payroll'} target="_blank" rel="noreferrer">Print</a> }
            </Card.Body>
            </Card>
        }
        </Div2> 
    </div>
    );

}

const Div = styled.div`
width: 50%; float:left;
`;

const Div2 = styled.div`
width: 50%; float:right;
`;


