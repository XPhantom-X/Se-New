import { MyCalendar } from "./MyCalender";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";


const ViewCalender = () => {
    const myEventsList = [
        {
            
            start: moment('2023-12-12T10:00:00').toDate(),
            end: moment('2023-12-12T11:00:00').toDate(),
            title: 'Event 1',
        },
    
        // Add more events as needed
    ];

    return (
        <div style={{ height: '90vh' }}>
            <MyCalendar events={myEventsList} />
        </div>
    );
}

export default ViewCalender;
