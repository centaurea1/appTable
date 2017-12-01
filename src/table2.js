import React, {
    Component
} from 'react';
import Search from './search';

class Table2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                companies: []
            },
            status: 'not-loaded',
            orderProperty: 'id',
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

    _applySearch = (companies) => {
        const text = this.state.searchText.toLowerCase();
       return companies.filter(company => company.name.toLowerCase().includes(text));
    }

    _loadTable2 = () => {
        this.setState({
            status: 'loading'
        });
        fetch(`https://raw.githubusercontent.com/avallakh/InitGroupTST/master/Table2.json`)
            .then(responce => responce.json())
            .then(payload => {
                console.log(payload)
                payload.companies = this._orderBy(payload.companies, this.state.orderProperty)
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
        this._loadTable2();
    };
    _handleLoad = event => {
        event.preventDefault();
        this._loadTable2();
    };
    _handleOrderBy = (event, orderProperty) => {
        event.preventDefault();

        let orderDirection;
        if(this.state.orderDirection === 'desc'){
            orderDirection = 'asc';
        } else {
            orderDirection = 'desc';
        }

        this.state.payload.companies = this._applySearch(this.state.payload.companies);

        const sortedCompanies = this._orderBy(this.state.payload.companies, orderProperty, orderDirection);
        this.setState({
            payload:{
                companies: sortedCompanies
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
        const rows = this._applySearch(payload.companies).map(company =>
            <tr>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.inn}</td>
                <td>{company.kpp}</td>
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
                                <a onClick={(event) => this._handleOrderBy(event, "id")}>
                                <span class="glyphicon glyphicon-sort"></span>
                                </a>
                            </th>
                            <th>Name
                            <a onClick={(event) => this._handleOrderBy(event, "name")}>
                            <span class="glyphicon glyphicon-sort"></span>
                            </a>
                        </th>
                        <th>Inn
                                <a onClick={(event) => this._handleOrderBy(event, "inn")}>
                                <span class="glyphicon glyphicon-sort"></span>
                                </a>
                            </th>
                            <th>Kpp
                                <a onClick={(event) => this._handleOrderBy(event, "kpp")}>
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

export default Table2;

//   ReactDOM.render(<Table2 />, document.getElementById('root'));