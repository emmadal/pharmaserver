const { GraphQLError } = require("graphql");
const { User, Doctor, Pharmacy } = require("./models");
const { generatePassword } = require("./password");

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
  Mutation: {
    register: async (_, { input }) => {
      // Find if user already exist in DB and throw an error if he exist
      const user = await User.findOne({ email: input.email });
      if (user) {
        throw new GraphQLError("Un utilisateur avec cet identifiant existe déja",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          },
        );
      }
      // encrypt user password
      const passwordHash = await generatePassword(input.password);
      if (passwordHash) {
        const { password, ...data } = input;
        // save user to database with encrypted password
        const res = await (
          await User.create({ ...data, password: passwordHash })
        ).save();
        return res;
      }
    },
  },
};
