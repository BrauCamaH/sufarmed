/// <reference types="cypress" />
import Chance from 'chance';

const chance = new Chance();

describe('Sufarmed', () => {
  const email = chance.email();
  const pass = 'ValidPassword';
  const name = chance.name();

  const firstName = name.split(' ')[0];
  const lastName = name.split(' ')[1];

  it('navigate to login', () => {
    cy.visit('/home');

    cy.get('#login-button').click();
  });

  it('has a title', () => {
    cy.contains('Ingresa los siguientes datos para iniciar sesión');
  });

  it('go to sing-up', () => {
    cy.get('#signup').click({ force: true });
  });

  it('create user', () => {
    cy.get('input[name=firstname]').type(firstName, { force: true });
    cy.get('input[name=lastname]').type(lastName, { force: true });
    cy.get('input[name=email]').type(email, { force: true });
    cy.get('input[name=password]').type(pass, { force: true });

    cy.get('#signup').click({ force: true });

    cy.url('home');
    cy.contains(firstName.split(' ')[0]);
  });

  it('log-out', () => {
    cy.get('#appbar_account').click();
    cy.get('#sign-out').click();

    cy.contains('Iniciar Sesión');

    cy.get('#login-button').click();
  });

  it('check log-in', () => {
    cy.get('input[name=email').type(email, { force: true });
    cy.get('input[name=password').type(pass, { force: true });

    cy.get('#login').click({ force: true });
  });
});
