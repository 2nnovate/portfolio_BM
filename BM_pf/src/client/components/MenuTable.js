import React, { Component } from 'react';
import PropTypes from 'prop-types';
import kFood from './images/k_food.png';
import tobboki from './images/tobboki.png';
import sushi from './images/sushi.png';
import chicken from './images/chicken.png';
import pizza from './images/pizza.png';
import jja from './images/jja.png';
import jokbal from './images/jokbal.png';
import night from './images/night.png';
import jjim from './images/jjim.png';
import pack from './images/pack.png';
import cafe from './images/cafe.png';
import burger from './images/burger.png';
import franchise from './images/franchise.png';
import ranking from './images/ranking.png';
import blank from './images/blank.png';
import { Link } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};

class MenuTable extends Component {
    state = {

    }
    // 한 페이지 안에서 계속 렌더링 되는 것을 방지
    // *props 를 통해 정보 받아올 것(DB 에서 프론트엔드로-리덕스)
    shouldComponentUpdate(nextProps, nextState) {
      // 리턴값이  true 이면 render 메소드 실행
      let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
      return update;
    }
    render() {
      const firstArray = [{img:kFood , name:"한식", path:"/menu/kfood"}, {img:tobboki , name:"분식", path:"/menu/snack"}, {img:sushi , name:"돈까스・회・일식", path:"/menu/jfood"}];
      const secondArray = [{img:chicken , name:"치킨", path:"/menu/chicken"}, {img:pizza , name:"피자", path:"/menu/pizza"}, {img:jja , name:"중국집", path:"/menu/cfood"}];
      const thirdArray = [{img:jokbal , name:"족발・보쌈", path:"/menu/jokbo"}, {img:night , name:"야식", path:"/menu/night"}, {img:jjim , name:"찜・탕", path:"/menu/soup"}];
      const fourthArray = [{img:pack , name:"도시락", path:"/menu/packed"}, {img:cafe , name:"카페・디저트", path:"/menu/cafe"}, {img:burger , name:"패스트푸드", path:"/menu/fastfood"}];
      const fivethArray = [{img:franchise , name:"프랜차이즈", path:"/menu/franchise"}, {img:ranking , name:"맛집랭킹", path:"/menu/ranking"}, {img:blank , name:"", path:"/"}];

      const mapToMenuTable = data => {
        return data.map((item,i)=>{
          return (
            <div className="MT-item" key={i}>
              <Link to={item.path}>
                <img src={item.img} />
                <p className="hanna">{item.name}</p>
              </Link>
            </div>
          );
        });
      };
      // console.log("Redered MenuTable component");
        return(
            <div>
              <div className="MT-container">
                {mapToMenuTable(firstArray)}
              </div>
              <div className="MT-container">
                {mapToMenuTable(secondArray)}
              </div>
              <div className="MT-container">
                {mapToMenuTable(thirdArray)}
              </div>
              <div className="MT-container">
                {mapToMenuTable(fourthArray)}
              </div>
              <div className="MT-container">
                {mapToMenuTable(fivethArray)}
              </div>
            </div>
        );
    }
}

MenuTable.propTypes = propTypes;
MenuTable.defaultProps = defaultProps;

export default MenuTable;
