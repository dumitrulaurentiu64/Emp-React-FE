import styled from 'styled-components';

export default function Flyer(props){
    return (
    <div id="flyer-content">   
        <Div>
            <div className="p-3 py-5">
                <a  className="btn btn-success" href={process.env.REACT_APP_API+'Flyer/'+props.user.Id} target="_blank" rel="noreferrer">My Flyer</a>
            </div>
        </Div>
        <Div2>
            <div className="p-3 py-5">
                <a  className="btn btn-success" href={process.env.REACT_APP_API+'Flyer'} target="_blank" rel="noreferrer">All Flyers</a>
            </div>
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
