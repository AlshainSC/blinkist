import ArticleContent from "./components/ArticleContent"
import CTRDisplay from "./components/CTRDisplay"
import SignupButton from "./components/SignupButton"
import {
  useVisitorId,
  useAssignedVariation,
  ABTestContext
} from "./utils/utils"

function App() {
  const visitorId = useVisitorId()
  const assignedVariation = useAssignedVariation(visitorId)

  return (
    <ABTestContext.Provider value={{ assignedVariation }}>
      <div className="flex flex-row content-center justify-center m-3">
        <div className="m-3">
          <div className="flex flex-row justify-between">
            <h1>AB Testing Demo</h1>
            <SignupButton variation={assignedVariation}></SignupButton>
          </div>
          <ArticleContent />
        </div>
        <div className="m-3">
          <CTRDisplay />
        </div>
      </div>
    </ABTestContext.Provider>
  )
}

export default App
