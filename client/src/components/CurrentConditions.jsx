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