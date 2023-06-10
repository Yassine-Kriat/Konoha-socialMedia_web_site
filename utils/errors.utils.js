module.exports.signUpErrors = (err) => {
    let errors = {name: '', pseudo:'', email:'', password:''}

    if(err.message.includes('name'))
        errors.name = "nom trop court (minimum 3 caractères)";
    
    if(err.message.includes('pseudo'))
        errors.pseudo = "Ce pseudo existe déjà";

    if(err.message.includes('email'))
        errors.email = "email invalid";

    if(err.message.includes('password'))
        errors.password = "le nombre de caractère pour le mot de passe doit être >=3";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')){
        errors.email = 'Email déjà enregistré.';
    }
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')){
        errors.pseudo = 'pseudo déjà enregistré.';
    }
    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {pseudo:'', password:''}

    if(err.message.includes('pseudo'))
        errors.pseudo = "pseudo inconnu";

    if(err.message.includes('password'))
        errors.password = "mot de passe incorrecte";    

    return errors
}


module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};

    if(err.message.includes('invalid file')){
        errors.format = "Format incompatible";
    }

    if(err.message.includes('max size')){
        errors.maxSize = "Le fichier dépasse 2000ko";
    }
    return errors
}
