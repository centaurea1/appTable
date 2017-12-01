import React, {
    Component
} from 'react';

class Search extends Component {
    constructor(props) {
      super(props);  
    }

    _handleChange = (event) => {    
        this.props.onUserInput(event.target.value);
        this.setState({value: event.target.value});
    }
        
    render () {
        
    return (
        <div>
         <form class="navbar-search pull-right">
            <input type="text" class="search-query" placeholder="Search" 
            value={this.props.searchText}
            onChange={this._handleChange}/>
         </form>
        </div>
    );
    }
}
    
export default Search;