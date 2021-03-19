import { InstagramApi } from "../src/index";

const code = "CMf29lRF52W";
const api = new InstagramApi();

api.get(code).then((result) => {
  console.log(result);
});
