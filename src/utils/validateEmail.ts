
//nesta função para verificar se o email esta bem escrito usou se o regex:
//(no entanto, ha bibliotecas mais fiaveis que o regex como por ex o express-validator q foi a q usamos neste projeto, 
//colocamos esta aqui na pasta utils p sabermos que ela existe)
export function validateEmail(email: string) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};