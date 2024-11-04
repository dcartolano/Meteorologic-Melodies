

function CurrentConditions({Conditions, ConditionsUrl}) {
    // console.log(Conditions);
    return (
        <div className="conditionsDiv">
            <img className="conditionsIcon" src={ConditionsUrl} alt="" />
            <h4 className="conditionsText">
                {`Your current weather conditions... ${Conditions}`}
            </h4>
        </div>
    );
}

export default CurrentConditions;

// const ChildComponent = ({ data }) => {
//     return (
//         <div>
//             <h2>Child Component</h2>
//             <p>Name: {data.name}</p>
//             <p>Age: {data.age}</p>
//             <p>Occupation: {data.occupation}</p>
//         </div>
//     );
// };

{/* <a>
    <img src={} alt="Playlist Image"></img>
</a> */}