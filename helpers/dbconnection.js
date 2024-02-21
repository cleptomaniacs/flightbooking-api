const { default: mongoose } = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect("mongodb://localhost/flightbooking")
    .then((con) =>
      console.log(`Connected to mongoDB: ${con.connections[0].name}`)
    )
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};
module.exports = dbConnection;
