import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import character_on from '../img/character_on.png';
import character_off from '../img/character_off.png';
import graph_on from '../img/graph_on.png';
import graph_off from '../img/graph_off.png';
import character_good from '../img/character_good.png?v=1';
import character_bad from '../img/character_bad.png?v=1';
import character_soso from '../img/character_soso.png?v=1';

const options = {
    legend: {
        display: true, // label 보이기 여부
    },
    scales: {
        yAxes: [{
        ticks: { 
            min: 0, // y축 스케일에 대한 최소값 설정
            stepSize: 1, // y축 그리드 한 칸당 수치
        }
        }]
    },

    // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    // true : 크기가 알아서 결정됨.
    maintainAspectRatio: false 
}
const data = {
    // 각 막대별 라벨
    labels: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
    datasets: [
        {
            label: '요일별 흡연량 (1: 1-9개비, 2: 10-19개비, 3: 20개비 이상)',
            borderWidth: 1, // 테두리 두께
            data: [1,2,2,3,3,1,2], // 수치
            backgroundColor:['#FFB300','#FFB300','#FFB300','#FFB300','#FFB300','#FFB300','#FFB300'], // 각 막대 색
            hoverBackgroundColor: ['#EF5350','#EF5350','#EF5350','#EF5350','#EF5350','#EF5350','#EF5350']
        }
    ]
};

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: 0,
            log: [],
            score: 0,
        }
        fetch("/api/getMyScore",{
            method: "POST"
        }).then(response=>response.json())
        .then(json => {
            this.setState({
                score: json.score,
            })
        });

        fetch("/api/getMyLogList",{
            method: "POST"
        }).then(response=>response.json())
        .then(response=>{
            if(response.length !== 0){
                this.setState({
                    log:response
                })
            }
        });
        fetch("/api/getMyLogList",{
            method: "POST"
        }).then(response=>response.json())
        .then(response=>console.log(response));
        this.changeVisible = this.changeVisible.bind(this);
    } 

    changeVisible(number){
        this.setState({
            visible: number
        })
    }

    renderContent(){
        if(this.state.visible === 0){
            let level = 0;
            if(this.state.score >= 300){
                return (
                    <div className="profile_graph">
                        <img src={character_good} alt="good" className="img_base"/>
                        <p className="score"><strong>점수: </strong>{this.state.score}</p>
                    </div>
                )
            }
            else if(this.state.score >= 100){
                return (
                    <div className="profile_graph">
                        <img src={character_soso} alt="soso" className="img_base"/>
                        <p className="score"><strong>점수: </strong>{this.state.score}</p>
                    </div>
                )
            }
            else{
                return (
                    <div className="profile_graph">
                        <img src={character_bad} alt="bad" className="img_base"/>
                        <p className="score"><strong>점수: </strong>{this.state.score}</p>
                    </div>
                )
            }
        }
        else if(this.state.visible === 1){
            return (
                <Bar className="profile_graph"
                    data={data}
                    options={options}
                    height={null}
                    width={null}
                    options={{
                        aspectRatio: 1.25,
                        chartArea: {
                            backgroundColor: 'pink'
                        }
                    }}
                />
            )
        }
    }

    render(){
        return (
            <div className="profile">
                <div className="profile_tit"><span className="nick">User1</span>'s body profile</div>
                <div className="profile_graph_wrap">
                    <button type="button" className={"profile_graph_btn profile_graph_btn_now graph"+(this.state.visible == 0? "On" : "Off")}>
                        <img onClick={this.changeVisible.bind(this, 0)} src={character_off} alt="Now" className="img_base"/>
                        <img onClick={this.changeVisible.bind(this, 0)} src={character_on} alt="Now" className="img_cover"/>
                    </button>
                    <button type="button" className={"profile_graph_btn profile_graph_btn_before graph"+(this.state.visible == 1? "On" : "Off")}>
                        <img onClick={this.changeVisible.bind(this, 1)} src={graph_off} alt="Now" className="img_base"/>
                        <img onClick={this.changeVisible.bind(this, 1)} src={graph_on} alt="Now" className="img_cover"/>
                    </button>
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}

export default Profile;