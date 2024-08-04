describe('App Component', () => {
    beforeEach(() => {
        // Visit the admin page before each test
        cy.visit('http://localhost:3000/admin');
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });

    it('should display the Admin Page when the page state is "home-button"', () => {
        // Mock the location state to be a valid state
        cy.window().then((win) => {
            win.history.replaceState({ id: 1 }, '', '/admin');
        });

        // Reload the page to apply the mocked state
        cy.reload();

        // Verify that the Admin Page components are visible
        cy.get('[data-testid="admin-navbar"]').should('exist');
        cy.get('[data-testid="admin-page-heading"]').contains('Admin Page').should('be.visible');
        cy.get('[data-testid="workshop-request-table"]').should('exist');
        cy.get('[data-testid="back-button-home"]').contains('Back').should('be.visible');
    });

    it('should display the Trainer Page when the page state is "trainers-button"', () => {
        // Mock the location state to be a valid state
        cy.window().then((win) => {
            win.history.replaceState({ id: 1 }, '', '/admin');
        });

        // Reload the page to apply the mocked state
        cy.reload();

        // Simulate clicking the "Trainers" button to navigate to the Trainer Page
        cy.get('[data-testid="admin-navbar"]').contains('Trainers').click();

        // Verify that the Trainer Page components are visible
        cy.get('[data-testid="trainer-page-heading"]').contains('Trainer Page : I need help with this').should('be.visible');
        cy.get('[data-testid="admin-view-trainer-schedule"]').should('exist');
        cy.get('[data-testid="back-button-trainers"]').contains('Back').should('be.visible');
    });

    it('should display the Form Page when the page state is "form-button"', () => {
        // Mock the location state to be a valid state
        cy.window().then((win) => {
            win.history.replaceState({ id: 1 }, '', '/admin');
        });

        // Reload the page to apply the mocked state
        cy.reload();

        // Simulate clicking the "Form" button to navigate to the Form Page
        cy.get('[data-testid="admin-navbar"]').contains('Form').click();

        // Verify that the Form Page components are visible
        cy.get('[data-testid="form-page-heading"]').contains('Form Page : I need help with this').should('be.visible');
        cy.get('[data-testid="back-button-form"]').contains('Back').should('be.visible');
    });

    it('should redirect to the home page if location state is invalid', () => {
        // Mock the location state to be invalid
        cy.window().then((win) => {
            win.history.replaceState({}, '', '/admin');
        });

        // Reload the page to apply the mocked state
        cy.reload();

        // Verify redirection to the home page
        cy.url().should('eq', 'http://localhost:3000/'); // Ensure the base URL matches your setup
        cy.get('[data-testid="admin-page-heading"]').should('not.exist');
        cy.get('[data-testid="trainer-page-heading"]').should('not.exist');
        cy.get('[data-testid="form-page-heading"]').should('not.exist');
    });
});