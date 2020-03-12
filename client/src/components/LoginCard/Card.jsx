import React from 'react';
import config from '../../config/default'

// login icon
import facebookIcon from '../../assets/loginImage/facebook.png';
import googleIcon from '../../assets/loginImage/google.png';

const getIcon = (type) => {
   switch (type) {
      case "facebook":
         return facebookIcon
      case "google":
         return googleIcon
   }
}

const getColor = (type) => {
   switch (type) {
      case "facebook":
         return "#3B5899"
      case "google":
         return "#CB4024"
   }
}

const login = (type) => {
   window.location = `${config.serverUrl}/api/auth/${type}`
}

const Card = ({ type }) => {
   return (
      <div style={{ display: "flex", marginTop: "1rem", border: "0.5px solid #cccc", background: "white" }} onClick={() => login(type)}>
         <div
            style={{
               width: "3rem",
               height: "3rem",
               marginRight: "1rem",
               background: `url(${getIcon(type)}) no-repeat center center / 50% ${getColor(type)}`
            }}
         >
         </div>
         <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <p style={{ padding: 0, margin: 0 }}>使用 {type} 進行登入</p>
         </div>
      </div>
   );
};

export default Card;