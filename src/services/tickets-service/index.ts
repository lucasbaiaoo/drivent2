import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";

async function createTicket(userId: number, ticketTypeId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    
    if(!enrollment) {
        throw notFoundError;
    }

    const ticketData = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED
    };

    await ticketRepository.createTicket(ticketData);

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

    return ticket;
}

const ticketService = {
    createTicket
};

export default ticketService;