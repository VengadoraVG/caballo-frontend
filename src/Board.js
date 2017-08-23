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

  connect (from, to) {
    if (!this.props.model.connectionHash[from] ||
        !this.props.model.connectionHash[from][to]) {
      this.props.model.connection[from] = this.props.model.connection[from] || [];
      this.props.model.connection[from].push(to);

      this.props.model.connectionHash[from] = this.props.model.connectionHash[from] || {};
      this.props.model.connectionHash[from][to] = true;
    }

    this.refs.canvas.redraw();
  }

  render () {
    return (
      <div className="board shadow" ref="body"
           onMouseMove={(e)=>(this.props.onMouseMove && this.props.onMouseMove(e))}
           onMouseUp={(e)=>(this.props.onMouseUp && this.props.onMouseUp(e))}>
        <Canvas model={this.props.model} board={this} ref="canvas"/>
        {
          this.props.model.node.map((item, index)=>{
            return(
              <Node key={'node-' + index} model={item}
                    ref={'node-' + index}
                    board={this}
                    index={index}
                    onMouseDown={(node, e)=>(this.props.onNodeMouseDown && this.props.onNodeMouseDown(node, e))}/>
            );
          })
        }

      </div>
    );
  }
}

export default Board;
