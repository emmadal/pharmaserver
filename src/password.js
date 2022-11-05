const bcrypt = require("bcrypt");

/*Func to generate a secure password*/
const generatePassword = async (plainTextPassword) => {
  const result = await bcrypt.hash(plainTextPassword, 10);
  return result;
};

/*Func to check if password match*/
const checkPassword = async (plainTextPassword, hashFromDB) => {
  const result = await bcrypt.compare(plainTextPassword, hashFromDB);
  return result;
};

module.exports = {
  generatePassword,
  checkPassword,
};
