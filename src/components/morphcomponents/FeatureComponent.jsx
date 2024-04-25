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
        feature_1: features[0][0],
        feature_2: features[1][0],
        feature_3: features[2][0],
        feature_4: features[3][0],
        feature_5: features[4][0]
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
