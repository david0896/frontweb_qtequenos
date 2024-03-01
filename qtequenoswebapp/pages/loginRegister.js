import Image from "next/image"
import { useRouter } from 'next/router'
import Login from "@/components/login"
import Register from "@/components/register"
import Alerta from "@/components/alert"
import Passwordrecovery from "@/components/passwordrecovery"

export default function LoginRegister({alert, setAlert}) {
    const router = useRouter()
    const { form } = router.query
    return (
        <div className="relative">
            <Image src={'https://i.postimg.cc/NFxdSfd4/marek-piwnicki-Af6c85-B5-BOk-unsplash.jpg'}
                   priority
                   width={1920} 
                   height={1080} 
                   alt="Background image" 
                   className="w'screen h-screen object-center"
            />
            {alert ?
                <Alerta
                    alert={alert}
                    setAlert={setAlert}
                />
                : ''
            }
            <div className="absolute inset-0 flex items-center justify-center py-5">
                { form === 'login' ? 
                    <Login 
                        setAlert={setAlert}
                    /> 
                : form === 'register' ?
                    <Register
                        setAlert={setAlert}
                    /> 
                : 
                    <Passwordrecovery
                        setAlert={setAlert}
                    />
                }
            </div>
        </div>
    )
}