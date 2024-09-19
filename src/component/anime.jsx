// src/components/Animation.js
import React from "react";
import { Velocity } from "velocity-animate";

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.subjectRef = React.createRef();
  }

  xy2lt(p) {
    return { left: p.x, top: p.y };
  }

  componentDidMount() {
    const { state } = this.props;
    const node = this.subjectRef.current;
    Velocity(node, this.xy2lt(state.start), { duration: 0 });
    Velocity(node, this.xy2lt(state.end), { duration: 1000 }).then(() =>
      state.onFinish()
    );
  }

  render() {
    const { state } = this.props;
    return (
      <div>
        animation of{" "}
        {React.cloneElement(state.subject, { ref: this.subjectRef })}
      </div>
    );
  }
}

export default Animation;
