import React, { Component } from 'react';
import ClassItem from './ClassItem';
import axios from 'axios';

class ClassList extends Component {
   state = {
      classDatas: []
   }
   componentDidMount() {
      this.fetchData();
   }

   async fetchData() {
      const result = await axios.get('/class');
      if (result.status == 200) {
         this.setState({ classDatas: result.data })
      } else {
         console.log(result)
      }
   }
   render() {
      const { classDatas } = this.state
      return (
         <div className="row" style={{ margin: "2rem" }}>
            {
               classDatas.map(function (item, i) {
                  return (
                     <ClassItem classDatas={item}></ClassItem>
                  )
               })
            }
         </div>
      );
   }
}

export default ClassList;