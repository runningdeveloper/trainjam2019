import * as faceapi from 'face-api.js';
import React, { useEffect, useState } from "react"
import Webcam from "react-webcam";
import { useSelector, useDispatch } from "react-redux"
import {
  setLoading
} from "../store/store"

// const FaceThing = () => (
//     <div
//     style={{
//         backgroundColor: colour,
//         width: `${blockSize}px`,
//         height: `${blockSize}px`,
//         position: 'absolute',
//         top: y-blockSize/2,
//         left: x-blockSize/2,
//         transform: `rotate(${rotation}deg)`
//     }}
//     >
//   <span style={{lineHeight: `${blockSize}px`, fontSize: `${blockSize-blockSize/3}px`, flexDirection: 'row', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>{colour.charAt(0)}</span>
//       </div>
//   )
  
  
//   export default FaceThing


  const videoConstraints = {
    width: 512,
    height: 512,
    facingMode: "user"
  };
   
  const FaceThing = ({results, loadingModel, loadingResult}) => {

    // const { centerBlocks, width, height, rocket } = useSelector(state => state.game)
    const dispatch = useDispatch()

    const webcamRef = React.useRef(null);
    // const [loadedModel, setLoadedModel] = useState(false)

    const [captured, setCaptured] = useState(null)

    // const [loadingPic, setLoadingPic] = useState(false)

    // useEffect(async () => {
    //     await faceapi.nets.ageGenderNet.loadFromUri('/models')
    //     console.log('loaded')
    //     // await faceapi.loadFaceRecognitionModel('/models')
    // },[])

    useEffect(() => {
        async function fetchData() {
            dispatch(setLoading('Loading Model...'))

            // loadingModel(true)
          // You can await here
        //   await changeFaceDetector('tiny_face_detector')
          await faceapi.nets.ageGenderNet.loadFromUri('/')
          await faceapi.nets.tinyFaceDetector.loadFromUri('/')
          await faceapi.nets.faceLandmark68Net.loadFromUri('/')
          await faceapi.nets.faceExpressionNet.loadFromUri('/')
        //   setLoadedModel(true)
          dispatch(setLoading(null))


          // ...
        }
        fetchData();
      }, []); // Or [] if effect doesn't need props or state
   
    const capture = React.useCallback(
      async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCaptured(imageSrc)
        // detect()
      },
      [webcamRef]
    );

    useEffect(() => {
        async function fetchResult() {
          if(captured){
            // setLoadingPic(true)
            dispatch(setLoading('Loading Results...'))
            // loadingResult(true)
            const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.4 })

            const imgResults = await faceapi.detectAllFaces(document.getElementById('pic'), options)
            // compute face landmarks to align faces for better accuracy
            .withFaceLandmarks()
            .withAgeAndGender()
            .withFaceExpressions()
          //   .withFaceDescriptors()
            console.log(imgResults)
            results(imgResults)
            // setLoadingPic(false)
            dispatch(setLoading(null))

          }
        }
        fetchResult();
      }, [captured]); // Or [] if effect doesn't need props or state
   

    // const detect = React.useCallback(
    //     async () => {
    //                 const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 })

    //       const results = await faceapi.detectAllFaces(document.getElementById('pic'), options)
    //       // compute face landmarks to align faces for better accuracy
    //       .withFaceLandmarks()
    //       .withAgeAndGender()
    //       .withFaceExpressions()
    //     //   .withFaceDescriptors()
    //       console.log(results)
    //     },
    //     [captured]
    //   );
   
    return (
      <>
        <Webcam
            id="video"
            style={{position: 'absolute', bottom: 0, right: 0}}
          audio={false}
          height={512}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={512}
          videoConstraints={videoConstraints}
        /><br/>
        {captured && <img style={{display: 'none'}} id='pic' src={captured}/>}
        {/* {!loadedModel && <h1>Loading models...</h1>} */}
        {/* wtf lol */}
        {/* {loadingPic && <h1>Loading result...</h1>} */}
        <button  style={{position: 'absolute', bottom: '10px', right: '10px'}} type="button" class="nes-btn is-primary" onClick={capture}>Build Row</button>

      </>
    );
  };

  export default FaceThing