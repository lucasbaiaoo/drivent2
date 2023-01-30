import { postTickets } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .post("", postTickets)

export { ticketsRouter };