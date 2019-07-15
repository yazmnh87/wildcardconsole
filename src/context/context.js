import React, { Component } from 'react'
import firebase from 'firebase'
const Context = React.createContext()

var firebaseConfig = {
    apiKey: `${process.env.REACT_APP_KEY}`,
    authDomain: "timetracker-8d078.firebaseapp.com",
    databaseURL: "https://timetracker-8d078.firebaseio.com",
    projectId: "timetracker-8d078",
    storageBucket: "",
    messagingSenderId: "562993249985",
    appId: "1:562993249985:web:e666763a5a018582"
  };
  // 

//   firebase.initializeApp(firebaseConfig);
export class Provider extends Component {
    state ={
        currentUser: {}
    }

    componentDidMount(){
        firebase.initializeApp(firebaseConfig)
    }

    registerUser = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((res)=> this.setState({currentUser: res})
        
        )
        
        .catch((error)=>{
            console.log(error)
        })

    }

    login = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            console.log(res)})
        .catch(err => console.log(err))
        
    }
    
    render(){
        return (
            <Context.Provider value={{
                login: this.login,
                registerUser: this.registerUser,
                ...this.state
            }}>{this.props.children}
            </Context.Provider>
                
            
        )
    }
}

export function withProvider(C) {
    return props => <Context.Consumer>
        {value => <C {...value}{...props} />}
    </Context.Consumer>
}