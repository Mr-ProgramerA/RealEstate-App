export const test = (req, res) => {
  res.json({
    message: {
      success: true,
      text: "Route is Working great :)",
    },
  });
};
