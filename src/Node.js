import React, {Component} from 'react';
import './Node.css';
import Util from './Util';

class Node extends Component {
  setPosition (x, y) {
    this.props.model.x = x;
    this.props.model.y = y;
    this.forceUpdate();
    this.props.board.redraw();
  }

  x () {
    return this.props.model.x;
  }

  y () {
    return this.props.model.y;
  }

  setPositionFromFixed (x, y) {
    var mouse = this.props.board.getMousePosition({
      clientX: x,
      clientY: y
    });
    this.setPosition(mouse.x, mouse.y);
  }

  getMiddle () {
    return {
      x: this.props.model.x + this.refs.body.offsetWidth/2,
      y: this.props.model.y + this.refs.body.offsetHeight/2
    };
  }

  getPointDistanceToEdge (origin, point) {
    origin = origin.getMiddle();
    var destination = this.getMiddle();
    var v = Util.add(destination, origin, -1);
    var c = Util.add(destination, point, -1);
    var n = {
      x: (-v.y * 100) / v.x,
      y: 100
    };

    return Math.abs(Util.dot(c, n) / Util.magnitude(n));
  }

  getArrowPosition (origin) {
    origin = origin.getMiddle();
    var mid = this.getMiddle();
    var v = Util.add(origin, mid, -1);
    var alpha = Math.atan2(v.y, v.x);
    var theta = Math.atan2(this.refs.body.offsetHeight,
                           this.refs.body.offsetWidth);
    var originalAlpha = alpha;

    var up = false;
    var left = false;

    var x, y;

    if (alpha < 0) {
      up = true;
      alpha *= -1;
    }

    if (alpha > (Math.PI/2)) {
      left = true;
      alpha = Math.PI - alpha;
    }

    if (alpha > theta) {
      y = this.refs.body.offsetHeight / 2;
      x = Math.tan((Math.PI/2) - alpha) * y;
    } else {
      x = this.refs.body.offsetWidth / 2;
      y = x * Math.tan(alpha);
    }

    y *= up? -1: 1;
    x *= left? -1: 1;

    return {
      x: x + mid.x,
      y: y + mid.y,
      rotation: originalAlpha
    };
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
    if (this.props.model.grabbed) {
      this.props.model.grabbed = false;
      this.forceUpdate();
    }
  }

  highlight () {
    this.props.model.highlighted = true;
    this.forceUpdate();
  }

  unhighlight () {
    if (this.props.model.highlighted) {
      this.props.model.highlighted = false;
      this.forceUpdate();
    }
  }

  render () {
    return (
      <div className={'node shadow' +
                      (this.props.model.grabbed? ' grabbed': '') +
           (this.props.model.highlighted? " highlighted": " ") }
           style={{ left: this.props.model.x, top: this.props.model.y}}
           ref="body"
           onMouseMove={(e)=>this.props.onMouseMove(this, e)}
           onMouseDown={(e)=>(this.props.onMouseDown &&
              this.props.onMouseDown(this, e))}>

        <p>{this.props.model.name}</p>

      </div>
    );
  }
}

export default Node;
