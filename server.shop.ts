import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { CategoryResolver } from "./services/shop/category/category.resolver";
import { CouponResolver } from "./services/shop/coupon/coupon.resolver";
import { OrderResolver } from "./services/shop/order/order.resolver";
import { PaymentResolver } from "./services/shop/payment/payment.resolver";
import { ProductResolver } from "./services/shop/product/product.resolver";
import { UserResolver } from "./services/shop/user/user.resolver";

const app: express.Application = express();
const path = "/shop/graphql";
const PORT = process.env.PORT || 4000;
const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ProductResolver,
      PaymentResolver,
      OrderResolver,
      CouponResolver,
      CategoryResolver,
    ],
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
