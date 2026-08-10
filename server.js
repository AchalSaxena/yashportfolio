const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint: Book a Free Demo Class
app.post('/api/book-demo', (req, res) => {
    const { name, phone, email, subject, preferredTime } = req.body;
    
    if (!name || !phone || !subject) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please provide your Name, Phone Number, and Subject of interest.' 
        });
    }

    console.log(`[DEMO BOOKING RECEIVED] Name: ${name}, Phone: ${phone}, Email: ${email}, Subject: ${subject}, Time: ${preferredTime}`);

    return res.status(200).json({
        success: true,
        message: `Thank you ${name}! Your free demo class for ${subject} has been booked. Yash Saxena's team will contact you shortly on ${phone}.`
    });
});

// API Endpoint: Contact Form Submission
app.post('/api/contact', (req, res) => {
    const { name, email, phone, purpose, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please fill out all required fields (Name, Email, Message).' 
        });
    }

    console.log(`[CONTACT MESSAGE] From: ${name} (${email}), Purpose: ${purpose}, Message: ${message}`);

    return res.status(200).json({
        success: true,
        message: `Thank you ${name}! Your message regarding "${purpose || 'General Inquiry'}" has been received. We will get back to you soon.`
    });
});

// API Info Endpoint
app.get('/api/info', (req, res) => {
    res.json({
        educator: 'Yash Saxena',
        role: 'Geography Educator | Polity Mentor | Career Counselor',
        experience: '6+ Years',
        location: 'Ujjain, Madhya Pradesh',
        youtube: 'https://youtube.com/@talkswithyashu?si=CtX24Q26kiPDl1S_',
        linkedin: 'https://www.linkedin.com/in/yash-saxena-b3675112a/'
    });
});

// Fallback to index.html for single page layout
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Yash Saxena Educator Portfolio Server Running!`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`📍 Location: Ujjain, Madhya Pradesh`);
    console.log(`====================================================`);
});
