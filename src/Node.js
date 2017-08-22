import React, {Component} from 'react';
import './Node.css';

class Node extends Component {
  setPosition (x, y) {
    this.props.model.x = x;
    this.props.model.y = y;
    this.forceUpdate();
  }

  setPositionFromFixed (x, y) {
    var mouse = this.props.board.getMousePosition({ clientX: x, clientY: y});
    this.setPosition(mouse.x, mouse.y);
  }

  getAnchorPoint (e) {
    var mouse = this.props.board.getMousePosition(e);

    return {
      x: mouse.x - this.props.model.x,
      y: mouse.y - this.props.model.y
    };
  }

  grab () {
    this.props.model.grabbed = true;
    this.forceUpdate();
  }

  drop () {
    this.props.model.grabbed = false;
    this.forceUpdate();
  }

  render () {
    return (
      <div className={'node shadow' + (this.props.model.grabbed? ' grabbed': '')}
           style={{ left: this.props.model.x, top: this.props.model.y}}
           onMouseDown={(e)=>(this.props.onMouseDown && this.props.onMouseDown(this, e))}>
        <p>{this.props.model.name}</p>
      </div>
    );
  }
}

export default Node;
