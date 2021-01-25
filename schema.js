const {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require("graphql");
const axios = require("axios");
//Launch Type

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    details: { type: GraphQLString },
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
  }),
});

//Rocket Type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
});

//Root Query

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v4/launches")
          .then(res => {
            console.log(res);
            return res.data.map((item) => {
              return {
                ...item,
                launch_success: item.success,
                mission_name: item.name,
                // rocket: {
                //   //id: item.rocket,
                //   type
                // },
              };
            });
          });
      },
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/launches/${args.flight_number}`)
          .then(res => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
