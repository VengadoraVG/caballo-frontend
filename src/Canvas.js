import React, {Component} from 'react';
import './Canvas.css';

var config = {
  arrow: {
    width: 10,
    height: 10
  }
};

class Canvas extends Component {
  redraw () {
    var dependency;
    this.ctx.clearRect(0,0, this.refs.canvas.width, this.refs.canvas.height);

    for (dependency in this.props.model.connection) {
      if (this.props.model.connection.hasOwnProperty(dependency)) {
        this.props.model.connection[dependency].forEach((item) => {
          this.connect(this.props.board.getNode(dependency),
                       this.props.board.getNode(item));
        });
      }
    }
  }

  resize () {
    this.refs.canvas.width = this.refs.canvas.offsetWidth;
    this.refs.canvas.height = this.refs.canvas.offsetHeight;
    this.redraw();
  }

  drawArrow (fromNode, toNode) {
    var position = toNode.getArrowPosition(fromNode);

    this.ctx.save();
    this.ctx.translate(position.x, position.y);
    this.ctx.rotate(position.rotation);
    this.ctx.beginPath();

    this.ctx.moveTo(0,0);
    this.ctx.lineTo(config.arrow.height, -config.arrow.width/2);
    this.ctx.lineTo(config.arrow.height, config.arrow.width/2);

    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  connect (from, to) {
    this.drawLine(from.getMiddle(), to.getMiddle());
    this.drawArrow(from, to);
  }

  drawLine (from, to) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }

  initialize () {
    this.ctx = this.refs.canvas.getContext('2d');
    this.resize();
  }

  onNodesRendered () {
    this.initialize();
  }

  render () {
    return (
      <canvas className='board-canvas' ref="canvas"></canvas>
    );
  }
}

export default Canvas;
