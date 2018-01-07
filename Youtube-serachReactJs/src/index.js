import _ from 'lodash'
import React from 'react';
import ReactDOM from 'react-dom';
import YtSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import '../scss/style.scss';

const API_KEY = 'AIzaSyAa3xWlkYTVo70NafY1kKnB9rQi5p97imY';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos : [],
            selectedVideo: null
        };
        this.videoSearchTerm('React JS');
    }

    videoSearchTerm(text) {
        YtSearch(
            {
                key: API_KEY,
                term: text
            },
            (videos) => {
              this.setState({
                  videos: videos,
                  selectedVideo: videos[0]
            });
        });
    };

    render() {
        const videoSearchTerm = _.debounce((text) => { this.videoSearchTerm(text) }, 1000);
        return (
          <div>
            <SearchBar onSearchTermChange={videoSearchTerm}/>
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList
                onVideoselect = {(newVideo) => this.setState({selectedVideo: newVideo}) }
                videos={this.state.videos} />
         </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('content'));
