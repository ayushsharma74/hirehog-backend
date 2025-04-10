import { app } from "./app";
import connectDB from "./db/connectdb";

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening on port : ${PORT}`);
  });
}).catch((error) => console.error(error));
