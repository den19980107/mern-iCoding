import React, { Component } from 'react';
import ClassItem from './ClassItem';
import Loader from '../../components/Loader/Loader'
import axios from 'axios';
import './ClassList.css'
class ClassList extends Component {
   state = {
      classDatas: null
   }
   componentDidMount() {
      this.fetchData();
   }

   async fetchData() {
      const result = await axios.get('/api/class');
      if (result.status == 200) {
         this.setState({ classDatas: result.data })
      } else {
         console.log(result)
      }
   }
   render() {
      const { classDatas } = this.state
      if (classDatas) {
         return (
            <div className="row" style={{ margin: "2rem" }} className="class-List-row">
               {
                  classDatas.map(function (item, i) {
                     return (
                        <ClassItem classDatas={item}></ClassItem>
                     )
                  })
               }
            </div>
         );
      } else {
         return (
            <Loader></Loader>
         )
      }
   }
}

export default ClassList;