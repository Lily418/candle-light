const CHANGE_FEELING_SECTION = 'CHANGE_FEELING_SECTION'

const initialState = {
  showingSection: null,
  feelingWordsPositive: ["Uplifted", "Cared For" ,"Comfortable","Encouraged","Free","Happy","Secure","Loved","Social","Relaxed","Confident","Safe","Listened To","Supported","Respected","Energized"],
  feelingWordsNegative: ["Humiliated","Ignored","Pressured","Mocked","Controlled","Upset","Inadequte","Hurt","Isolated","Scared","Confused","Threatened","Manipulated","Used","Insignificant","Exhausted"]
}

export const changeFeelingSection = (showingSection) => {
  return {
    'type': CHANGE_FEELING_SECTION,
    showingSection
  }
}

export default function feelings(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_FEELING_SECTION:
      return {
        ...state,
        'showingSection': action.showingSection
      }
    default:
      return state
  }
}
