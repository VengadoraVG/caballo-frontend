import React, {Component} from 'react';
import './PrototypeChainCreator.css';
import Board from './Board';
import Toolbox from './Toolbox';
import Inspector from './Inspector';

class PrototypeChainCreator extends Component {
  onNodeMouseDown (node, e) {
    this.refs.toolbox.onNodeMouseDown && this.refs.toolbox.onNodeMouseDown(node, e);
  }

  onBoardMouseMove (e) {
    this.refs.toolbox.onBoardMouseMove(e);
  }

  onBoardMouseUp (e) {
    this.refs.toolbox.onBoardMouseUp(e);
  }

  render () {
    var tool = [{
      key: 'move',
      name: 'mover'
    }, {
      key: 'delete',
      name: 'borrar'
    }, {
      key: 'create-edge',
      name: 'definir dependencia'
    }, {
      key: 'add',
      name: 'añadir prototipo'
    }];
    
    return (
      <div className="prototype-chain-creator">
        <Toolbox tools={tool} model={this.props.model.toolbox} ref="toolbox"/>
        <Board model={this.props.model.board} activeTool={this.props.model.toolbox.active}
               onNodeMouseDown={(node, e)=>this.onNodeMouseDown(node, e)}
               onMouseMove={(e)=>this.onBoardMouseMove(e)}
               onMouseUp={(e)=>this.onBoardMouseUp(e)}
          />
        <Inspector/>
      </div>
    );
  }
}

export default PrototypeChainCreator;
