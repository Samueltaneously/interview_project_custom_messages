// Importing in Data Files
import React, { useState } from 'react';
import moment from 'moment-timezone';
import templates from './data/Templates.json';
import guests from './data/Guests.json';
import companies from './data/Companies.json';



// The Application
const App = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedGuestId, setSelectedGuestId] = useState(null);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [message, setMessage] = useState(null);

    const hancleCreateMessage = () => {

        if (selectedTemplate === null || selectedGuestId == null || selectedCompanyId === null) {
            alert('Please ensure you select a message template, guest, and company.');
            return;
        }

        const guest = guests.find(guest => guests.id === selectedGuestId);
        const company = companies.find(company => company.id === selectedCompanyId);

        if (guest && company) {
            let constructedMessage = selectedTemplate.message;

            const guestStarTime = moment.unix(guest.reservation.startTimestamp).tz(company.timezone);
            const guestHour = guestStarTime.hour();

            let greeting;

            if (guestHour < 12) {
                greeting = 'Good morning';
            }
            else if (guestHour < 17) {
                greeting = 'Good afternoon';
            }
            else {
                greeting = 'Good evening';
            }

            constructedMessage = constructedMessage
                .replace(/{firstName}/g, guest.firstName)
                .replace(/{lastName}/g, guest.lastName)
                .replace(/{roomNumber}/g, guest.reservation.roomNumber.toString())
                .replace(/{companyName}/g, company.company)
                .replace(/{greeting}/g, greeting);

            setMessage(constructedMessage);
        }
    };
}

export default App;