import React, { Component } from 'react';
import chat_send_btn from '../img/chat_send_btn.png';

function Community(props) {
    return (
        <div className="con community">
            <div className="info0 chart">
                <div className="info_txt info_txt0">
                    <ul className="community_list_wrap">
                        <li className="community_list"><span className="nickname">닉네임1</span></li>
                        <li className="community_list on"><span className="nickname">Nickname1</span></li>
                        <li className="community_list"><span className="nickname">Body user</span></li>
                        <li className="community_list"><span className="nickname">강아지3</span></li>
                        <li className="community_list"><span className="nickname">고양이3</span></li>
                        <li className="community_list"><span className="nickname">닉네임을 입력해주세요 입력해주세요</span></li>
                        <li className="community_list"><span className="nickname">닉네임1</span></li>
                        <li className="community_list"><span className="nickname">Nickname1</span></li>
                        <li className="community_list"><span className="nickname">Body user</span></li>
                        <li className="community_list"><span className="nickname">강아지3</span></li>
                        <li className="community_list"><span className="nickname">고양이3</span></li>
                        <li className="community_list"><span className="nickname">닉네임을 입력해주세요 입력해주세요</span></li>
                    </ul>
                    <input type="text" placeholder="닉네임을 입력해주세요" className="info_input" id="inputConcern"/>
                    <button type="button" className="btn_log_add btn_community_search">검색</button>
                </div>
            </div>

            <div className="info0 chart_con">
                <div className="info_txt info_txt0">
                    <p className="chat_target">Nickname1</p>
                    <ul className="chat_wrap">
                        <li className="chat_other"><span className="chat_nickname">닉네임1</span>힘드시면 조금씩 담배를 줄이시는 것도 큰 도움이 될 거예요.</li>
                        <li className="chat_other"><span className="chat_nickname">Nickname1</span>Thank you for your comment. :)</li>
                        <li className="chat_my"><span className="chat_nickname">Green user</span>Smoking damages your entire cardiovascular system :(</li>
                    </ul>
                    <div className="chat_input_wrap">
                        <input type="text" placeholder="Enter the message" className="chat_input" id="inputConcern"/>
                        <button type="button" className="chat_send_btn"><img src={chat_send_btn} alt=""/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Community;