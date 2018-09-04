class Usuarios {
    constructor() {
        //personas conectadas en el chat
        this.personas = [];

    }
    agregarPersona(id, nombre, sala) {
        //crear persona
        let persona = {
                id,
                nombre,
                sala
            }
            //agregar persona al arreglo de las personas
        this.personas.push(persona);

        return this.personas;

    }
    getPersona(id) {
        //buscar persona en el arreglo
        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0]; //utlizar la primera posicion
        return persona;
    }
    getPersonas() {
        return this.personas;
    }
    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala
        });
        return personasEnSala;
    }
    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => {
            return persona.id !== id;
        });
        return personaBorrada;
    }





}

module.exports = {
    Usuarios
}