import SERVER from "/src/config/config.json" assert { type: "json" };

const component = (props) => {
  console.log(props);
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

const init = async () => {
  const container = document.querySelector(".citymanhole-ul");
  const data = await getPrefectureManholeDatas("도쿄");
  container.innerHTML = component(data);
};

init();
