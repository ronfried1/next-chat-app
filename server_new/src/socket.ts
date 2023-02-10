import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
  connection: "connection",
};

function socket({ io }: { io: Server }) {
  logger.info("Starting socket.io server...");

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`New client connected ${socket.id}`);
  });
}

export default socket;
