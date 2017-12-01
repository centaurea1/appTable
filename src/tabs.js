import React, {
    Component
} from 'react';
import Table1 from './table1';
import Table2 from './table2';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }
 _isSelectedTab = (index) => {
  return this.state.selectedTab === index;
 }
  _selectTab = (index) => {
    this.setState({
      selectedTab: index
    })
  }
  _handleSelectTab = (event, index) => {
    event.preventDefault();
    this._selectTab(index);
  }
  
  render() {
    let tab;
    if(this.state.selectedTab === 0) {
      tab = <Table1 />
    } else if (this.state.selectedTab === 1) {
      tab = <Table2 />
    }

    const getTabClass = (index) => this._isSelectedTab(index) ? "active" : "";
    
    return (
    <div>
      <div className="nav">
        <ul className="nav nav-tabs">
          <li onSelect={this.handleSelect} className={getTabClass(0)}>
            <a title="Tab 1" href="#" onClick={(event) => this._handleSelectTab(event, 0)}>Table1</a>
          </li>
          <li onSelect={this.handleSelect} className={getTabClass(1)}>
            <a title="Tab 2" href="#" onClick={(event) => this._handleSelectTab(event, 1)}>Table2</a>
          </li>
        </ul>
      </div>
      {tab}
    </div>
    );
  }
}

export default Tabs;

//   ReactDOM.render(<Tabs />, document.getElementById('root'));