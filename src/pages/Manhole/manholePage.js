import SERVER from "/src/config/config.json" assert { type: "json" };

const component = (props) => {
  return props
    .map(
      (manhole) =>
        `<li class="manholitem" id="${manhole.id}" >
                <img
                  src="${"http://localhost:5000/static/manhole/"}${
          manhole.manhole_img
        }"
                  alt=""
                  width="130px"
                />
                <h5>${manhole.city}</h5>
              </li>`
    )
    .join("");
};

const getId2ManholeDatas = async (id) => {
  const url = SERVER.SERVER + "/manhole?id=" + id;
  try {
    const response = await fetch(`${url}`).then((res) => res.json());
    response.data.poketmon_json = JSON.parse(response.data.poketmon_json);

    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getPrefectureManholeDatas = async (queryText) => {
  const url = SERVER.SERVER + "/manhole";
  const query = encodeURIComponent(`'${queryText}'`);
  try {
    const response = await fetch(`${url}?prefecture=${query}`).then((res) =>
      res.json()
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const render = async (props) => {
  const container = document.querySelector(".citymanhole-ul");
  const cityName = document.querySelector(".cityname-item");
  cityName.innerText = props.prefecture;
  container.innerHTML = component(props.data);
  const lis = document.querySelectorAll(".manholitem");
  lis.forEach((li) => li.addEventListener("click", handleManholeClick));
};

const handleManholeClick = async (e) => {
  const data = await getId2ManholeDatas(e.currentTarget.id);

  openManholeModal(data);
};

const openManholeModal = (data) => {
  console.log(data);
  renderModal(data);
};

const renderModal = (props) => {
  const manholeDetail = document.querySelector(".manholeDetail-container");
  manholeDetail.innerHTML = manholeDetailComponent(props);
  manholeDetail.style = "display: auto;";
  const manhole = document.querySelector(".manhole");
  manhole.addEventListener("click", (e) => e.stopPropagation());
  manholeDetail.addEventListener(
    "click",
    () => (manholeDetail.style = "display: none;")
  );
};

const manholeDetailComponent = (data) => {
  return `
  <div>
      <div class="manhole">
        <div class="manholeleft">
          <h1>${data.city}</h1>
          <img class="manholeshadow" src="/src/${data.manhole_img}" alt="">
          <div class="manholeleft_under">
            <img src="/src/assets/achv/gif/chilsaekzo.webp" alt=""
              style="position: absolute; width: 155px; left: 35%; bottom: 30%;">
            <!-- <img src="../src/assets/gif/trainerfront.gif" alt=""
              style="position: absolute; width: 50px; left: 30%; bottom: 10%;"> -->
            <img src="/src/assets/gif/" alt="" style="position: absolute; width: 50px; left: 20%; bottom: 10%;">
            <img src="/src/assets/gif/" alt="" style="position: absolute; width: 50px; left: 30%; bottom: 10%;">
            <!-- <img src="../src/hole/moninfo/trainer.gif" alt=""
              style="position: absolute; width: 80px; left: 40%; bottom: 10%; transform: scaleX(-1) ;"> -->
            <img src="/src/assets/gif/" alt="" style="position: absolute; width: 50px; left: 50%; bottom: 10%;">
            <img src="/src/assets/gif/" alt="" style="position: absolute; width: 50px; left: 60%; bottom: 10%;">
            <img src="/src/assets/gif/" alt="" style="position: absolute; width: 50px; left: 70%; bottom: 10%;">
            <img src="/src/assets/gif/" alt="" style="position: absolute; width: 50px; left: 80%; bottom: 10%;">
          </div>
        </div>
        <div class="manholeright">
          <div>
            <div class="manholeinfo">
              <ul style="list-style: none; margin-left: 3%;">
                <li>
                  <div class="pokemoninfo">
                    <table>
                      <tr>
                        <th rowspan="2"><img src="/src/assets/achv/mini/chilsaekzo.webp" alt=""
                            style="margin: 0 10px ;">
                        </th>
                        <th>이름</th>
                        <th>도감번호</th>
                        <th colspan="2">타입</th>
                        <th>키</th>
                        <th>분류</th>
                        <th>성별</th>
                        <th>몸무게</th>
                      </tr>
                      ${data.poketmon_json.map(
                        (poketmon) =>
                          `
                        <tr>
                          <td>${poketmon.name}</td>
                          <td>No.${poketmon.id}</td>
                          <td>
                            <div style="display:  table-cell; vertical-align:middle;"><img
                                src="/src/hole/moninfo/fly.png" alt=""><img src="/src/hole/moninfo/espher.png" alt="">
                            </div>
                          </td>
                          <td>에스퍼,비행</td>
                          <td>5.2m</td>
                          <td>잠수포켓몬</td>
                          <td>루기아</td>
                          <td>216.0kg</td>
                        </tr>
                        `
                      )}
                    </table>
                  </div>
                </li>

              </ul>

            </div>

          </div>
          <!-- <img src="../src/assets/achv/mini/kobugi.webp" width="40px" alt=""> -->
          <div class="manholemap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.0926636541994!2d128.6134081390342!3d35.89799892982682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e1bb3ae69edd%3A0x8aa4f6b999146d66!2z7JiB7KeE7KCE66y464yA7ZWZ6rWQ!5e0!3m2!1sko!2skr!4v1716516139206!5m2!1sko!2skr"
              width="100%" height="100%" style="border:0; position: absolute; bottom: 0px;" allowfullscreen=""
              loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </div>
  `;
};

const init = async () => {
  const url = new URLSearchParams(location.search);
  const prefecture = url.get("prefecture");
  const data = await getPrefectureManholeDatas(prefecture);
  render({ data, prefecture });
};

init();
