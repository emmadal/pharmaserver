const { User, Doctor, Pharmacy } = require("./models");

module.exports = {
  Query: {
    users: async (_) => {
      const users = await User.find();
      return users;
    },
    doctors: async (_) => {
      const doctors = await Doctor.find();
      return doctors;
    },
    pharmacies: async (_) => {
      const pharmacies = await Pharmacy.find();
      return pharmacies;
    },
  },
};
