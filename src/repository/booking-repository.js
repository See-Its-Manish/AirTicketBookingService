const { Booking } = require('../models/index');
const {AppError, ValidationError} = require('../utils/errors/index');
const {StatusCodes} = require('http-status-codes');
class BookingRepository {

    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name == 'SequelizationValidationError') {
                throw new ValidationError(error);
            }
            else {
                throw new AppError(
                    'RepositoryError',
                    'Cannot create Booking',
                    'There was some issue creating Booking, please try again later',
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }
        }
    }
    async update(bookingId, data) {
        try {
            await Booking.update(data, {
                where : {
                    id : bookingId
                }
            });
            const booking = Booking.findByPk(bookingId);
            return booking;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Canno update Booking',
                'There was some issue updating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

}

module.exports = BookingRepository;