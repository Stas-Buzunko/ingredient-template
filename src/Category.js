import React from 'react';
import { Button } from 'react-bootstrap';



const Category = ({categories, filteredCategories, onClickItem}) => {
  const isActive = (item, filteredCategories) => {
    return filteredCategories.find((category) => item.category === category.category);
  };

  const categorytItems = categories.map((item) => {
    const className = isActive(item, filteredCategories) ? 'active' : '';
    return (
      <Button onClick={() => onClickItem(item)}
        bsStyle="primary btn-lg"
        key={item.category}
        className={className} >{item.category}({item.length}) </Button>
    )
  });

  return (
    <div>
      {categorytItems}
    </div>
  )
};

export default Category ;
