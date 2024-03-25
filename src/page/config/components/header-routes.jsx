import { UsecontextAuth } from "@/context/provider-auth"

export default function HeaderRoutes(){
    const {RoleUser}= UsecontextAuth()
    console.log(RoleUser)
    return <div>dd</div>
}