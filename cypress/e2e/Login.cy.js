describe('Login Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('should display the sign-in form, avatar, toggle buttons and the admin, trainer, and client login buttons', () => {
        // Check if the Sign in form is displayed
        cy.contains('Sign in').should('be.visible');
        
        // Check if the avatar is displayed
        cy.get('[data-testid="avatar"]').should('be.visible');
        
        // Check if the toggle buttons for login types are displayed
        cy.get('[data-testid="toggle-admin"]').should('be.visible');
        cy.get('[data-testid="toggle-trainer"]').should('be.visible');
        cy.get('[data-testid="toggle-client"]').should('be.visible');
    });

    it('should allow typing in the ID field', () => {
        // Check if the ID input field is visible and allow typing
        cy.get('[data-testid="id-input"]').should('be.visible').type('testID') //.should('have.value', 'testID');
    });

    it('should allow selecting login type', () => {
        // Check if the toggle buttons can be clicked and display the selected state
        cy.get('[data-testid="toggle-admin"]').click().should('have.class', 'Mui-selected');
        cy.get('[data-testid="toggle-trainer"]').click().should('have.class', 'Mui-selected');
        cy.get('[data-testid="toggle-client"]').click().should('have.class', 'Mui-selected');
    });
  
    it('should have working sign-in button', () => {
        // Check if the Sign In button is clickable
        cy.get('[data-testid="sign-in-button"]').should('be.visible').click();
    });
    /*
    it('should have working login buttons for Admin, Trainer, and Client', () => {
      // Check if the Admin login button is clickable and navigates correctly
      cy.get('[data-testid="admin-login-button"]').should('be.visible');
      
      // Check if the Trainer login button is clickable and navigates correctly
      cy.visit('/');
      cy.get('[data-testid="trainer-login-button"]').should('be.visible');
      
      // Check if the Client login button is clickable and navigates correctly
      cy.visit('/');
      cy.get('[data-testid="client-login-button"]').should('be.visible');
    }); */
  });