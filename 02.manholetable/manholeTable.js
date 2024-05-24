import SERVER from "../config/config.json" assert { type: "json" };

const component = (props) => {
  return props.map(
    (preManhole) =>
      `<tr>
    <th>${preManhole[0].prefecture}</th>
    <td colspan="6">
    ${preManhole.map(
      (m) => `
    <img
        src="${m.manhole_img[0] === "h" ? "" : "http://localhost:5000/"}${
        m.manhole_img
      }"
        alt=""
        width=""
      />
    `
    )}
    
    </td>
    </tr>`
  );
};

const getManholeData = async () => {
  const url = SERVER.SERVER + "/manhole";
  const query = encodeURIComponent("'간토'");
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
  root.innerHTML = component;
};

const init = async () => {
  //   console.log(SERVER);
  const table = document.querySelector(".manholetableline");
  const data = getManholeData();
  data.then((d) => {
    console.log(d);
    render(table, component(d));
  });
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
