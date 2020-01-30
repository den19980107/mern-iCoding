import React from 'react';
import './Home.css';
import 'antd/dist/antd.css';

import { Carousel } from 'antd';
const Home = () => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <img src="https://storage.googleapis.com/hh-static/banner-newyear2020wathefa-20200120/banner-newyear2020wathefa-ROUND1-M.jpg"></img>
        </div>
        <div>
          <img src="https://storage.googleapis.com/hh-static/banner_ur_20181002/new_banner_ur_m-cp.jpg"></img>
        </div>
        <div>
          <img src="https://storage.googleapis.com/hh-static/banner-jananbuy-20200122/banner-jananbuy-M.jpg"></img>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;