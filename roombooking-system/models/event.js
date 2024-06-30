// models/event.js
class Event {
    constructor(event_image, event_title, event_description) {
        this.event_image = event_image;
        this.event_title = event_title;
        this.event_description = event_description;
    }
}

module.exports = Event;
