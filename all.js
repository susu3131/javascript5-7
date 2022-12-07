//共寫三個功能 ，一、代入套票資料  2. 篩選 3. 新增套票

import axios from './node_modules/axios/dist/esm/axios.js';

//共寫三個功能 ，一、代入套票資料  2. 篩選 3. 新增套票
let data = []; // 取得資料
let chartData = []; // 圓餅資料
let kaohsiung = 0; //高雄資料
let taichung = 0; //臺中資料
let taipei = 0; //台北資料

axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
    // 取得資料
    data = response.data.data
    console.log(response.data.data);

    // 取得資料後統計地區
    data.forEach(function (item) {
      if (item.area == "高雄") {
        kaohsiung++;
        chartData[0] = {
          "高雄": kaohsiung,
        }

      } else if (item.area == "台中") {
        taichung++;
        chartData[1] = {
          "台中": taichung,
        }


      } else if (item.area == "台北") {
        taipei++;
        chartData[2] = {
          "台北": taipei,
        }
      }
      
    })

    // 四、圓餅圖
    let chart = c3.generate({
      data: {
        // 綁定html
        bindto: '#chart',
        // 資料整理
        columns: [
          ['高雄', chartData[0]['高雄']],
          ['台北', chartData[2]['台北']],
          ['台中', chartData[1]['台中']],
        ],
        // 圖表類型
        type: 'pie',
        onclick: function (d, i) {
          console.log("onclick", d, i);
        },
      }
    });

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })


// 1. 先取 出html 內容並宣告為 ticketCard 
// console.log(document.querySelector('.ticketCard-area'))
const ticketCard = document.querySelector('.ticketCard-area')
// 選取搜尋筆數
const searchResult = document.querySelector('#searchResult-text')

// 2. 給予一個空字串 (增加內容用)
let content = ""
// 統計搜尋筆數
let num = 0

// 搜尋筆數函式
function search() {
  num++;
}

// 3. forEach 處理每筆資料， 利用相加將他加起來 (只要複製一個li，會疊加)
function dataAll() {
  data.forEach(function (item, num) {
    search();
    content += `<li class="ticketCard">
    <div class="ticketCard-img">
      <a href="#">
        <img src="${item.imgUrl}" alt="">
      </a>
      <div class="ticketCard-region">${item.area}</div>
      <div class="ticketCard-rank">${item.rate}</div>
    </div>
    <div class="ticketCard-content">
      <div>
        <h3>
          <a href="#" class="ticketCard-name">${item.name}</a>
        </h3>
        <p class="ticketCard-description">
          ${item.description}
        </p>
      </div>
      <div class="ticketCard-info">
        <p class="ticketCard-num">
          <span><i class="fas fa-exclamation-circle"></i></span>
          剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
        </p>
        <p class="ticketCard-price">
          TWD <span id="ticketCard-price">$${item.price}</span>
        </p>
      </div>
    </div>
  </li>`
  });
}

// 4. 新增資料函式
function addHTML() {
  ticketCard.innerHTML = content
}

// 5. 新增搜尋筆數
function searchNum() {
  searchResult.innerHTML = `<p>本次搜尋共${num}筆資料</p>`
  num = 0
}

//二、篩選 //綁定Dom監聽 

//1. dom選取篩選列表
const selectCounty = document.querySelector('.regionSearch') //地區搜尋
const selectAll = document.querySelector('.allarea')
const selectTaipei = document.querySelector('.taipei')
const selectTaichung = document.querySelector('.taichung')
const selectKaohsiung = document.querySelector('.kaohsiung')

//2. 監聽地區搜尋內容 選取物件，並測試是否成功取值
selectCounty.addEventListener("click", function (e) {

  //3. 寫判斷式是否點選值與data.area相同
  if (e.target.value == selectAll.textContent) { //第1為全部，判斷e.target.value是否為"全部地區"
    dataAll() //全部筆數 
    addHTML() //新增
    searchNum() //搜尋筆數
    content = "" // 重置避免點擊BUG

  } else if (e.target.value == selectTaipei.textContent) { //第2為全部，判斷e.target.value是否為"台北"
    data.forEach(function (item, num) {
      if (e.target.value == item.area) {
        search()
        content += `<li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img src="${item.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${item.name}</a>
          </h3>
          <p class="ticketCard-description">
            ${item.description}
          </p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
          </p>
        </div>
      </div>
    </li>`
      }
    });
    addHTML()
    searchNum()
    content = ""
  } else if (e.target.value == selectTaichung.textContent) { //第3為全部，判斷e.target.value是否為"台中"
    data.forEach(function (item, num) {
      if (e.target.value == item.area) {
        search()
        content += `<li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img src="${item.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${item.name}</a>
          </h3>
          <p class="ticketCard-description">
            ${item.description}
          </p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
          </p>
        </div>
      </div>
    </li>`
      }
    });
    addHTML()
    searchNum()
    content = ""

  } else if (e.target.value == selectKaohsiung.textContent) { //第4為全部，判斷e.target.value是否為"高雄"
    data.forEach(function (item, num) {
      if (e.target.value == item.area) {
        search()
        content += `<li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img src="${item.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${item.name}</a>
          </h3>
          <p class="ticketCard-description">
            ${item.description}
          </p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
          </p>
        </div>
      </div>
    </li>`
      }
    });
    addHTML()
    searchNum()
    content = ""
  }

})


// 三、 新增套票

//1.先選取需要的資料 
//套票新增資料
const ticketName = document.querySelector('#ticketName')
const ticketImgUrl = document.querySelector('#ticketImgUrl')
const ticketRegion = document.querySelector('#ticketRegion')
const ticketPrice = document.querySelector('#ticketPrice')
const ticketNum = document.querySelector('#ticketNum')
const ticketRate = document.querySelector('#ticketRate')
const ticketDescription = document.querySelector('#ticketDescription')
//btn 
const btn = document.querySelector('.addTicket-btn')

console.log(ticketName.placeholder)
//2. 綁定btn 按鈕進行監聽
btn.addEventListener("click", function (e) {
  //取值加入obk 
  const dataPost = {
    "id": data.length,
    "name": ticketName.value,
    "imgUrl": ticketImgUrl.value,
    "area": ticketRegion.value,
    "description": ticketDescription.value,
    "group": ticketNum.value,
    "price": ticketPrice.value,
    "rate": ticketRate.value,
  }
  //push上去data陣列資料裡

  data.push(dataPost)
  dataAll()
  addHTML()
  searchNum()
})