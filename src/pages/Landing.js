import React, { Component } from "react";
import { withProvider } from "../context/context";
import Navbar from "../common/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class Landing extends Component {
    state = {
        projectName: ""
    }

    onSubmit = (e) => {
        e.preventDefault()
       const project = {
            projectName: this.state.projectName
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  render() {
    return (
      <>
        <Navbar />
        <div
          style={{ height: "100vh", width: "100vw", backgroundColor: "blue" }}
        >
          <button
            className="btn btn-light ml-4 mt-5"
            data-toggle="modal"
            data-target="#projModal"
          >
            New Project <FontAwesomeIcon icon={faPlus} />
          </button>
          <div className="modal fade" id="projModal">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div div className="modal-content">
                <div className="modal-header">
                  <h4>Add a New Project</h4>
                </div>
                <div className="modal-body">
                  <form className="form-group" onSubmit={""}>
                    <label className="mb-2">Project Name</label>
                    <input className="form-control" name="projectName" value={this.state.projectName} onChange={this.handleChange}/>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="web"
                        id="web"
                        value="web"
                        checked
                      />
                      <label class="form-check-label" for="web">
                        Web
                      </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="mobile"
                          id="mobile"
                          value="mobile"
                        />
                        <label class="form-check-label" for="mobile">
                          Mobile
                        </label>
                    </div>
                    <button className="btn btn-primary mt-2">Create Project</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 mt-3">
            <h3 className="text-white mb-2">Projects</h3>
            <div
              style={{
                borderTop: "solid",
                borderColor: "black",
                borderWidth: 2,
                height: "100vh",
                width: "80%"
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default withProvider(Landing);
