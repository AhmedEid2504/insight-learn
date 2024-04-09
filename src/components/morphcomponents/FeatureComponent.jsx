/* eslint-disable react/prop-types */
import { useEffect } from "react";


const FeatureComponent = (props) => {

  useEffect(() => {

    function extract(obj, n) {
        let sortable = [];
        for (var feature in obj) {
            sortable.push([feature, obj[feature]]);
        }
    
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        return sortable.slice(0, n);
    }
  
    function bindEvent(){
      window.addEventListener("CY_FACE_FEATURES_RESULT",handleFeatureEvent);
    }
    
    function handleFeatureEvent (evt) {
      let features = extract(evt.detail.output.features, 5);      // set userData from props to save features array
      props.setUserData(prevUserData => ({
        ...prevUserData,
        features: features.map(([feature]) => feature)
      }));
      props.setUserDataChanged(true)
    }
    bindEvent();
  }, []);


  return (
    <>
    </>
    
  );
};

export default FeatureComponent;
