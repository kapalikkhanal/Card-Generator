// Import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

// Create Express app
const app = express();
// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON data
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'logo'); // Destination folder
    },
    filename: (req, file, cb) => {
        const companyName = req.body.companyName;
        const fileExtension = path.extname(file.originalname);
        const fileName = `${companyName}${fileExtension}`;
        cb(null, fileName);
    },
});
const upload = multer({ storage: storage });

// .env variables
const PORT = process.env.PORT || 3001

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'companynames'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Serve static files from the 'logo' folder
app.use('/logo', express.static(path.join(__dirname, 'logo')));

app.get('/', async (req, res) => {
    res.json('Server is working.')
})

app.post('/api/addUser', upload.single('companyLogo'), async (req, res) => {
    try {
        const companyName = req.body.companyName;
        const companyLogo = req.file;
        const cash = req.body.cash;
        const bonus = req.body.bonus;

        console.log('Company Name:', companyName);
        console.log('Company Logo:', companyLogo);
        console.log('Cash:', cash);
        console.log('Bonus:', bonus);

        const fileExtension = path.extname(companyLogo.originalname);
        const fileName = `${companyName}${fileExtension}`;
        const imagePath = `logo/${fileName}`;

        // Insert data into the database
        const insertQuery = 'INSERT INTO data (name, logoPath, cash, bonus) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [companyName, imagePath, cash, bonus], (insertError, results) => {
            if (insertError) {
                console.error('Error inserting into MySQL:', insertError);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('User added to the database');
                res.status(200).json({ message: 'User added successfully' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Define a route to fetch data from MySQL
app.get('/api/data', async (req, res) => {
    const sql = 'SELECT * FROM `data`';
    await db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying MySQL:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
