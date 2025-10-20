import app from "./server";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`api listening on http://localhost:${PORT}`);
});
