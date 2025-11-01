import React, { Component } from 'react';
import IconExpendure from './IconExpendure';

class RevenueAnnualTargetMenu extends Component {
    render() {
        return (
            <div className="revenue-menu">
                <ul className="menu-items">
                    <li className="menu-item">
                        <IconExpendure className="menu-icon" />
                        <span>Annual Targets</span>
                    </li>
                    <li className="menu-item">
                        <IconExpendure className="menu-icon" fill={true} />
                        <span>Quarterly Breakdown</span>
                    </li>
                    {/* Add more menu items as needed */}
                </ul>
            </div>
        );
    }
}

export default RevenueAnnualTargetMenu;