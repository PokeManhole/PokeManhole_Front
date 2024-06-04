import SERVER from "/src/config/config.json" assert { type: "json" };

const component = (props) => {
  return props
    .map(
      (manhole) =>
        `<li class="manholitem" id="${manhole.id}" >
                <img id="${manhole.isAchieve ? "" : "grayscale"}"
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
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
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
    const response = await fetch(`${url}?prefecture=${query}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
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
  renderModal(data);
};

const PostAchieveManhole = async (manholeId) => {
  const url = SERVER.SERVER + "/manhole/achieve";
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify({ manholeId: manholeId }),
    }).then((res) => {
      res.json();
      init();
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const renderModal = (props) => {
  const manholeDetail = document.querySelector(".manholeDetail-container");
  manholeDetail.innerHTML = manholeDetailComponent(props);
  manholeDetail.style = "display: auto;";
  const manhole = document.querySelector(".manhole");
  const controlButton = document.querySelector(".manhole-control-button");
  controlButton.addEventListener("click", async () => {
    await PostAchieveManhole(props.id);
    props.isAchieve = !props.isAchieve;
    document.querySelector(".manholeshadow").id = props.isAchieve
      ? ""
      : "grayscale";
  });
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
          <img class="manholeshadow" id="${
            data.isAchieve ? "" : "grayscale"
          }"  src="http://localhost:5000/static/manhole/${
    data.manhole_img
  }" alt="">
          <div class="manholeleft_under">
          <div class="manhole-control">
            <button class="manhole-control-button">확인</button>
          </div>
            <img src="" alt=""
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

                        <th>이름</th>
                        <th>도감번호</th>
                        <th colspan="2">타입</th>
                        <th>키</th>
                        <th>분류</th>

                        <th>몸무게</th>
                      </tr>
                      ${data.poketmon_json
                        .map(
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
                          <td>${poketmon.type.join()}</td>
                          <td>${poketmon.height}</td>
                          <td>${poketmon.class}</td>

                          <td>${poketmon.weight}</td>
                        </tr>
                        `
                        )
                        .join("")}
                    </table>
                  </div>
                </li>

              </ul>

            </div>

          </div>
          <!-- <img src="../src/assets/achv/mini/kobugi.webp" width="40px" alt=""> -->
          <div class="manholemap">
          <iframe
          width="100%"
          height="100%"
          style="border: 0; position: absolute; bottom: 0px"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAellzwF_iNevf7hBykkYlHvLrN4aOmcW8&q=${
            data.lat
          },${data.lon}"
        >
        </iframe>
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
