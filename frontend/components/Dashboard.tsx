'use client';
import { useEffect, useState } from "react";

enum Rol {
    admin = 1,
    user = 2,
}

export default function Dashboard({children} : any){

    const [AdminDashboard, UserDashboard] = children;
    const [rol, setRol] = useState(0);
    
    // Este código se ejecutará tras montarse el componente Dashboard...
    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.user);
        if(loggedUser) setRol(loggedUser.rolId);
    },[]); // ...por primera y única vez ( ,[] )
    
    // Si el usuario tiene rol de admin muestra el AdminDashboard
    if(rol === Rol.admin) return AdminDashboard;

    // Si el usuario tiene rol de user muestra el UserDashboard
    if(rol === Rol.user) return UserDashboard;
}