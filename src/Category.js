import React from 'react';
import { Button } from 'react-bootstrap';

const Category = ({categories, filter, onClickItem}) => {

  const categorytButtons = categories.map((item) => (
      <Button onClick={() => onClickItem(item)}
        bsStyle="danger"
        bsSize="lg"
        key={item.category}
        className={item.category === filter ? 'active' : ''}>
        {item.category}({item.length})
      </Button>
    )
  );

  return (
    <div>
      {categorytButtons}
    </div>
  )
};

export default Category ;
