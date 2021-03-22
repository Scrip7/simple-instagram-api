import InstagramApi from '../src/index';

const code = 'CMf29lRF52W';

InstagramApi.get(code).then((post) => {
  /* eslint-disable no-console */
  console.log(post);
});
