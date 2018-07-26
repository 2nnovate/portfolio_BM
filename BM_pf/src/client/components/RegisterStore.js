import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uploadStorePic from './images/uploadStorePic.png';
// onRegisterStore
const propTypes = {
  onRegisterStore: PropTypes.func,
  editMode: PropTypes.bool,
  oneStore: PropTypes.object,
  onOneStoreRequest: PropTypes.func,
  oneStoreId: PropTypes.string,
  onEdit: PropTypes.func
};
const defaultProps = {
  onRegisterStore: ()=>{console.log("register store function is undefined")},
  editMode: false,
  oneStore: {},
  onOneStoreRequest: ()=>{console.log("one store request functions is undefined")},
  oneStoreId: '',
  onEdit: ()=>{console.log("edit functions is undefined")}
};
class RegisterStore extends Component {
    state = {
      thumbNail: "",
      name: "",
      categories: "",
      explain: "",
      region: [""],
      regionLength: 1,
      availTime: "",
      offDay: "",
      tel: "",
      owner: "",
      minPriceToOrder: 14000
    }
    componentWillMount() {
      this.handleGetOneStore();
    }
    componentDidMount(){
      let singleWidget = uploadcare.SingleWidget('[role=uploadcare-uploader]');
      singleWidget.onUploadComplete((info)=>{
        // console.log(info.cdnUrl);
        $('.upload-store-pic img').attr('src', info.cdnUrl)
        this.setState({
          thumbNail: info.cdnUrl
        })
      });
      // console.log(this.props.oneStore._id);
      // console.log(this.props.oneStoreId)
    }
    // didMount 에서 등록한 위젯 함수가 setState 하므로 없어지는 단계에서 할 수 있다.
    // 위젯의 onUploadComplete 를 언마운트단계에서 해제 시켜주면 에러 안 뜸.
    componentWillUnmount(){
      let singleWidget = uploadcare.SingleWidget('[role=uploadcare-uploader]');
      singleWidget.onUploadComplete = null;
    }
    selectChange = (e) => {
      let value = $(e.target).val();
      this.setState({
        categories: value
      });
    }
    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleRegisterStore = () => {
      // console.log(this.state)
      this.props.onRegisterStore(this.state);
    }
    handleGetOneStore = () => {
      // * 이 단계에서 thunk 를 실행하고 then 메소드를 사용하려면
      // 상위 컴포넌트에서 정의된 메소드가 'return' 되어야 한다!!!
      if(this.props.editMode===true){
        this.props.onOneStoreRequest(this.props.oneStoreId).then(
          ()=>{
            // console.log(this.state);
            let minPrice = this.props.oneStore.minPriceToOrder
            if(minPrice===undefined){
              minPrice = 14000
            }
            this.setState({
              thumbNail: this.props.oneStore.thumbNail,
              name: this.props.oneStore.name,
              categories: this.props.oneStore.categories,
              explain: this.props.oneStore.explain,
              region: this.props.oneStore.region,
              availTime: this.props.oneStore.inform.availTime,
              offDay: this.props.oneStore.inform.offDay,
              tel: this.props.oneStore.inform.tel,
              owner: this.props.oneStore.inform.owner,
              regionLength: this.props.oneStore.region.length,
              minPriceToOrder: minPrice
            });
            // console.log($(`option[value=${this.state.categories}]`))
            $(`option[value=${this.state.categories}]`).attr('selected', true);
            // console.log(this.props.oneStore._id)
            // console.log(this.props.oneStore.owner_id);
          }
        );
      }
    }
    handleRegionChange = (e) => {
      let nowRegion = this.state.region; //현재 region
      let target = e.target;
      let name = e.target.name; //region1, region2 와 같이
      let whatNumber = name.slice(6); //region 뒤의 숫자 알아내기
      this.state.region[whatNumber-1] = e.target.value;
      this.forceUpdate();
    }
    handleEdit = () => {
      if(this.props.editMode){
        this.props.onEdit("one", this.props.oneStore._id, this.state).then(
          ()=>{
            // 스테이트 초기화는 안하는게 맞다(언마운트되는 컴포넌트에서 할 필요 없다!)
            // this.setState({
            //   thumbNail: "",
            //   name: "",
            //   categories: "",
            //   explain: "",
            //   region: [""],
            //   regionLength: 1,
            //   availTime: "",
            //   offDay: "",
            //   tel: "",
            //   owner: ""
            // });
          }
        );
      }
    }
    regionLengthChange = () => {
      let willRegionLength = $('input.region-counter').val();
      if(willRegionLength > 10){
        alert('10개 이상으로 배달지역을 성정할 수 없습니다!')
      }else if(willRegionLength < 1){
        alert('배달지역은 1개 이상이어야 합니다!')
      }else{
        // console.log(willRegionLength);
        this.state.regionLength = willRegionLength;
        // 원래 배열은 손대지 않기 (조건문으로 길이 비교),
        // 늘어나야 되는 만큼 빈문자로 이루어진 배열만들기
        // 만들어서 this.state.region 변경하기
        // this.state.region[willRegionLength-1] = "";
        this.forceUpdate();
        let willLength = this.state.regionLength;
        let nowLength = this.state.region.length
        if(willLength!==nowLength){
          if(willLength-nowLength < 0){
            // 배달지역 줄어들 경우 - 원래배열슬라이스
            let nowRegion = this.state.region
            nowRegion.splice(willLength, (nowLength-1));
            this.setState({
              region: nowRegion
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
                let increase = [...this.state.region, ...willAddArr];
                // console.log(increase);
                this.setState({
                  region: increase
                })
              }
            }
          }
        }
      }
    }

