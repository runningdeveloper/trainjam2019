import React, { useEffect } from "react"
import { Provider } from "react-redux"
import { useSelector, useDispatch } from "react-redux"

import createStore from "./src/store/store"

// const StartUp = ({ children }) => {
//   const state = useSelector(state => state)
//   const dispatch = useDispatch()
//   console.log("state", state)

//   useEffect(() => {
//     dispatch(setupFirebase())
//     dispatch(getSavedAuth())
//   }, [])

//   useEffect(() => {
//     if (state.db.ready) {
//       dispatch(startAuth())
//     }
//   }, [state.db.ready])

//   return <>{children}</>
// }

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore()
  return <Provider store={store}>{element}</Provider>
}
