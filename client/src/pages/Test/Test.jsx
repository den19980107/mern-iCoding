import React from 'react';

const Test = (props) => {
   const { classId, unitId, testId } = props.match.params

   return (
      <div>
         <p>classId = {classId}</p>
         <p>unitId = {unitId}</p>
         <p>testId = {testId}</p>
      </div>
   );
};

export default Test;