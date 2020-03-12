import React from 'react';
import Comments from '../../components/Comments'

const Test = (props) => {
   const { classId, unitId, testId } = props.match.params

   return (
      <div>
         <p>classId = {classId}</p>
         <p>unitId = {unitId}</p>
         <p>testId = {testId}</p>

         <Comments
            type="test"
            belongId={testId}
         ></Comments>
      </div>
   );
};

export default Test;