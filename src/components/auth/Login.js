import React, { Component } from 'react';
import firebase from 'firebase'
import $ from 'jquery';
import { withProvider } from "../../context/context"
import Input from '../../common/Input'

class Login extends Component {
  state = {
    email: "",
    password: "",
    name1: "",
    email1: "",
    password1: "",
    showModal: false,
    loggedIn: false
  }

  onSubmit = (e) => {
      e.preventDefault()
      const user = {
          name: this.state.name1,
          email: this.state.email1,
          password: this.state.password1
      }
      const {name, email, password} = user;
      this.props.registerUser(email, password)
      this.props.setCurrentUser(this.state.name1)
      $('#mymodal').modal('hide');
      if(this.props.currentUser){
        this.setState({loggedIn: true},()=>this.props.history.push('/landing'))
      }
  }

loginUser = (email, password ) => {
    this.props.initFirebase()
    this.props.login(email, password)
    this.props.history.push('/landing')

}


 

  handleChange = (e) => {

    this.setState({[e.target.name]: e.target.value})
}
  render(){
  return (
    <div style={{height: '100vh', width: '100vw', backgroundColor: 'blue'}}>
        <div className="d-flex justify-content-center align-items-center">
        <div className="mt-5">
            <h1>WildCard Console </h1>
        </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
        <div>
        <div className="d-flex flex-column">
      <label className="">Email</label>      
     <Input name="email" value={this.state.email} onChange={this.handleChange} />
     <label className="mt-2">Password</label>
     <Input name="password" value={this.state.password} onChange={this.handleChange} />
     <button className="btn btn-sm btn-light mt-3" onClick={()=>this.loginUser(this.state.email, this.state.password)}>Login</button>
     </div>
     <div className="mt-2 d-flex justify-content-center"> 
         <button className="btn btn-primary d-block" data-toggle="modal" data-target="#mymodal">Register</button>
         </div>
        </div>
     </div>
     <div className="modal fade" id="mymodal">
        <div className="modal-dialog">
            <div className="modal-content bg-light">
                <div className="modal-header">
                        <h3>Register for timeAPP</h3>
                </div>
                <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                    <Input style={{marginBottom: 10}} placeholder="name" name="name1" value={this.state.name1} onChange={this.handleChange}/>
                    <Input placeholder="email" name="email1" value={this.state.email1} onChange={this.handleChange}/>
                    <Input placeholder="password" name="password1" value={this.state.password1} onChange={this.handleChange}/>
                    <button id="btnSave">Register</button>
                    </form>
                </div>
            </div>
        </div>

     </div>
    </div>
  );
  }
}

export default withProvider(Login);
