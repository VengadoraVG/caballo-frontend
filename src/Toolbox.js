import React, {Component} from 'react';
import './Toolbox.css';

class Toolbox extends Component {
  selectTool (tool) {
    this.props.model.active.reset && this.props.model.active.reset();
    this.props.model.active = tool;
    this.forceUpdate();

    this.props.onToolChange && this.props.onToolChange();
  }

  onNodeMouseDown (node, e) {
    var active = this.props.model.active;

    switch (active.key) {
    case 'move':
      active.grabbed = node;
      node.grab();
      active.anchorPoint = node.getAnchorPoint(e);
      break;
    case 'create-edge':
      if (active.from) {
        this.board.connect(active.from.props.index, node.props.index);
        active.reset();
      } else {
        active.from = node;
      }
      break;
    }

    if (active.key === 'move') {
      active.grabbed = node;
      node.grab();
      active.anchorPoint = node.getAnchorPoint(e);
    }
  }

  onBoardMouseMove (e) {
    var active = this.props.model.active;

    if (active.key === 'move') {
      if (active.grabbed) {
        active.grabbed.setPositionFromFixed(e.clientX - active.anchorPoint.x,
                                            e.clientY - active.anchorPoint.y);
      }
    }
  }

  onBoardMouseUp (e) {
    var active = this.props.model.active;

    if (active.key === 'move') {
      if (active.grabbed) {
        active.grabbed.props.model.grabbed = false;
        active.grabbed.drop();
        active.anchorPoint = active.grabbed = null;
      }
    }
  }

  selectWithHotkey (hotkey) {
    this.props.tools.forEach((tool)=>{
      if (hotkey === tool.hotkey) {
        this.selectTool(tool);
      }
    });
  }

  render () {
    return (
      <div className="toolbox shadow">
        {
          this.props.tools.map((tool, index)=>{
            var logo = require('./img/' + tool.key + '.svg');
            return (
              <div className={'tool shadow ' + (tool.key === this.props.model.active.key? 'active': '' )}
                   key={tool.key} onClick={()=>this.selectTool(tool)}>
                <img src={logo} className='tool-logo '
                     draggable='false' alt={tool.name} />
                <div className='hotkey shadow'>{tool.hotkey}</div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Toolbox;
