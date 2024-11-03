

function CurrentConditions({Conditions = ""}) {
    console.log(Conditions);
    return (
        <div className="">
            
            <h3 className="">
                {`Your current weather conditions... ${Conditions}`}
            </h3>
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