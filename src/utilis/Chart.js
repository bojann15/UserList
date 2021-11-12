import React from 'react';
import { Line } from 'react-chartjs-2';

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
const getUserSignupDate = () => randomDate(new Date(2021, 0, 1), new Date())
const getDateMonth = (d) => d.getMonth() + 1; // Zero based value so increment

const Chart = ({ users }) => {
    //  Signup date from API is the same we have to generate random values
    const usersWithRandomSignupDate = users.map((item) => Object.assign(item, { signupDate: getUserSignupDate() }));
    // Completed  data generating now we generate signup date clusters for labeling
    const signupDateClusters = usersWithRandomSignupDate.reduce((acc, item) => {
        const userSignupMonth = getDateMonth(item.signupDate);
        if (acc[userSignupMonth]) {
            acc[userSignupMonth]++;
        } else {
            acc[userSignupMonth] = 1;
        }
        return acc;
    }, {});

    const data = {
        labels: Object.keys(signupDateClusters),
        datasets: [
            {
                label: 'signups',
                data: Object.values(signupDateClusters),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: false,
        maintainAspectRatio: false,
    };

    return (
        <div >
            <h3 className="chartTitle">User Growth</h3>
            <Line data={data} options={options} />
        </div>
    )

};

export default Chart;