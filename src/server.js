const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const db = require("mysql2");

const conn = db.createConnection({
    host: "YOUR_HOST",
    database: "YOUR_DATABASE",
    user: "YOUR_USER",
    password: "YOUR_PASSWORD",
});

conn.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log("Connect db - suc!");
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Express server');
});

// Получение данных об пользователе через cookieKey
app.get('/userMainData/:loginDataString', async (req, res) => {
    const cookieKey = req.params.loginDataString;

    if (!cookieKey) {
        return res.status(400).json({ error: 'cookieKey is required' });
    }

    try {
        const query = 'SELECT * FROM users WHERE cookieKey = ?';
        const [existingUsers] = await conn.promise().query(query, [cookieKey]);

        return res.json(existingUsers);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Вывод таблицы USERS из Базы данных
app.get('/users', (req, res) => {
    conn.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving users');
            return;
        }

        results = results.map(user => {
            if (user.img) {
                // Ensure the correct MIME type is used
                user.img = `data:image/png;base64,${Buffer.from(user.img, 'binary').toString('base64')}`;
            }
            return user;
        });

        res.json(results);
    });
});

// Удаление из таблицы USERS пользователя по ID
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    conn.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Error deleting user');
        }
        conn.query('DELETE FROM article WHERE authorId = ?', [userId], (err, results) => {
            if (err) {
                return res.status(500).send('Error deleting articles');
            }
            conn.query('DELETE FROM comments WHERE idusersauthor = ?', [userId], (err, results) => {
                if (err) {
                    return res.status(500).send('Error deleting comments');
                }

                res.sendStatus(200);
            })
        });
    });
});

// Получение данных о ДРУГИХ пользователе по ID
app.get('/profileusers/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [user] = await conn.promise().query(query, [userId]);

        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user[0]);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Получение полных статей по ID
app.get('/articleusers/:id', async (req, res) => {
    const articleId = req.params.id;

    try {
        const query = 'SELECT * FROM article WHERE id = ?';
        const [article] = await conn.promise().query(query, [articleId]);

        if (article.length === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }

        res.json(article[0]);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Вывод таблицы ARTICLES из Базы данных
app.get('/articles', (req, res) => {
    conn.query("SELECT * FROM article", (err, result) => {
        if (err) {
            res.status(500).send("Error article");
            return;
        }

        res.json(result)
    })
})

// Удаление из таблицы ARTICLES статью по ID
app.delete('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    conn.query('DELETE FROM article WHERE id = ?', [articleId], (err, results) => {
        if (err) {
            res.status(500).send('Error deleting article');
            return;
        }

        conn.query('DELETE FROM comments WHERE idpost = ?', [articleId], (err, results) => {
            if (err) {
                return res.status(500).send('Error deleting comments');
            }

            res.sendStatus(200);
        })
    });
});

function generateIDforArticles(length = 7) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '-';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

// Создание нового ARTICLE
app.post('/newarticle', async (req, res) => {
    const { title, description, date, authorId, author, star } = req.body;

    if (!title || !description || !date || !authorId || !author) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Генерация уникального ID
        let id;
        let idExists = true;
        while (idExists) {
            id = generateIDforArticles();
            const [idCheck] = await conn.promise().query('SELECT * FROM article WHERE id = ?', [id]);
            idExists = idCheck.length > 0;
        }

        // Вставка нового поста в базу данных
        await conn.promise().query('INSERT INTO article (id, title, description, date, authorId, author, star) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, title, description, date, authorId, author, star]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Вход в аккаунт
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Поиск пользователя по email и паролю
        const query = 'SELECT * FROM users WHERE email = ? AND pass = ?';
        const [users] = await conn.promise().query(query, [email, password]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // Возвращаем cookieKey вместе с данными о пользователе
        res.status(200).json({ message: 'Login successful', user: user, id: user.id, cookieKey: user.cookieKey });

    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Генерация coolieKey
function generateKey(length = 40) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters[randomIndex];
    }
    return key;
}

// Генерация ID
function generateID(length = 7) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

// Регистрация аккаунта
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Проверка на наличие пользователя с таким именем или email
        const userCheckQuery = 'SELECT * FROM users WHERE name = ? OR email = ?';
        const [existingUsers] = await conn.promise().query(userCheckQuery, [name, email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Генерация уникального ID
        let id;
        let idExists = true;
        while (idExists) {
            id = generateID();
            const [idCheck] = await conn.promise().query('SELECT * FROM users WHERE id = ?', [id]);
            idExists = idCheck.length > 0;
        }

        // Генерация уникального cookieKey
        let cookieKey;
        let cookieKeyExists = true;
        while (cookieKeyExists) {
            cookieKey = generateKey();
            const [cookieKeyCheck] = await conn.promise().query('SELECT * FROM users WHERE cookieKey = ?', [cookieKey]);
            cookieKeyExists = cookieKeyCheck.length > 0;
        }

        // Вставка нового пользователя в базу данных
        await conn.promise().query('INSERT INTO users (id, name, email, pass, cookieKey, status) VALUES (?, ?, ?, ?, ?, ?)',
            [id, name, email, password, cookieKey, 'user']);

        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Получение comments для статьи
app.get('/comments', (req, res) => {
    conn.query("SELECT * FROM comments", (err, result) => {
        if (err) {
            res.status(500).send("Error article");
            return;
        }

        res.json(result)
    })
})

function generateIDforComment(length = 7) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '--';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

// Создание comments для статьи
app.post('/newcomments', async (req, res) => {
    const { idusers, nameusers, idpost, idusersauthor, description, date } = req.body;

    if (!idusers || !nameusers || !idpost || !idusersauthor || !description || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Генерация уникального ID
        let id;
        let idExists = true;
        while (idExists) {
            id = generateIDforComment();
            const [idCheck] = await conn.promise().query('SELECT * FROM comments WHERE id = ?', [id]);
            idExists = idCheck.length > 0;
        }

        // Вставка нового поста в базу данных
        await conn.promise().query('INSERT INTO comments (id, idusers, nameusers, idpost, idusersauthor, description, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, idusers, nameusers, idpost, idusersauthor, description, date]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


server.listen(4000, () => {
    console.log('Express server with socket has been started on: http://localhost:4000');
});