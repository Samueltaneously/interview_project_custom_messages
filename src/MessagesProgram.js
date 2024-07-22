// Importing in Data Files
import React, { useState } from 'react';
import moment from 'moment-timezone';
import templatesData from './data/Templates.json';
import guests from './data/Guests.json';
import companies from './data/Companies.json';



// The Application
const App = () => {

    // State Variables
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedGuestId, setSelectedGuestId] = useState(null);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [message, setMessage] = useState(null);

    const [templates, setTemplates] = useState(templatesData);
    const [newTemplateStyle, setNewTemplateStyle] = useState('');
    const [newTemplateMessage, setNewTemplateMessage] = useState('');


    // Message Constuctor Function
    const handleCreateMessage = () => {

        // Displays an Alert to Notify User of Missing Field
        if (selectedTemplate === null || selectedGuestId === null || selectedCompanyId === null) {
            alert('Please ensure you select a Message Template, Guest, and Company.');
            return;
        }

        const guest = guests.find(guest => guest.id === selectedGuestId);
        const company = companies.find(company => company.id === selectedCompanyId);


        if (guest && company) {
            let constructedMessage = selectedTemplate.message;

            //  Uses Moment from Moment-timezone to Determine Conversions For Accurate Custom Greetings
            const guestStartTime = moment.unix(guest.reservation.startTimestamp).tz(company.timezone);
            const guestHour = guestStartTime.hour();

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

            //  Replaces Placeholder Indicators in Template Message
            constructedMessage = constructedMessage
                .replace(/{firstName}/g, guest.firstName)
                .replace(/{lastName}/g, guest.lastName)
                .replace(/{roomNumber}/g, guest.reservation.roomNumber.toString())
                .replace(/{companyName}/g, company.company)
                .replace(/{greeting}/g, greeting);

            setMessage(constructedMessage);
        }
    };

    //  Constructs New Template From the Function
    const handleNewTemplate = () => {

        const newTemplate = {
            id: templates.length + 1,
            style: newTemplateStyle,
            message: newTemplateMessage,
        };

        setTemplates([...templates, newTemplate]);
        setNewTemplateStyle('');
        setNewTemplateMessage('');
    };



    return (
        <div>

            <div>
                <h1>Select Template</h1>
                <select onChange={(e) => setSelectedTemplate(templates.find(template => template.id === Number(e.target.value)) || null)}>
                    <option value=''>Select a Template</option>
                    {templates.map(template => (
                        <option key={template.id} value={template.id}>{template.style}</option>
                    ))}
                </select>
            </div>

            <div>
                <h1>Add Your Own Template</h1>
                <div>
                    <label>Name the Template Style:</label>
                    <input
                        type='text'
                        value={newTemplateStyle}
                        onChange={(e) => setNewTemplateStyle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Create the Template Message:</label>
                    <textarea
                        type='text'
                        value={newTemplateMessage}
                        onChange={(e) => setNewTemplateMessage(e.target.value)}
                        placeholder='Hello {firstName}, we at {companyName}...     You can also use {roomNumber}, {lastName} and choose to indicate a {greeting} that will say "Good Morning, etc"'
                        required
                    />
                </div>
                <button onClick={handleNewTemplate}>Add My Template!</button>
            </div>

            <div>
                <h1>Select Guest</h1>
                <select onChange={(e) => setSelectedGuestId(Number(e.target.value))}>
                    <option value=''>Select a Guest</option>
                    {guests.map(guest => (
                        <option key={guest.id} value={guest.id}>{guest.firstName} {guest.lastName}</option>
                    ))}
                </select>
            </div>

            <div>
                <h1>Select Company</h1>
                <select onChange={(e) => setSelectedCompanyId(Number(e.target.value))}>
                    <option value=''>Select a Company</option>
                    {companies.map(company => (
                        <option key={company.id} value={company.id}>{company.company}</option>
                    ))}
                </select>
            </div>

            <button onClick={handleCreateMessage}>Create Your Message!</button>

            {message && (
                <div>
                    <h1>Your Message:</h1>
                    <p>{message}</p>
                </div>
            )}

        </div>
    );
};

export default App;