import React, { Component } from 'react';
// import firebase from 'firebase'
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
      $('#mymodal').modal('hide');
      if(this.props.currentUser){
        this.setState({loggedIn: true},()=>this.props.history.push('/landing'))
      }
  }

loginUser = (email, password ) => {
    this.props.login(email, password)
    this.props.history.push('/landing')

}


 

  handleChange = (e) => {

    this.setState({[e.target.name]: e.target.value})
}
  render(){
  return (
    <>
        <div>
     <Input name="email" value={this.state.email} onChange={this.handleChange} />
     <Input name="password" value={this.state.password} onChange={this.handleChange} />
     <button onClick={()=>this.loginUser(this.state.email, this.state.password)}>Login</button>
     </div>
     <div>
         <p>Not a User...?</p>
         <button className="btn btn-primary" data-toggle="modal" data-target="#mymodal">Register</button>
     </div>
     <div className="modal fade" id="mymodal">
        <div className="modal-dialog">
            <div className="modal-content bg-light">
                <div className="modal-header">
                        <h3>Regiter for timeAPP</h3>
                </div>
                <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                    <Input placeholder="name" name="name1" value={this.state.name1} onChange={this.handleChange}/>
                    <Input placeholder="email" name="email1" value={this.state.email1} onChange={this.handleChange}/>
                    <Input placeholder="password" name="password1" value={this.state.password1} onChange={this.handleChange}/>
                    <button id="btnSave">Register</button>
                    </form>
                </div>
            </div>
        </div>

     </div>
    </>
  );
  }
}

export default withProvider(Login);
