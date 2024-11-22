'use client';
import { useRouter } from "next/navigation";

export default function Logout(){
    const router = useRouter();
    
    function handleClick(){
        localStorage.removeItem('user');
        router.push("/");
    }
    
    return (
        <div className="hero-foot">
            <div className="section">
                <div className="container">
                    <button className="button is-light" onClick={handleClick}>Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
}