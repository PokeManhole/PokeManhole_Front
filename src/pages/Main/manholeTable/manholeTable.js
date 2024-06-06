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
          `<img class="manholitem ${m.isAchieve ? "" : "grayscale"}" src="${
            SERVER.SERVER
          }/static/manhole/${m.manhole_img}" alt=""/>`
      )
      .join("")}
    
    </td>
    </tr>`
  );
};

const itemMotionInit = (object) => {
  object.addEventListener("mousemove", function (e) {
    var x = e.offsetX;
    var y = e.offsetY;

    const rotateX = (-40 / object.offsetHeight) * y + 20;
    const rotateY = (-40 / object.offsetHeight) * x + 20;

    object.style = `transform : perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg);`;
  });
  object.onmouseout = function () {
    object.style =
      "transition: 1s all ease; transform: perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px);";
  };
};

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
  const manholitem = document.querySelectorAll(".manholitem");
  tds.forEach((th) => {
    th.addEventListener("click", (e) => {
      location.href =
        location.origin +
        "/src/pages/Manhole/manholePage.html?prefecture=" +
        e.currentTarget.id;
    });
  });
  manholitem.forEach((img) => {
    itemMotionInit(img);
  });
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
