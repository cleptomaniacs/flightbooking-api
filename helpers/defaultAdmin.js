const userSchema = require("../schema/User");
const bcrypt = require("bcrypt");
const createDefaultAdmin = async () => {
  const data = {
    username: "admin",
    password: "admin",
    role: "admin",
  };
  data.username = data.username.toLowerCase();
  data.role = data.role.toLowerCase();
  const userDB = await userSchema
    .findOne({ username: data.username })
    .then((u) => u)
    .catch((err) => console.log(err));
  if (!userDB) {
    data.password = (await bcrypt.hash(data.password, 10)).toString();
    await userSchema
      .create(data)
      .then((u) => {
        console.log(`Admin created successfully`);
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  }
};
module.exports = createDefaultAdmin;
