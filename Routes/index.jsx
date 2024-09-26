import { NavigationContainer } from "@react-navigation/native";
import TabsRoutes from "./tab.routes";

export default function Routes(){ 
    return (
        <NavigationContainer> 
            <TabsRoutes/>
        </NavigationContainer>
    )
}