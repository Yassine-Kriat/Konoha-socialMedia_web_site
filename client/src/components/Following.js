import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ContextPage } from '../StoreForPage';
import { ContextFriendPage } from '../StoreFriend';
import FollowHandler from './FollowHandler';
import { isEmpty } from './Utils';

const Following = () => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [pageState, setPageState] = useContext(ContextPage);
    const [friendState, setFriendState] = useContext(ContextFriendPage);


    return (
        <div className="col-lg-3">
			<aside className="sidebar static">
				<div className="widget stick-widget">
					<h4 className="widget-title">AMIS</h4>
					<ul className="followers scroll">
                        <>

                        {!isEmpty(usersData[0]) && !isEmpty(userData) && usersData.map((user) =>{
                            if((userData.followers.includes(user._id) || userData.following.includes(user._id)) && userData._id!==user._id) {
                                return (
                                    <>
                                    <li key={user._id}>
                                        <figure>
                                            <img src={user.picture} alt=""/>
                                        </figure>
                                        <div className="friend-meta">
                                            <h4 onClick={()=>{setFriendState(user); setPageState({messagePage: false, profilPage: false,friendPage:true, conversation:pageState.conversation})}}>{user.pseudo}</h4>
                                            <FollowHandler idToFollow={user._id}/>
                                        </div>
                                    </li>
                                </>

                                );
                            } else {
                                return null
                            }

                        })
                        }
                        </>

					</ul>
				</div>
			</aside>
		</div>
    );
};

export default Following;