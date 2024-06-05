import SERVER from "/src/config/config.json" assert { type: "json" };

const getAchievements = async () => {
  const url = SERVER.SERVER + "/achievements";
  try {
    const response = await fetch(`${url}`, {
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => res.json());
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const achievementsTableComponent = (props) => {
  return props
    .map(
      (achieve) => `<tr>
  <th><img src="/src/assets/achv/pika.png" alt="" /></th>
  <td colspan="6">
    <h3>${achieve.name}</h3>
    <h4>${achieve.rate} / ${achieve.conditions}</h4>
    <h6>${((achieve.rate / achieve.conditions) * 100).toFixed()}%</h6>
    <p>${achieve.summary}</p>
  </td>
</tr>`
    )
    .join("");
};

const render = async (data) => {
  const achievementsTable = document.querySelector(".manholetableline");
  console.log(data);
  achievementsTable.innerHTML = achievementsTableComponent(data);
};

const init = async () => {
  const data = await getAchievements();
  render(data);
};

init();
