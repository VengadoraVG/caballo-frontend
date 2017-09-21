import React, {Component} from 'react';
import './Board.css';
import Node from './Node';
import Canvas from './Canvas';

class Board extends Component {
  getMousePosition (e) {
    var body = this.refs.body.getBoundingClientRect();
    return {
      x: e.clientX - body.left,
      y: e.clientY - body.top
    };
  }

  getNode (index) {
    return this.refs['node-' + index];
  }

  componentDidMount () {
    this.refs.canvas.onNodesRendered();
  }

  redraw () {
    this.refs.canvas.redraw();
  }

  addNode (e) {
    var point = this.getMousePosition(e);
    this.getModel().node.push({
      x: point.x,
      y: point.y,
      name: ''
    });
  }

  removeNode (nodeIndex) {
    this.removeAllEdges(nodeIndex);
    this.getModel().node[nodeIndex] = null;

    this.refs.canvas.redraw();
    this.forceUpdate();
  }

  removeAllEdges (nodeIndex) {
    this.getModel().connection[nodeIndex] = null;

    for (var i=0; i<this.getModel().node.length; i++) {
      this.removeEdge(i, nodeIndex);
    }
  }

  removeEdge (from, to) {
    if (this.getModel().connection[from]) {
      var found = this.findConnection(from, to);
      if (found !== false) {
        this.getModel().connection[from].splice(found, 1);
      }
    }
  }

  getModel () {
    return this.props.model;
  }

  connect (from, to) { // TODO: check if still dag
    if (from === to) return false;

    if (!this.findConnection(from, to)) {
      this.props.model.connection[from] = this.props.model.connection[from] || [];
      this.props.model.connection[from].push(to);
    }

    this.refs.canvas.redraw();
    return true;
  }

  findConnection (from, to) {
    if (!this.getModel().connection[from]) return false;

    for (var i=0; i<this.getModel().connection[from].length; i++) {
      if (this.getModel().connection[from][i] === to) return i;
    }

    return false;
  }

  onNodeMousemove(node, e) {
    this.refs.canvas.onNodeMousemove(node, e);
  }

  onNodeMouseDown (node, e) {
    this.props.onNodeMouseDown && this.props.onNodeMouseDown(node, e);

    var activeTool = this.props.toolboxModel.active;
    if (activeTool.key === "delete") {
      this.removeNode(node.props.index);
      this.removeEdge(activeTool.from, activeTool.to);
    }
  }

  render () {
    return (
      <div className="board shadow" ref="body"
           onMouseMove={(e)=>(this.props.onMouseMove && this.props.onMouseMove(e))}
           onMouseUp={(e)=>(this.props.onMouseUp && this.props.onMouseUp(e))}>
        <Canvas model={this.props.model} board={this} ref="canvas"
                toolboxModel={this.props.toolboxModel}/>
        {
          this.props.model.node.map((item, index)=>{
            if (item) {
              return(
                <Node key={'node-' + index} model={item}
                      ref={'node-' + index}
                      board={this}
                      index={index}
                      onMouseMove={(node, e)=>(this.onNodeMousemove(node, e))}
                      onMouseDown={(node, e)=>(this.onNodeMouseDown(node, e))}
                  />
              );
            } else {
              return null;
            }
          })
        }
      </div>
    );
  }
}

export default Board;
