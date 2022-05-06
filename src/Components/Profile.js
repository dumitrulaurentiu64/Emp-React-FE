import React,{Component} from 'react';
import {ChangePassModal} from './ChangePassModal';

export class Profile extends Component {

    constructor(props){
        super(props);
        this.state={profile:[], changePassModalShow:false}
        this.getProfile();
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
        });
    }

    render() {
        let changePassModalClose=()=>this.setState({changePassModalShow:false});

        return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="200px" 
                    src={process.env.REACT_APP_PHOTOPATH+this.state.profile.PhotoFileName}></img>
                    
                    <span className="font-weight-bold" defaultValue={this.state.profile.Name}>{this.state.profile.Name}</span><span className="text-black-50" defaultValue={this.props.user.Email}>{this.props.user.Email}</span><span> </span></div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" defaultValue={this.state.profile.Name} readOnly></input></div>
                            <div className="col-md-6"><label className="labels">Lastname</label><input type="text" className="form-control" defaultValue={this.state.profile.Lastname} readOnly></input></div>
                        </div>
                        <div className="row mt-3">
                            
                            <div className="col-md-12"><label className="labels">Department</label><input type="text" className="form-control" defaultValue={this.state.profile.Department} readOnly ></input></div>
                            <div className="col-md-12"><label className="labels">Position</label><input type="text" className="form-control" defaultValue={this.state.profile.Position} readOnly></input></div>
                            <div className="col-md-12"><label className="labels">Date of joining</label><input type="date" className="form-control" defaultValue={this.state.profile.DateOfJoining} readOnly></input></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Base Salary</label><input type="number" className="form-control" defaultValue={this.state.profile.BaseSalary} readOnly></input></div>
                            <div className="col-md-6"><label className="labels">Net Salary</label><input type="number" className="form-control" defaultValue={this.state.profile.NetSalary} readOnly></input></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" onClick={()=>this.setState({changePassModalShow:true})} type="button">Change Password</button>
                            <ChangePassModal email={this.props.user.Email} show={this.state.changePassModalShow} onHide={changePassModalClose}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}