import React from 'react';
import { Button } from 'react-bootstrap';



const Category = ({categories}) => {

  const categorytItems = categories.map((item) => {
    return (
      <Button bsStyle="primary btn-lg" key={item.category} >{item.category}({item.length}) </Button>
    );
  }
  );
  return (
    <div>
      {categorytItems}
    </div>
  )
  };
      export default Category ;