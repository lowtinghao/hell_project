describe('App Component Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/client', {
            onBeforeLoad(win) {
                // Mock location.state to avoid navigation to '/'
                win.history.replaceState({ id: '123' }, '');
            }
        });
    });

    it('should render the Admin Page initially', () => {
        cy.get('[data-testid="app-div"]').should('exist');
        cy.get('[data-testid="client-navbar"]').should('exist');
        cy.get('[data-testid="box"]').should('exist');
        cy.get('[data-testid="form-section"]').should('exist');
        cy.get('[data-testid="form-preview"]').should('exist');
        cy.get('[data-testid="submit-button"]').should('exist');
    });

    it('should change to Workshops Table when tab is switched', () => {
        cy.get('[data-testid="client-navbar"] button').eq(1).click();
        cy.get('[data-testid="workshops-table"]').should('exist');
    });

    it('should navigate back to home when Back button is clicked', () => {
        cy.get('[data-testid="back-button"]').click();
        cy.url().should('eq', 'http://localhost:3000/');
    });

    it('should submit the form and reload the page', () => {
        // Mock the fetch request
        cy.intercept('POST', 'http://localhost:3001/client/workshops', {
            statusCode: 201,
            body: {}
        }).as('submitForm');

        cy.get('[data-testid="submit-button"]').click();

        cy.wait('@submitForm').then((interception) => {
            expect(interception.response.statusCode).to.eq(201);
        });
    });
    });