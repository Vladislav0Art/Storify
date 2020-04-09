import React from 'react';

import './Item.css';

const Item = (props) => {

  const date = (date) => {
    return `${(new Date(date).toDateString())} ${(new Date(date).toLocaleTimeString())}`;
  }

  const trimName = (name) => {
    if(name.length > 30) {
      name = name.substr(0, 27) + '...';
    }
    return name;
  }

  return (
    <div className="item-panel">
      <span className="item-panel-span item-name">{trimName(props.item.name)}</span>
      <span className="item-panel-span item-date">{ date(props.item.updatedAt) }</span>
      <button className="item-btn delete">delete</button>
      <button className="item-btn update">update</button>
    </div>
  );
}

export default Item;
