import React from "react";
import Card from "../Components/Card";
import Button from "../Components/Button";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from "dateformat";
import add from 'date-fns/add'


function HotelDateSelectionForm(props) {
    const [dateFrom, setDateFrom] = React.useState(new Date());
    const [dateTo, setDateTo] = React.useState(add(new Date(), { days: 1 }));

    function onSubmit() {
        var selectedDatesList = [];
        var dateFromPom = dateFrom;

        while(dateFromPom < dateTo) {
            selectedDatesList.push(JSON.stringify(dateFormat(dateFromPom.toString(), "yyyy-mm-dd")));
            dateFromPom = add(dateFromPom, { days: 1 });
        }

        props.setSelectedDates(selectedDatesList);
        props.GetHotelRooms(selectedDatesList);
        props.setSelectedHotelRoom({hotelroomcapacity: 0});
    }

    return (
        <div className="flex justify-center">
            <Card className="md:w-3/4 w-auto">
                <div className="flex items-center w-full mb-2">
                    <div className="w-full">
                        <span>Date from </span>
                    </div>
                    <div className="w-full">
                        <span>Date to </span>
                    </div>
                </div>
                <div className="flex items-center w-full">
                    <DatePicker 
                        className="border-2 rounded-sm p-2 w-5/6 border-gray-400 hover:border-gray-600"
                        selected={dateFrom} 
                        onChange={(dateFrom) => { 
                            setDateFrom(dateFrom);
                            if(dateFrom >= dateTo) {
                                var dayAfter = new Date(dateFrom);
                                dayAfter.setDate(dayAfter.getDate() + 1);
                                setDateTo(dayAfter);
                            }
                        }} 
                        dateFormat='dd.MM.yyyy.'
                        minDate={new Date()}
                    />
                    <DatePicker 
                        className="border-2 rounded-sm p-2 w-5/6 border-gray-400 hover:border-gray-600"
                        selected={dateTo} 
                        onChange={(dateTo) => { setDateTo(dateTo) }} 
                        dateFormat='dd.MM.yyyy.'
                        minDate={add(dateFrom, { days: 1 })}
                    />
                </div>
                <div className="flex justify-center pt-2 mt-2">
                    <Button
                        type="button"
                        className="bg-gray-100 rounded text-gray-900 w-2/3 border-2 text-lg border-gray-400 hover:border-gray-600"
                        label="Search"
                        onClick={onSubmit}
                    />
                </div>
            </Card>
        </div>
    );
}

export default HotelDateSelectionForm;
