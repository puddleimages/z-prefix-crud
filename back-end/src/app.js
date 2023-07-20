//app.js
const express = require('express');
const app = express();
const port = 3001;
const knex = require('knex')(require('../knexfile.js')['development']);
const cors = require('cors');
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Application up and Running.')
})

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`)
})

// story 1
app.post('/register', (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  knex('user')
    .select('username')
    .where('username', username)
    .then(data => {
      if (data.length > 0) {
        res.json({ success: false, message: 'Error: Username already exists! Please try again.' });
      } else {
        knex('user')
          .insert({ first_name: firstName, last_name: lastName, username, password })
          .then(() => {
            res.json({ success: true, message: 'Success: User registered successfully. Please Login.' });
          })
          .catch(err => {
            res.status(500).json({ success: false, message: 'Error: Error registering user data.', error: err });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Error: Database error.', error: err });
    });
});

// story 2
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  knex('user')
    .select('id', 'password')
    .where('username', username)
    .then(data => {
      if (data.length === 0) {
        res.status(401).json({ success: false, message: 'Error: Invalid username' });
      } else {
        const user = data[0];
        if (user.password === password) {
          res.json({ success: true, message: 'Success: Login successful', userId: user.id });
        } else {
          res.status(401).json({ success: false, message: 'Error: Invalid password' });
        }
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Error: Database error', error: err });
    });
});

// story 3
app.post('/items', (req, res) => {
  const { userId } = req.headers;
  const { itemName, description, quantity } = req.body;
  knex('item')
    .insert({ user_id: userId, item_name: itemName, description, quantity })
    .then(() => {
      res.status(201).json({ success: true, message: 'Success: Item created.' });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Error: Database error', error: err });
    });
});

// story 4
app.get('/users/:id/items', (req, res) => {
  const userId = req.params.id;
  knex('item')
    .select('*')
    .where('user_id', '=', userId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Error: Database error', error: err });
    });
});

// story 5 and 9
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  knex('item')
    .select('*')
    .where('id', '=', itemId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Error: Database error', error: err });
    });
});

// story 6
app.patch('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const { itemName, description, quantity } = req.body;

  knex('item')
    .where('id', itemId)
    .update({ item_name: itemName, description, quantity })
    .then(() => {
      res.json({ success: true, message: 'Item updated successfully' });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Error: Database error', error: err });
    });
});

// story 7
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  knex('item')
    .where('id', '=', itemId)
    .del()
    .then(() => {
      res.status(200).json({ success: true, message: 'Item deleted successfully' })
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Error: Database error', error: err });
    });
})

// story 8 and 10
app.get('/items', (req, res) => {
  knex('item')
    .select('*')
    .then(data => {
      res.json(data)
    })
})
