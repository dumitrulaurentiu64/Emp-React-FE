import styled from 'styled-components';
import {Card} from 'react-bootstrap';

export default function Flyer(props){
    return (
    <div id="flyer-content">   
        <Div>
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={process.env.REACT_APP_PHOTOPATH+'MyFlyer.png'}/>
            <Card.Body>
                <Card.Title>My Flyer</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <a  className="btn btn-success" href={process.env.REACT_APP_API+'Flyer/'+props.user.Id} target="_blank" rel="noreferrer">Print</a>
            </Card.Body>
            </Card>
        </Div>

        <Div2>
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={process.env.REACT_APP_PHOTOPATH+'AllFlyers.png'}/>
            <Card.Body>
                <Card.Title>All employees flyers</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                { props.user.User_Role === 'admin' && <a  className="btn btn-success" href={process.env.REACT_APP_API+'Flyer'} target="_blank" rel="noreferrer">Print</a> }
            </Card.Body>
            </Card>
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


