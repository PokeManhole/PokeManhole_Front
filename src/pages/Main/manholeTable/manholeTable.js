import SERVER from "/src/config/config.json" assert { type: "json" };

const component = (props) => {
  return props.map(
    (preManhole) =>
      `<tr>
    <th>${preManhole[0].prefecture}</th>
    <td colspan="6">
    ${preManhole
      .map(
        (m) =>
          `<img src="${
            m.manhole_img[0] === "h" ? "" : "http://localhost:5000/"
          }${m.manhole_img}" alt=""/>`
      )
      .join("")}
    
    </td>
    </tr>`
  );
};

const getManholeData = async (queryText) => {
  const url = SERVER.SERVER + "/manhole";
  const query = encodeURIComponent(`'${queryText}'`);
  try {
    const response = await fetch(`${url}?land=${query}`).then((res) =>
      res.json()
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const render = (root, component) => {
  root.innerHTML = component.join("");
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

  openTable(e.target.innerText);
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
//   datas.map(
//     (data) =>
//       (text =
//         text +
//         `('${data.land}','${data.prefecture}','${data.city}','${
//           data.manhole_img
//         }','${data.manhole_img}','${JSON.stringify(
//           JSON.stringify(data.poketmon_json)
//         )}','${data.lat.replaceAll("'", "\\'")}','${data.lon.replaceAll(
//           "'",
//           "\\'"
//         )}'),`)
//   );
//   console.log(text);
// };

// test();
