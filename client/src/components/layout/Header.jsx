import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import firebase from '../../firebase.js'
import Avatar from 'react-avatar'

const Header = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const LogoutHandler = () => {
        firebase.auth().signOut();
        navigate("/");
    }

    return (
        <header id='header' role='banner'>
            <div className='left'>
                <h1 className='logo'>
                    <Link to="/">Lee Blog</Link>
                </h1>
                <nav className='nav'>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/list">List</Link>
                        </li>
                        <li>
                            <Link to="/write">Write</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='right'>
                {user.accessToken === "" ? (
                    <ul>
                        <li>
                            <Link to="/login">로그인</Link>
                        </li>
                        <li>
                            <Link to="/Join">회원가입</Link>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link to="/mypage">
                                {user.displayName}님 방가워요!
                                <Avatar
                                    size='30'
                                    round={true}
                                    src={user.photoURL}
                                />
                            </Link>

                        </li>
                        <li>
                            <Link to="/" onClick={(() => LogoutHandler())}>로그아웃</Link>
                        </li>
                    </ul>
                )}
            </div>
        </header >
    )
}

export default Header