    handleRegionLengthButtonAdd = () => {
      $('input.region-counter').val(Number($('input.region-counter').val())+1);
      this.regionLengthChange();
    }
    handleRegionLengthButtonSub = () => {
      $('input.region-counter').val(Number($('input.region-counter').val())-1);
      this.regionLengthChange();
    }
    render() {
    const categories = [{name:"한식", value:"kfood"}, {name:"분식", value:"snack"}, {name:"돈까스・회・일식", value:"jfood"},
    {name:"치킨", value:"chicken"}, {name:"피자", value:"pizza"}, {name:"중국집", value:"cfood"},
    {name:"족발・보쌈", value:"jokbo"}, {name:"야식", value:"night"}, {name:"찜・탕", value:"soup"},
    {name:"도시락", value:"packed"}, {name:"카페・디저트", value:"cafe"}, {name:"패스트푸드", value:"fastfood"}, {name:"프랜차이즈", value:"franchise"}];

    const mapToOptions = data => {
      return data.map((c, i) => {
        return (
          <option value={c.value} key={i}>{c.name}</option>
        );
      })
    }
    let dbRegion;
    if(this.props.oneStore.region===undefined){
      dbRegion = []
    }else{
      dbRegion = this.props.oneStore.region
    }
    const addRegion = (e) => {
      let numerOfRegions = this.state.region.length
      let willName = "region"+($('input.region').length+1);
      // let willValue = this.state.region[$(".region").length-1];
      let willPlaceholder = "배달지역"+($('input.region').length+1);
      const willaddField = $(`
        <input placeholder=${willPlaceholder}
          name=${willName} class="region"/>
        `)
      $(e.target).before(willaddField);
      // console.log('added another region input tag');
      const createdRegionInput = $(e.target).prev()
      createdRegionInput.val(this.state.region[numerOfRegions]);
      // console.log($('input.region').length)
      $('body').on('change', createdRegionInput, (e) => {
        this.handleRegionChange(e);
      });
    }
    const categoriesArr = ["kfood", "snack", "jfood", "chicken", "pizza", "cfood", "jokbo", "night", "soup", "packed", "cafe", "fastfood", "franchise"];
    const doneButton = (
      <div className="done-button" onClick={this.handleRegisterStore}>
        등록
      </div>
    );
    const editButton = (
      <div className="done-button" onClick={this.handleEdit}>
        다음
      </div>
    );
    const mapTodbRegion = (arr) => {
      return arr.map((item, i) => {
        return(<input placeholder={"배달지역"+(i+1)} value={this.state.region[i]} key={i}
          name={"region"+(i+1)} className="region" onChange={this.handleRegionChange}/>)
      })
    }
    const regionLengthButtons = (
      <div className="region-length-count-buttons">
        <div className="display-inline-block" onClick={this.handleRegionLengthButtonAdd}>
          <i className="material-icons">add_circle</i>
        </div>
        <div className="display-inline-block" onClick={this.handleRegionLengthButtonSub}>
          <i className="material-icons">remove_circle</i>
        </div>
      </div>
    )
    const editMode = (
      <div className="owner-register">
        {editButton}
        <div className="upload-store-pic">
          <img src={this.state.thumbNail} alt="uploadStorePic" className="circle responsive-img"/>
        </div>
        <input
          type="hidden"
          role="uploadcare-uploader"
          name="thumbNail"
          className="uploader" />
        <select name="categories" onChange={this.selectChange}>
          <option value="1" disabled >업종선택</option>
          {mapToOptions(categories)}
        </select>
        <input placeholder="상호명"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}/>
        <div className="set-region-number-label">배달 가능 지역의 갯수를 설정하세요</div>
        <input type="number" className="region-counter browser-default"
          value={this.state.regionLength} onChange={this.regionLengthChange}
          min="1" max="10"/>
        {regionLengthButtons}
        {mapTodbRegion(this.state.region)}
        <textarea placeholder="설명 작성"
                  className="explain-field"
                  name="explain"
                  onChange={this.handleChange}
                  value={this.state.explain}>
        </textarea>
        <div>운영 정보</div>
        <input placeholder="최소 주문 금액"
          name="minPriceToOrder" onChange={this.handleChange} value={this.state.minPriceToOrder} type="number"/>
        <input placeholder="영업시간"
          name="availTime" onChange={this.handleChange} value={this.state.availTime}/>
        <input placeholder="휴무일"
          name="offDay" onChange={this.handleChange} value={this.state.offDay}/>
        <input placeholder="전화번호"
          name="tel" onChange={this.handleChange} value={this.state.tel}/>
        <input placeholder="대표자명"
          name="owner" onChange={this.handleChange} value={this.state.owner}/>
      </div>
    );

