import AdminDashboard from '@/components/AdminDashboard';
import Dashboard from '@/components/Dashboard';
import UserDashboard from '@/components/UserDashboard';
import 'bulma/css/bulma.min.css';


export default function Page(){

  return (
    <Dashboard>
      <AdminDashboard />
      <UserDashboard />
    </Dashboard>
  ); 
}