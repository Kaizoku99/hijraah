'use client'

import {
    createContext,
    useContext,
    useReducer,
    type ReactNode,
    useCallback,
} from 'react'

interface Activity {
    type: 'search' | 'extract' | 'analyze' | 'error'
    status: 'pending' | 'complete' | 'error'
    message: string
    timestamp: string
    depth?: number
}

interface Source {
    url: string
    title: string
    description?: string
    relevance?: number
}

interface DeepResearchState {
    activity: Activity[]
    sources: Source[]
    currentDepth: number
    maxDepth: number
    completedSteps: number
    totalExpectedSteps: number
}

type DeepResearchAction =
    | { type: 'ADD_ACTIVITY'; payload: Activity }
    | { type: 'ADD_SOURCE'; payload: Source }
    | { type: 'INIT_PROGRESS'; payload: { maxDepth: number; totalSteps: number } }
    | { type: 'UPDATE_PROGRESS'; payload: { current: number; total: number } }
    | { type: 'CLEAR_STATE' }

const initialState: DeepResearchState = {
    activity: [],
    sources: [],
    currentDepth: 0,
    maxDepth: 0,
    completedSteps: 0,
    totalExpectedSteps: 0,
}

function reducer(state: DeepResearchState, action: DeepResearchAction): DeepResearchState {
    switch (action.type) {
        case 'ADD_ACTIVITY':
            return {
                ...state,
                activity: [...state.activity, action.payload],
            }
        case 'ADD_SOURCE':
            if (state.sources.some((s) => s.url === action.payload.url)) {
                return state
            }
            return {
                ...state,
                sources: [...state.sources, action.payload],
            }
        case 'INIT_PROGRESS':
            return {
                ...state,
                maxDepth: action.payload.maxDepth,
                totalExpectedSteps: action.payload.totalSteps,
            }
        case 'UPDATE_PROGRESS':
            return {
                ...state,
                completedSteps: action.payload.current,
                totalExpectedSteps: action.payload.total,
            }
        case 'CLEAR_STATE':
            return initialState
        default:
            return state
    }
}

interface DeepResearchContextValue {
    state: DeepResearchState
    addActivity: (activity: Activity) => void
    addSource: (source: Source) => void
    initProgress: (maxDepth: number, totalSteps: number) => void
    updateProgress: (current: number, total: number) => void
    clearState: () => void
}

const DeepResearchContext = createContext<DeepResearchContextValue | undefined>(undefined)

export function DeepResearchProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addActivity = useCallback((activity: Activity) => {
        dispatch({ type: 'ADD_ACTIVITY', payload: activity })
    }, [])

    const addSource = useCallback((source: Source) => {
        dispatch({ type: 'ADD_SOURCE', payload: source })
    }, [])

    const initProgress = useCallback((maxDepth: number, totalSteps: number) => {
        dispatch({
            type: 'INIT_PROGRESS',
            payload: { maxDepth, totalSteps },
        })
    }, [])

    const updateProgress = useCallback((current: number, total: number) => {
        dispatch({
            type: 'UPDATE_PROGRESS',
            payload: { current, total },
        })
    }, [])

    const clearState = useCallback(() => {
        dispatch({ type: 'CLEAR_STATE' })
    }, [])

    return (
        <DeepResearchContext.Provider
            value={{
                state,
                addActivity,
                addSource,
                initProgress,
                updateProgress,
                clearState,
            }}
        >
            {children}
        </DeepResearchContext.Provider>
    )
}

export function useDeepResearch() {
    const context = useContext(DeepResearchContext)
    if (context === undefined) {
        throw new Error('useDeepResearch must be used within a DeepResearchProvider')
    }
    return context
}