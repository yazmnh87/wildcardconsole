import React, { Component } from "react";
import { withProvider } from "../context/context";
import Navbar from "../common/Navbar";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


class Landing extends Component {
  state = {
    projectName: "",
    projects: []
  };

  componentDidMount() {
    
  }

  

  createProject = () => {
    const project = {
      projectName: this.state.projectName
    };
    firebase
      .database()
      .ref(`${this.props.currentUser.user.uid}/projects`)
      .set(project);
  };

  userInfo = () => {
    if (
      !this.isEmpty(this.props.currentUser) ||
      this.props.currentUser !== undefined
    ) {
      return this.props.currentUser;
    } else return null;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const mappedProjects = (this.props.projects.length !== 0) ?this.props.projects.map(project => {
      return (
        <>
        <tr>
          <td className="text-white">{project.projectName}</td>
        </tr>
        </>
      )
    }) : console.log('map projects not')
    
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
                  <form className="form-group" onSubmit={""}>
                    <label className="mb-2">Project Name</label>
                    <input
                      className="form-control"
                      name="projectName"
                      value={this.state.projectName}
                      onChange={this.handleChange}
                    />
                    <div class="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="web"
                        id="web"
                        value="web"
                        checked
                      />
                      <label className="form-check-label" for="web">
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
                      />
                      <label className="form-check-label" for="mobile">
                        Mobile
                      </label>
                    </div>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={this.createProject}
                    >
                      Create Project
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 mt-3">
            <h3 className="text-white mb-2 border-bottom border-light">Projects</h3>
            <table>
              <tr>
                <th className="text-white border-bottom border-light">Project Name</th>
              </tr>
              {mappedProjects}
            </table>
            </div>
        </div>
      </>
    );
  }
}

export default withProvider(Landing);
