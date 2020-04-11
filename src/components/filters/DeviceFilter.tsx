import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import SelectedDevices from './selected_devices/SelectedDevices';
import TypeFilter from './type/TypeFilter';
import PlatformFilter from './platform/PlatformFilter';
import MakeFilter from './make/MakeFilter';

export interface DeviceFilterProps {
    className?: string;
}

const DeviceFilter: React.FC<DeviceFilterProps> = ({ className = '' }) => {
    return (
        <div className={`DeviceFilter ${className}`}>
            <SelectedDevices />
            <Accordion defaultActiveKey="0" className="DeviceFilter__accordion">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Filter devices
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <TypeFilter />
                            <PlatformFilter />
                            <MakeFilter />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default React.memo(DeviceFilter);
