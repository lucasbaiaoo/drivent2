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

async function getTicketByUserId(userId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(!enrollment) {
        throw notFoundError();
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

    if(!ticket) {
        throw notFoundError();
    }

    return ticket;
}

async function getTicketTypes() {
    const ticketTypes = await ticketRepository.findTicketTypes();

    if(!ticketTypes) {
        throw notFoundError();
    }

    return ticketTypes;
}

const ticketService = {
    createTicket,
    getTicketByUserId,
    getTicketTypes
};

export default ticketService;