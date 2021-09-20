
function obtenerdatos(){
    var usuario = document.getElementById('user').value;
    var contraseña = document.getElementById('password').value;
    
    let credencial = new Map();
    credencial.set("administrador","admin")
    credencial.set("operario","operario")
    credencial.set("vendedeor","vendedor")
    
    if (credencial.has(usuario)){
    	if (contraseña == credencial.get(usuario)){
            alert("Bienvenido " + usuario);
            setTimeout(window.open("principal.html"), 2000);
            window.close();
            return false;
      }else{
      alert("contraseña incorrecta")
      }
    	
    }else{
    alert("usuario incorrecto")
    }
}

function cambiarContraseña(){
    alert("va a cambiar la contraseña")

}