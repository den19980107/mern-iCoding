import React from 'react';
import './Home.css';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
const Home = () => {
  return (
    <div>
      <Carousel autoplay>
        <div class="carousel-item">
          <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", zIndex: "-1", backgroundImage: "url('https://images.pexels.com/photos/1483938/pexels-photo-1483938.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", filter: "blur(8px)" }}></div>
          <img class="first-slide mx-auto d-block mainimg" src="https://images.pexels.com/photos/1483938/pexels-photo-1483938.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="First slide" />
          <div class="container">
            <div class="carousel-caption">
              <div class="mx-auto d-block" style={{ justifyContent: "center" }}>
                <div class="mix">
                  <h1>預測學生學習成效</h1>
                  <h5>教師及學生可以知曉學生個人的學習狀態和未來分數</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="carousel-item">
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: "-1", backgroundImage: "url('https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", filter: "blur(8px);" }}></div>
          <img class="second-slide mx-auto d-block mainimg" src="https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Second slide" />
          <div class="container">
            <div class="carousel-caption">
              <div class="mx-auto d-block" style={{ justifyContent: "center" }}>
                <div class="mix">
                  <h1>學生可練習程式題</h1>
                  <h5>提供程式題和線上編譯器，讓學生可以更加便利地學習程式</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: "-1", backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", filter: "blur(8px)" }}></div>
          <img class="third-slide mx-auto d-block mainimg" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Third slide" />
          <div class="container">
            <div class="carousel-caption">
              <div class="mx-auto d-block" style={{ justifyContent: "center" }}>
                <div class="mix">
                  <h1>教師及學生可共同討論</h1>
                  <h5>提供教師以及學生一個可共同討論議題的空間</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Carousel>
      <div role="main" >
        <div class="container marketing">
          <div class="row" style={{ padding: "2rem 1rem" }}>
            <div class="col-lg-4">
              <img class="rounded-circle mx-auto d-block smallimg" src="https://image.flaticon.com/icons/svg/1306/1306311.svg" alt="Generic placeholder image" width="180" height="180" />
              <h2 class="mt-2" style={{ textAlign: "center" }}>預測學生成績</h2>
              <p class="text-center">將學生在平臺上觀看教材、影片等的行為模式進行分析，進而預測出學生的學習成績，並給予學生學習建議來達到更好的學習成效，同時較師也可以查看學成效來改善教學方式。</p>
            </div>
            <div class="col-lg-4">
              <img class="rounded-circle mx-auto d-block smallimg" src="https://image.flaticon.com/icons/svg/1197/1197511.svg" alt="Generic placeholder image" width="180" height="180" />
              <h2 class="mt-2" style={{ textAlign: "center" }}>練習程式題目</h2>
              <p class="text-center">提供程式題和線上編譯器，並將難易度依照解題率排序，讓學生可以按照自己的能力慢慢練習，提升程式解題能力！</p>
            </div>
            <div class="col-lg-4">
              <img class="rounded-circle mx-auto d-block smallimg" src="https://image.flaticon.com/icons/svg/148/148992.svg" alt="Generic placeholder image" width="180" height="180" />
              <h2 class="mt-2" style={{ textAlign: "center" }}>邊學習邊筆記</h2>
              <p class="text-center">筆記就在教材或是影片的旁邊 遇到重點就可以馬上記下來，還可儲存筆記以備之後瀏覽。</p>
            </div>
          </div>

          <div class="row" style={{ padding: "2rem 1rem" }}>
            <div class="col-lg-4">
              <img class="rounded-circle  mx-auto d-block smallimg" src="https://image.flaticon.com/icons/svg/809/809470.svg" alt="Generic placeholder image" width="180" height="180" />
              <h2 class="mt-2" style={{ textAlign: "center" }}>互相討論議題</h2>
              <p class="text-center">提供教師以及學生一個可共同討論議題的空間，針對不會的疑惑可提出疑問，想教導的也可提供想法與知識。</p>
            </div>
            <div class="col-lg-4">
              <img class="rounded-circle  mx-auto d-block smallimg" src="https://image.flaticon.com/icons/svg/858/858069.svg" alt="Generic placeholder image" width="180" height="180" />
              <h2 class="mt-2" style={{ textAlign: "center" }}>輕鬆管理課程</h2>
              <p class="text-center">教師可新增助教為自己管理課程，教師可隨意調整權限，讓助教幫你改考卷、審核學生、新增教材...，管理課程輕輕鬆鬆！。</p>
            </div>
            <div class="col-lg-4">
              <img class="rounded-circle  mx-auto d-block smallimg" src="https://image.flaticon.com/icons/svg/1055/1055662.svg" alt="Generic placeholder image" width="180" height="180" />
              <h2 class="mt-2" style={{ textAlign: "center" }}>管理課程單元</h2>
              <p class="text-center">課程的每個單元中都有各自不同的教材、影片及測驗，把教材分類的整整齊齊，上傳及管理都很簡單便利。</p>
            </div>
          </div>
        </div>

        <footer class="container py-5">
          <div class="col-sm-12 text-center">
            <small class="d-block mb-3 text-muted">&copy; i-Coding</small>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;