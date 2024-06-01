import { UsecontextAuth } from "@/context/provider-auth"

export default function HeaderRoutes(){
    const {RoleUser}= UsecontextAuth()
    return <div>dd</div>
}