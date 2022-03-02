const PublicRating = require("../models/PublicRating");
const User = require("../models/User");
const AllRating = require("../models/AllRating");

const postPublicRating = async (req, res) => {
  const { Username1, Username2, stars } = req.body;

  const data = await PublicRating.findOne({
    Username1: Username1,
    Username2: Username2,
  });
  console.log("InitialPublicRatingData : ", data);

  if (data) {
    const initialRating = data["Stars"];
    await PublicRating.updateOne(
      { Username1: Username1, Username2: Username2 },
      { Stars: stars }
    );
    console.log("Updated PublicRating");
    const initialAllRating = await AllRating.findOne({ Username: Username2 });
    console.log("Found InitialAllRating");
    const newPublicRating =
      (initialAllRating["PublicRatingStarsAvg"] *
        initialAllRating["PublicRatingCount"] -
        initialRating +
        stars) /
      initialAllRating["PublicRatingCount"];
    console.log("Your new Public Rating is : ", newPublicRating);
    const newSuperChatRating = initialAllRating["SuperchatStarsAvg"];
    console.log("Your superchatRating is : ", newSuperChatRating);
    await AllRating.updateOne({ PublicRatingStarsAvg: newPublicRating });
    console.log("Updated AllRating");
    await User.updateOne(
      { Username: Username2 },
      { Stars: (newPublicRating + newSuperChatRating * 2) / 3 }
    );
    console.log("Updated User into rating");
    return res.status(200).json({ type: "success" });
  } else {
    await PublicRating.create({
      Username1: Username1,
      Username2: Username2,
      Stars: stars,
    });
    console.log("Created and updated PublicRating");
    const initialAllRating = await AllRating.findOne({ Username: Username2 });
    console.log("Found InitialAllRating");
    const newPublicRating =
      (initialAllRating["PublicRatingStarsAvg"] *
        initialAllRating["PublicRatingCount"] +
        stars) /
      (initialAllRating["PublicRatingCount"] + 1);
    console.log("Your new Public Rating is : ", newPublicRating);
    const newSuperChatRating = initialAllRating["SuperchatStarsAvg"];
    console.log("Your superchatRating is : ", newSuperChatRating);
    await AllRating.updateOne({
      PublicRatingStarsAvg: newPublicRating,
      $inc: { PublicRatingCount: 1 },
    });
    console.log("Updated AllRating");
    await User.updateOne(
      { Username: Username2 },
      { Stars: (newPublicRating + newSuperChatRating * 2) / 3 }
    );
    console.log("Updated User into rating");
    return res.status(200).json({ type: "success" });
  }
};

const postSuperChatRating = async (req, res) => {
  const { Username1, Username2, stars } = req.body;

  const data = await PublicRating.findOne({
    Username1: Username1,
    Username2: Username2,
  });
  console.log("InitialPublicRatingData : ", data);

  if (data) {
    const initialRating = data["Stars"];
    await PublicRating.updateOne(
      { Username1: Username1, Username2: Username2 },
      { Stars: stars }
    );
    console.log("Updated PublicRating");
    const initialAllRating = await AllRating.findOne({ Username: Username2 });
    console.log("Found InitialAllRating");
    const newPublicRating =
      (initialAllRating["PublicRatingStarsAvg"] *
        initialAllRating["PublicRatingCount"] -
        initialRating +
        stars) /
      initialAllRating["PublicRatingCount"];
    console.log("Your new Public Rating is : ", newPublicRating);
    const newSuperChatRating = initialAllRating["SuperchatStarsAvg"];
    console.log("Your superchatRating is : ", newSuperChatRating);
    await AllRating.updateOne({ PublicRatingStarsAvg: newPublicRating });
    console.log("Updated AllRating");
    await User.updateOne(
      { Username: Username2 },
      { Stars: (newPublicRating + newSuperChatRating * 2) / 3 }
    );
    console.log("Updated User into rating");
    return res.status(200).json({ type: "success" });
  } else {
    await PublicRating.create({
      Username1: Username1,
      Username2: Username2,
      Stars: stars,
    });
    console.log("Created and updated PublicRating");
    const initialAllRating = await AllRating.findOne({ Username: Username2 });
    console.log("Found InitialAllRating");
    const newPublicRating =
      (initialAllRating["PublicRatingStarsAvg"] *
        initialAllRating["PublicRatingCount"] +
        stars) /
      (initialAllRating["PublicRatingCount"] + 1);
    console.log("Your new Public Rating is : ", newPublicRating);
    const newSuperChatRating = initialAllRating["SuperchatStarsAvg"];
    console.log("Your superchatRating is : ", newSuperChatRating);
    await AllRating.updateOne({
      PublicRatingStarsAvg: newPublicRating,
      $inc: { PublicRatingCount: 1 },
    });
    console.log("Updated AllRating");
    await User.updateOne(
      { Username: Username2 },
      { Stars: (newPublicRating + newSuperChatRating * 2) / 3 }
    );
    console.log("Updated User into rating");
    return res.status(200).json({ type: "success" });
  }
};

const getPublicRating = async (req, res) => {
  const { Username1, Username2 } = req.body;
  console.log(Username1, Username2);
  const data = await PublicRating.findOne({
    Username1: Username1,
    Username2: Username2,
  });
  return res.json(data);
};

module.exports = { postPublicRating, postSuperChatRating, getPublicRating };
