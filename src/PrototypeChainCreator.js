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

  onKeyDown (e) {
    this.refs.toolbox.selectWithHotkey(e.key);
  }

  componentDidMount () {
    this.refs.body.focus();
  }

  render () {
    var tool = [{
      key: 'move',
      name: 'mover',
      hotkey: '1'
    }, {
      key: 'delete',
      name: 'borrar',
      hotkey: '2'
    }, {
      key: 'create-edge',
      name: 'definir dependencia',
      hotkey: '3'
    }, {
      key: 'add',
      name: 'añadir prototipo',
      hotkey: '4'
    }];
    
    return (
      <div className="prototype-chain-creator"
           tabIndex="0"
           ref='body'
           onKeyDown={(e)=>this.onKeyDown(e)}>
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
