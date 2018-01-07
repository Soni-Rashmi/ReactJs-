import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
      super(props);

      this.state = { text : '' };
      //this.onInputChange = this.onInputChange.bind(this);
    }

    render() {
        return (
          <div className='search-bar col-sm-8'>
            <input value={this.state.text}
            onChange={e => this.onInputChange(e.target.value)} />
          </div>
          );
    }

    onInputChange(text) {
      this.setState({text});
      this.props.onSearchTermChange(text);
    }
}

export default SearchBar;
