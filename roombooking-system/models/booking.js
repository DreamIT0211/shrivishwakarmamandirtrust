// models/booking.js
class Booking {
    constructor(BookingID, RoomID, UserID, StartDate, EndDate, BookingStatus) {
        this.BookingID = BookingID;
        this.RoomID = RoomID;
        this.UserID = UserID;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.BookingStatus = BookingStatus;
    }
}

module.exports = Booking;
