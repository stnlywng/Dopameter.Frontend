import { Gremlin } from "../../types/Gremlin";

interface AddGremlinAction {
    type: "ADD_GREMLIN";
    payload: Gremlin;
}

interface DeleteGremlinAction {
    type: "DELETE_GREMLIN";
    payload: number;
}

interface UpdateGremlinAction {
    type: "UPDATE_GREMLIN";
    payload: Gremlin;
}

export type GremlinAction = AddGremlinAction | DeleteGremlinAction | UpdateGremlinAction;

const gremlinReducer = (state: Gremlin[], action: GremlinAction) => {
    switch (action.type) {
        case "ADD_GREMLIN":
            return [...state, action.payload];
        case "DELETE_GREMLIN":
            return state.filter((gremlin) => gremlin.gremlinID !== action.payload);
        case "UPDATE_GREMLIN":
            return state.map((gremlin) =>
                gremlin.gremlinID === action.payload.gremlinID ? action.payload : gremlin
            );
        default:
            return state;
    }
}

export default gremlinReducer;
