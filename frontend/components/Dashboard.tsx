'use client';

enum Rol {
    admin = 1,
    user = 2,
}

const loggedUser = JSON.parse(localStorage.user);

export default function Dashboard({children} : any){

    const dashboard: number = loggedUser.rolId;
    // Si el usuario tiene rol de admin muestra el AdminDashboard
    if(dashboard === Rol.admin){
        return ( children[0] );
    }

    // Si el usuario tiene rol de user muestra el UserDashboard
    if(dashboard === Rol.user){
        return ( children[1] );
    }
}