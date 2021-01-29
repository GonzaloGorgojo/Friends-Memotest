
//Primero levantar el servidor local (mi puerto es 5500)
describe('Elementos', () => {
    it('Testear que se visualizen todos los elementos', () => {
        cy.visit('http://127.0.0.1:5500/')
        cy.get('img').should('have.length', 12)
        cy.get('img').should('not.have.css', 'visibility', 'hidden')
    })
})

describe('Probar que cargue siempre diferentes', () => {
    it('Probar cuadros', () => {
        cy.visit('http://127.0.0.1:5500/')
        let primerasImagenes = []
        let segundasImagenes = []
        cy.get('.img').then(($img) => {
            $img[0].click()
            $img.each(function (i, img) {
                primerasImagenes.push(img.src);
            });
        })

        cy.visit('http://127.0.0.1:5500/')

        cy.get('.img').then(($img) => {
            $img[0].click()
            $img.each(function (i, img) {
                segundasImagenes.push(img.src);
            });
            cy.wrap(primerasImagenes[0]).should('not.deep.equal', segundasImagenes[0]);
        })
    })
})
