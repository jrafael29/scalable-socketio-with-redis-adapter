import http from "node:http";
import { Server } from "socket.io";
import redisAdapter from "@socket.io/redis-adapter";
import redis from "redis";

const httpServer = http.createServer();
const io = new Server(httpServer);

const publisherClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`,
});
const subscriberClient = publisherClient.duplicate();

Promise.all([publisherClient.connect(), subscriberClient.connect()]).then(
  () => {
    io.adapter(redisAdapter.createAdapter(publisherClient, subscriberClient));

    io.on("connection", (socket) => {
      console.log("new socket connected", socket.id);

      socket.on("message", (data) => {
        socket.broadcast.emit("new-message", { ...data });
      });
    });

    httpServer
      .listen(3000)
      .on("listening", () => console.log("rodando na 3000"));
  }
);
