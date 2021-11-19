const request = require('supertest')('https://us-central1-leetcode-90738.cloudfunctions.net/api');
const assert = require('chai').assert;

describe('Problems Tests', () => {
  it('Test 1: problem data should not be empty', () => {
    
    // Make a GET request to the problems route
    return request
      .get('/problems')
      .expect(200)
      .then((res) => {
        // assert data being returned to not be empty
        assert.isNotEmpty(res.body);
      });
  });

  it('Test 2: number of problem entries should be above the default amount (14)', () => {
    
    // Make a GET request to the problems route
    return request
      .get('/problems')
      .expect(200)
      .then((res) => {
        // assert data being returned should be of a certain size
        assert.isAtLeast(14, res.body.length, 'The number of problems should be at least 14');
      });
  });
});

describe('User Problem Attempts Tests', () => {
  it('Test 3: user category attempts should not be empty', () => {
    
    // Make a GET request to the problem counts route for Emma
    return request
      .get('/problemcounts/Emma')
      .expect(200)
      .then((res) => {
        // assert data being returned to not be empty
        assert.isNotEmpty(res.body);
      });
  });

  it('Test 4: user should have 3 active categories', () => {
    
    // Make a GET request to the problem counts route for Emma
    return request
      .get('/problemcounts/Emma')
      .expect(200)
      .then((res) => {
        // assert data being returned should contain certain categories
        assert.hasAnyKeys(res.body, 'Array');
        assert.hasAnyKeys(res.body, 'Binary Search');
        assert.hasAnyKeys(res.body, 'Divide and Conquer');
      });
  });

  it('Test 5: user problem data should not be empty', () => {
    
    // Make a GET request to the get problem route for Emma
    return request
      .get('/getproblem/Emma')
      .expect(200)
      .then((res) => {
        // assert data being returned should not be empty
        assert.isNotEmpty(res.body);
      });
  });


  it('Test 6: user should have 2 problem attempts accounted for', () => {
    
    // Make a GET request to the get problem route for Emma
    return request
      .get('/getproblem/Emma')
      .expect(200)
      .then((res) => {
        // assert data being returned should have at least 2 entries
        assert.isAtLeast(2, res.body.length, 'The number of problems completed by Emma is at lease 2');
      });
  });
});

describe('User Info and Sign Up Tests', () => {
  it('Test 7: default users have been accounted for', () => {
    
    // Make a GET request to the user data
    return request
      .get('/users')
      .expect(200)
      .then((res) => {
        
        // assert data being returned contains the default users
        assert.include(res.body.users, 'Emma', 'array contains value');
        assert.include(res.body.users, 'Leela', 'array contains value');
        assert.include(res.body.users, 'User', 'array contains value');
        assert.include(res.body.users, 'hello', 'array contains value');
      });
  });

  it('Test 8: user token is generated upon signup', () => {
    const data = {
      email:'123email@gmail.com',
      password:'password',
      confirmPassword:'password',
      userHandle:'fakeUser'
    };
    return request
      .post('/signup')
      .send(data) // send payload data
      .then((res) => {
        assert.hasAnyKeys(res.body, 'email');
      });
  });

  it('Test 9: user was properly saved upon signup', () => {
    return request
      .get('/users')
      .expect(200)
      .then((res) => {
        assert.include(res.body.users, 'fakeUser', 'array contains value');
      });
  });
});