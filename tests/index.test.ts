import { InstagramApi } from "./../src/index";
const URL = require("url").URL;

const stringIsAValidUrl = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

const api = new InstagramApi();

test("Should fetch single photo (-caption)", async () => {
  expect.assertions(6);

  const postDetails = {
    code: "CMmwQjXLVeF",
    id: "2532924084156454789",
  };

  try {
    const post = await api.get(postDetails.code);
    expect(post.id).toBe(postDetails.id);
    expect(post.code).toBe(postDetails.code);
    expect(post.is_video).toBe(false);
    expect(stringIsAValidUrl(post.url)).toBe(true);
    expect(post.caption).toBeUndefined();
    expect(post.children).toStrictEqual([]);
  } catch (err) {
    fail(err);
  }
});

test("Should fetch single photo (+caption)", async () => {
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
    expect(stringIsAValidUrl(post.url)).toBe(true);
    expect(post.caption).toBeTruthy();
    expect(post.children).toStrictEqual([]);
  } catch (err) {
    fail(err);
  }
});

test("Should fetch single video (+caption)", async () => {
  expect.assertions(6);

  const postDetails = {
    code: "CMK4fYqFiIe",
    id: "2525078988478882334",
  };

  try {
    const post = await api.get(postDetails.code);
    expect(post.id).toBe(postDetails.id);
    expect(post.code).toBe(postDetails.code);
    expect(post.is_video).toBe(true);
    expect(stringIsAValidUrl(post.url)).toBe(true);
    expect(post.caption).toBeTruthy();
    expect(post.children).toStrictEqual([]);
  } catch (err) {
    fail(err);
  }
});

test("Should fetch IGTV video (+caption)", async () => {
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
    expect(stringIsAValidUrl(post.url)).toBe(true);
    expect(post.caption).toBeTruthy();
    expect(post.children).toStrictEqual([]);
  } catch (err) {
    fail(err);
  }
});

test("Should fetch photo album (+caption)", async () => {
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
    expect(stringIsAValidUrl(post.url)).toBe(true);
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

test("Should fetch invalid post and return error", async () => {
  try {
    const post = await api.get("AAAAAAAAA");
    fail(post);
  } catch (err) {
    // Nothing
  }
});
