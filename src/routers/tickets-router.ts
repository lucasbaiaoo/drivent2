import { getTickets, getTicketTypes, postTickets } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .post("", postTickets)
    .get("", getTickets)
    .get("/types", getTicketTypes)

export { ticketsRouter };