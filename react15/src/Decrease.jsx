import React,{Component} from "react";

export default class Decrease extends Component{
   constructor(props) {
    super(props)

    this.state = {
      count: 15
    }
  }

  render(){
      const {count} = this.state

      return(
          <div>
              {count}
              <button onClick={()=>this.setState({count: count - 1})}>Click me 15</button>
          </div>
      )
  }
}