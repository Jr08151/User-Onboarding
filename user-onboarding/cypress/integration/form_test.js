describe ("Testing our User-Onboard form", function(){
    
    beforeEach(function (){
        cy.visit("http://localhost:3000")
    })

    it ("Add the tests for my inputs and submit", function(){
        // cy.pause()

        cy
        .get('input[name="name"]') 
        .type("JR") 
        .should('have.value', "JR") 

        cy
        .get('input[id="email"]') 
        .type('JR@nomail.com') 
        .should('have.value','JR@nomail.com') 
       
        cy
        .get('input[name="password"]') 
        .type("password") 
        .should('be.visible', "password") 

        cy
        .get('input[type="checkbox"]') 
        .check()
        .should('be.checked') 

        cy
        .get('input') 
        .should('be.empty')
        
        cy.get("button").click() 


    })



})