import { cleanEnv } from "envalid";
import { num, port, str} from "envalid/dist/validators";

export default cleanEnv(process.env,{
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    JWT_SECRETKEY: str(),
    JWT_EXPIRE: num(),
    FRONTEND_URL: str(),
})