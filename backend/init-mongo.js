db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'ai-chron',
    },
    {
      role: 'dbAdmin',
      db: 'ai-chron',
    }
  ],
});

db = db.getSiblingDB('ai-chron');

db.createCollection('users');
db.createCollection('projects');

db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true }); 