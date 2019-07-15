import React, { Component } from 'react'

class Input extends Component {

    
    render(){
    return (
        
        <input placeholder={this.props.placeholder} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
    )
    }
}

export default Input