// Importing in Data Files
import React, { useState } from 'react';
import templates from './data/Templates.json';
import guests from './data/Guests.json';
import companies from './data/Companies.json';



// The Application
const App = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedGuestId, setSelectedGuestId] = useState(null);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [message, setMessage] = useState(null);

}

export default App;