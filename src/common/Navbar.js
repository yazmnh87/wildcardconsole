import React from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { withProvider } from '../context/context'

// signOut = () => {

// }

function Navbar(props) {
    return ( <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <Link className="navbar-brand" to="/">WildCard Dev Console</Link>
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <Link className="nav-link" to="/landing">Profile <span className="sr-only">(current)</span></Link>
      </li>
      {/* <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li> */}
    </ul>
  </div>
  <button onClick={ ()=>
    firebase.auth().signOut().then(()=> this.props.history.push('/'),console.log("signed out successfully")).catch(e => console.log(e))} className="btn btn-light btn-outline-primary" >Log Out</button>
</nav>
        </>
    )
}


export default withProvider(Navbar)