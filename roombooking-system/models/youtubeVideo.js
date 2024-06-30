// models/youtubeVideo.js

class YouTubeVideo {
    constructor(video_id, video_link, video_title, video_description) {
        this.video_id = video_id;
        this.video_link = video_link;
        this.video_title = video_title;
        this.video_description = video_description;
    }
}

module.exports = YouTubeVideo;
