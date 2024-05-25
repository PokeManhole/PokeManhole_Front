import SERVER from "/src/config/config.json" assert { type: "json" };

const component = (props) => {
  return props
    .map(
      (manhole) =>
        `<li class="manholitem" key="${manhole.id}">
                <img
                  src="${
                    manhole.manhole_img[0] === "h"
                      ? ""
                      : "http://localhost:5000/"
                  }${manhole.manhole_img}"
                  alt=""
                  width="130px"
                />
                <h5>${manhole.city}</h5>
              </li>`
    )
    .join("");
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

const render = (props) => {
  const container = document.querySelector(".citymanhole-ul");
  const cityName = document.querySelector(".cityname-item");
  cityName.innerText = props.prefecture;
  container.innerHTML = component(props.data);
};

const init = async () => {
  const url = new URLSearchParams(location.search);
  const prefecture = url.get("prefecture");
  const data = await getPrefectureManholeDatas(prefecture);
  render({ data, prefecture });
};

init();
