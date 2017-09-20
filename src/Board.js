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

  removeNode (nodeIndex) {
    this.removeAllEdges(nodeIndex);
    this.getModel().node.splice(nodeIndex, 1);
    this.refs.canvas.redraw();
    this.forceUpdate();

    console.log(this.props.model.node.length);
  }

  removeAllEdges (nodeIndex) {
    this.getModel().connection[nodeIndex] = null;
  }

  removeEdge (from, to) {
    // TODO
  }

  getModel () {
    return this.props.model;
  }

  connect (from, to) { // TODO: check if still dag
    if (from === to) return false;

    if (!this.checkConnection(from, to)) {
      this.props.model.connection[from] = this.props.model.connection[from] || [];
      this.props.model.connection[from].push(to);
    }

    this.refs.canvas.redraw();
    return true;
  }

  checkConnection (from, to) {
    if (!this.getModel().connection[from]) return false;

    for (var i=0; i<this.getModel().connection[from].length; i++) {
      if (this.getModel().connection[from][i] === to) return true;
    }

    return false;
  }

  onNodeMousemove(node, e) {
    this.refs.canvas.onNodeMousemove(node, e);
  }

  onNodeMouseDown (node, e) {
    this.props.onNodeMouseDown && this.props.onNodeMouseDown(node, e);

    if (this.props.toolboxModel.active.key === "delete") {
      this.removeNode(node.props.index);
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
            return(
              <Node key={'node-' + index} model={item}
                    ref={'node-' + index}
                    board={this}
                    index={index}
                    onMouseMove={(node, e)=>(this.onNodeMousemove(node, e))}
                    onMouseDown={(node, e)=>(this.onNodeMouseDown(node, e))}
                />
            );
          })
        }
      </div>
    );
  }
}

export default Board;
