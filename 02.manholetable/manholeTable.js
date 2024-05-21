import SERVER from "../config/config.json" assert { type: "json" };

// const data = [
//   [
//     {
//       city: "우쓰노미야시",
//       id: 1,
//       land: "간토",
//       lat: "36°33'38.8\"N",
//       lon: "139°54'34.2\"E",
//       manhole_img:
//         "https://local.pokemon.jp/img/p/manhole/52fdbecd02d60456608847e86f3e8964_l.png",
//       poketmon_json: '[{id:174,name:"에레브"},{id:989, name:"탐리스"}]',
//       prefecture: "토치키",
//       thumbnail_img:
//         "https://local.pokemon.jp/img/p/manhole/52fdbecd02d60456608847e86f3e8964_s.png",
//     },
//     {
//       city: "우쓰노미야시",
//       id: 5,
//       land: "간토",
//       lat: "36°34'20.2\"N 139°53'14.0\"E",
//       lon: "139°53'14.0\"E",
//       manhole_img:
//         "https://local.pokemon.jp/img/p/manhole/614ba5f80e044574e4f5fa79677fa37f_l.png",
//       poketmon_json: '[{id:782,name:"볼트로스"}]',
//       prefecture: "토치키",
//       thumbnail_img:
//         "https://local.pokemon.jp/img/p/manhole/614ba5f80e044574e4f5fa79677fa37f_m.png",
//     },
//   ],
//   [
//     {
//       city: "도코로자와시",
//       id: 2,
//       land: "간토",
//       lat: "35°47'55.4\"N",
//       lon: "139°28'19.2\"E",
//       manhole_img:
//         "https://local.pokemon.jp/img/p/manhole/aeaf1d2fff879ae33fca2eb1ba4a69e8_l.png",
//       poketmon_json: '[{id:204,name:"망냐뇽"}]',
//       prefecture: "사이타마",
//       thumbnail_img:
//         "https://local.pokemon.jp/img/p/manhole/aeaf1d2fff879ae33fca2eb1ba4a69e8_m.png",
//     },
//   ],
// ];

const prefecture = "토치키";

const component = (props) => {
  return props.map(
    (preManhole) =>
      `<tr>
    <th>${preManhole[0].prefecture}</th>
    <td colspan="6">
    ${preManhole.map(
      (m) => `
    <img
        src="${m.manhole_img}"
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
