import React from 'react';
import { Button } from 'react-bootstrap';



const Category = ({categories, onClickItem}) => {
  const categorytItems = categories.map((item) => {
    return (
      <Button onClick={() => onClickItem(item)} bsStyle="primary btn-lg" key={item.category} >{item.category}({item.length}) </Button>
    );
  });

  return (
    <div>
      {categorytItems}
    </div>
  )
};

export default Category ;
