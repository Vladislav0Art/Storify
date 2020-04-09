import React from 'react';

import './Command.css';

const Command = (props) => {
  return (
    <div className="commands-item">
      <span className="commands-descr">{props.descr}:</span>
      <button onClick={props.onClick} className="commands-trigger">{props.action}</button>
    </div>
  );
}

export default Command;
