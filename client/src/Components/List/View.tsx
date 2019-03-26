import React from 'react';
import { Link } from "react-router-dom";
import { ListItem } from '../ListItem';

const List = () => {
  const arr = [0, 0, 0, 0, 0];

  return (
    <>
      {arr.map((num, index) => (<ListItem key={index}/>))}
      <Link to='/podcasts/new'>New</Link>
    </>
  )
}

export default List;
