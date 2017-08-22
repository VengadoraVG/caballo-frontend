import React, {Component} from 'react';
import './Board.css';
import Node from './Node';

class Board extends Component {
  getMousePosition (e) {
    var body = this.refs.body.getBoundingClientRect();
    return {
      x: e.clientX - body.left,
      y: e.clientY - body.top
    };
  }

  render () {
    return (
      <div className="board shadow" ref="body"
           onMouseMove={(e)=>(this.props.onMouseMove && this.props.onMouseMove(e))}
           onMouseUp={(e)=>(this.props.onMouseUp && this.props.onMouseUp(e))}>
        {
          this.props.model.node.map((item, index)=>{
            return(
              <Node key={'node-' + index} model={item}
                    ref={'node-' + index}
                    board={this}
                    onMouseDown={(node, e)=>(this.props.onNodeMouseDown && this.props.onNodeMouseDown(node, e))}/>
            );
          })
        }
      </div>
    );
  }
}

export default Board;
