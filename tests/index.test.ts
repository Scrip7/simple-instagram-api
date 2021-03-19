import { InstagramApi } from "./../src/index";

const api = new InstagramApi();

test("Post contains a single image without any caption", async () => {
  expect.assertions(6);
  const postDetails = {
    code: "BR6iMU-A5xO",
    id: "1475642208647617614",
  };
  try {
    const post = await api.get(postDetails.code);
    expect(post.id).toBe(postDetails.id);
    expect(post.code).toBe(postDetails.code);
    expect(post.is_video).toBe(false);
    expect(post.url).toBeTruthy();
    expect(post.caption).toBeUndefined();
    expect(post.children).toStrictEqual([]);
  } catch (err) {
    fail(err);
  }
});

test("Post contains a single image with caption", async () => {
  expect.assertions(6);
  const postDetails = {
    code: "CMdYauRlD4W",
    id: "2530285955161800214",
  };
  try {
    const post = await api.get(postDetails.code);
    expect(post.id).toBe(postDetails.id);
    expect(post.code).toBe(postDetails.code);
    expect(post.is_video).toBe(false);
    expect(post.url).toBeTruthy();
    expect(post.caption).toBeTruthy();
    expect(post.children).toStrictEqual([]);
  } catch (err) {
    fail(err);
  }
});

test("Post contains a single IGTV video with a caption", async () => {
  expect.assertions(6);
  const postDetails = {
    code: "CMVRFx8FIYl",
    id: "2528001929847801381",
  };
  try {
    const post = await api.get(postDetails.code);
    expect(post.id).toBe(postDetails.id);
    expect(post.code).toBe(postDetails.code);
    expect(post.is_video).toBe(true);
    expect(post.url).toBeTruthy();
    expect(post.caption).toBeTruthy();
    expect(post.children).toStrictEqual([]);
  } catch (err) {
    fail(err);
  }
});

test("Gallery image with caption", async () => {
  expect.assertions(6);
  const postDetails = {
    code: "CMf29lRF52W",
    id: "2530983242020396438",
  };
  try {
    const post = await api.get(postDetails.code);
    expect(post.id).toBe(postDetails.id);
    expect(post.code).toBe(postDetails.code);
    expect(post.is_video).toBe(false);
    expect(post.url).toBeTruthy();
    expect(post.caption).toBeTruthy();
    expect(post.children).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "2530983238446620648",
          code: "CMf29h8FB_o",
          is_video: false,
        }),
        expect.objectContaining({
          id: "2530983238438257890",
          code: "CMf29h7lITi",
          is_video: false,
        }),
        expect.objectContaining({
          id: "2530983238555903256",
          code: "CMf29iCl6UY",
          is_video: false,
        }),
        expect.objectContaining({
          id: "2530983238430039583",
          code: "CMf29h7Fx4f",
          is_video: false,
        }),
      ])
    );
  } catch (err) {
    fail(err);
  }
});
