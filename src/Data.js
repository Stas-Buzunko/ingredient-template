import React from 'react';
import './App.css';

const Data = ({data}) => {
  const dataItems = data.map((item) => (
    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 item" key={item.id}>
      <div className="thumbnail item">
        <img className="img-responsive thumbnail img" src={item.url} width="250" height="200"  alt=""/>
        <div className="caption">
          <h4>{item.name}</h4>
          <div>{item.characteristics.map(tag => <h5  key={tag}>{tag}</h5>)}</div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      {dataItems}
    </div>
  )
};
export default Data;
