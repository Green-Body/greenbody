import React, { Component } from 'react';
import axios from 'axios';
import { json } from 'body-parser';

var thi = '';
var audit = '';
function Adit(props){
    return (
        <div>
            <h3 className="mylog_tit"><span className="log_date">{props.adit.date}</span> 일지</h3>
            <div className="mylog_txt">
                <ul>
                    <li>
                        <strong>담배 종류 :</strong>
                        <label>
                            <input 
                                type="radio" 
                                name="smoke_type" 
                                value="전자 담배" 
                                checked={props.adit.smoke_type === "전자 담배"} 
                                onChange={e => props.handleRadio(e)}/> 
                            전자 담배
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="smoke_type" 
                                value="연초" 
                                checked={props.adit.smoke_type === "연초"} 
                                onChange={props.handleRadio}/>
                            연초
                        </label>
                    </li>
                    <li><strong>담배 연기 흡입 정도 :</strong>
                        <label><input
                            type="radio" 
                            name="smoke_degree" 
                            value="깊게 흡입" 
                            checked={props.adit.smoke_degree === "깊게 흡입"} 
                            onChange={props.handleRadio}/> 깊게 흡입 </label>
                        <label>
                            <input 
                                type="radio" 
                                name="smoke_degree" 
                                value="얕게 흡입" 
                                checked={props.adit.smoke_degree === "얕게 흡입"} 
                                onChange={props.handleRadio}/> 
                        얕게 흡입 </label>
                    </li>
                    <li><strong>일일 평균 흡연량 :</strong>
                        <label><input type="radio" name="smoke_amount" value="1-9개비" checked={props.adit.smoke_amount === "1-9개비"} onChange={props.handleRadio}/> 1-9개비 </label>
                        <label><input type="radio" name="smoke_amount" value="10-19개비" checked={props.adit.smoke_amount === "10-19개비"} onChange={props.handleRadio}/> 10-19개비 </label>
                        <label><input type="radio" name="smoke_amount" value="20개비 이상" checked={props.adit.smoke_amount === "20개비 이상"} onChange={props.handleRadio}/> 20개비 이상 </label>
                    </li>
                </ul>
            </div>
        </div>
    )
}

function Info(props){
    return (
        <div>
            <h3 className="mylog_tit"><span className="log_date">{props.adit.date}</span> 일지</h3>
            <div className="mylog_txt">
                <ul>
                    <li><strong>담배 종류 :</strong> <span id="outputChoice"> {props.adit.smoke_type} </span></li>
                    <li><strong>담배 연기 흡입 정도 :</strong> <span id="outputDegree"> {props.adit.smoke_degree} </span></li>
                    <li><strong>일일 평균 흡연량 :</strong> <span id="outputAmount"> {props.adit.smoke_amount} </span></li>
                </ul>
            </div>
        </div>
    )
}

class MyLog extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: 1,
            log: [],
            selectedLog: 0,
        }
        fetch("/api/getMyLogList",{
            method: "POST"
        }).then(response=>response.json())
        .then(response=>console.log(response[0]));

        this.handleLogButton = this.handleLogButton.bind(this);
        this.changeVisible = this.changeVisible.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.handleAddButton = this.handleAddButton(this);
    } 

    changeVisible(number){
        this.setState({
            visible: number
        })
    }

    handleLogButton(index){
        this.setState({
            selectedLog: index,
        })
    }

    handleRadio(index, e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState(prevState => {
            const newLog = prevState.log.map((item, i) => {
                if(i == index) {
                    return {
                        ...item,
                        [name]: value,
                    }
                }
                else return item
            })
            return {
                log: newLog
            }
        })
    }

    handleAddButton() {
        const newLog = {
            date: '2021-05-24',
            smoke_type: '',
            smoke_degree: '',
            smoke_amount: '',
        }
        
        let { log } = this.state;
        log.push(newLog);

        this.setState({
            log: log
        })
    }

    renderContent() {
        const { log, selectedLog } = this.state;

        if(this.state.visible === 0){
            return <Adit adit={log[selectedLog]} handleRadio={this.handleRadio.bind(this, selectedLog)}/>
        }
        else return <Info adit={log[selectedLog]}/>
    }

    renderButton(){
        if(this.state.visible === 0){
            return (
                <div>
                    <button 
                        onClick={this.changeVisible.bind(this, 1)} 
                        type="button" 
                        className="btn_info_edit btn_mylog_edit">
                        확인
                    </button>
                    <button 
                        onClick={this.changeVisible.bind(this, 1)} 
                        type="button" 
                        className="btn_info_edit btn_mylog_delete">
                        취소
                    </button>
                </div>
            )
        }
        else return <div><button onClick={this.changeVisible.bind(this, 0)} type="button" className="btn_info_edit btn_mylog_edit">수정</button>
                        <button type="button" className="btn_info_edit btn_mylog_delete">삭제</button></div>
    }

    renderLogList(){
        const { log } = this.state;
        let logs = log.map((item, index) => {
            return (
                <li>
                    <button type="button" className="mylog_btn" onClick={this.handleLogButton.bind(this, index)}>
                        <span class="log_date">{item.date}</span> 
                        일지
                    </button>
                </li>
            )
        })
        return logs
    }

    render(){
        return (
            <div className="con mylog">
                <div className="info0 chart">
                    <div className="info_txt info_txt0">
                        <ul>
                            { this.renderLogList() }
                        </ul>
                        <button type="button" className="btn_log_add" onClick={this.handleAddButton}>추가</button>
                    </div>
                </div>
    
                <div className="info0 chart_con">
                    <div className="info_txt info_txt0">
                        {this.renderContent()}
                        {this.renderButton()}
                    </div>
                </div>
            </div>
        )
    }
}

export default MyLog;