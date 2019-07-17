import React, { Component } from 'react'
import firebase from 'firebase'
const Context = React.createContext()

const firebaseConfig = {
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
        userName: "",
        currentUser: {},
        projects: []
    }

    componentDidMount(){
        // this.initFirebase()
    }

    initFirebase = () => firebase.initializeApp(firebaseConfig)

    registerUser = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((res)=> this.setState({currentUser: res}, ()=> firebase.database().ref(`${this.state.currentUser.user.uid}/user`).set({userName: this.state.userName}))
        
        )
        
        .catch((error)=>{
            console.log(error)
        })

    }

    getProjects = () => {
        if (this.state.currentUser.user !== undefined) {
          firebase
            .database()
            .ref(`${this.state.currentUser.user.uid}/projects`)
            .once('value')
            .then(r =>
                this.setState({ projects: [r.val()] }, () => console.log(this.state.projects))
            )
            .catch(e => console.log(e));
        } else console.log("projects arent coming")
      };

    setCurrentUser = (user) => {
        this.setState({userName: user})
    }

    login = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => this.setState({currentUser: res}, ()=> this.getProjects()))
        .catch(err => console.log(err))
        
    }
    
    render(){
        return (
            <Context.Provider value={{
                getProjects: this.getProjects,
                initFirebase: this.initFirebase,
                setCurrentUser: this.setCurrentUser,
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