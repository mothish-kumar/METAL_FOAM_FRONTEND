import { toast } from 'sonner';
import { navigateToAdmin ,navigateToLogin, navigateToRA,navigateToDS, navigateToPR,navigateToQC} from '../utils/navigation';
import axiosInstance from './axiosInstance';

export const login = async(username,password)=>{
    try {
        if(!username || !password){
            toast.error('Required fields are missing');
            return;
        }
        const response = await axiosInstance.post('auth/login',{username,password});
        if (response.status === 200) {
            localStorage.setItem('authToken', response.data.accesstoken);
            if(response.data.role === 'admin'){
                navigateToAdmin();
            }
            if(response.data.role === 'resource_analyst'){
                navigateToRA(); 
            }
            if(response.data.role === 'design_support'){
                navigateToDS();
            }
            if(response.data.role === 'production_assembly'){
                navigateToPR();
            }
            if(response.data.role === 'quality_control'){
                navigateToQC();
            }
        }
    } catch (error) {
        toast.error('Invalid username or password');
    }
}

export const  logout = async()=>{
    try {
        localStorage.removeItem('authToken');
        toast("Confirm logout!", {
            description: "Click here to logout",
            action: { label: "Logout", onClick: () => navigateToLogin() },
          });
        return true;
    } catch (error) {
        console.error('Error during logout:', error);
        return error;
    }
}