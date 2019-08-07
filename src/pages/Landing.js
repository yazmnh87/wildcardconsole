import React, { Component } from "react";
import { withProvider } from "../context/context";
import Navbar from "../common/Navbar";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


class Landing extends Component {
  state = {
    projectName: "",
    projects: [],
    projectType: "",
    projectStartDate: Date.now()
  };

  componentDidMount() {
    this.checkLocalStorge()
  }

  checkLocalStorge = () => {
    const getProjects = JSON.parse(localStorage.getItem('projects'))
    console.log(typeof(getProjects))
    this.setState({
      projects: [getProjects]

    }, ()=> console.log(this.state))
  }

  createProject = (e) => {
    e.preventDefault()
    const project = {
      projectName: this.state.projectName,
      projectStartDate: this.state.projectStartDate
    };

    firebase
      .database()
      .ref(`${this.props.currentUser.user.uid}/projects`)
      .update(project, ()=> this.setState(prevState=>({projects: [...prevState,project]})));
  };

  userInfo = () => {
    if (
      !this.isEmpty(this.props.currentUser) ||
      this.props.currentUser !== undefined
    ) {
      return this.props.currentUser;
    } else return null;
  };

  setProjectType = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const mappedProjects = !!this.props.projects.length && this.props.projects  ? this.props.projects.map(project => {
      console.log(project)
      return (
        <tr key={project.projectStartDate}>
          <td className="text-white">{project.projectName}</td>
          <td>{new Date(project.projectStartDate * 1000).toString().slice(0,10)}</td>
          <td><button className="btn btn-danger">Delete</button></td>
        </tr>
      )
    }) : console.log(this.state.projects,'map projects not')
    
    return (
      <>
        <Navbar />
        <div
          style={{ height: "100vh", width: "100vw", backgroundColor: "blue" }}
        >
          <div>
            <span style={{ color: "white", fontSize: 20 }}>
              Welcome {this.props.userName} !
            </span>
          </div>
          <button
            className="btn btn-light ml-4 mt-5"
            data-toggle="modal"
            data-target="#projModal"
          >
            New Project <FontAwesomeIcon icon={faPlus} />
          </button>
          <div className="modal fade" id="projModal">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4>Add a New Project</h4>
                </div>
                <div className="modal-body">
                  <form className="form-group">
                    <label className="mb-2">Project Name</label>
                    <input
                      className="form-control"
                      name="projectName"
                      value={this.state.projectName}
                      onChange={this.handleChange}
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="web"
                        id="web"
                        value="web"
                        onChange={()=>this.setProjectType}
                      />
                      <label className="form-check-label" htmlFor="web">
                        Web
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="mobile"
                        id="mobile"
                        value="mobile"
                        onChange={()=>this.setProjectType}
                      />
                      <label className="form-check-label" htmlFor="mobile">
                        Mobile
                      </label>
                    </div>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={(e)=>this.createProject()}
                    >
                      Create Project
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 mt-3">
            <div style={{width: '90%'}}>
            <h3 className="text-white mb-2 border-bottom border-light" >Projects</h3>
            </div>
            <div style={{width:'90%'}}>
            <table className="table-condensed">
            <thead>
              <tr>
                <th className="text-white border-bottom border-light">Project Name</th>
                <th className="text-white border-bottom border-light">Date Created</th>
              </tr>
              </thead>
              <tbody>
              {mappedProjects}
              </tbody>
            </table>
            </div>
            </div>
        </div>
      </>
    );
  }
}

export default withProvider(Landing);
