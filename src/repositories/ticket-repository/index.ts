import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function createTicket(ticket: CreateTicketParams) {
    return prisma.ticket.create({
        data: {
            ...ticket,
        }
    });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: {
            enrollmentId,
        },
        include: {
            TicketType: true,
        }
    });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

const ticketRepository = {
    createTicket,
    findTicketByEnrollmentId
};

export default ticketRepository;