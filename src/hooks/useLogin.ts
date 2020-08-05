import { useEffect, useState } from 'react';
import { useProfile } from './useProfile';

const useLogin = (): boolean => {
    const profile = useProfile();
    const [isLogin, setLogin] = useState<boolean>(false);

    useEffect(() => {
        if (profile) {
            setLogin(true);
        }
    }, [profile]);

    return isLogin;
};

export default useLogin;
