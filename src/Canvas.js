import React, {Component} from 'react';
import Util from './Util';
import './Canvas.css';

var config = {
  arrow: {
    width: 10,
    height: 10
  }
};

var dirty = false;

class Canvas extends Component {
  redraw () {
    var dependency;
    var connection = this.props.model.connection;
    this.ctx.clearRect(0,0, this.refs.canvas.width, this.refs.canvas.height);

    for (dependency in this.props.model.connection) {
      if (connection.hasOwnProperty(dependency) && connection[dependency]) {
        connection[dependency].forEach((item) => {
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

  drawLine (from, to, width=2) {
    this.ctx.beginPath();
    this.ctx.lineWidth = width;
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }

  isCloseToEdge (fromNode, toNode, point) {
    return toNode.getPointDistanceToEdge(fromNode, point) <
      this.props.toolboxModel.active.edgeDistance &&
      Util.isInBox(fromNode.getMiddle, toNode.getMiddle(), point);
  }

  // verifyEdgeDeletion (from, to, mouse) {
  //   // mouse = this.props.board.getMousePosition(e);
  //   // if (to.getPointDistanceToEdge(from, mouse) <
  //   //     this.props.toolboxModel.active.edgeDistance) {}
  // }

  onMouseMove (e) {
    if (this.props.toolboxModel.active.selected &&
        this.props.toolboxModel.active.selected.node) {
      this.props.toolboxModel.active.selected.node.unhighlight();
    }
    var point = this.props.board.getMousePosition(e);
    var from, fromNode, toNode;
    var board = this.props.board;
    var model = this.props.model;

    if (this.props.toolboxModel.active.key === 'delete') {
      this.redraw();

      for (from in model.connection) {

        if (model.connection.hasOwnProperty(from) && model.connection[from]) {
          fromNode = board.getNode(from);

          model.connection[from].forEach((to, index)=> {
            toNode = board.getNode(to);

            if (toNode.getPointDistanceToEdge(fromNode, point) <
                this.props.toolboxModel.active.edgeDistance &&
                Util.isInBox(fromNode.getMiddle(), toNode.getMiddle(), point)) {

              this.ctx.save();
              this.ctx.fillStyle = this.ctx.strokeStyle = '#e66';
              this.drawLine(toNode.getMiddle(), fromNode.getMiddle(), 10);
              this.drawArrow(fromNode, toNode);
              this.ctx.restore();

              dirty = true;
              this.props.toolboxModel.active.selected = {
                from,
                to: index
              };
              this.props.toolboxModel.active.type = 'connection';
              this.drawLine(toNode.getMiddle(), fromNode.getMiddle());
              this.drawArrow(fromNode, toNode);
            }
          });
        }
      }
    } else if (dirty) {
      this.redraw();
    }
  }

  onNodeMousemove (node, e) {
    if (this.props.toolboxModel.active.key === 'delete') {
      this.redraw();
      node.highlight();
      this.props.toolboxModel.active.selected = {
        node
      };
    }
  }

  initialize () {
    this.ctx = this.refs.canvas.getContext('2d');
    this.resize();
    this.redraw();
  }

  onNodesRendered () {
    this.initialize();
  }

  render () {
    return (
      <canvas className='board-canvas' ref="canvas"
              onMouseMove={(e)=>this.onMouseMove(e)}></canvas>
    );
  }
}

export default Canvas;
