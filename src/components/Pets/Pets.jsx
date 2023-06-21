import { useSelector } from "react-redux";

function Pets() {
    const user = useSelector(store => store.user);

    return (
        <>
        {
            user.id ? 
            <h2>You're super pog, {user.username}!</h2>
            :
            <h2>You just got Coconut Mall-ed!</h2>
        }
        </>
    )
};

export default Pets;
