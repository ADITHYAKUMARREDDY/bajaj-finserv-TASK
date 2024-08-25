const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());

const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";
app.use(cors());
// Handle GET request
app.get('/operation', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Handle POST request for bfhl
// app.post('/bfhl', (req, res) => {
//     const data = req.body.data;

//     let numbers = [];
//     let alphabets = [];
//     let highestLowercaseAlphabet = '';

//     data.forEach(item => {
//         if (!isNaN(item)) {
//             numbers.push(item);
//         } else if (typeof item === 'string' && item.length === 1 && /^[a-zA-Z]$/.test(item)) {
//             alphabets.push(item);
//             if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
//                 highestLowercaseAlphabet = item;
//             }
//         }
//     });

//     const response = {
//         is_success: true,
//         user_id: userId,
//         email: email,
//         roll_number: rollNumber,
//         numbers: numbers,
//         alphabets: alphabets,
//         highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
//     };

//     res.status(200).json(response);
// });


app.post('/bfhl', (req, res) => {
    console.log('Received request:', req.body);

    if (!req.body.data || !Array.isArray(req.body.data)) {
        console.error('Invalid data format');
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const data = req.body.data;

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1 && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    const response = {
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    console.log('Sending response:', response);
    res.status(200).json(response);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
