const TOTAL_PRERENDER = 151;
const TOTAL_PAGES = 20;

const makeArray = (length) => Array.from({ length }, (_, i) => i + 1);

(async () => {
  const fs = require("fs");

  let fileContent = makeArray(TOTAL_PRERENDER)
    .map((id) => `/pokemons/${id}`)
    .join("\n");

  for (let i = 1; i <= TOTAL_PAGES; i++) {
    fileContent += `\n/pokemons/page/${i}`;
  }

  const nameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_PRERENDER}`,
  ).then((r) => r.json());

  let NamedPage = nameList["results"]
    .map((poke) => `/pokemons/${poke["name"]}`)
    .join("\n");

  fileContent += `\n${NamedPage}`;

  fs.writeFileSync("routes.txt", fileContent);

  console.log("routes.txt generated");
})();
