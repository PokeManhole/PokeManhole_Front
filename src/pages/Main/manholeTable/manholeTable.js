import SERVER from "/src/config/config.json" assert { type: "json" };

const component = (props) => {
  return props.map(
    (preManhole, key) =>
      `<tr class="manhole-tr" >
    <th>${preManhole[0].prefecture}</th>
    <td class="manhole-td" colspan="6" id="${preManhole[0].prefecture}" >
    ${preManhole
      .map(
        (m) =>
          `<img class="${
            m.isAchieve ? "" : "grayscale"
          }" src="http://localhost:5000/static/manhole/${
            m.manhole_img
          }" alt=""/>`
      )
      .join("")}
    
    </td>
    </tr>`
  );
};

function handlePrefecture() {
  const table = document.querySelector(".manholetableline");
  console.log(table);
}

const getManholeData = async (queryText) => {
  const url = SERVER.SERVER + "/manhole";
  const query = encodeURIComponent(`'${queryText}'`);
  try {
    const response = await fetch(`${url}?land=${query}`, {
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => res.json());
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const render = (root, component) => {
  root.innerHTML = component.join("");
  const tds = document.querySelectorAll(".manhole-td");
  tds.forEach((th) =>
    th.addEventListener("click", (e) => {
      location.href =
        location.origin +
        "/src/pages/Manhole/manholePage.html?prefecture=" +
        e.currentTarget.id;
    })
  );
};

const openTable = async (queryText) => {
  const table = document.querySelector(".manholetableline");
  const name = document.querySelector(".manholetable-name");
  name.innerText = queryText;
  const data = getManholeData(queryText);
  data.then((d) => {
    render(table, component(d));
  });
};

const handleLand = (e) => {
  const manholeTableModal = document.querySelector(".manholetable-modal");

  manholeTableModal.style = "display:auto";

  openTable(e.currentTarget.id);
};

const init = () => {
  const landBox = document.querySelectorAll(".land-box");
  const manholeTable = document.querySelector(".manholetable");
  const manholeTableModal = document.querySelector(".manholetable-modal");

  manholeTableModal.addEventListener(
    "click",
    (e) => {
      manholeTableModal.style = "display:none";
    },
    false
  );

  manholeTable.addEventListener("click", (e) => e.stopPropagation());
  landBox.forEach((node) => node.addEventListener("click", handleLand));
};
init();

// const test = () => {

//   let text = "";
//   data.map((data) => {
//     const json = JSON.stringify(JSON.stringify(data.poketmon_json));
//     const img =
//       data.manhole_img.split("/")[data.manhole_img.split("/").length - 1];
//     // console.log(img);
//     text =
//       text +
//       `('${data.land}','${data.prefecture}','${
//         data.city
//       }','${img}','${img}','${json.slice(
//         1,
//         json.length - 1
//       )}','${data.lat.replaceAll("'", "\\'")}','${data.lon.replaceAll(
//         "'",
//         "\\'"
//       )}'),`;
//   });
//   console.log(text);
// };

// test();
