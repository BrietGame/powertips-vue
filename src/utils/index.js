export class utils {

    // Decode token
    static decodeToken() {
        const token = localStorage.getItem('token');
        if (token === null) {
            return null
        }
        return JSON.parse(atob(token.split('.')[1]));
    }

    // Format date
    static formatDate(date) {
        let dateFormated = new Date(date);
        return dateFormated.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }
    
    static returnRoles(roles) {
        // Json to array
        const separator = ',';
        // Supprimer les crochets
        roles = roles.replace('[', '');
        roles = roles.replace(']', '');
        // Supprimer les guillemets
        roles = roles.replace(/"/g, '');
        // Supprimer les espaces
        roles = roles.replace(/ /g, '');
        return roles.split(separator);
    }
}