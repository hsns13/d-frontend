import { todoConstant } from '../_constants';

const defaultState = {
    leftItems: 0,
    totalItemsCount: 0,
    todoList: [],
    all: []
};

export const todoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case todoConstant.ADD:
            state.all.push(action.todoItem);

            return {
                ...state,
                leftItems: ++state.leftItems,
                totalItemsCount: state.all.length,
                todoList: [...state.all]
            }
        case todoConstant.UPDATE:
            const index = state.all.findIndex(f => f.id === action.todoItem.id);
            const updatingItem = state.all.find(f => f.id === action.todoItem.id);

            state.all[index] = {
                ...updatingItem,
                isActive: action.todoItem.isActive,
                todoText: action.todoItem.todoText
            };

            const leftItems = state.all.length - state.all.filter(f => f.isActive === 0).length;

            return {
                ...state,
                leftItems: leftItems,
                todoList: [...state.all],
            }
        case todoConstant.REMOVE:
            const item = state.all.find(f => f.id === action.id);
            state.all = state.all.filter(f => f.id !== action.id);

            let leftItemsCount = state.leftItems;

            if(item && item.isActive) {
                --leftItemsCount;
            } else {
                leftItemsCount = state.all.filter(f => f.isActive === 1).length;
            }

            return {
                ...state,
                leftItems: leftItemsCount,
                totalItemsCount: state.all.length,
                todoList: [...state.all]
            }
        case todoConstant.ALL:
            state.all = action.todoListAll;

            return {
                ...state,
                leftItems: state.all.filter(f=>f.isActive === 1).length,
                totalItemsCount: state.all.length,
                todoList: [...state.all],
                all: [...state.all]
            };
        case todoConstant.ACTIVE:
            return {
                ...state,
                todoList: state.all.filter(f => f.isActive === 1)
            };
        case todoConstant.COMPLETED:
            return {
                ...state,
                todoList: state.all.filter(f => f.isActive === 0)
            }
        case todoConstant.CLEAR_COMPLETED:
            const removedCompletedList = state.all.filter(f => f.isActive === 1);

            return {
                ...state,
                totalItemsCount: state.all.length,
                todoList: removedCompletedList,
                all: removedCompletedList
            }
        default:
            return state;
    }
};