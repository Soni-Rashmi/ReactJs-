import React from 'react';

const VideoListItem = ({video, onVideoselect}) => {

    const imgUrl = video.snippet.thumbnails.default.url;
    return (
        <li onClick={() => onVideoselect(video)} className='list-group-item list-item'>
            <div className='media'>
                <div className='media-left'>
                    <img className='media-object' src={video.snippet.thumbnails.default.url}/>
                </div>
                <div className='media-body'>
                    <div className='media-heading'>{video.snippet.title}</div>
                </div>
            </div>
        </li>
    );
};

export default VideoListItem;
