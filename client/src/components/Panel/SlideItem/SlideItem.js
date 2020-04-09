import React from 'react';

const SlideItem = (props) => {

  const date = (date) => {
    return `${(new Date(date).toDateString())} ${(new Date(date).toLocaleTimeString())}`;
  }

  const trimTitle = (title) => {
    if(title.length > 30) {
      title = title.substr(0, 27) + '...';
    }
    return title;
  }

  return (
    <div className="item-panel">
      <span className="item-panel-span item-name">{trimTitle(props.item.title)}</span>
      <span className="item-panel-span item-date">{date(props.item.updatedAt)}</span>
      <button className="item-btn delete">delete</button>
      <button className="item-btn update">update</button>
    </div>
  );
}

export default SlideItem;
