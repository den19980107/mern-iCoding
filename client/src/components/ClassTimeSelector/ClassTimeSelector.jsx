import React, { Component } from 'react';
import uuid from 'uuid';
import { Select, Button, TimePicker, Icon } from 'antd';
import { Alert } from 'react-bootstrap'
import moment from 'moment';

const { Option } = Select;
const format = 'HH:mm';

class ClassTimeSelector extends Component {
   constructor(props) {
      super(props)
      this.state = {
         classTime: props.value,
         newDay: "禮拜一",
         newStart: "08:00",
         newEnd: "09:00"
      }
   }

   onSetNewDay = (newDayString) => {
      this.setState({ newDay: newDayString })
   }

   onSetNewStart = (time, timeString) => {
      this.setState({ newStart: timeString })
   }

   onSetNewEnd = (time, timeString) => {
      this.setState({ newEnd: timeString })
   }

   onAddNewClassTime = () => {
      const oldClassTime = this.state.classTime;
      let newClassTime = {
         time: `${this.state.newDay} ${this.state.newStart} ~ ${this.state.newEnd}`,
         id: uuid()
      }
      // let newClassTimes = this.state.classTime.push(newClassTime)
      this.setState({ classTime: [...oldClassTime, newClassTime] }, () => {
         this.handleChange()
      })
   }

   onDeleteClassTime = (id) => {
      let deletedClassTime = this.state.classTime.filter(classTime => {
         return classTime.id != id
      })
      this.setState({ classTime: deletedClassTime }, () => {
         this.handleChange()
      })
   }

   // send data to parent
   handleChange = () => {
      this.props.onChange(this.state.classTime)
   }
   render() {
      return (
         <React.Fragment>
            <div className="row">
               <div className="col-lg-3 mt-2">
                  <p>上課日</p>
                  <Select defaultValue="禮拜一" style={{ width: "100%" }} onChange={this.onSetNewDay}>
                     <Option value="禮拜一">禮拜一</Option>
                     <Option value="禮拜二">禮拜二</Option>
                     <Option value="禮拜三">禮拜三</Option>
                     <Option value="禮拜四">禮拜四</Option>
                     <Option value="禮拜五">禮拜五</Option>
                     <Option value="禮拜六">禮拜六</Option>
                     <Option value="禮拜日">禮拜日</Option>
                  </Select>
               </div>
               <div className="col-lg-3 mt-2">
                  <p>上課開始時間</p>
                  <TimePicker style={{ width: "100%" }} defaultValue={moment('12:08', format)} format={format} onChange={this.onSetNewStart} />
               </div>
               <div className="col-lg-3 mt-2">
                  <p>上課結束時間</p>
                  <TimePicker style={{ width: "100%" }} defaultValue={moment('12:08', format)} format={format} onChange={this.onSetNewEnd} />
               </div>
               <div className="col-lg-3 mt-2">
                  <p style={{ visibility: "hidden" }}> qwe</p>
                  <Button style={{ width: "100%" }} onClick={this.onAddNewClassTime}>新增</Button>
               </div>
            </div>

            <div className="mt-3">
               {this.state.classTime.map(timeData => {
                  return (
                     <Alert variant='info' style={{ display: "flex", justifyContent: "space-between" }}>
                        {timeData.time}
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                           <Icon type="close" onClick={() => { this.onDeleteClassTime(timeData.id) }} />
                        </div>
                     </Alert>
                  )
               })}
            </div>
         </React.Fragment>
      );
   }
}

export default ClassTimeSelector;