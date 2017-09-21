import React, {Component} from 'react';
import './PrototypeChainCreator.css';
import Board from './Board';
import Toolbox from './Toolbox';
import Inspector from './Inspector';

class PrototypeChainCreator extends Component {
  onNodeMouseDown (node, e) {
    this.refs.toolbox.onNodeMouseDown && this.refs.toolbox.onNodeMouseDown(node, e);
    this.refs.body.focus();
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

  onFocusOut (e) {
    e.stopPropagation();
    this.refs.body.focus();
  }

  componentDidMount () {
    this.refs.body.focus();
    this.refs.toolbox.board = this.refs.board;
  }

  render () {
    var toolbox = {
      tools: [{
        key: 'move',
        name: 'mover',
        hotkey: '1'
      }, {
        key: 'delete',
        name: 'borrar',
        hotkey: '2',
        edgeDistance: 15,
        reset () {
          if (this.selected) {
            if (this.selected.node) {
              this.selected.node.unhighlight();
              this.selected.node = null;
            }
            this.selected.from = this.selected.to = null;
          }
        }
      }, {
        key: 'create-edge',
        name: 'definir dependencia',
        hotkey: '3',
        reset () {
          this.from = null;
        }
      }, {
        key: 'add',
        name: 'añadir prototipo',
        hotkey: '4'
      }],
      active: null
    };
    toolbox.active = toolbox.tools[0];
    
    return (
      <div className="prototype-chain-creator"
           tabIndex="0"
           ref='body'
           onBlur={(e)=>this.onFocusOut(e)}
           onKeyDown={(e)=>this.onKeyDown(e)}
        >
        <Toolbox model={toolbox} ref="toolbox"/>
        <Board model={this.props.model.board} toolboxModel={toolbox}
               ref="board"
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
