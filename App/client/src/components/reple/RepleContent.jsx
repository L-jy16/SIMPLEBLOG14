import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar'


const RepleContent = (props) => {
    const [modalFlag, setModalFlag] = useState(false);
    const [editFlag, setEditFlag] = useState(false);
    const [reple, setReple] = useState(props.reple.reple);

    const user = useSelector((state) => state.user)
    const ref = useRef();   //리액트 훅을 씀(옛날 방식에서 갖고 온 것들을 리액트 훅이라고 한다.)
    useOnClickOutside(ref, () => setModalFlag(false))

    const submitHandler = (e) => {
        e.preventDefault();
        let body = {
            uid: user.uid,
            reple: reple,
            postId: props.reple.postId,
            repleId: props.reple._id
        }
        axios.post("/api/reple/edit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("댓글 수정이 성공하였습니다.")
                } else {
                    alert("댓글 수정이 실패하였습니다.")
                }
                return window.location.reload();
            })
    }

    const DeleteHandler = (e) => {
        e.preventDefault();
        if (window.confirm("정말로 삭제 하시겠습니까?")) {
            let body = {
                repleId: props.reple._id,
                postId: props.reple.postId
            }

            axios.post("/api/reple/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("댓글이 삭제되었습니다.");
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("댓글을 삭제하는데 실패하였습니다.");
                })
        }
    }

    return (
        <div>

            <div className='reple'>
                <div className="nickname">
                    <p>{props.reple.author.displayName}</p>
                    <Avatar
                        size='20'
                        round={true}
                        src={props.reple.author.photoURL}
                    />
                </div>
                {/* 아이디가 일치할 때만 사용 할 수 있게 한 방법 */}
                {props.reple.author.uid === user.uid && (
                    <div className='reple-info'>
                        <span onClick={() => setModalFlag(true)}>...</span>
                        {modalFlag && (
                            <div className='modal' ref={ref}>
                                <p onClick={(e) => DeleteHandler(e)}>삭제</p>
                                <p onClick={() => {
                                    setEditFlag(true);
                                    setModalFlag(false);
                                }}>수정</p>
                            </div>
                        )}
                    </div>
                )}
                {/* modal 버튼을 클릭하면 나오게 끔 한 것 */}
                {editFlag ? (
                    <div>
                        <form>
                            <input
                                style={{ border: "1px solid #000", padding: "10px" }}
                                type="text"
                                value={reple}
                                onChange={(e) => { setReple(e.currentTarget.value) }}
                            />
                            {/*  수정하기를 누르면 수정하기, 취소하기 버튼 안보이게 숨김 */}
                            <button onClick={(e) => { submitHandler(e) }}>수정하기</button>
                            / <button onClick={(e) => {
                                e.preventDefault();
                                setEditFlag(false);
                            }}>취소하기</button>
                        </form>
                    </div>
                ) : (
                    <p>{props.reple.reple}</p>
                )}
            </div>
        </div>
    )
}

// 자바 스크립트르 밖에서 처리함
function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

export default RepleContent
