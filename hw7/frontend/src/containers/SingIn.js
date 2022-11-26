import {useChat} from './hooks/useChat'
import AppTitle from '../components/Title'
import LogIn from '../components/LogIn'

const SignIn = () => {
    const { me, setMe, signedIn, setSignedIn, displayStatus } = useChat();
    const handleLogin = async (name) => {
        if (!name){
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        }else{
            await setSignedIn(true);
            console.log('login succed')
        } 
    }
    return (
        <>
            <AppTitle />
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
    );
}

export default SignIn