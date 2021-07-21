const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { Genre } = require('../../src/db');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({ })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('a game should have id', (done) => {
        Videogame.create({name: 'Super Mario Bros', platforms: '', description:'' })
          .then(() => done(new Error('ID is missing')))
          .catch(() => done());       
      });
    });
  });
});

describe('Genre model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Genre.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Genre.create({ })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('a genre should have id', (done) => {
        Genre.create({name: 'Cards'})
          .then(() => done(new Error('ID is missing')))
          .catch(() => done());       
      });
    });
  });
  it('genre id must be a string', (done) => {
    Genre.create({
      name: 'test',
      id: 4
    })
    .then(() => {
      done(new Error('It requires a valid ID'))
    })
    .catch(() => done()) 
  })
})

