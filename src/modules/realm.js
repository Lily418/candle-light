import Realm from "realm"
import uuid from 'uuid/v4'

const FeelingRecordSchema = {
  name: "FeelingRecord",
  primaryKey: 'id',
  properties: {
    id: "string",
    description: "string",
    created: "date",
    sentiment: "string",
    feelingWord: "string",
    person: {type: 'linkingObjects', objectType: 'Person', property: 'feelings'}
  }
};

const PersonSchema = {
  name: "Person",
  primaryKey: 'id',
  properties: {
        id: "string",
        name: "string",
        feelings: "FeelingRecord[]"
  }
}

const addIdMigration = (oldRealm, newRealm) => {
  let oldFeelingRecords = oldRealm.objects('FeelingRecord');
  let newFeelingRecords = newRealm.objects('FeelingRecord');
  
  newRealm.deleteAll()

  for(let i = 0; i < oldFeelingRecords.length; i++) {
      newRealm.create("FeelingRecord", {
        "id": uuid(),
        "description" : oldFeelingRecords[i].description, 
        "sentiment" : oldFeelingRecords[i].sentiment, 
        "feelingWord" : oldFeelingRecords[i].feelingWord,
        "created": oldFeelingRecords[i].created,
      })
    }
}

const initialState = {
  realm: new Realm({
    schema: [FeelingRecordSchema, PersonSchema],
    schemaVersion: 5,
    migration: (oldRealm, newRealm) => {
      //Scheme version in original release was undefined so it would not be less than 2
      if(!(oldRealm.schemaVersion >= 2)) {
        addIdMigration(oldRealm, newRealm)
      }
    }
  })
}

export default function feelings(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}