    const registerMode = (
      <div className="owner-register">
        {doneButton}
        <div className="upload-store-pic">
          <img src={uploadStorePic} alt="uploadStorePic" className="circle responsive-img" />
        </div>
        <input
          type="hidden"
          role="uploadcare-uploader"
          name="thumbNail"
          className="uploader" />
        <select name="categories" defaultValue="1" onChange={this.selectChange}>
          <option value="1" disabled >업종선택</option>
          {mapToOptions(categories)}
        </select>
        <input placeholder="상호명"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}/>
        <div className="set-region-number-label">배달 가능 지역의 갯수를 설정하세요</div>
        <input type="number" className="region-counter browser-default"
          value={this.state.regionLength} onChange={this.regionLengthChange}
          min="1" max="10"/>
        {regionLengthButtons}
        {mapTodbRegion(this.state.region)}
        <textarea placeholder="설명 작성"
                  className="explain-field"
                  name="explain"
                  onChange={this.handleChange}
                  value={this.explain}>
        </textarea>
        <div>운영 정보</div>
          <input placeholder="최소 주문 금액"
            name="minPriceToOrder" onChange={this.handleChange} value={this.state.minPriceToOrder} type="number"/>
        <input placeholder="영업시간"
          name="availTime" onChange={this.handleChange} value={this.state.availTime}/>
        <input placeholder="휴무일"
          name="offDay" onChange={this.handleChange} value={this.state.offDay}/>
        <input placeholder="전화번호"
          name="tel" onChange={this.handleChange} value={this.state.tel}/>
        <input placeholder="대표자명"
          name="owner" onChange={this.handleChange} value={this.state.owner}/>
      </div>
    )
    const editModeBool = this.props.editMode;
    // console.log(this.state);

    return(
      <div>
        {editModeBool===true?editMode:registerMode}
      </div>
    );
  }
}

export default RegisterStore;
