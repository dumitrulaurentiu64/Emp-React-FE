import React,{Component} from 'react';
import {ChangePassModal} from './ChangePassModal';

export class Profile extends Component {

    constructor(props){
        super(props);
        this.state={profile:[], changePassModalShow:false}
    }

    getProfile(){
        fetch(process.env.REACT_APP_API+'employee/'+this.props.user.Id,{
            method:'GET',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({profile:data});
            console.log(data.Department + ' WHOAAAAAAAAAAAAAAAAAAAAAA');
            console.log(this.state.profile.Department + ' WHOAAAAAAAAAAAAAAAAAAAAAA');
        });
    }

    componentDidMount(){
        this.getProfile();
    }

    componentDidUpdate() {
        //this.getProfile();
    }

    render() {
        let changePassModalClose=()=>this.setState({changePassModalShow:false});

        return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" 
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img>
                    <span className="font-weight-bold" defaultValue={this.props.user.Name}>{this.props.user.Name}</span><span className="text-black-50" defaultValue={this.props.user.Email}>{this.props.user.Email}</span><span> </span></div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" defaultValue={this.props.user.Name}></input></div>
                            {/* <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value="" placeholder="surname"></input></div> */}
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Department</label><input type="text" className="form-control" defaultValue={this.state.profile.Department} ></input></div>
                            <div className="col-md-12"><label className="labels">Address Line 1</label><input type="text" className="form-control" defaultValue="enter address line 1" ></input></div>
                            <div className="col-md-12"><label className="labels">Address Line 2</label><input type="text" className="form-control" defaultValue="enter address line 2" ></input></div>
                            <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" defaultValue="enter address line 2" ></input></div>
                            <div className="col-md-12"><label className="labels">State</label><input type="text" className="form-control" defaultValue="enter address line 2" ></input></div>
                            <div className="col-md-12"><label className="labels">Area</label><input type="text" className="form-control" defaultValue="enter address line 2"></input></div>
                            <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" defaultValue="enter email id" ></input></div>
                            <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" defaultValue="education" ></input></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" defaultValue="country" ></input></div>
                            <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" defaultValue="" ></input></div>
                        </div>
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience">
                            <span className="border px-3 p-1 add-experience" onClick={()=>this.setState({changePassModalShow:true})}><i className="fa fa-plus"></i>&nbsp;Change Password</span>
                            <ChangePassModal email={this.props.user.Email} show={this.state.changePassModalShow} onHide={changePassModalClose}/>
                        </div>
                        {/* <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" defaultValue="experience" ></input></div> 
                        <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" defaultValue="additional details" ></input></div> */}
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
}