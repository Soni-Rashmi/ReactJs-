import React from 'react';

import VideoListItem from './video_list_items';

const VideoList = (props) => {
    const videoItems = props.videos.map( (video) => {
        return (
            <VideoListItem
                onVideoselect={props.onVideoselect}
                key = {video.etag}
                video={video} />
          );
    });
    return(
        <ul className='col-md-4'>
            {videoItems}
        </ul>
    );
};

export default VideoList;
