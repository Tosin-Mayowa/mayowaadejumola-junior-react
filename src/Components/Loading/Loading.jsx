import React from "react";
import './Loading.css'



class Loading extends React.Component {
  render() {
    return (
      <>
        <div className="LoadingWrapper">
          <div className="balls">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>
        </div>
      </>
    );
  }
}

export default Loading;
