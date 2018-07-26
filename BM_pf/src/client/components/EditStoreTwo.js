import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uploadStorePic from './images/uploadStorePic.png';

const propTypes = {
  oneStoreId: PropTypes.string,
  oneStore: PropTypes.object,
  onOneStoreRequest: PropTypes.func,
  onEdit:PropTypes.func
};
const defaultProps = {
  oneStoreId: '',
  oneStore: {},
  onOneStoreRequest: () => {console.log('get one store fuction is undefined')},
  onEdit: () => {console.log('edit store fuction is undefined')}
};
//** db에서 정보받아서 state 설정부터 차근차근!
class EditStoreTwo extends Component {
    state = {
      menus: [{
        image: '',
        categories: '',
        name: '',
        price: 0
      }],
      options: [{
        name: '',
        price: 0
      }],
      menuCategories: [""],
      menuCategoriesLength: 1
    }

    componentWillMount(){
      this.props.onOneStoreRequest(this.props.oneStoreId).then(
        ()=>{
          let dbMenuCategories = this.props.oneStore.menuCategories;
          if(dbMenuCategories.length===0){
            dbMenuCategories = [""]
          }
          let dbMenus = this.props.oneStore.menus;
          if(dbMenus.length===0){
            dbMenus = [{
              image: '',
              categories: '',
              name: '',
              price: 0
            }]
          }
          let dbOptions = this.props.oneStore.options;
          if(dbOptions.length===0){
            dbOptions = [{
              name: '',
              price: 0
            }]
          }
          this.setState({
            menus: dbMenus,
            menuCategories: dbMenuCategories,
            menuCategoriesLength: dbMenuCategories.length,
            options: dbOptions
          });
        }
      )
    }
    componentDidMount(){
      let singleWidget = uploadcare.SingleWidget('[role=uploadcare-uploader]');
      singleWidget.onUploadComplete((info)=>{
        // console.log(info.cdnUrl);
        $('.upload-store-pic img').attr('src', info.cdnUrl);
        let nthId = $('.edit-menu-view').attr('id');
        let nth = nthId.slice(0, 1);
        this.state.menus[nth].image = info.cdnUrl;
        this.forceUpdate();
      });
    }
    handleEdit = () => {
      this.props.onEdit("two", this.props.oneStoreId, this.state);
    }
    handleMenuCategoriesChange = (e) => {
      let nowMenuCategories = this.state.MenuCategories;
      let target = e.target;
      let name = e.target.name; //region1, region2 와 같이
      let whatNumber = name.slice(13); //region 뒤의 숫자 알아내기
      this.state.menuCategories[whatNumber-1] = e.target.value;
      this.forceUpdate();
    }
    menuCategoriesLengthChange = () => {
      let willMenuCategoriesLength = $('input.menuCategories-counter').val();
      if(willMenuCategoriesLength > 4){
        alert('메뉴 종류는 4개 이하로 설정하여야 합니다!')
      }else if(willMenuCategoriesLength < 1){
        alert('메뉴 종류는 1개 이상이어야 합니다!')
      }else{
        // console.log(willMenuCategoriesLength);
        this.state.menuCategoriesLength = willMenuCategoriesLength;
        // 원래 배열은 손대지 않기 (조건문으로 길이 비교),
        // 늘어나야 되는 만큼 빈문자로 이루어진 배열만들기
        // 만들어서 this.state.region 변경하기
        // this.state.region[willMenuCategoriesLength-1] = "";
        this.forceUpdate();
        let willLength = this.state.menuCategoriesLength;
        let nowLength = this.state.menuCategories.length
        if(willLength!==nowLength){
          if(willLength-nowLength < 0){
            // 배달지역 줄어들 경우 - 원래배열슬라이스
            let nowMenuCategories = this.state.menuCategories
            nowMenuCategories.splice(willLength, (nowLength-1));
            this.setState({
              menuCategories: nowMenuCategories
            });
            // it works well!
            // console.log(this.state.region)
          }else if(willLength-nowLength > 0){
            // 배달지역 늘어날 경우 - 원래 배열에 추가되야할 내용만큼 빈문자 추가
            let willAddArrLength = willLength-nowLength;
            let willAddArr = [];
            for(var i=0; i < willAddArrLength; i++){
              willAddArr[i] = "";
              if(i===willAddArrLength-1){
                // console.log(willAddArr);
                let increase = [...this.state.menuCategories, ...willAddArr];
                // console.log(increase);
                this.setState({
                  menuCategories: increase
                })
              }
            }
          }
        }
      }
    }
    handleMenuCategoriesLengthButtonAdd = () => {
      $('input.menuCategories-counter').val(Number($('input.menuCategories-counter').val())+1);
      this.menuCategoriesLengthChange();
    }
    handleMenuCategoriesLengthButtonSub = () => {
      $('input.menuCategories-counter').val(Number($('input.menuCategories-counter').val())-1);
      this.menuCategoriesLengthChange();
    }
    turnOnEditView = (e) => {
      let nthId = $(e.target).parents().attr('id');
      let nth = nthId.slice(0, 1);
      // console.log(nth)
      // console.log($(e.target))
      // console.log($(`div.${nth}th-menu`))
      $(`div#${nth}th-menu`).css('display', 'block');
    }
    turnOnOptionView = (e) => {
      let nthId = $(e.target).parents().attr('id');
      let nth = nthId.slice(0, 1);
      // console.log(nth)
      // console.log($(e.target))
      // console.log($(`div.${nth}th-menu`))
      $(`div#${nth}th-option`).css('display', 'block');
    }
    addToMenu = (e) => {
      let editViews = $(e.target).parents('div.edit-menu-view');
      // console.log(editViews)
    }
    selectChange = (e) => {
      let nthId = $(e.target).parents('div.edit-menu-view').attr('id');
      let nth = nthId.slice(0, 1)
      let value = $(e.target).val();
      this.state.menus[nth].categories = e.target.value;
      this.forceUpdate()
    }
    handleChange = (e) => {
      let nthId = $(e.target).parents('div.edit-menu-view').attr('id');
      let nth = nthId.slice(0, 1);
      let willField = e.target.name
      this.state.menus[nth][willField] = e.target.value;
      this.forceUpdate()
    }
    handleChangeOption = (e) => {
      let nthId = $(e.target).parents('div.edit-option-view').attr('id');
      let nth = nthId.slice(0, 1);
      let willField = e.target.name
      this.state.options[nth][willField] = e.target.value;
      this.forceUpdate()
    }
    closeEditView = (e) => {
      $(e.target).parents('div.edit-menu-view').css('display', 'none');
    }
    closeOptionView = (e) => {
      $(e.target).parents('div.edit-option-view').css('display', 'none');
    }
    createNewMenu = () => {
      this.state.menus.push({
        image: '',
        categories: '',
        name: '',
        price: 0
      });
      this.forceUpdate()
    }
    createNewOption = () => {
      this.state.options.push({
        name: '',
        price: 0
      });
      this.forceUpdate()
    }
    render() {
      const doneButton = (
        <div className="done-button" onClick={this.handleEdit}>
          등록
        </div>
      );
      const mapTodbMenuCategories = (arr) => {
        return arr.map((item, i) => {
          return(<input placeholder={"메뉴 구분"+(i+1)} value={this.state.menuCategories[i]} key={i}
            name={"menu_category"+(i+1)} className="menu_category" onChange={this.handleMenuCategoriesChange}/>)
        })
      }
      const menuCategoriesEditView = (
        <div>
          <div className="set-region-number-label">메뉴의 카테고리를 설정하세요</div>
          <input type="number" className="menuCategories-counter browser-default" min="1" max="10"
            onChange={this.menuCategoriesLengthChange} value={this.state.menuCategoriesLength}/>
          <div className="region-length-count-buttons">
            <div className="display-inline-block" onClick={this.handleMenuCategoriesLengthButtonAdd}>
              <i className="material-icons">add_circle</i>
            </div>
            <div className="display-inline-block" onClick={this.handleMenuCategoriesLengthButtonSub}>
              <i className="material-icons">remove_circle</i>
            </div>
          </div>
          {mapTodbMenuCategories(this.state.menuCategories)}
        </div>
      )

      const mapToOptions = (data) => {
        return data.map((item, i) => {
          return (
            <option value={item} key={i}>{item}</option>
          )
        })
      }
      const invisible = {
        display: "none"
      }
      const editMenuView = (arr) => {
        return arr.map((item, i)=>{
          return (
            <div className="edit-menu-view" id={i+"th-menu"} key={i} style={invisible}>
              <select name="menu_categories" value={item.categories==''?"1":item.categories}
                onChange={this.selectChange}>
                <option value="1" disabled >메뉴 종류 선택</option>
                {mapToOptions(this.state.menuCategories)}
              </select>
              <div className="upload-store-pic">
                <img src={item.image==''?uploadStorePic:item.image} alt="menu-image" className="circle responsive-img" />
              </div>
              <input
                type="hidden"
                role="uploadcare-uploader"
                name="thumbNail"
                className="uploader" />
              <input name="name" type="text" placeholder="메뉴명" value={item.name} onChange={this.handleChange}/>
              <input name="price" type="number" placeholder="메뉴가격('원'을 제외한 숫자만 입력)"
                value={item.price} onChange={this.handleChange}/>
              <div className="edit-menu-done-button" onClick={this.closeEditView}>
                완료
              </div>
            </div>
          )
        })
      }
      // 만들어지는 뷰가 몇 번째 원소인지를 알아야 함
      const editMenuButtons = (arr) => {
        return arr.map((item, i) => {
          return (
            <div className="create-new-memo-button" id={i+'onButton'} onClick={this.turnOnEditView}
              key={i}>
              <i className="material-icons">add_circle</i>
              <div>{item.name===""?"메뉴를 수정하세요":item.name}</div>
            </div>
          )
        })
      }
      const editOptionView = (arr) => {
        return arr.map((item, i)=>{
          return (
            <div className="edit-option-view" id={i+"th-option"} key={i} style={invisible}>
              <input name="name" type="text" placeholder="메뉴명" value={item.name} onChange={this.handleChangeOption}/>
              <input name="price" type="number" placeholder="메뉴가격('원'을 제외한 숫자만 입력)"
                value={item.price} onChange={this.handleChangeOption}/>
              <div className="edit-menu-done-button" onClick={this.closeOptionView}>
                완료
              </div>
            </div>
          )
        })
      }
      // 만들어지는 뷰가 몇 번째 원소인지를 알아야 함
      const editOptionButtons = (arr) => {
        return arr.map((item, i) => {
          return (
            <div className="create-new-memo-button" id={i+'onButton'} onClick={this.turnOnOptionView}
              key={i}>
              <i className="material-icons">add_circle</i>
              <div>{item.name===""?"메뉴를 수정하세요":item.name}</div>
            </div>
          )
        })
      }
      // console.log(this.state);
      // console.log(this.props.oneStore)
        return(
            <div className="owner-register">
              {doneButton}
              <div>메뉴 추가 및 수정</div>
              {menuCategoriesEditView}
              <div className="current-menu-lists">
                {editMenuButtons(this.state.menus)}
                <div className="create-new-memo-button" id="create-new-menu" onClick={this.createNewMenu}>
                  <i className="material-icons">add_circle</i>
                  <div>새 메뉴 만들기</div>
                </div>
              </div>
              <div className="owner-edit-menus">
                {editMenuView(this.state.menus)}
              </div>
              <div className="current-menu-lists">
                {editOptionButtons(this.state.options)}
                <div className="create-new-memo-button" id="create-new-menu" onClick={this.createNewOption}>
                  <i className="material-icons">add_circle</i>
                  <div>새 옵션 만들기</div>
                </div>
              </div>
              <div>
                {editOptionView(this.state.options)}
              </div>
            </div>
        );
    }
}

EditStoreTwo.propTypes = propTypes;
EditStoreTwo.defaultProps = defaultProps;

export default EditStoreTwo;
