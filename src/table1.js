import React, {
    Component
} from 'react';
import Search from './search';

class Table1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                tenders: []
            },
            status: 'not-loaded',
            orderProperty: 'Id',
            orderDirection: 'desc',
            searchText: ''
        };
    };
    _onUserInput =(searchText) => {
        console.log(searchText)
        this.setState({
            searchText     
        })
    }

    _applySearch = (tenders) => {
        const text = this.state.searchText.toLowerCase();
       return tenders.filter(tender => tender.name.toLowerCase().includes(text));
    }
    
    _loadTable1 = () => {
        this.setState({
            status: 'loading'
        });
        fetch(`https://raw.githubusercontent.com/avallakh/InitGroupTST/master/Table1.json`)
            .then(responce => responce.json())
            .then(payload => {
                console.log(payload)
                payload.tenders = this._applySearch(payload.tenders)
                this.setState({
                    payload: payload,
                    status: 'loaded'
                });
            })
            .catch(e => {
                this.setState({
                    status: 'error'
                });
            })
    };
    componentWillMount() {
        this._loadTable1();
    };
    _handleLoad = event => {
        event.preventDefault();
        this._loadTable1();
    };
    _handleOrderBy = (event, orderProperty) => {
        event.preventDefault();

        let orderDirection;
        if(this.state.orderDirection === 'desc'){
            orderDirection = 'asc';
        } else {
            orderDirection = 'desc';
        }
        this.state.payload.tenders = this._applySearch(this.state.payload.tenders);
        
        const sortedTenders = this._orderBy(this.state.payload.tenders, orderProperty, orderDirection);
        this.setState({
            payload:{
                tenders: sortedTenders
            },
            orderDirection: orderDirection,
            orderProperty: orderProperty
        });
    } 
    _orderBy = (items, orderProperty, orderDirection)  => {

        const sortedItems = items.sort((a,b) => {
                if(orderDirection === 'desc'){
                    return b[orderProperty] - a[orderProperty]
                }

                return a[orderProperty] - b[orderProperty]
            });

        console.log(orderProperty, orderDirection);
        console.log(sortedItems);

        return sortedItems;
    };
    
    render() {

        const {
            payload
        } = this.state;
        // console.log(payload)
        const rows = this._applySearch(payload.tenders).map(tender =>
            <tr>
                <td>{tender.Id}</td>
                <td>{tender.name}</td>
                <td>{tender.price}</td>
                <td>{tender.phase}</td>
                <td>{tender.publicationdate}</td>
                <td>{tender.regionName}</td>
                <td>{tender.subcategory}</td>
            </tr>
        );  
           
        return (
            <div> 
                <Search onUserInput={this._onUserInput} searchText={this.state.searchText}/>               
                <a href="#" onClick={this._handleLoad}></a>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th>Id
                            <a onClick={(event) => this._handleOrderBy(event, "Id")}>
                            <span class="glyphicon glyphicon-sort"></span>
                            </a>
                        </th>
                         <th>Name
                            <a onClick={(event) => this._handleOrderBy(event, "name")}>
                            <span class="glyphicon glyphicon-sort"></span>
                            </a>
                        </th>
                        <th>Price
                            <a onClick={(event) => this._handleOrderBy(event, "price")}>
                            <span class="glyphicon glyphicon-sort"></span>
                            </a>
                        </th>
                         <th>Phase
                            <a onClick={(event) => this._handleOrderBy(event, "phase")}>
                            <span class="glyphicon glyphicon-sort"></span>
                            </a>
                        </th>
                        <th>Publicationdate
                            <a onClick={(event) => this._handleOrderBy(event, "publicationdate")}>
                            <span class="glyphicon glyphicon-sort"></span>
                            </a>
                        </th>
                        <th>RegionName
                            <a onClick={(event) => this._handleOrderBy(event, "regionName")}>
                            <span class="glyphicon glyphicon-sort"></span>
                            </a>
                        </th>
                        <th>Subcategory
                            <a onClick={(event) => this._handleOrderBy(event, "subcategory")}>
                            <span class="glyphicon glyphicon-sort"></span>
                            </a>
                        </th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
                </div>
        );
    };
}

export default Table1;

//   ReactDOM.render(<Table1 />, document.getElementById('root'));