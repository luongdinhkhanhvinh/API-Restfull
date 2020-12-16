import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import CategoryResolver from "./services/admin/category/category.resolver";
import CouponResolver from "./services/admin/coupon/coupon.resolver";
import CustomerResolver from "./services/admin/customer/customer.resolver";
import OrderResolver from "./services/admin/order/order.resolver";
import ProductResolver from "./services/admin/product/product.resolver";
import StuffResolver from "./services/admin/stuff/stuff.resolver";

const app: express.Application = express();
const path = "/admin/graphql";
const PORT = process.env.PORT || 4000;

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      ProductResolver,
      CategoryResolver,
      CustomerResolver,
      OrderResolver,
      CouponResolver,
      StuffResolver,
    ],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    tracing: true,
  });

  apolloServer.applyMiddleware({ app, path });

  app.listen(PORT, () => {
    console.log(`🚀 started http://localhost:${PORT}${path}`);
  });
};

main();
