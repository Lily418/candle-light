import Realm from "realm"

const FeelingRecordSchema = {
  name: "FeelingRecord",
  properties: {
    description:     "string",
    created: "date",
    sentiment: "string",
    feelingWord: "string"
  }
};

const initialState = {
  realm: new Realm({schema: [FeelingRecordSchema]})
  
}

export default function feelings(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}
