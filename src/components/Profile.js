import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

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

function Profile(props) {
    return (
        <div className="profile">
            <div className="profile_tit"><span className="nick">User1</span>'s body profile</div>
            <div className="profile_graph_wrap">
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
            </div>
        </div>
    )
}

export default Profile;