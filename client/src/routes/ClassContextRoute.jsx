import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ClassDataProvider from '../context/ClassDataProvider'
import UserInfoProvider from '../context/UserInfoProvider'
// import page
import ClassDashBoard from '../pages/ClassDashBoard/ClassDashBoard'
import ClassManager from '../pages/ClassManager/ClassManager';
function ClassContextRoute(props) {
   const classId = props.match.params.id
   return (
      <ClassDataProvider id={classId}>
         <Route exact path="/class/:id" component={ClassDashBoard} />
         <Route exact path="/class/:id/classManager" component={ClassManager}></Route>
         <Route exact path="/class/:id/classManager/unit/:unitId/tab/:tabName" component={ClassManager}></Route>
      </ClassDataProvider>
   )
}

export default ClassContextRoute;
