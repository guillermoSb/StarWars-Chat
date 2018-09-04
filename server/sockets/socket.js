const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMsg } = require('../utilidades/utilidades');
const usuarios = new Usuarios();
io.on('connection', (client) => {
    client.on("entrarChat", (usuario, callback) => {

        if (!usuario.nombre || !usuario.sala) {
            callback({
                error: true,
                mensaje: 'El nombre / sala es necesario'
            });
        }
        client.join(usuario.sala);
        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
        client.broadcast.to(usuario.sala).emit("listaPersonas", usuarios.getPersonasPorSala(usuario.sala));
        let personasSala = usuarios.getPersonasPorSala(usuario.sala);
        callback(personasSala);
    });
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMsg('Jedi', `${personaBorrada.nombre} salto al hiper espacio.`));
        client.broadcast.to(personaBorrada.sala).emit("listaPersonas", usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    //escuchar mensaje de un cliente
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMsg(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });
    //mensajes privados
    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMsg(persona.nombre, data.mensaje));
    });


});