import React from 'react';
import Card from './Card';
const loginMethods = ["facebook", "google"]

const CardList = () => {
   return (
      <div>
         {loginMethods.map(method => {
            return <Card key={method} type={method}></Card>
         })}
      </div>
   );
};

export default CardList;